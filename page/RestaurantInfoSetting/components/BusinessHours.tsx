import { useTheme } from "@/contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../hooks/useTranslation";

interface BusinessHoursProps {
  startTime: string;
  endTime: string;
  onStartTimePress: () => void;
  onEndTimePress: () => void;
  styles: any;
}

export default function BusinessHours({
  startTime,
  endTime,
  onStartTimePress,
  onEndTimePress,
  styles,
}: BusinessHoursProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View style={[styles.card,styles.businessHoursCard]}>
      <Text style={styles.cardTitle}>{t("businessHours")}</Text>
      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("openingTime")}</Text>
          <TouchableOpacity style={styles.timeInput} onPress={onStartTimePress}>
            <Text style={styles.timeInputText}>{startTime}</Text>
            <Ionicons name="time" size={16} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t("closingTime")}</Text>
          <TouchableOpacity style={styles.timeInput} onPress={onEndTimePress}>
            <Text style={styles.timeInputText}>{endTime}</Text>
            <Ionicons name="time" size={16} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}