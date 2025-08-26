import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { styles } from "./styles";
import { Notification } from "./types";
import { getNotificationIcon, getTimeAgo } from "./utils";

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export function NotificationItem({ notification, onPress }: NotificationItemProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !notification.isRead && styles.unreadCard,
      ]}
      onPress={() => onPress(notification)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.iconContainer}>
          {getNotificationIcon(notification.type)}
        </View>

        <View style={styles.notificationBody}>
          <View style={styles.notificationHeader}>
            <Text
              style={[
                styles.notificationTitle,
                notification.isRead && styles.readTitle,
              ]}
            >
              {notification.title}
            </Text>
            {!notification.isRead && (
              <View style={styles.unreadDot} />
            )}
          </View>

          <Text style={styles.notificationMessage}>
            {notification.message}
          </Text>

          <View style={styles.notificationFooter}>
            <Text style={styles.timestamp}>
              {getTimeAgo(notification.timestamp, t)}
            </Text>

            {notification.customerName && notification.partySize && (
              <View style={styles.customerInfo}>
                <Text style={styles.customerText}>
                  {notification.customerName}
                </Text>
                <Text style={styles.customerText}>•</Text>
                <Text style={styles.customerText}>
                  {notification.partySize} {t("guests")}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}