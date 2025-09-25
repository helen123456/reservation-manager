import { Toast } from "@/components";
import axios from "axios";
import { router } from "expo-router";
import storage from "../utils/storage";
import { getBaseURL } from "./config";

const baseURL = getBaseURL();

// 基础配置
const BASE_URL = baseURL || "http://localhost:3000/api";
const TIMEOUT = 10000;

// 创建axios实例
const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
request.interceptors.request.use(
  async (config: any) => {
    // 添加token
    const token = (await storage.getItem("token")) || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: any) => {
    if (response?.data?.code === 200) {
      return response.data;
    } else {
      // 业务逻辑错误处理
      const errorMessage = response?.data?.msg || "请求失败";
      Toast.fail(errorMessage);
      // 推荐：拒绝一个错误对象，包含更多信息
      return Promise.reject({
        code: response?.data?.code,
        message: errorMessage,
        data: response?.data, // 可选：将整个响应数据传递出去
        response: response // 可选：将整个响应传递出去
      });
    }
  },

  async (error: any) => {
    // 网络请求或服务器响应错误处理
    let errorMessage = "网络请求异常";

    if (error.code === '401' || error.message.indexOf('timeout') !== -1) {
      // 处理超时错误 [2](@ref)
      errorMessage = "请求超时，请重试";
    } else if (error.response) {
      // 服务器返回了错误状态码
      switch (error.response.status) {
        case 400:
          errorMessage = "请求参数错误";
          break;
        case 401:
          errorMessage = "身份验证失败或已过期";
          // 清除本地失效的token
          await storage.removeItem("token");
          // 可以在这里跳转到登录页
          router.push("/login");
          break;
        case 403:
          errorMessage = "没有权限访问此资源";
          break;
        case 404:
          errorMessage = "请求的资源不存在";
          break;
        case 500:
          errorMessage = "服务器内部错误";
          break;
        default:
          errorMessage = `服务器错误: ${error.response.status}`;
      }
      // 可以选择使用服务端返回的错误信息（如果存在且需要）
      // errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      // 请求已发出但没有收到响应
      errorMessage = "网络不可用或服务器无响应";
    }

    Toast.fail(errorMessage); // 统一提示错误信息
    // 拒绝错误，传递处理过的消息或错误对象
    return Promise.reject(error.response?.data || errorMessage);
  }
);

export default request;
