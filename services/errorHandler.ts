/**
 * 统一错误处理机制
 */

import { Alert } from 'react-native';
import { ApiError } from './types';
import { HTTP_STATUS } from './config';

// 错误类型枚举
export enum ErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

// 错误信息映射
const ERROR_MESSAGES = {
  [ErrorType.NETWORK_ERROR]: '网络连接失败，请检查网络设置',
  [ErrorType.TIMEOUT_ERROR]: '请求超时，请稍后重试',
  [ErrorType.VALIDATION_ERROR]: '输入信息有误，请检查后重试',
  [ErrorType.AUTHENTICATION_ERROR]: '登录已过期，请重新登录',
  [ErrorType.AUTHORIZATION_ERROR]: '您没有权限执行此操作',
  [ErrorType.SERVER_ERROR]: '服务器错误，请稍后重试',
  [ErrorType.UNKNOWN_ERROR]: '未知错误，请稍后重试',
};

// 错误处理类
export class ErrorHandler {
  // 根据错误状态码确定错误类型
  static getErrorType(error: any): ErrorType {
    if (error.code === 'NETWORK_ERROR') {
      return ErrorType.NETWORK_ERROR;
    }
    
    if (error.code === 'TIMEOUT') {
      return ErrorType.TIMEOUT_ERROR;
    }
    
    const status = error.response?.status;
    
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return ErrorType.VALIDATION_ERROR;
        
      case HTTP_STATUS.UNAUTHORIZED:
        return ErrorType.AUTHENTICATION_ERROR;
        
      case HTTP_STATUS.FORBIDDEN:
        return ErrorType.AUTHORIZATION_ERROR;
        
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS.BAD_GATEWAY:
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return ErrorType.SERVER_ERROR;
        
      default:
        return ErrorType.UNKNOWN_ERROR;
    }
  }
  
  // 获取用户友好的错误信息
  static getUserFriendlyMessage(error: any): string {
    const errorType = this.getErrorType(error);
    const customMessage = error.response?.data?.message;
    
    // 如果服务器返回了自定义错误信息，优先使用
    if (customMessage && typeof customMessage === 'string') {
      return customMessage;
    }
    
    return ERROR_MESSAGES[errorType];
  }
  
  // 处理API错误
  static handleApiError(error: any, options: {
    showAlert?: boolean;
    customMessage?: string;
    onError?: (error: any) => void;
  } = {}) {
    const {
      showAlert = true,
      customMessage,
      onError,
    } = options;
    
    const errorType = this.getErrorType(error);
    const message = customMessage || this.getUserFriendlyMessage(error);
    
    // 记录错误日志
    this.logError(error, errorType);
    
    // 执行自定义错误处理
    if (onError) {
      onError(error);
    }
    
    // 显示错误提示
    if (showAlert) {
      this.showErrorAlert(message, errorType);
    }
    
    return {
      type: errorType,
      message,
      originalError: error,
    };
  }
  
  // 显示错误弹窗
  static showErrorAlert(message: string, errorType: ErrorType) {
    const title = this.getErrorTitle(errorType);
    
    Alert.alert(
      title,
      message,
      [
        { text: '确定', style: 'default' }
      ],
      { cancelable: true }
    );
  }
  
  // 获取错误标题
  static getErrorTitle(errorType: ErrorType): string {
    switch (errorType) {
      case ErrorType.NETWORK_ERROR:
        return '网络错误';
      case ErrorType.TIMEOUT_ERROR:
        return '请求超时';
      case ErrorType.VALIDATION_ERROR:
        return '输入错误';
      case ErrorType.AUTHENTICATION_ERROR:
        return '认证失败';
      case ErrorType.AUTHORIZATION_ERROR:
        return '权限不足';
      case ErrorType.SERVER_ERROR:
        return '服务器错误';
      default:
        return '错误';
    }
  }
  
  // 记录错误日志
  static logError(error: any, errorType: ErrorType) {
    const logData = {
      type: errorType,
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      timestamp: new Date().toISOString(),
      stack: error.stack,
    };
    
    if (__DEV__) {
      console.error('API错误详情:', logData);
    }
    
    // 在生产环境中，可以将错误发送到日志服务
    // this.sendErrorToLoggingService(logData);
  }
  
  // 发送错误到日志服务（生产环境）
  static async sendErrorToLoggingService(errorData: any) {
    try {
      // 这里可以集成第三方日志服务，如Sentry、Bugsnag等
      // await loggingService.logError(errorData);
      console.log('错误已发送到日志服务:', errorData);
    } catch (loggingError) {
      console.error('发送错误日志失败:', loggingError);
    }
  }
}

// 导出便捷函数
export const handleApiError = ErrorHandler.handleApiError.bind(ErrorHandler);
export const getUserFriendlyMessage = ErrorHandler.getUserFriendlyMessage.bind(ErrorHandler);