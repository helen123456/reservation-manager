import request from "@/services/request";
import storage from "@/utils/storage";

export const getUserInfo = async () => {
  try {
    const uid = (await storage.getItem("uid")) || "1";
    const response = await request.get(`/user/detail/${uid}`);
    return response.data;
  } catch (error) {
    console.error("获取用户信息失败:", error);
  }
};
export const updateUserInfo = async (params?: {
  uid?: string;
  userName?: string;
  phone?: string;
  email?: string;
  address?: string;
  lang?: string;
}) => {
  try {
    const response = await request.post("/user/update", params);
    return response.data || {};
  } catch (error) {
    console.error("更新用户信息失败:", error);
     throw error;
  }
};
