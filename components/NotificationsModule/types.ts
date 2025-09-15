export interface Notification {
  id: string;
  type: "reservation" | "cancellation" | "confirmation" | "system";
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