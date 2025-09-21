import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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
      <View style={[styles.reservationContent, { backgroundColor: theme.background }]}>
        <View style={styles.reservationLeft}>
          <View style={styles.smallAvatar}>
            <Text style={styles.smallAvatarText}>
              {getInitials(reservation.contactName)}
            </Text>
          </View>
          
          <View style={styles.reservationInfo}>
            <View style={styles.reservationHeader}>
              <Text style={styles.customerNameSmall}>
                {reservation.contactName}
              </Text>
              <StatusBadge status={reservation.status} />
            </View>
            
            <View style={styles.reservationDetails}>
              <View style={styles.detailRow}>
                <Feather name="clock" size={12} color="#6b7280" />
                <Text style={styles.detailTextSmall}>
                  {dayjs(reservation.reserveTime).format('HH:mm')}
                </Text>
              </View>
              
              <View style={styles.detailRow}>
                <Feather name="users" size={12} color="#6b7280" />
                <Text style={styles.detailTextSmall}>
                  {reservation.guests}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};