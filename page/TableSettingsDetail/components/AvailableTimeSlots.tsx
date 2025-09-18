import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "../../../hooks/useTranslation";
import { TimeSlot } from "../types";

interface AvailableTimeSlotsProps {
  timeSlots: TimeSlot[];
  timeInterval: number;
  onToggleSlot: (index: number) => void;
  styles: any;
}

export default function AvailableTimeSlots({
  timeSlots,
  timeInterval,
  onToggleSlot,
  styles,
}: AvailableTimeSlotsProps) {
  const { t } = useTranslation();

  const enabledSlotsCount = timeSlots.filter((slot) => slot.enabled).length;

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.slotsHeader}>
          <Ionicons name="time" size={18} color="#000" />
          <Text style={styles.cardTitle}>{t("availableTimeSlots")}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {enabledSlotsCount} {t("active")}
          </Text>
        </View>
      </View>

      <View style={styles.slotsGrid}>
        {timeSlots.map((slot, index) => (
          <TouchableOpacity
            key={`${slot.time}-${timeInterval}`}
            onPress={() => onToggleSlot(index)}
            style={[
              styles.slotButton,
              slot.enabled
                ? styles.slotButtonActive
                : styles.slotButtonInactive,
            ]}
          >
            <Text
              style={[
                styles.slotButtonText,
                slot.enabled
                  ? styles.slotButtonTextActive
                  : styles.slotButtonTextInactive,
              ]}
            >
              {slot.time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}