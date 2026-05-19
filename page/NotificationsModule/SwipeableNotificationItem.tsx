import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Feather } from "@expo/vector-icons";
import React, { useMemo, useRef } from "react";
import { Platform, Text, View } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { NotificationItem } from "./NotificationItem";
import { createStyles } from "./styles";
import { Notification } from "./types";

interface SwipeableNotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
  onDelete: (notification: Notification) => void;
  onLongPress?: (notification: Notification) => void;
}

/**
 * Wraps NotificationItem with a swipe-from-right "Delete" action on native
 * platforms. On web, gesture-handler swipe actions are unreliable so we fall
 * back to the plain item (long-press still triggers the delete prompt).
 */
export function SwipeableNotificationItem({
  notification,
  onPress,
  onDelete,
  onLongPress,
}: SwipeableNotificationItemProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const swipeRef = useRef<Swipeable>(null);

  if (Platform.OS === "web") {
    return (
      <NotificationItem
        notification={notification}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    );
  }

  const renderRightActions = () => (
    <RectButton
      style={styles.swipeAction}
      onPress={() => {
        swipeRef.current?.close();
        onDelete(notification);
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather name="trash-2" size={18} color="#fff" />
        <Text style={styles.swipeActionText}>{t("delete")}</Text>
      </View>
    </RectButton>
  );

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
    >
      <NotificationItem
        notification={notification}
        onPress={onPress}
        onLongPress={onLongPress}
      />
    </Swipeable>
  );
}
