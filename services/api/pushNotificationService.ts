import request from "../request";

// 推送令牌注册接口的请求数据类型
export interface PushTokenRegisterRequest {
  userId: string;
  pushToken: string;
  deviceId: string;
  platform: string; // 'ios' | 'android'
}

// 推送令牌注册接口
export const registerPushTokenApi = (data: PushTokenRegisterRequest) => {
  return request.post('/notify/token/register', data);
};
export const sendTest = () => {
  return request.get('/notify/token/send');
};

// 推送令牌更新接口（如果需要）
export const updatePushTokenApi = (data: PushTokenRegisterRequest) => {
  return request.put('/notify/token/register', data);
};

// 推送令牌删除接口（如果需要，比如用户登出时）
export const deletePushTokenApi = (deviceId: string) => {
  return request.delete(`/notify/token/unregister/${deviceId}`);
};
