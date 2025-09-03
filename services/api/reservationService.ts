/**
 * 预订相关API服务
 */

import { API_ENDPOINTS } from '../config';
import httpClient from '../httpClient';
import { CreateReservationRequest, Reservation } from '../types';

export class ReservationService {
  // 获取预订列表
  static async getReservations(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    date?: string;
    search?: string;
  }) {
    const response = await httpClient.post(
      API_ENDPOINTS.RESERVATIONS.LIST,
      params
    );
    return response;
  }
  
  // 创建预订
  static async createReservation(data: CreateReservationRequest): Promise<Reservation> {
    const response = await httpClient.post<Reservation>(
      API_ENDPOINTS.RESERVATIONS.CREATE,
      data
    );
    
    return response.data;
  }
  
  // 更新预订
  static async updateReservation(id: string, data: Partial<CreateReservationRequest>): Promise<Reservation> {
    const response = await httpClient.put<Reservation>(
      API_ENDPOINTS.RESERVATIONS.UPDATE(id),
      data
    );
    
    return response.data;
  }
  
  // 删除预订
  static async deleteReservation(id: string): Promise<void> {
    await httpClient.delete(API_ENDPOINTS.RESERVATIONS.DELETE(id));
  }
  
  // 确认预订
  static async confirmReservation(id: string): Promise<Reservation> {
    const response = await httpClient.post<Reservation>(
      API_ENDPOINTS.RESERVATIONS.CONFIRM(id)
    );
    
    return response.data;
  }
  
  // 取消预订
  static async cancelReservation(id: string, reason?: string): Promise<Reservation> {
    const response = await httpClient.post<Reservation>(
      API_ENDPOINTS.RESERVATIONS.CANCEL(id),
      { reason }
    );
    
    return response.data;
  }
}