import request from "@/services/request";
import storage from "@/utils/storage";

export const getMessage = async () => {
  try {
    const uid = (await storage.getItem("uid"));
    const response = await request.get(`/user/messages/unread/${uid}`);
    return response.data||[];
  } catch (error) {
    console.error("获取用户消息失败:", error);
  }
};
export const updateMessage = async (msgId?:any) => {
  try {
    const uid = (await storage.getItem("uid"));
    const response = await request.post('/user/messages/mark-all-read',{uid,msgId});
    return response;
  } catch (error) {
   
    console.error("更新用户消息失败:", error);
     throw error;
  }
};
export const clearMessage = async () => {
  try {
    const uid = (await storage.getItem("uid"));
    const response = await request.post(`/user/messages/clear-all-read/${uid}`);
    return response;
  } catch (error) {
    console.error("更新用户消息失败:", error);
     throw error;
  }
};