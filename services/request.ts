import axios from 'axios';
import { router } from "expo-router";
import { message } from '../utils/message';
import storage from '../utils/storage';
import { getBaseURL } from './config';

const baseURL = getBaseURL();


// 基础配置
const BASE_URL = baseURL  || 'http://localhost:3000/api';
const TIMEOUT = 10000;

// 创建axios实例
const request = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  async(config: any) => {
    // 添加token
    const token = await storage.getItem('token') || '';
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
    // 检查业务状态码
    const showError = response.config?.showError !== false; // 默认显示错误
    if (response.data.code !== 200 && showError) {
      message.error(response.data.msg || '请求失败');
    }
    return response.data;
  },
  
  async(error: any) => {
    // 统一错误处理
    if (error.response?.status === 401) {
      // token过期，清除本地存储
      await storage.removeItem('token');
      // 可以在这里跳转到登录页
      router.push('/login');
    }
    return Promise.reject(error.response?.data || error.message);
  }
);


export default request


