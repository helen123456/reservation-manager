import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "../../../hooks/useTranslation";

interface MaxReservationsPerSlotProps {
  maxReservationsPerSlot: number;
  onUpdate: (value: number) => void;
  styles: any;
}

export default function MaxReservationsPerSlot({
  maxReservationsPerSlot,
  onUpdate,
  styles,
}: MaxReservationsPerSlotProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{t("maxReservationsPerSlot")}</Text>
      <Text style={styles.cardSubtitle}>
        {t("maxReservationsDescription")}
      </Text>
      <View style={styles.counterRow}>
        <TouchableOpacity
          style={[
            styles.counterButton,
            maxReservationsPerSlot <= 1 && styles.counterButtonDisabled,
          ]}
          onPress={() => onUpdate(maxReservationsPerSlot - 1)}
          disabled={maxReservationsPerSlot <= 1}
        >
          <Ionicons
            name="remove"
            size={14}
            color={maxReservationsPerSlot <= 1 ? "#ccc" : "#000"}
          />
        </TouchableOpacity>
        <View style={styles.counterContent}>
          <Text style={styles.counterValue}>{maxReservationsPerSlot}</Text>
          <Text style={styles.counterLabel}>{t("reservations")}</Text>
        </View>
        <TouchableOpacity
          style={styles.counterButton}
          onPress={() => onUpdate(maxReservationsPerSlot + 1)}
        >
          <Ionicons name="add" size={14} color={theme.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}