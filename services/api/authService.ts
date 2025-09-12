/**
 * 认证相关API服务
 */

import request from "@/services/request";
import storage from "@/utils/storage";

export async function login(data: { password: string; email: string }) {
  try {
    const response: any = await request.post("/auth/login", data);
    if (response?.code === 200) {
      const { token, user, ruid, rest } = response.data || {};
      storage.setItem("token", token);
      storage.setItem("user", user);
      storage.setItem("ruid", ruid);
      storage.setItem("rest", rest);
    }
    return response.data;
  } catch (error) {
    console.error("获取用户列表失败:", error);
  }
}

export async function logout(): Promise<void> {
  try {
    await request.post("/auth/logout");
  } finally {
    storage.removeItem("token");
    storage.removeItem("user");
    storage.removeItem("ruid");
    storage.removeItem("rest");
  }
}
