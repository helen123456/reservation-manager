export interface Notification {
  id: string;
  type: "reservation" | "cancellation" | "confirmation" | "system";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  customerName?: string;
  partySize?: number;
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