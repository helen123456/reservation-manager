import { useTheme } from "@/contexts/ThemeContext";
import {
  clearMessage,
  getMessage,
  updateMessage,
} from "@/services/api/notificationService";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationItem } from "./NotificationItem";
import { createStyles } from "./styles";
import { Notification } from "./types";
import { generateMockNotifications } from "./utils";

export default function NotificationsModule() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [notifications, setNotifications] = useState<Notification[]>(
    generateMockNotifications()
  );
  useEffect(() => {
    getMessage().then((res: any) => {
      setNotifications(res);
    });
  }, []);

  const markAsRead = async (id: string) => {
    const res: any = await updateMessage(id);
    if (res.code === 200) {
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id ? { ...notification, isRead: 1 } : notification
        )
      );
    }
  };

  const markAllAsRead = async () => {
    const res: any = await updateMessage();
    if (res.code === 200) {
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: 1 }))
      );
    }
  };

  const clearAllNotifications = async () => {
    const res: any = await clearMessage();
    if (res.code === 200) {
      setNotifications([]);
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
          {notifications.length === 0 ? (
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
