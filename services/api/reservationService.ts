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


export interface BusinessHours {
  start: string;
  end: string;
}

export interface ReservationSettingType {
  acceptReservations: boolean;
  maxGuests: number;
  minGuests: number;
  businessHours: BusinessHours;
  timeInterval: number; // minutes: 60 = 1h, 30 = 30min, 15 = 15min
  maxReservationsPerSlot: number; // maximum reservations allowed per time slot
  timeSlots: string[];
  advanceBookingDays: number;
  minAdvanceHours: number;
  restaurantId: number;
}

// 获取预订设置信息
export const getReservationSettingInfo = async (
  id: number
): Promise<ReservationSettingType> => {
  const response = await httpClient.get<ReservationSettingType>(API_ENDPOINTS.RESERVATIONS.SETTINGINFO(id));
  return response.data;
};

// 更新预订设置信息
export const getReservationSettingUpdate = async (
  params:any
) => {
  const response = await httpClient.post(API_ENDPOINTS.RESERVATIONS.SETTINGUPDATE, params);
  return response;
};


