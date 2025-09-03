/**
 * 请求和响应拦截器配置
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import { HTTP_STATUS } from "./config";
import {
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
} from "./types";

// 认证拦截器
export const authInterceptor: RequestInterceptor = {
  onRequest: async (config: RequestConfig) => {
    // 如果请求不需要认证，直接返回
    if (config.skipAuth) {
      return config;
    }

    // 尝试获取token
    try {
      const token = await AsyncStorage.getItem("auth_token");
      if (token && !config.headers?.["Authorization"]) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    } catch (error) {
      console.error("获取认证token失败:", error);
    }

    return config;
  },

  onRequestError: async (error: any) => {
    console.error("请求拦截器错误:", error);
    return Promise.reject(error);
  },
};

// 日志拦截器
export const loggingInterceptor: RequestInterceptor = {
  onRequest: async (config: RequestConfig) => {
    if (__DEV__) {
      console.log("🚀 API请求:", {
        method: config.method || "GET",
        url: config.url,
        params: config.params,
        data: config.data,
        headers: config.headers,
      });
    }
    return config;
  },
};

// 响应处理拦截器
export const responseInterceptor: ResponseInterceptor = {
  onResponse: async (response: any) => {
    if (__DEV__) {
      console.log("✅ API响应:", response);
    }

    // 检查业务状态码，如果是401则抛出错误让onResponseError统一处理
    if (response.code === HTTP_STATUS.UNAUTHORIZED) {
      const error = new Error("登录已过期");
      (error as any).response = {
        status: HTTP_STATUS.UNAUTHORIZED,
        data: { message: "登录已过期，请重新登录" },
      };
      await AsyncStorage.removeItem("auth_token");
      await AsyncStorage.removeItem("isAuthenticated");
      router.replace("/login");
      throw error;
    }

    return response;
  },

  onResponseError: async (error: any) => {
    if (__DEV__) {
      console.error("❌ API错误:", error);
    }

    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    const originalRequest = error.config;

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // 401: 未授权，尝试token刷新或清除认证信息
        if (!originalRequest?._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await AsyncStorage.getItem("refresh_token");
            if (refreshToken) {
              // TODO: 实现token刷新逻辑
              console.log("Token刷新功能待实现");
              // 刷新成功后应该重新发送原始请求
              // 这里暂时直接跳转到登录页
            }
          } catch (refreshError) {
            console.error("Token刷新失败:", refreshError);
          }
        }

        // 清除认证信息并跳转到登录页
        await AsyncStorage.multiRemove([
          "auth_token",
          "refresh_token",
          "isAuthenticated",
        ]);

        Alert.alert("登录已过期", "请重新登录", [
          {
            text: "确定",
            onPress: () => {
              router.replace("/login");
            },
          },
        ]);
        break;

      case HTTP_STATUS.FORBIDDEN:
        // 403: 禁止访问
        Alert.alert("访问被拒绝", "您没有权限执行此操作");
        break;

      case HTTP_STATUS.NOT_FOUND:
        // 404: 资源不存在
        console.warn("请求的资源不存在:", error.config?.url);
        break;

      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        // 422: 验证错误
        const validationErrors = error.response?.data?.details;
        if (validationErrors) {
          console.warn("验证错误:", validationErrors);
        }
        break;

      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS.BAD_GATEWAY:
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        // 5xx: 服务器错误
        Alert.alert("服务器错误", "服务暂时不可用，请稍后重试", [
          { text: "确定" },
        ]);
        break;

      default:
        // 其他错误
        if (!error.config?.skipErrorHandler) {
          Alert.alert("请求失败", message || "网络请求失败，请检查网络连接", [
            { text: "确定" },
          ]);
        }
        break;
    }

    return Promise.reject(error);
  },
};

// tokenRefreshInterceptor 已整合到 responseInterceptor 中，避免重复处理
