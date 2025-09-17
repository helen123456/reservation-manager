import { useTheme } from '@/hooks/ThemeContext';
import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { createStyles } from './styles';

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
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
     <View style={styles.statsCard}>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Feather name="calendar" size={14} color="#6b7280" />
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <Text style={styles.statValue}>{todayReservations}</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Feather name="alert-circle" size={14} color="#6b7280" />
            <Text style={styles.statLabel}>{t('pending')}</Text>
          </View>
          <Text style={styles.statValue}>{pendingCount}</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Feather name="check-circle" size={14} color="#6b7280" />
            <Text style={styles.statLabel}>{t('confirmed')}</Text>
          </View>
          <Text style={styles.statValue}>{confirmedCount}</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Feather name="users" size={14} color="#6b7280" />
            <Text style={styles.statLabel}>{t('guests')}</Text>
          </View>
          <Text style={styles.statValue}>{totalGuests}</Text>
        </View>
      </View>
    </View>
  );
};