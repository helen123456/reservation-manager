/**
 * HTTP客户端
 * 基于fetch封装，支持拦截器、重试、超时等功能
 */

import { message } from '@/utils/message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG, getBaseURL } from './config';
import { ApiError, ApiResponse, RequestConfig, RequestInterceptor, ResponseInterceptor } from './types';

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor() {
    this.baseURL = getBaseURL();
    this.defaultHeaders = { ...API_CONFIG.HEADERS };
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // 设置认证token
  async setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    await AsyncStorage.setItem('auth_token', token);
  }

  // 清除认证token
  async clearAuthToken() {
    delete this.defaultHeaders['Authorization'];
    await AsyncStorage.removeItem('auth_token');
  }

  // 获取存储的token
  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem('auth_token');
    } catch (error) {
      console.error('获取存储的token失败:', error);
      return null;
    }
  }

  // 构建完整URL
  private buildURL(url: string, params?: Record<string, any>): string {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    
    if (params) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, String(params[key]));
        }
      });
      const queryString = searchParams.toString();
      return queryString ? `${fullURL}?${queryString}` : fullURL;
    }
    
    return fullURL;
  }

  // 处理请求拦截器
  private async processRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let processedConfig = { ...config };
    
    for (const interceptor of this.requestInterceptors) {
      if (interceptor.onRequest) {
        try {
          processedConfig = await interceptor.onRequest(processedConfig);
        } catch (error) {
          if (interceptor.onRequestError) {
            await interceptor.onRequestError(error);
          }
          throw error;
        }
      }
    }
    
    return processedConfig;
  }

  // 处理响应拦截器
  private async processResponseInterceptors(response: any): Promise<any> {
    let processedResponse = response;
    
    for (const interceptor of this.responseInterceptors) {
      if (interceptor.onResponse) {
        try {
          processedResponse = await interceptor.onResponse(processedResponse);
        } catch (error) {
          if (interceptor.onResponseError) {
            await interceptor.onResponseError(error);
          }
          throw error;
        }
      }
    }
    
    return processedResponse;
  }

  // 延迟函数
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 重试逻辑
  private async retryRequest(config: RequestConfig, attempt: number = 1): Promise<any> {
    try {
      return await this.executeRequest(config);
    } catch (error: any) {
      const maxAttempts = config.retries || API_CONFIG.RETRY.MAX_ATTEMPTS;
      
      if (attempt < maxAttempts && this.shouldRetry(error)) {
        const delay = API_CONFIG.RETRY.DELAY * Math.pow(API_CONFIG.RETRY.BACKOFF_FACTOR, attempt - 1);
        console.log(`请求失败，${delay}ms后进行第${attempt + 1}次重试...`);
        
        await this.delay(delay);
        return this.retryRequest(config, attempt + 1);
      }
      
      throw error;
    }
  }

  // 判断是否应该重试
  private shouldRetry(error: any): boolean {
    // 网络错误或5xx服务器错误才重试
    return (
      !error.response || 
      error.response.status >= 500 ||
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT'
    );
  }

  // 执行实际请求
  private async executeRequest(config: RequestConfig): Promise<any> {
    const { url, method = 'GET', headers = {}, data, timeout = API_CONFIG.TIMEOUT } = config;
    
    const requestHeaders = {
      ...this.defaultHeaders,
      ...headers,
    };

    // 如果不跳过认证，尝试添加token
    if (!config.skipAuth && !requestHeaders['Authorization']) {
      const token = await this.getStoredToken();
      if (token) {
        requestHeaders['Authorization'] = `Bearer ${token}`;
      }
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // 添加请求体
    if (data && method !== 'GET') {
      if (data instanceof FormData) {
        requestOptions.body = data;
        // FormData会自动设置Content-Type，删除手动设置的
        delete requestHeaders['Content-Type'];
      } else {
        requestOptions.body = JSON.stringify(data);
      }
    }

    // 创建AbortController用于超时控制
    const controller = new AbortController();
    requestOptions.signal = controller.signal;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const response = await fetch(url, requestOptions);
      clearTimeout(timeoutId);
     

      // 处理响应
      const responseData = await this.handleResponse(response);
      return await this.processResponseInterceptors(responseData);
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        const timeoutError = new Error('请求超时');
        (timeoutError as any).code = 'TIMEOUT';
        throw timeoutError;
      }
      
      // 网络错误
      if (!error.response) {
        const networkError = new Error('网络连接失败');
        (networkError as any).code = 'NETWORK_ERROR';
        throw networkError;
      }
      throw error; 
    }
  }

  // 处理响应
  private async handleResponse(response: Response): Promise<any> {
    const contentType = response.headers.get('content-type');
    let responseData: any;

    try {
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
    } catch (error) {
      responseData = null;
    }

    if (!response.ok) {
      const error: ApiError = {
        success: false,
        msg: responseData?.msg || `HTTP ${response.status}: ${response.statusText}`,
        code: response.status,
        details: responseData,
      };
      
      const apiError = new Error(error.msg);
      (apiError as any).response = {
        status: response.status,
        data: responseData,
      };
      
      throw apiError;
    }

    return responseData;
  }

  // 主要请求方法
  async request<T = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    try {
      // 处理请求拦截器
      const processedConfig = await this.processRequestInterceptors(config);
      
      // 构建URL
      const url = this.buildURL(processedConfig.url, processedConfig.params);
      const finalConfig = { ...processedConfig, url };
      
      // 执行请求（包含重试逻辑）
      const response = await this.retryRequest(finalConfig);
      return response;
    } catch (error: any) {
      // 处理响应拦截器中的错误
      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onResponseError) {
          try {
            
            return await interceptor.onResponseError(error);
          } catch (interceptorError:any) {
            
            // 如果拦截器也抛出错误，继续抛出原错误
            message.error(interceptorError.message || '响应拦截器错误');
            continue;
          }
        }
      }
      
      throw error;
    }
  }

  // 便捷方法
  async get<T = any>(url: string, params?: Record<string, any>, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...config,
    });
  }

  async post<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'POST',
      data,
      ...config,
    });
  }

  async put<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PUT',
      data,
      ...config,
    });
  }

  async patch<T = any>(url: string, data?: any, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'PATCH',
      data,
      ...config,
    });
  }

  async delete<T = any>(url: string, config?: Partial<RequestConfig>): Promise<ApiResponse<T>> {
    return this.request<T>({
      url,
      method: 'DELETE',
      ...config,
    });
  }
}

// 创建默认实例
export const httpClient = new HttpClient();
export default httpClient;