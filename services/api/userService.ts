import request from "@/services/request";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserInfo = async () => {
  try {
    const uid = (await AsyncStorage.getItem("uid")) || "1";
    const response = await request.get(`/api/user/detail/${uid}`);
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
    const response = await request.post("/api/user/update", params);
    return response;
  } catch (error) {
    console.error("更新用户信息失败:", error);
  }
};
