/**
 * API相关的TypeScript类型定义
 */

// HTTP方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 请求配置接口
export interface RequestConfig {
  url: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  retries?: number;
  skipAuth?: boolean;
  skipErrorHandler?: boolean;
}

// 响应接口
export interface ApiResponse<T = any> {
  data: T;
  msg?: string;
  code?: number;
}



// 错误响应接口
export interface ApiError {
  success: false;
  msg: string;
  code?: number;
  details?: any;
  timestamp?: string;
}

// 拦截器接口
export interface RequestInterceptor {
  onRequest?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onRequestError?: (error: any) => Promise<any>;
}

export interface ResponseInterceptor {
  onResponse?: (response: any) => any | Promise<any>;
  onResponseError?: (error: any) => Promise<any>;
}

// 认证相关类型
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

// 用户相关类型
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'manager' | 'staff';
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
}



export interface CreateReservationRequest {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  partySize: number;
  date: string;
  time: string;
  specialRequests?: string;
}

// 餐桌相关类型
export interface Table {
  id: string;
  number: string;
  seats: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  position?: {
    x: number;
    y: number;
  };
  createdAt: string;
  updatedAt: string;
}

// 通知相关类型
export interface Notification {
  id: string;
  title: string;
  msg: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

// 设置相关类型
export interface RestaurantSettings {
  id: string;
  restaurantName: string;
  businessHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  reservationSettings: {
    maxAdvanceBookingDays: number;
    minAdvanceNoticeHours: number;
    maxPartySize: number;
    timeSlotDuration: number;
    autoConfirmReservations: boolean;
  };
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

// 更新预订相关类型以匹配API响应
export interface Reservation {
  id: number;
  restaurantId: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  guests: number;
  reserveTime: string;
  otherRequirements: string;
  status: number;
  createTime: string;
}

// 更新分页响应接口以匹配API结构
export interface ReservationListResponse<T> {
  total: number;
  page: number;
  pageSize: number;
  code: number;
  msg: string;
  data: Reservation[];
}