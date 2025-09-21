/**
 * 认证相关API服务
 */

import request from "@/services/request";
import storage from "@/utils/storage";

export async function login(data: { password: string; email: string }) {
  try {
    const response: any = await request.post("/auth/login", data);
    const { token, user, restaurantId } = response.data || {};
    storage.setItem("token", token);
    storage.setItem("user", JSON.stringify(user));
    storage.setItem("uid", user?.id);
    storage.setItem("restaurantId", restaurantId);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout(): Promise<void> {
  try {
    const res: any = await request.post("/auth/logout");
    return res;
  } finally {
    storage.removeItem("token");
    storage.removeItem("user");
    storage.removeItem("uid");
    storage.removeItem("restaurantId");
  }
}
export async function sendResetPwdEmail(data: {
  email: string;
}): Promise<void> {
  try {
    const res: any = await request.post("/user/sendResetPwdEmail", data);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function verifyResetPwdCode(data: {
  email: string;
  code: string;
}): Promise<void> {
  try {
    const res: any = await request.post("/user/verifyResetPwdCode", data);
    return res;
  } catch (error) {
   return Promise.reject(error);
  }
}
export async function resetPwd(data: {
  email: string;
  pwd: string;
}): Promise<void> {
  try {
    const res: any = await request.post("/user/resetPwd", data);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
