import { NavBack } from "@/components";
import { useTheme } from '@/hooks/ThemeContext';
import { Feather } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
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
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

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
              <Feather name="check-circle" size={16} color={theme.primary} />
              <Text style={styles.actionButtonText}>
                {t("markAllAsRead")}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onClearAll}
          >
            <Feather name="trash-2" size={16} color={theme.primary}/>
            <Text style={styles.actionButtonText}>{t("clearAll")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}