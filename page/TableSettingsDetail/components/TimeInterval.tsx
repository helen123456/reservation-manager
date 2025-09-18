import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../hooks/useTranslation";
import { IntervalOption } from "../types";

interface TimeIntervalProps {
  currentInterval: number;
  onIntervalChange: (intervalMinutes: number) => void;
  styles: any;
}

export default function TimeInterval({
  currentInterval,
  onIntervalChange,
  styles,
}: TimeIntervalProps) {
  const { t } = useTranslation();

  const intervalOptions: IntervalOption[] = [
    { value: 60, label: "1h" },
    { value: 30, label: "30min" },
    { value: 15, label: "15min" },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{t("timeInterval")}</Text>
      <View style={styles.intervalRow}>
        {intervalOptions.map(({ value, label }) => (
          <TouchableOpacity
            key={value}
            onPress={() => onIntervalChange(value)}
            style={[
              styles.intervalButton,
              currentInterval === value && styles.intervalButtonActive,
            ]}
          >
            <Text
              style={[
                styles.intervalButtonText,
                currentInterval === value && styles.intervalButtonTextActive,
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}