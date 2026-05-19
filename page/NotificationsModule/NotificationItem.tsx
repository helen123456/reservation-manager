import { useTheme } from "@/contexts/ThemeContext";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createStyles } from "./styles";
import { Notification } from "./types";
import { getNotificationIcon } from "./utils";

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
  onLongPress?: (notification: Notification) => void;
}

export function NotificationItem({
  notification,
  onPress,
  onLongPress,
}: NotificationItemProps) {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const isRead = Number(notification.isRead) === 1;

  return (
    <TouchableOpacity
      style={[styles.notificationCard, !isRead && styles.unreadCard]}
      onPress={() => onPress(notification)}
      onLongPress={onLongPress ? () => onLongPress(notification) : undefined}
      delayLongPress={350}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={styles.iconContainer}>
          {getNotificationIcon(notification.type)}
        </View>

        <View style={styles.notificationBody}>
          <View style={styles.notificationHeader}>
            <Text
              style={[styles.notificationTitle, isRead && styles.readTitle]}
              numberOfLines={1}
            >
              {notification.title}
            </Text>
            {!isRead && <View style={styles.unreadDot} />}
          </View>

          <Text
            style={[styles.notificationMessage, isRead && styles.readMessage]}
            numberOfLines={3}
          >
            {notification.content}
          </Text>

          <View style={styles.notificationFooter}>
            <View style={styles.customerInfo}>
              <Text style={styles.customerText}>{notification.createTime}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
