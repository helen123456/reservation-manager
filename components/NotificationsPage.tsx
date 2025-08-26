import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTranslation } from "../hooks/useTranslation";

interface NotificationsPageProps {
  onBack: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 16,
    marginRight:16
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    marginTop: -4,
  },
  titleContainer: {
    flex: 1,
    flexDirection:"row",
    justifyContent:'space-between'
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  title: {
    fontSize: 16,
    color: "#1a1a1a",
    marginRight: 8,
  },
  badge: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
    justifyContent:'flex-end',
     marginBottom: 16,
     marginRight:16
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    backgroundColor: "white",
  },
  actionButtonText: {
    color: "#007AFF",
    fontSize: 14,
    marginLeft: 4,
  },
  emptyState: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  notificationsList: {
    gap: 12,
  },
  notificationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  unreadCard: {
    borderColor: "#007AFF20",
    backgroundColor: "#007AFF05",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationBody: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
    flex: 1,
  },
  readTitle: {
    color: "#666",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
  },
  customerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  customerText: {
    fontSize: 12,
    color: "#999",
  },
  separator: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
});

interface Notification {
  id: string;
  type: "reservation" | "cancellation" | "confirmation" | "system";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  customerName?: string;
  partySize?: number;
}

export default function NotificationsPage({ onBack }: NotificationsPageProps) {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "reservation",
      title: t("newReservation"),
      message:
        "John Smith has requested a table for 4 people at 7:00 PM tonight.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isRead: false,
      customerName: "John Smith",
      partySize: 4,
    },
    {
      id: "2",
      type: "cancellation",
      title: t("reservationCancelled"),
      message:
        "Sarah Johnson has cancelled her reservation for 2 people at 6:30 PM.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      customerName: "Sarah Johnson",
      partySize: 2,
    },
    {
      id: "3",
      type: "confirmation",
      title: t("reservationConfirmed"),
      message:
        "Mike Brown has confirmed his reservation for 6 people at 8:00 PM.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: true,
      customerName: "Mike Brown",
      partySize: 6,
    },
    {
      id: "4",
      type: "system",
      title: t("systemUpdate"),
      message:
        "New features have been added to improve your reservation management experience.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
    },{
      id: "4",
      type: "system",
      title: t("systemUpdate"),
      message:
        "New features have been added to improve your reservation management experience.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
    },{
      id: "4",
      type: "system",
      title: t("systemUpdate"),
      message:
        "New features have been added to improve your reservation management experience.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
    },{
      id: "4",
      type: "system",
      title: t("systemUpdate"),
      message:
        "New features have been added to improve your reservation management experience.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reservation":
        return <Feather name="calendar" size={20} color="#007AFF" />;
      case "cancellation":
        return <Feather name="alert-circle" size={20} color="#FF3B30" />;
      case "confirmation":
        return <Feather name="check-circle" size={20} color="#34C759" />;
      case "system":
        return <Feather name="bell" size={20} color="#999" />;
      default:
        return <Feather name="bell" size={20} color="#999" />;
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - timestamp.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return t("justNow");
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${t("minutesAgo")}`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${t("hoursAgo")}`;
    } else {
      return `${diffInDays} ${t("daysAgo")}`;
    }
  };

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

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <View style={styles.container}>
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
                onPress={markAllAsRead}
              >
                <Feather name="check-circle" size={16} color="#007AFF" />
                <Text style={styles.actionButtonText}>
                  {t("markAllAsRead")}
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.actionButton}
              onPress={clearAllNotifications}
            >
              <Feather name="trash-2" size={16} color="#007AFF" />
              <Text style={styles.actionButtonText}>{t("clearAll")}</Text>
            </TouchableOpacity>
          </View>
        )}
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}

          {/* Notifications List */}
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
                  <TouchableOpacity
                    style={[
                      styles.notificationCard,
                      !notification.isRead && styles.unreadCard,
                    ]}
                    onPress={() => markAsRead(notification.id)}
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
                            {getTimeAgo(notification.timestamp)}
                          </Text>

                          {notification.customerName &&
                            notification.partySize && (
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
