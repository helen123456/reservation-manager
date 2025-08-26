import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { styles } from "./styles";
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

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={20} color="#666" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{t("notificationsTitle")}</Text>
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.subtitle}>
              {notifications.length > 0
                ? `${notifications.length} notifications`
                : t("noNotificationsDescription")}
            </Text>
          </View>
        </View>
      </View>
      
      {notifications.length > 0 && (
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onMarkAllAsRead}
            >
              <Feather name="check-circle" size={16} color="#000" />
              <Text style={styles.actionButtonText}>
                {t("markAllAsRead")}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={onClearAll}
          >
            <Feather name="trash-2" size={16} color="#000" />
            <Text style={styles.actionButtonText}>{t("clearAll")}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}