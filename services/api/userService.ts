import { httpClient } from "@/services/httpClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ENDPOINTS } from "../config";

export const getUserInfo = async () => {
  const uid = await AsyncStorage.getItem("uid")||'1';
  const response = await httpClient.get(API_ENDPOINTS.USER.INFO(uid));
  return response.data;
};
export const updateUserInfo = async (params?: {
  uid?: string;
  userName?: string;
  phone?: string;
  email?: string;
  address?: string;
  lang?: string;
}) => {
  const response = await httpClient.post(API_ENDPOINTS.USER.UPDATE, params);
  return response;
};
