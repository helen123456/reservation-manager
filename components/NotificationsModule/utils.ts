import { Feather } from "@expo/vector-icons";
import React from "react";
import { Notification, NotificationStats } from "./types";

// 获取通知图标
export const getNotificationIcon = (type: string) => {
  switch (type) {
    case "reservation":
      return React.createElement(Feather, { name: "calendar", size: 20, color: "#000" });
    case "cancellation":
      return React.createElement(Feather, { name: "alert-circle", size: 20, color: "#FF3B30" });
    case "confirmation":
      return React.createElement(Feather, { name: "check-circle", size: 20, color: "#34C759" });
    case "system":
      return React.createElement(Feather, { name: "bell", size: 20, color: "#999" });
    default:
      return React.createElement(Feather, { name: "bell", size: 20, color: "#999" });
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
export const calculateNotificationStats = (notifications: Notification[]): NotificationStats => {
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

// 生成模拟通知数据
export const generateMockNotifications = (): Notification[] => {
  return [
    {
      id: "1",
      type: "reservation",
      title: "新预订",
      content: "John Smith has requested a table for 4 people at 7:00 PM tonight.",
      createTime:'2025-03-01', // 5 minutes ago
      isRead: 0
    },
    {
      id: "2",
      type: "cancellation",
      title: "预订取消",
      content: "Sarah Johnson has cancelled her reservation for 2 people at 6:30 PM.",
      createTime:'2025-03-01', // 2 hours ago
      isRead: 1
    },
    {
      id: "3",
      type: "confirmation",
      title: "预订确认",
      content: "Mike Brown has confirmed his reservation for 6 people at 8:00 PM.",
     createTime:'2025-03-01', // 4 hours ago
      isRead: 1
    },
    {
      id: "4",
      type: "system",
      title: "系统更新",
      content: "New features have been added to improve your reservation management experience.",
      createTime:'2025-03-01', 
      isRead:0
    },
  ];
};