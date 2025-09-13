import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { StatusBadge } from './StatusBadge';
import { createStyles } from './styles';
import { Reservation } from './types';

interface ReservationItemProps {
  reservation: Reservation;
  onPress: (reservation: Reservation) => void;
}

export const ReservationItem: React.FC<ReservationItemProps> = ({ reservation, onPress }) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <TouchableOpacity
      style={styles.reservationItem}
      onPress={() => onPress(reservation)}
    >
      <ThemedView style={[styles.reservationContent, { backgroundColor: '#fff' }]}>
        <ThemedView style={styles.reservationLeft}>
          <ThemedView style={styles.smallAvatar}>
            <ThemedText style={styles.smallAvatarText}>
              {getInitials(reservation.contactName)}
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.reservationInfo}>
            <ThemedView style={styles.reservationHeader}>
              <ThemedText style={styles.customerNameSmall}>
                {reservation.contactName}
              </ThemedText>
              <StatusBadge status={reservation.status} />
            </ThemedView>
            
            <ThemedView style={styles.reservationDetails}>
              <ThemedView style={styles.detailRow}>
                <Feather name="clock" size={12} color="#6b7280" />
                <ThemedText style={styles.detailTextSmall}>
                  {dayjs(reservation.reserveTime).format('HH:mm')}
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