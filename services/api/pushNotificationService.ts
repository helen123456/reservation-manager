import request from "../request";

/**
 * Push token registration request.
 *
 * `userId` is intentionally NOT included: the backend resolves the current
 * user from the Sa-Token session. Sending a client-supplied `userId` would
 * allow a logged-in attacker to bind tokens to other users (BOLA).
 */
export interface PushTokenRegisterRequest {
  pushToken: string;
  deviceId: string;
  platform: string; // 'ios' | 'android' | 'web'
}

export const registerPushTokenApi = (data: PushTokenRegisterRequest) => {
  return request.post("/notify/token/register", data);
};

export interface PushTokenUnregisterRequest {
  pushToken: string;
}

export const unregisterPushTokenApi = (data: PushTokenUnregisterRequest) => {
  return request.post("/notify/token/unregister", data);
};
