export type NotificationType =
  | "system"
  | "reservation"
  | "reservation_cancel"
  | "message";

export interface Notification {
  id: string | number;
  type: NotificationType;
  title: string;
  content: string;
  createTime: string;
  isRead: number;
}

export interface NotificationStats {
  totalCount: number;
  unreadCount: number;
  todayCount: number;
}

export interface NotificationsPageProps {
  onBack: () => void;
}

export type NotificationActionType = 'markAsRead' | 'markAllAsRead' | 'clearAll';
