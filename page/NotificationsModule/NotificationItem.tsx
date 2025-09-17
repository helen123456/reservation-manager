import { useTheme } from "@/hooks/ThemeContext";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { createStyles } from "./styles";
import { Notification } from "./types";
import { getNotificationIcon } from "./utils";

interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
}

export function NotificationItem({
  notification,
  onPress,
}: NotificationItemProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
                notification.isRead===1 && styles.readTitle,
              ]}
            >
              {notification.title}
            </Text>
            {!notification.isRead && <View style={styles.unreadDot} />}
          </View>

          <Text style={styles.notificationMessage}>{notification.content}</Text>

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
