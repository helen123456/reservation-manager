/**
 * 认证相关API服务
 */

import { API_ENDPOINTS } from '../config';
import httpClient from '../httpClient';
import { LoginRequest, LoginResponse, User } from '../types';

export class AuthService {
  // 登录
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
      { skipAuth: true }
    );
    
    // 登录成功后设置token
    if (response.data.tokens.accessToken) {
      await httpClient.setAuthToken(response.data.tokens.accessToken);
    }
    
    return response.data;
  }
  
  // 登出
  static async logout(): Promise<void> {
    try {
      await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // 无论请求是否成功，都清除本地token
      await httpClient.clearAuthToken();
    }
  }
  
  // 注册
  static async register(userData: {
    email: string;
    password: string;
    name: string;
    phone?: string;
  }): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData,
      { skipAuth: true }
    );
    
    return response.data;
  }
  
  // 忘记密码
  static async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email },
      { skipAuth: true }
    );
    
    return response.data;
  }
  
  // 重置密码
  static async resetPassword(data: {
    token: string;
    password: string;
  }): Promise<{ message: string }> {
    const response = await httpClient.post<{ message: string }>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data,
      { skipAuth: true }
    );
    
    return response.data;
  }
  
  // 刷新token
  static async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const response = await httpClient.post(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken },
      { skipAuth: true }
    );
    
    return response.data;
  }
}