/**
 * 网络请求服务入口文件
 * 初始化拦截器和导出所有服务
 */

import httpClient from './httpClient';
import {
  authInterceptor,
  loggingInterceptor,
  responseInterceptor,
} from './interceptors';

// 初始化拦截器
function initializeInterceptors() {
  // 添加请求拦截器
  httpClient.addRequestInterceptor(authInterceptor);
  httpClient.addRequestInterceptor(loggingInterceptor);
  
  // 添加响应拦截器
  httpClient.addResponseInterceptor(responseInterceptor);
}

// 初始化网络服务
export function initializeNetworkServices() {
  initializeInterceptors();
  console.log('网络服务初始化完成');
}

// 导出HTTP客户端
export { default as httpClient } from './httpClient';

// 导出配置
export * from './config';
export * from './types';
export * from './errorHandler';

// 导出API服务
export { AuthService } from './api/authService';
export { ReservationService } from './api/reservationService';

// 在应用启动时调用初始化
initializeNetworkServices();