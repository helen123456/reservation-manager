/**
 * 认证相关API服务
 */

import request from "@/services/request";
import storage from "@/utils/storage";

export async function login(data: { password: string; email: string }) {
  try {
    const response: any = await request.post("/auth/login", data);
    if (response?.code === 200) {
      const { token, user, restaurantId } = response.data || {};
      storage.setItem("token", token);
      storage.setItem("user", JSON.stringify(user));
      storage.setItem("uid", user?.id);
      storage.setItem("restaurantId", restaurantId);
    }
    return response;
  } catch (error) {
    console.error("获取用户列表失败:", error);
  }
}

export async function logout(): Promise<void> {
  try {
    const res:any = await request.post("/auth/logout");
    return res
  } finally {
    storage.removeItem("token");
    storage.removeItem("user");
    storage.removeItem("uid");
    storage.removeItem("restaurantId");
  }
}
