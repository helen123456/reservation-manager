import { NavBack } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { createStyles } from "./styles";
import { Notification } from "./types";

interface NotificationHeaderProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onClearAllRead: () => void;
}

export function NotificationHeader({
  notifications,
  unreadCount,
  onMarkAllAsRead,
  onClearAllRead,
}: NotificationHeaderProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const badgeComponent =
    unreadCount > 0 ? (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {unreadCount > 99 ? "99+" : String(unreadCount)}
        </Text>
      </View>
    ) : null;

  const subtitle =
    notifications.length === 0
      ? t("noNotificationsDescription")
      : unreadCount > 0
        ? `${unreadCount} ${t("unread")} · ${notifications.length} ${t("total")}`
        : `${notifications.length} ${t("total")}`;

  return (
    <>
      <NavBack
        title={t("notificationsTitle")}
        subtitle={subtitle}
        rightComponent={badgeComponent}
      />

      {notifications.length > 0 && (
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onMarkAllAsRead}
              accessibilityLabel={t("markAllAsRead")}
            >
              <Feather name="check-circle" size={16} color={theme.primary} />
              <Text style={styles.actionButtonText}>{t("markAllAsRead")}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onClearAllRead}
            accessibilityLabel={t("clearAll")}
          >
            <Feather name="trash-2" size={16} color={theme.primary} />
            <Text style={styles.actionButtonText}>{t("clearAll")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
