import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { StatusBadge } from './StatusBadge';
import { Reservation } from './types';
import { formatDate } from './utils';
import { styles } from './styles';

interface ReservationItemProps {
  reservation: Reservation;
  onPress: (reservation: Reservation) => void;
}

export const ReservationItem: React.FC<ReservationItemProps> = ({ reservation, onPress }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <TouchableOpacity
      style={styles.reservationItem}
      onPress={() => onPress(reservation)}
    >
      <ThemedView style={[styles.reservationContent, { backgroundColor: '#fff' }]}>
        <ThemedView style={styles.reservationLeft}>
          <ThemedView style={styles.smallAvatar}>
            <ThemedText style={styles.smallAvatarText}>
              {getInitials(reservation.customerName)}
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.reservationInfo}>
            <ThemedView style={styles.reservationHeader}>
              <ThemedText style={styles.customerNameSmall}>
                {reservation.customerName}
              </ThemedText>
              <StatusBadge status={reservation.status} />
            </ThemedView>
            
            <ThemedView style={styles.reservationDetails}>
              <ThemedView style={styles.detailRow}>
                <Feather name="clock" size={12} color="#6b7280" />
                <ThemedText style={styles.detailTextSmall}>
                  {formatDate(reservation.date)} {reservation.time}
                </ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.detailRow}>
                <Feather name="users" size={12} color="#6b7280" />
                <ThemedText style={styles.detailTextSmall}>
                  {reservation.guests}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};