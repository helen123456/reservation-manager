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

export type NotificationActionType =
  | "markAsRead"
  | "markAllAsRead"
  | "clearAll";

/** Top filter tabs available in the notifications screen. */
export type NotificationFilter = "all" | "unread" | NotificationType;
