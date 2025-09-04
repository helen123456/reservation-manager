/**
 * API配置文件
 * 包含基础URL、超时设置、环境配置等
 */

import { Platform } from 'react-native';

// 环境配置
export const ENV = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
} as const;

// 当前环境（可以通过环境变量或构建配置来设置）
export const CURRENT_ENV = __DEV__ ? ENV.DEVELOPMENT : ENV.PRODUCTION;

// API基础配置
export const API_CONFIG = {
  // 基础URL配置
  BASE_URL: {
    [ENV.DEVELOPMENT]: 'https://m1.apifoxmock.com/m1/7045660-6765697-default/api',
    [ENV.STAGING]: 'https://staging-api.yourapp.com/api',
    [ENV.PRODUCTION]: 'https://api.yourapp.com/api',
  },
  
  // 超时设置（毫秒）
  TIMEOUT: 30000,
  
  // 重试配置
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 重试延迟
    BACKOFF_FACTOR: 2, // 退避因子
  },
  
  // 请求头配置
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Platform': Platform.OS,
    'X-App-Version': '1.0.0',
  },
};

// 获取当前环境的基础URL
export const getBaseURL = (): string => {
  return API_CONFIG.BASE_URL[CURRENT_ENV];
};

// 代理配置（开发环境）
export const PROXY_CONFIG = {
  // 开发环境代理设置
  DEVELOPMENT: {
    enabled: true,
    target: 'http://localhost:8080', // 后端服务地址
    changeOrigin: true,
    pathRewrite: {
      '^/api': '', // 重写路径
    },
  },
  
  // 生产环境不使用代理
  PRODUCTION: {
    enabled: false,
  },
};

// API端点配置
export const API_ENDPOINTS = {
  // 认证相关
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  
  // 用户相关
  USER: {
    INFO:(id:string|null) =>`/user/detail/${id}`, //用户详情
    UPDATE:'/user/update', //更新用户
  },
  
  // 预订相关
  RESERVATIONS: {
    LIST: '/reservations/list',//列表
    CONFIRM:'/reservation/update',//确认/取消预订
    SETTINGINFO:(id:number)=>`/reservation/setting/${id}`,
    SETTINGUPDATE:'/reservation/setting/update'
  },
  
  // 餐桌相关
  TABLES: {
    LIST: '/tables',
    CREATE: '/tables',
    UPDATE: (id: string) => `/tables/${id}`,
    DELETE: (id: string) => `/tables/${id}`,
    AVAILABILITY: '/tables/availability',
  },
  
  // 通知相关
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    DELETE: (id: string) => `/notifications/${id}`,
  },
  
  // 设置相关
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings',
    BUSINESS_HOURS: '/settings/business-hours',
  },
};

// 状态码配置
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;