import { Colors } from '@/constants/Colors';
import React, { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';
import { ThemedText } from '../ThemedText';
import { createStyles } from './styles';
import { RestaurantStatusProps } from './types';
import { formatBusinessHours } from './utils';

export default function RestaurantStatus({ status }: RestaurantStatusProps) {
  const colorScheme = useColorScheme()?? 'light';
  const colors = Colors[colorScheme];
  // 使用 useMemo 缓存样式以提高性能
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);
  return (
    <View style={styles.card}>
      <ThemedText style={styles.cardTitle}>Restaurant Status</ThemedText>
      <View style={styles.statusContainer}>
        <View style={styles.statusLeft}>
          <ThemedText style={styles.statusTitle}>{status.status}</ThemedText>
          <ThemedText style={styles.statusTime}>
            {formatBusinessHours(status.openTime, status.closeTime)}
          </ThemedText>
        </View>
        <View style={[
          styles.statusDot,
          { backgroundColor: status.isOpen ? '#10b981' : '#ef4444' }
        ]} />
      </View>
    </View>
  );
}