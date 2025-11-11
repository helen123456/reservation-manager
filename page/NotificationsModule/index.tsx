import { useTheme } from "@/contexts/ThemeContext";
import {
  clearMessage,
  getMessage,
  updateMessage,
} from "@/services/api/notificationService";
import storage from "@/utils/storage";
import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationItem } from "./NotificationItem";
import { createStyles } from "./styles";
import { Notification, NotificationType } from "./types";

const ALLOWED_NOTIFICATION_TYPES: NotificationType[] = [
  "system",
  "reservation",
  "reservation_cancel",
  "message",
];

const TYPE_CODE_MAP: Record<number, NotificationType> = {
  0: "system",
  1: "reservation",
  2: "reservation_cancel",
  3: "message",
};

const STRING_TYPE_MAP: Record<string, NotificationType> = {
  system: "system",
  reservation: "reservation",
  confirmation: "reservation",
  reservation_confirm: "reservation",
  message: "message",
  reservation_cancel: "reservation_cancel",
  reservation_cancelled: "reservation_cancel",
  cancellation: "reservation_cancel",
};

const mapRawTypeToNotificationType = (rawType: unknown): NotificationType => {
  if (typeof rawType === "number") {
    return TYPE_CODE_MAP[rawType] ?? "system";
  }

  if (typeof rawType === "string") {
    const normalized = rawType.trim().toLowerCase();
    return STRING_TYPE_MAP[normalized] ?? "system";
  }

  return "system";
};

export default function NotificationsModule() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateUnreadStorage = useCallback((list: Notification[]) => {
    const unread = list.filter((n) => !n.isRead).length;
    storage.setItem("notReadMessageCount", String(unread));
  }, []);

  const normalizeNotification = useCallback((item: any): Notification => {
    const type = mapRawTypeToNotificationType(item?.type);
    const safeType = ALLOWED_NOTIFICATION_TYPES.includes(type)
      ? type
      : "system";

    return {
      id: item?.id ?? item?.msgId ?? `${Date.now()}-${Math.random()}`,
      type: safeType,
      title: item?.title ?? "",
      content: item?.content ?? "",
      createTime: item?.createTime ?? "",
      isRead: Number(item?.isRead ?? 0),
    };
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      const res: any = await getMessage();
      if (res?.code === 200) {
        const normalized = (res.data || []).map((item: any) => normalizeNotification(item));
        setNotifications(normalized);
        updateUnreadStorage(normalized);
      } else if (Array.isArray(res)) {
        const normalized = res.map((item: any) => normalizeNotification(item));
        setNotifications(normalized);
        updateUnreadStorage(normalized);
      } else {
        setNotifications([]);
        updateUnreadStorage([]);
      }
    } catch (error) {
      setNotifications([]);
      updateUnreadStorage([]);
    } finally {
      setIsLoading(false);
    }
  }, [normalizeNotification, updateUnreadStorage]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string | number) => {
    const res: any = await updateMessage(id);
    if (res.code === 200) {
      setNotifications((prev) => {
        const next = prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: 1 } : notification
        );
        updateUnreadStorage(next);
        return next;
      });
    }
  };

  const markAllAsRead = async () => {
    const res: any = await updateMessage();
    if (res.code === 200) {
      setNotifications((prev) => {
        const next = prev.map((notification) => ({ ...notification, isRead: 1 }));
        updateUnreadStorage(next);
        return next;
      });
    }
  };

  const clearAllNotifications = async () => {
    const res: any = await clearMessage();
    if (res.code === 200) {
      setNotifications((prev) => {
        const next = prev.filter((notification) => !notification.isRead);
        updateUnreadStorage(next);
        return next;
      });
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    markAsRead(notification.id);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
      <NotificationHeader
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllAsRead={markAllAsRead}
        onClearAll={clearAllNotifications}
      />

      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {isLoading ? (
            <View style={styles.loadingState}>
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          ) : notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Feather
                name="bell"
                size={48}
                color="#999"
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyTitle}>{t("noNotifications")}</Text>
              <Text style={styles.emptyDescription}>
                {t("noNotificationsDescription")}
              </Text>
            </View>
          ) : (
            <View style={styles.notificationsList}>
              {notifications.map((notification, index) => (
                <View key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onPress={handleNotificationPress}
                  />
                  {index < notifications.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
