import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import React, { useMemo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { createStyles } from "./styles";
import { NotificationFilter } from "./types";

interface NotificationFilterChip {
  key: NotificationFilter;
  labelKey: string;
  count?: number;
}

interface NotificationFiltersProps {
  current: NotificationFilter;
  onChange: (filter: NotificationFilter) => void;
  unreadCount: number;
}

/**
 * Top filter row: All / Unread / Reservation / Cancel / Message / System.
 * The "Unread" chip surfaces the unread count as a small inline badge so
 * users can see it without leaving this screen.
 */
export function NotificationFilters({
  current,
  onChange,
  unreadCount,
}: NotificationFiltersProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const chips: NotificationFilterChip[] = useMemo(
    () => [
      { key: "all", labelKey: "filterAll" },
      { key: "unread", labelKey: "filterUnread", count: unreadCount },
      { key: "reservation", labelKey: "filterReservation" },
      { key: "reservation_cancel", labelKey: "filterReservationCancel" },
      { key: "message", labelKey: "filterMessage" },
      { key: "system", labelKey: "filterSystem" },
    ],
    [unreadCount],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterRow}
    >
      {chips.map((chip) => {
        const active = current === chip.key;
        return (
          <TouchableOpacity
            key={chip.key}
            style={[styles.filterChip, active && styles.filterChipActive]}
            onPress={() => onChange(chip.key)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterChipText,
                active && styles.filterChipTextActive,
              ]}
            >
              {t(chip.labelKey)}
            </Text>
            {chip.count !== undefined && chip.count > 0 && (
              <View style={styles.filterChipBadge}>
                <Text style={styles.filterChipBadgeText}>
                  {chip.count > 99 ? "99+" : String(chip.count)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
