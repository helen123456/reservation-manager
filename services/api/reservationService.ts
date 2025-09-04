/**
 * 预订相关API服务
 */

import { API_ENDPOINTS } from "../config";
import httpClient from "../httpClient";
import { Reservation } from "../types";

// 获取预订列表
export const getReservations = async (params?: {
  page?: number;
  pageSize?: number;
  status?: string;
  date?: string;
  search?: string;
}) => {
  const response = await httpClient.post(
    API_ENDPOINTS.RESERVATIONS.LIST,
    params
  );
  return response;
};
// 确认/取消预订
export const updateReservation = async (params?: {
  id?: number;
  status?: number;
}): Promise<Reservation> => {
  const response = await httpClient.post<Reservation>(
    API_ENDPOINTS.RESERVATIONS.CONFIRM,
    params
  );

  return response.data;
};
// 获取预订设置信息
export const getReservationSettingInfo = async (
  id: number
): Promise<Reservation> => {
  const response = await httpClient.get<Reservation>(API_ENDPOINTS.RESERVATIONS.SETTINGINFO(id));
  return response.data;
};

// 预订设置更新参数接口
interface ReservationSettingUpdateParams {
  startTime?: string;
  endTime: string;
  isReserve: number;
  restaurantId: number;
  interval: number;
  maxCapacity: number;
  avilableTime: string[];
  minGuest: number;
  maxGuesst: number;
}

// 更新预订设置信息
export const getReservationSettingUpdate = async (
  params: ReservationSettingUpdateParams
): Promise<Reservation> => {
  const response = await httpClient.post<Reservation>(API_ENDPOINTS.RESERVATIONS.SETTINGUPDATE, params);
  return response.data;
};  


