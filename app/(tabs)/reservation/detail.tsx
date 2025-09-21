import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Modal from "../../../components/base/Modal";
import { NavBack } from "../../../components/layout/NavBack";
import { useTheme } from '../../../contexts/ThemeContext';
import { useTranslation } from "../../../hooks/useTranslation";
import { StatusBadge } from "../../../page/ReservationModule/StatusBadge";
import { createStyles } from "../../../page/ReservationModule/styles";
import { Reservation } from "../../../page/ReservationModule/types";
import { formatDate } from "../../../page/ReservationModule/utils";
import { updateReservation } from "../../../services/api/reservationService";

export default function ReservationDetailPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [visible, setVisible] = useState<boolean>(false);
  const [tipsText, setTipsText] = useState<string>("");
  const [reservation, setReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    debugger
    // 从路由参数中获取预订信息
    if (params.reservation) {
      try {
        const reservationData = JSON.parse(params.reservation as string);
        setReservation(reservationData);
      } catch (error) {
        console.error('Error parsing reservation data:', error);
        router.back();
      }
    }
  }, [params.reservation]);

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
    if (!reservation) return;
    
    updateReservation({
      id: reservation.id,
      status: 3,
    }).then((updatedReservation: any) => {
      setReservation(updatedReservation);
      setVisible(false);
    });
  };

  const handleConfirm = () => {
    if (!reservation) return;
    
    updateReservation({
      id: reservation.id,
      status: 1,
    }).then((updatedReservation: any) => {
      setReservation(updatedReservation);
      setVisible(false);
    });
  };

  if (!reservation) {
    return (
      <View style={styles.container}>
        <NavBack title={t("reservationDetails")} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: theme.text, fontSize: 16 }}>{t("loadingFailed")}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavBack title={t("reservationDetails")} />

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
          <Text style={styles.cardTitle}>{t("reservationDetails")}</Text>
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Feather name="calendar" size={16} color="#6b7280" />
                <Text style={styles.detailLabel}>{t("date")}</Text>
              </View>
              <Text style={styles.detailValue}>
                {formatDate(reservation.reserveTime)}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <View style={styles.detailHeader}>
                <Feather name="clock" size={16} color="#6b7280" />
                <Text style={styles.detailLabel}>{t("time")}</Text>
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
}