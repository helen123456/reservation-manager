import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { RestaurantStatusProps } from './types';
import { styles } from './styles';
import { formatBusinessHours } from './utils';

export default function RestaurantStatus({ status }: RestaurantStatusProps) {
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