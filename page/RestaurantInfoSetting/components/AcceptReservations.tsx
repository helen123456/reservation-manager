import React from "react";
import { Switch, Text, View } from "react-native";
import { useTranslation } from "../../../hooks/useTranslation";

interface AcceptReservationsProps {
  acceptReservations: boolean;
  onToggle: (value: boolean) => void;
  styles: any;
}

export default function AcceptReservations({
  acceptReservations,
  onToggle,
  styles,
}: AcceptReservationsProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.card,styles.acceptReservationsCard]}>
      <View style={styles.cardRow}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{t("acceptReservations")}</Text>
          <Text style={styles.cardSubtitle}>
            {t("allowCustomersBookOnline")}
          </Text>
        </View>
        <Switch value={acceptReservations} onValueChange={onToggle} />
      </View>
    </View>
  );
}