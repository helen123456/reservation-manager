import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { StatusBadge } from './StatusBadge';
import { Reservation } from './types';
import { formatDate } from './utils';
import { useTranslation } from '../../hooks/useTranslation';
import { styles } from './styles';

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
  onReject
}) => {
  const { t } = useTranslation();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

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
                {getInitials(reservation.customerName)}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.customerName}>
              {reservation.customerName}
            </ThemedText>
            <ThemedView style={styles.phoneContainer}>
              <Feather name="phone" size={16} color="#6b7280" />
              <ThemedText style={styles.phoneText}>
                {reservation.phone}
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
                {formatDate(reservation.date)}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.detailItem}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="clock" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>Time</ThemedText>
              </ThemedView>
              <ThemedText style={styles.detailValue}>
                {reservation.time}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.detailsGrid}>
            <ThemedView style={styles.detailItem}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="users" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>{t('guests')}</ThemedText>
              </ThemedView>
              <ThemedText style={styles.detailValue}>
                {reservation.guests}
              </ThemedText>
              <ThemedText style={styles.detailSubValue}>people</ThemedText>
            </ThemedView>
          </ThemedView>

          {reservation.specialRequests && (
            <ThemedView style={styles.specialRequests}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="message-square" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>Special Requests</ThemedText>
              </ThemedView>
              <ThemedView style={styles.requestsBox}>
                <ThemedText style={styles.requestsText}>
                  {reservation.specialRequests}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>

      {reservation.status === 'pending' && (
        <ThemedView style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={() => onReject(reservation)}
          >
            <Feather name="x" size={20} color="#fff" />
            <ThemedText style={styles.actionButtonText}>
              {t('decline')}
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => onAccept(reservation)}
          >
            <Feather name="check" size={20} color="#fff" />
            <ThemedText style={styles.actionButtonText}>
              {t('accept')}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
  );
};