# HTTP客户端架构说明

## 📋 概述

这个HTTP客户端是一个基于fetch封装的网络请求管理器，提供了统一的API调用接口和完善的错误处理机制。

## 🏗️ 架构层次

```
┌─────────────────────────────────────────┐
│           API服务层                      │
│  authService.ts, reservationService.ts  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           HTTP客户端层                   │
│         httpClient.ts                   │
│  ┌─────────────────────────────────────┐ │
│  │ request() - 公共接口                │ │
│  │ get(), post(), put(), delete()     │ │
│  └─────────────────────────────────────┘ │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           拦截器层                       │
│         interceptors.ts                 │
│  ┌─────────────────────────────────────┐ │
│  │ authInterceptor - 认证处理          │ │
│  │ loggingInterceptor - 日志记录       │ │
│  │ responseInterceptor - 响应处理      │ │
│  └─────────────────────────────────────┘ │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           执行层                         │
│  executeRequest() - 实际HTTP请求        │
│  retryRequest() - 重试逻辑    │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│           配置层                         │
│  config.ts, types.ts, errorHandler.ts  │
└─────────────────────────────────────────┘
```

## 🔄 请求流程

### 完整的请求调用链：

```
用户调用 httpClient.get()
    ↓
httpClient.request()
    ↓
processRequestInterceptors() // 处理认证、日志等
    ↓
buildURL() // 构建完整URL
    ↓
retryRequest() // 重试逻辑
    ↓
executeRequest() // 实际发送HTTP请求
    ↓
fetch() // 原生网络请求
    ↓
handleResponse() // 处理响应
    ↓
processResponseInterceptors() // 处理响应拦截器
    ↓
返回结果给用户
```

## 📁 文件职责

### `httpClient.ts` - 核心HTTP客户端
- **公共接口**：`request()`, `get()`, `post()`, `put()`, `delete()`
- **私有方法**：`executeRequest()`, `retryRequest()`, `processInterceptors()`
- **工具方法**：`buildURL()`, `handleResponse()`, `setAuthToken()`

### `interceptors.ts` - 拦截器定义
- **authInterceptor**：自动添加认证token
- **loggingInterceptor**：记录请求日志
- **responseInterceptor**：统一处理响应和错误

### `config.ts` - 配置管理
- API基础URL配置
- 默认请求头
- 超时设置
- 环境相关配置

### `types.ts` - 类型定义
- 请求配置类型
- 响应数据类型
- 拦截器接口
- 错误类型

### `errorHandler.ts` - 错误处理
- 统一错误处理逻辑
- 错误分类和转换
- 用户友好的错误提示

## 🔧 主要方法说明

### `request()` - 主要请求方法
**职责**：作为HTTP客户端的公共接口
- 处理请求拦截器
- 构建完整URL
- 执行重试逻辑
- 统一错误处理

### `executeRequest()` - 底层执行器
**职责**：实际发送HTTP请求
- 构建请求选项
- 处理认证token
- 发送fetch请求
- 处理响应拦截器

### 区别总结
- `request()` = 高层接口 + 完整流程控制
- `executeRequest()` = 底层实现 + 具体请求执行

## 🚀 使用示例

```typescript
// 简单GET请求
const response = await httpClient.get('/api/users');

// 带参数的POST请求
const result = await httpClient.post('/api/login', {
  username: 'user',
  password: 'pass'
});

// 自定义配置
const data = await httpClient.request({
  url: '/api/data',
  method: 'GET',
  timeout: 5000,
  skipAuth: true
});
```

## 🛠️ 扩展性

### 添加新的拦截器
```typescript
// 添加请求拦截器
httpClient.addRequestInterceptor({
  onRequest: async (config) => {
    // 自定义请求处理逻辑
    return config;
  }
});

// 添加响应拦截器
httpClient.addResponseInterceptor({
  onResponse: async (response) => {
    // 自定义响应处理逻辑
    return response;
  },
  onResponseError: async (error) => {
    // 自定义错误处理逻辑
    throw error;
  }
});
```

## 🔍 调试技巧

1. **查看请求日志**：loggingInterceptor会记录所有请求信息
2. **错误追踪**：每个层级都有明确的错误处理
3. **拦截器调试**：可以在拦截器中添加console.log查看数据流
4. **网络问题**：检查config.ts中的baseURL配置

## 📝 最佳实践

1. **统一使用httpClient**：不要直接使用fetch
2. **合理配置超时**：根据接口特性设置合适的timeout
3. **错误处理**：在业务层捕获和处理特定错误
4. **认证管理**：使用setAuthToken()和clearAuthToken()管理登录状态
5. **拦截器使用**：将通用逻辑放在拦截器中，保持业务代码简洁