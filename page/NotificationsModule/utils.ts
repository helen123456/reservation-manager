import { Feather } from "@expo/vector-icons";
import React from "react";
import { Notification, NotificationStats, NotificationType } from "./types";

// 获取通知图标
export const getNotificationIcon = (type: NotificationType | string) => {
  switch (type) {
    case "reservation":
      return React.createElement(Feather, {
        name: "calendar",
        size: 20,
        color: "#000",
      });
    case "reservation_cancel":
      return React.createElement(Feather, {
        name: "alert-triangle",
        size: 20,
        color: "#FF3B30",
      });
    case "message":
      return React.createElement(Feather, {
        name: "message-circle",
        size: 20,
        color: "#007AFF",
      });
    case "system":
      return React.createElement(Feather, {
        name: "bell",
        size: 20,
        color: "#999",
      });
    default:
      return React.createElement(Feather, {
        name: "bell",
        size: 20,
        color: "#999",
      });
  }
};

// 格式化时间显示
export const getTimeAgo = (createTime: Date, t: any) => {
  const now = new Date();
  const diffInMilliseconds = now.getTime() - createTime.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return t("justNow");
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${t("minutesAgo")}`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${t("hoursAgo")}`;
  } else {
    return `${diffInDays} ${t("daysAgo")}`;
  }
};

// 计算通知统计信息
export const calculateNotificationStats = (
  notifications: Notification[],
): NotificationStats => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayCount = notifications.filter((n) => {
    const notificationDate = new Date(n.createTime);
    notificationDate.setHours(0, 0, 0, 0);
    return notificationDate.getTime() === today.getTime();
  }).length;

  return {
    totalCount: notifications.length,
    unreadCount,
    todayCount,
  };
};

/** Group label for a notification's createTime, used for sectioned lists. */
export type TimeGroupKey = "today" | "yesterday" | "earlier";

export const getTimeGroup = (createTime: string): TimeGroupKey => {
  const created = new Date(createTime);
  if (Number.isNaN(created.getTime())) return "earlier";

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  if (created.getTime() >= startOfToday.getTime()) return "today";
  if (created.getTime() >= startOfYesterday.getTime()) return "yesterday";
  return "earlier";
};

// 生成模拟通知数据
export const generateMockNotifications = (): Notification[] => {
  return [
    {
      id: "1",
      type: "reservation",
      title: "新预订",
      content:
        "John Smith has requested a table for 4 people at 7:00 PM tonight.",
      createTime: "2025-03-01", // 5 minutes ago
      isRead: 0,
    },
    {
      id: "2",
      type: "reservation_cancel",
      title: "预订取消",
      content:
        "Sarah Johnson has cancelled her reservation for 2 people at 6:30 PM.",
      createTime: "2025-03-01", // 2 hours ago
      isRead: 1,
    },
    {
      id: "3",
      type: "message",
      title: "待处理消息",
      content: "Mike Brown has sent a new message regarding his reservation.",
      createTime: "2025-03-01", // 4 hours ago
      isRead: 1,
    },
    {
      id: "4",
      type: "system",
      title: "系统更新",
      content:
        "New features have been added to improve your reservation management experience.",
      createTime: "2025-03-01",
      isRead: 0,
    },
  ];
};
