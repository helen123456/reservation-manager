import { useTheme } from '@/hooks/ThemeContext';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { createStyles } from './styles';
import { RestaurantStatusProps } from './types';
import { formatBusinessHours } from './utils';

export default function RestaurantStatus({ status }: RestaurantStatusProps) {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Restaurant Base Info</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusLeft}>
          <Text style={styles.statusTitle}>{status.status}</Text>
          <Text style={styles.statusTime}>
            {formatBusinessHours(status.openTime, status.closeTime)}
          </Text>
        </View>
        <View style={[
          styles.statusDot,
          { backgroundColor: status.isOpen ? '#10b981' : '#ef4444' }
        ]} />
      </View>
    </View>
  );
}