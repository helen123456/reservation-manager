import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { styles } from './styles';

interface FilterBarProps {
  searchQuery: string;
  selectedDate?: Date;
  onClearSearch: () => void;
  onClearDate: () => void;
}

export function FilterBar({ searchQuery, selectedDate, onClearSearch, onClearDate }: FilterBarProps) {
  // 如果没有任何筛选条件，不显示FilterBar
  if (!searchQuery && !selectedDate) {
    return null;
  }

  return (
    <ThemedView style={styles.filterBarContainer}>
      <ThemedText style={styles.filterLabel}>Filters:</ThemedText>
      <ThemedView style={styles.filterBadgesContainer}>
        {searchQuery && (
          <ThemedView style={styles.filterBadge}>
            <ThemedText style={styles.filterBadgeText}>
              Search: "{searchQuery}"
            </ThemedText>
            <TouchableOpacity
              onPress={onClearSearch}
              style={styles.filterClearButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={12} color="#6b7280" />
            </TouchableOpacity>
          </ThemedView>
        )}
        {selectedDate && (
          <ThemedView style={styles.filterBadge}>
            <ThemedText style={styles.filterBadgeText}>
              Date: {dayjs(selectedDate).format('MMM DD')}
            </ThemedText>
            <TouchableOpacity
              onPress={onClearDate}
              style={styles.filterClearButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={12} color="#6b7280" />
            </TouchableOpacity>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}