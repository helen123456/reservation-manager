/**
 * 预订相关API服务
 */

import request from "@/services/request";
import { Reservation } from "../types";

// 获取预订列表
export const getReservations = async (data?: {
  page?: number;
  pageSize?: number;
  status?: string;
  date?: string;
  search?: string;
  queryType?: number
}) => {
  try {
    const response = await request.post("/record/page", {...data,restaurantId});
    return response;
  } catch (error) {
    console.error("获取预订列表失败:", error);
  }
};
// 确认/取消预订
export const updateReservation = async (data?: {
  id?: number;
  status?: number;
}) => {
  try {
    const response = await request.post<Reservation>("/record/update", data);
    return response;
  } catch (error) {
    console.error("更新预订失败:", error);
  }
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
export const getReservationSettingInfo = async (id: number) => {
  try {
    const response = await request.get<ReservationSettingType>(
      `/reservation/setting/${id}`
    );
    return response.data || {};
  } catch (error) {
    console.error("获取预订设置信息失败:", error);
     throw error;
  }
};

// 更新预订设置信息
export const getReservationSettingUpdate = async (data: any) => {
  try {
    const response = await request.post("/reservation/setting/update", data);
    return response;
  } catch (error) {
    console.error("更新预订设置信息失败:", error); throw error;
  }
};
