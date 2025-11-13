import { Toast } from "@/components";
import axios from "axios";
import { router } from "expo-router";
import storage from "../utils/storage";
import { getBaseURL } from "./config";

const baseURL = getBaseURL();

// 基础配置
const BASE_URL = baseURL || "http://localhost:2025/api";
const TIMEOUT = 10000;
const AUTH_STORAGE_KEYS = [
  "token",
  "user",
  "uid",
  "restaurantId",
  "notReadMessageCount",
  "deviceId",
];
let isHandlingUnauthorized = false;

const clearAuthStorage = async () => {
  await Promise.all(
    AUTH_STORAGE_KEYS.map(async (key) => {
      try {
        await storage.removeItem(key);
      } catch {
        // 忽略单个存储清理失败
      }
    })
  );
};

const handleUnauthorized = async () => {
  if (isHandlingUnauthorized) {
    return;
  }

  isHandlingUnauthorized = true;
  Toast.fail("登录状态已失效，请重新登录");

  await clearAuthStorage();
  router.replace("/login");
};

export const resetUnauthorizedState = () => {
  isHandlingUnauthorized = false;
};

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
      Toast.fail(response?.data?.msg || "请求失败");
      return Promise.reject(response.message);
    }
  },

  async (error: any) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      await handleUnauthorized();
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default request;
