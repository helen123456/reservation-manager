import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { NavBack } from "../NavBack";
import { createStyles } from "./styles";
import { Notification } from "./types";

interface NotificationHeaderProps {
  notifications: Notification[];
  unreadCount: number;
  onBack: () => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
}

export function NotificationHeader({
  notifications,
  unreadCount,
  onBack,
  onMarkAllAsRead,
  onClearAll,
}: NotificationHeaderProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme()??'light';
  const colors = Colors[colorScheme];
  // 使用 useMemo 缓存样式以提高性能
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  const badgeComponent = unreadCount > 0 ? (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{unreadCount}</Text>
    </View>
  ) : null;

  return (
    <>
      <NavBack
        title={t("notificationsTitle")}
        subtitle={notifications.length > 0
          ? `${notifications.length} notifications`
          : t("noNotificationsDescription")}
        onBack={onBack}
        rightComponent={badgeComponent}
      />
      
      {notifications.length > 0 && (
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onMarkAllAsRead}
            >
              <Feather name="check-circle" size={16} color={colors.primary} />
              <Text style={styles.actionButtonText}>
                {t("markAllAsRead")}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onClearAll}
          >
            <Feather name="trash-2" size={16} color={colors.primary}/>
            <Text style={styles.actionButtonText}>{t("clearAll")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}