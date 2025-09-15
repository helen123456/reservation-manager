import Modal from "@/components/Modal";
import { updateReservation } from "@/services/api/reservationService";
import { Feather, Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useTheme } from '@/hooks/ThemeContext';
import { useTranslation } from "../../hooks/useTranslation";
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
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [visible, setVisible] = useState<boolean>(false);
  const [tipsText, setTipsText] = useState<string>("");

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  const handleAccept = () => {
    setVisible(true);
    setTipsText(t("acceptTip"));
  };
  const handleReject = () => {
    setVisible(true);
    setTipsText(t("rejectTip"));
  };
  const handelCancel = () => {
    updateReservation({
      id: reservation.id,
      status: 3,
    }).then((reservation: any) => {
      onAccept(reservation);
      setVisible(false);
    });
  };
  const handleConfirm = () => {
    updateReservation({
      id: reservation.id,
      status: 1,
    }).then((reservation: any) => {
      onReject(reservation);
      setVisible(false);
    });
  };

  return (
    <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Reservation Details</Text>
        </View>

      <ScrollView style={styles.container}>
        <View style={styles.statusContainer}>
          <StatusBadge status={reservation.status} />
        </View>

        <View style={styles.card}>
          <View style={styles.customerInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {getInitials(reservation.contactName)}
              </Text>
            </View>
            <Text style={styles.contactName}>
              {reservation.contactName}
            </Text>
            <View style={styles.phoneContainer}>
              <Feather name="phone" size={16} color="#6b7280" />
              <Text style={styles.phoneText}>
                {reservation.contactPhone}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reservation Details</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Feather name="calendar" size={16} color="#6b7280" />
                <Text style={styles.detailLabel}>Date</Text>
              </View>
              <Text style={styles.detailValue}>
                {formatDate(reservation.reserveTime)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Feather name="clock" size={16} color="#6b7280" />
                <Text style={styles.detailLabel}>Time</Text>
              </View>
              <Text style={styles.detailValue}>
                {dayjs(reservation.reserveTime).format("HH:mm")}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Feather name="users" size={16} color="#6b7280" />
                <Text style={styles.detailLabel}>
                  {t("guests")}
                </Text>
              </View>
              <Text style={styles.detailValue}>
                {reservation.guests}
              </Text>
            </View>
          </View>
        </View>
        {reservation.status === 0 && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleReject()}
            >
              <Feather name="x" size={20} color={theme.text} />
              <Text style={styles.actionButtonText}>
                {t("decline")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.confirmButton]}
              onPress={() => handleAccept()}
            >
              <Feather
                name="check"
                size={20}
                color={theme.primaryForeground}
              />
              <Text style={styles.rejectButtonText}>
                {t("accept")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={visible}
        title={t("tip")}
        onCancel={handelCancel}
        onOk={handleConfirm}
      >
        <Text>{tipsText}</Text>
      </Modal>
    </View>
  );
};
