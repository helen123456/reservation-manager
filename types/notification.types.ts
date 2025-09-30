// 推送通知类型定义

export interface NotificationData {
  type: NotificationType;
  title?: string;
  body?: string;
  icon?: string;
  badge?: string;
  [key: string]: any;
}

export type NotificationType = 
  | 'reservation' 
  | 'message' 
  | 'system' 
  | 'promotion' 
  | 'reminder';

export interface ReservationNotificationData extends NotificationData {
  type: 'reservation';
  reservationId?: string;
  reservationData?: any;
  action?: 'new' | 'confirmed' | 'cancelled' | 'updated';
}

export interface MessageNotificationData extends NotificationData {
  type: 'message';
  messageId?: string;
  conversationId?: string;
}

export interface SystemNotificationData extends NotificationData {
  type: 'system';
  level?: 'info' | 'warning' | 'error';
  actionUrl?: string;
}

export interface PromotionNotificationData extends NotificationData {
  type: 'promotion';
  promotionId?: string;
  validUntil?: string;
}

export interface ReminderNotificationData extends NotificationData {
  type: 'reminder';
  reminderId?: string;
  scheduleTime?: string;
}

// 通知处理结果
export interface NotificationHandleResult {
  success: boolean;
  error?: string;
  navigated?: boolean;
  targetUrl?: string;
}
