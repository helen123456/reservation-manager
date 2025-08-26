import React from 'react';
import { Feather } from '@expo/vector-icons';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useTranslation } from '../../hooks/useTranslation';
import { styles } from './styles';

interface StatsCardProps {
  todayReservations: number;
  pendingCount: number;
  confirmedCount: number;
  totalGuests: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  todayReservations,
  pendingCount,
  confirmedCount,
  totalGuests
}) => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.statsCard}>
      <ThemedView style={styles.statsGrid}>
        <ThemedView style={styles.statItem}>
          <ThemedView style={styles.statIconContainer}>
            <Feather name="calendar" size={14} color="#6b7280" />
            <ThemedText style={styles.statLabel}>Today</ThemedText>
          </ThemedView>
          <ThemedText style={styles.statValue}>{todayReservations}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.statItem}>
          <ThemedView style={styles.statIconContainer}>
            <Feather name="alert-circle" size={14} color="#6b7280" />
            <ThemedText style={styles.statLabel}>{t('pending')}</ThemedText>
          </ThemedView>
          <ThemedText style={styles.statValue}>{pendingCount}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.statItem}>
          <ThemedView style={styles.statIconContainer}>
            <Feather name="check-circle" size={14} color="#6b7280" />
            <ThemedText style={styles.statLabel}>{t('confirmed')}</ThemedText>
          </ThemedView>
          <ThemedText style={styles.statValue}>{confirmedCount}</ThemedText>
        </ThemedView>
        
        <ThemedView style={styles.statItem}>
          <ThemedView style={styles.statIconContainer}>
            <Feather name="users" size={14} color="#6b7280" />
            <ThemedText style={styles.statLabel}>{t('guests')}</ThemedText>
          </ThemedView>
          <ThemedText style={styles.statValue}>{totalGuests}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};