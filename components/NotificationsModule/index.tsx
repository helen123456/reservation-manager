import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { NotificationHeader } from "./NotificationHeader";
import { NotificationItem } from "./NotificationItem";
import { styles } from "./styles";
import { Notification, NotificationsPageProps } from "./types";
import { generateMockNotifications } from "./utils";

export default function NotificationsModule({ onBack }: NotificationsPageProps) {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState<Notification[]>(generateMockNotifications());

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
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
        onBack={onBack}
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