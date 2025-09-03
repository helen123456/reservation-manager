import Modal from "@/components/Modal";
import { useColors } from "@/hooks/useTheme";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, useColorScheme } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { StatusBadge } from "./StatusBadge";
import { createStyles } from "./styles";
import { Reservation } from "./types";
import { formatDate } from "./utils";

interface ReservationDetailProps {
  reservation: Reservation;
  onBack: () => void;
  onAccept: (reservation: Reservation) => void;
  onReject: (reservation: Reservation) => void;
}

export const ReservationDetail: React.FC<ReservationDetailProps> = ({
  reservation,
  onBack,
  onAccept,
  onReject,
}) => {
  const { t } = useTranslation();
  const Colors = useColors();
  const colorScheme = useColorScheme();
  // 使用 useMemo 缓存样式以提高性能
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme])
  const [visible,setVisible] = useState<boolean>(false)
  const [tipsText,setTipsText] = useState<string>("")

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  const handleAccept=(reservation:Reservation)=>{
    setVisible(true)
    setTipsText(t("acceptTip"))
  }
  const handleReject=(reservation:Reservation)=>{
    setVisible(true)
    setTipsText(t("rejectTip"))
  }
  const handelCancel=()=>{
    setVisible(false)
  }
  const handleSure=()=>{
    setVisible(false)
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.backButtonContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#111827" />
        </TouchableOpacity>
        <ThemedText style={styles.detailTitle}>Reservation Details</ThemedText>
      </ThemedView>

      <ScrollView style={styles.container}>
        <ThemedView style={styles.statusContainer}>
          <StatusBadge status={reservation.status} />
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedView style={styles.customerInfo}>
            <ThemedView style={styles.avatar}>
              <ThemedText style={styles.avatarText}>
                {getInitials(reservation.contactName)}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.contactName}>
              {reservation.contactName}
            </ThemedText>
            <ThemedView style={styles.phoneContainer}>
              <Feather name="phone" size={16} color="#6b7280" />
              <ThemedText style={styles.phoneText}>
                {reservation.contactPhone}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Reservation Details</ThemedText>
          <ThemedView style={styles.detailsGrid}>
            <ThemedView style={styles.detailItem}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="calendar" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>Date</ThemedText>
              </ThemedView>
              <ThemedText style={styles.detailValue}>
                {formatDate(reservation.reserveTime)}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailItem}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="clock" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>Time</ThemedText>
              </ThemedView>
              <ThemedText style={styles.detailValue}>
                {dayjs(reservation.reserveTime).format("HH:mm")}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailItem}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="users" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>
                  {t("guests")}
                </ThemedText>
              </ThemedView>
              <ThemedText style={styles.detailValue}>
                {reservation.guests}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
 {reservation.status === 0 && (
        <ThemedView style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => handleReject(reservation)}
          >
            <Feather name="x" size={20} color={Colors.text} />
            <ThemedText style={styles.actionButtonText}>
              {t("decline")}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => handleAccept(reservation)}
          >
            <Feather name="check" size={20} color={Colors.primaryForeground} />
            <ThemedText style={styles.rejectButtonText}>
              {t("accept")}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
      </ScrollView>

     
      <Modal visible={visible} title={t("tip")} onCancel={handelCancel} onOk={handleSure}>
        <Text>{tipsText}</Text>
      </Modal>
    </ThemedView>
  );
};
