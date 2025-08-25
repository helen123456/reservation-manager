# 项目依赖说明

本文档详细介绍了 ReserveEase 预订管理系统中使用的各个依赖包及其用途。

## 核心框架依赖

### React 生态
- **react** (19.0.0) - React 核心库，用于构建用户界面的 JavaScript 库
- **react-dom** (19.0.0) - React DOM 渲染器，用于在 Web 环境中渲染 React 组件
- **react-native** (0.79.6) - React Native 核心框架，用于构建跨平台移动应用
- **react-native-web** (~0.20.0) - 使 React Native 组件能够在 Web 浏览器中运行

### Expo 框架
- **expo** (~53.0.22) - Expo SDK 核心包，提供开发、构建和部署 React Native 应用的工具链
- **expo-router** (~5.1.5) - 基于文件系统的路由解决方案，简化应用导航管理

## 导航相关
- **@react-navigation/native** (^7.1.6) - React Navigation 核心库，提供导航功能
- **@react-navigation/bottom-tabs** (^7.3.10) - 底部标签导航组件
- **@react-navigation/elements** (^2.3.8) - 导航相关的 UI 元素和组件
- **react-native-screens** (~4.11.1) - 原生屏幕管理，优化导航性能
- **react-native-safe-area-context** (5.4.0) - 安全区域上下文，处理设备刘海屏等边界问题

## UI 和交互组件
- **@expo/vector-icons** (^14.1.0) - 矢量图标库，提供丰富的图标资源
- **expo-blur** (~14.1.5) - 模糊效果组件，用于创建毛玻璃效果
- **expo-haptics** (~14.1.4) - 触觉反馈功能，提供震动和触感体验
- **react-native-gesture-handler** (~2.24.0) - 手势处理库，支持复杂的触摸交互
- **react-native-reanimated** (~3.17.4) - 高性能动画库，提供流畅的动画效果

## 系统和平台功能
- **expo-constants** (~17.1.7) - 访问系统常量和应用配置信息
- **expo-status-bar** (~2.2.3) - 状态栏管理，控制状态栏样式和行为
- **expo-system-ui** (~5.0.11) - 系统 UI 控制，管理系统界面元素
- **expo-splash-screen** (~0.30.10) - 启动屏幕管理，控制应用启动时的加载界面

## 资源和媒体
- **expo-font** (~13.3.2) - 字体加载和管理功能
- **expo-image** (~2.4.0) - 优化的图片组件，提供更好的性能和功能
- **expo-symbols** (~0.4.5) - SF Symbols 支持（iOS 系统图标）

## 网络和外部集成
- **expo-linking** (~7.1.7) - 深度链接处理，支持应用间跳转和 URL 处理
- **expo-web-browser** (~14.2.0) - 内置浏览器功能，在应用内打开网页
- **react-native-webview** (13.13.5) - WebView 组件，在应用中嵌入网页内容

## 开发工具依赖

### 编译和构建
- **@babel/core** (^7.25.2) - Babel 核心编译器，用于 JavaScript 代码转换
- **typescript** (~5.8.3) - TypeScript 编译器，提供类型检查和现代 JavaScript 特性

### 代码质量
- **eslint** (^9.25.0) - JavaScript/TypeScript 代码检查工具
- **eslint-config-expo** (~9.2.0) - Expo 官方 ESLint 配置规则

### 类型定义
- **@types/react** (~19.0.10) - React 的 TypeScript 类型定义文件

## 脚本说明

- **start** - 启动 Expo 开发服务器
- **reset-project** - 重置项目到初始状态
- **android** - 在 Android 设备/模拟器上运行应用
- **ios** - 在 iOS 设备/模拟器上运行应用
- **web** - 在 Web 浏览器中运行应用
- **lint** - 运行代码检查工具

## 版本管理说明

项目使用语义化版本控制：
- `^` 表示兼容版本更新（主版本号不变）
- `~` 表示补丁版本更新（主版本号和次版本号不变）
- 精确版本号表示锁定特定版本

这种依赖管理策略确保了项目的稳定性，同时允许安全的更新。