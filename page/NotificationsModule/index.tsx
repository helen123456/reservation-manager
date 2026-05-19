import { Modal } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import {
    clearMessage,
    deleteMessageById,
    fetchUnreadCount,
    getMessage,
    updateMessage,
} from "@/services/api/notificationService";
import { setUnreadCount } from "@/utils/unreadCountStore";
import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    Text,
    View,
} from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { NotificationFilters } from "./NotificationFilters";
import { NotificationHeader } from "./NotificationHeader";
import { SwipeableNotificationItem } from "./SwipeableNotificationItem";
import { createStyles } from "./styles";
import { Notification, NotificationFilter, NotificationType } from "./types";
import { getTimeGroup, TimeGroupKey } from "./utils";

const ALLOWED_NOTIFICATION_TYPES: NotificationType[] = [
  "system",
  "reservation",
  "reservation_cancel",
  "message",
];

const TYPE_CODE_MAP: Record<number, NotificationType> = {
  0: "system",
  1: "reservation",
  2: "reservation_cancel",
  3: "message",
};

const STRING_TYPE_MAP: Record<string, NotificationType> = {
  system: "system",
  reservation: "reservation",
  confirmation: "reservation",
  reservation_confirm: "reservation",
  message: "message",
  reservation_cancel: "reservation_cancel",
  reservation_cancelled: "reservation_cancel",
  cancellation: "reservation_cancel",
};

const mapRawTypeToNotificationType = (rawType: unknown): NotificationType => {
  if (typeof rawType === "number") {
    return TYPE_CODE_MAP[rawType] ?? "system";
  }
  if (typeof rawType === "string") {
    const normalized = rawType.trim().toLowerCase();
    return STRING_TYPE_MAP[normalized] ?? "system";
  }
  return "system";
};

/** Sectioned list item: either a sticky-style group header or a notification. */
type ListRow =
  | { kind: "header"; key: string; group: TimeGroupKey }
  | { kind: "item"; key: string; notification: Notification };

interface ConfirmDialogState {
  visible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
}

export default function NotificationsModule() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [confirm, setConfirm] = useState<ConfirmDialogState>({
    visible: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const syncUnreadCount = useCallback((list: Notification[]) => {
    const unread = list.filter((n) => Number(n.isRead) !== 1).length;
    setUnreadCount(unread);
  }, []);

  const normalizeNotification = useCallback((item: any): Notification => {
    const type = mapRawTypeToNotificationType(item?.type);
    const safeType = ALLOWED_NOTIFICATION_TYPES.includes(type)
      ? type
      : "system";

    return {
      id: item?.id ?? item?.msgId ?? `${Date.now()}-${Math.random()}`,
      type: safeType,
      title: item?.title ?? "",
      content: item?.content ?? "",
      createTime: item?.createTime ?? "",
      isRead: Number(item?.isRead ?? 0),
    };
  }, []);

  const loadNotifications = useCallback(
    async (mode: "initial" | "refresh" = "initial") => {
      if (mode === "initial") setIsLoading(true);
      else setIsRefreshing(true);
      try {
        const res: any = await getMessage();
        const raw = Array.isArray(res) ? res : (res?.data ?? []);
        const normalized = (raw || []).map((it: any) =>
          normalizeNotification(it),
        );
        setNotifications(normalized);
        syncUnreadCount(normalized);
      } catch {
        setNotifications([]);
        syncUnreadCount([]);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [normalizeNotification, syncUnreadCount],
  );

  useEffect(() => {
    loadNotifications("initial");
  }, [loadNotifications]);

  // ---------------- Actions ----------------

  const markAsRead = useCallback(
    async (id: string | number) => {
      // Optimistic update for snappy UX.
      setNotifications((prev) => {
        const next = prev.map((n) => (n.id === id ? { ...n, isRead: 1 } : n));
        syncUnreadCount(next);
        return next;
      });
      try {
        await updateMessage(id);
      } catch {
        // On failure, refetch to restore truth.
        await loadNotifications("refresh");
      }
    },
    [loadNotifications, syncUnreadCount],
  );

  const markAllAsRead = useCallback(async () => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, isRead: 1 }));
      syncUnreadCount(next);
      return next;
    });
    try {
      await updateMessage();
      await fetchUnreadCount();
    } catch {
      await loadNotifications("refresh");
    }
  }, [loadNotifications, syncUnreadCount]);

  const clearAllRead = useCallback(async () => {
    setNotifications((prev) => {
      const next = prev.filter((n) => Number(n.isRead) !== 1);
      syncUnreadCount(next);
      return next;
    });
    try {
      await clearMessage();
    } catch {
      await loadNotifications("refresh");
    }
  }, [loadNotifications, syncUnreadCount]);

  const deleteOne = useCallback(
    async (id: string | number) => {
      setNotifications((prev) => {
        const next = prev.filter((n) => n.id !== id);
        syncUnreadCount(next);
        return next;
      });
      try {
        await deleteMessageById(id);
      } catch {
        await loadNotifications("refresh");
      }
    },
    [loadNotifications, syncUnreadCount],
  );

  // ---------------- Confirm helpers ----------------

  const closeConfirm = useCallback(
    () => setConfirm((c) => ({ ...c, visible: false })),
    [],
  );

  const requestMarkAllAsRead = useCallback(() => {
    setConfirm({
      visible: true,
      title: t("markAllAsRead"),
      message: t("confirmMarkAllAsRead"),
      onConfirm: () => {
        closeConfirm();
        void markAllAsRead();
      },
    });
  }, [closeConfirm, markAllAsRead, t]);

  const requestClearAllRead = useCallback(() => {
    setConfirm({
      visible: true,
      title: t("clearAll"),
      message: t("confirmClearAllRead"),
      onConfirm: () => {
        closeConfirm();
        void clearAllRead();
      },
    });
  }, [clearAllRead, closeConfirm, t]);

  const requestDeleteOne = useCallback(
    (n: Notification) => {
      setConfirm({
        visible: true,
        title: t("deleteNotification"),
        message: t("confirmDeleteNotification"),
        onConfirm: () => {
          closeConfirm();
          void deleteOne(n.id);
        },
      });
    },
    [closeConfirm, deleteOne, t],
  );

  // ---------------- Derived data ----------------

  const filteredNotifications = useMemo(() => {
    switch (filter) {
      case "all":
        return notifications;
      case "unread":
        return notifications.filter((n) => Number(n.isRead) !== 1);
      default:
        return notifications.filter((n) => n.type === filter);
    }
  }, [filter, notifications]);

  const rows = useMemo<ListRow[]>(() => {
    const result: ListRow[] = [];
    let lastGroup: TimeGroupKey | null = null;
    for (const n of filteredNotifications) {
      const group = getTimeGroup(n.createTime);
      if (group !== lastGroup) {
        result.push({ kind: "header", key: `header-${group}`, group });
        lastGroup = group;
      }
      result.push({ kind: "item", key: `item-${n.id}`, notification: n });
    }
    return result;
  }, [filteredNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => Number(n.isRead) !== 1).length,
    [notifications],
  );

  // ---------------- Render ----------------

  const renderRow = useCallback(
    ({ item }: { item: ListRow }) => {
      if (item.kind === "header") {
        return (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              {t(
                item.group === "today"
                  ? "today"
                  : item.group === "yesterday"
                    ? "yesterday"
                    : "earlier",
              )}
            </Text>
          </View>
        );
      }
      return (
        <SwipeableNotificationItem
          notification={item.notification}
          onPress={(n) => {
            if (Number(n.isRead) !== 1) {
              void markAsRead(n.id);
            }
          }}
          onDelete={requestDeleteOne}
          onLongPress={requestDeleteOne}
        />
      );
    },
    [markAsRead, requestDeleteOne, styles, t],
  );

  return (
    <View style={styles.container}>
      <NotificationHeader
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllAsRead={requestMarkAllAsRead}
        onClearAllRead={requestClearAllRead}
      />

      <NotificationFilters
        current={filter}
        onChange={setFilter}
        unreadCount={unreadCount}
      />

      {isLoading ? (
        <View style={styles.loadingState}>
          <ActivityIndicator size="small" color={theme.primary} />
        </View>
      ) : (
        <FlatList
          data={rows}
          keyExtractor={(row) => row.key}
          renderItem={renderRow}
          contentContainerStyle={[
            styles.content,
            rows.length === 0 && { flexGrow: 1, justifyContent: "center" },
          ]}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => loadNotifications("refresh")}
              tintColor={theme.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Feather
                name="bell"
                size={48}
                color="#999"
                style={styles.emptyIcon}
              />
              <Text style={styles.emptyTitle}>{t("noNotifications")}</Text>
              <Text style={styles.emptyDescription}>
                {filter === "all"
                  ? t("noNotificationsDescription")
                  : t("noNotificationsForFilter")}
              </Text>
            </View>
          }
        />
      )}

      <Modal
        visible={confirm.visible}
        title={confirm.title}
        cancelText={t("cancel")}
        sureText={t("confirm")}
        onCancel={closeConfirm}
        onOk={confirm.onConfirm}
        onBackdropPress={closeConfirm}
      >
        <Text style={{ color: theme.text, fontSize: 14, lineHeight: 20 }}>
          {confirm.message}
        </Text>
      </Modal>
    </View>
  );
}
