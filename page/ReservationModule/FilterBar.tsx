import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { Text, View } from 'react-native';
import { createStyles } from './styles';

interface FilterBarProps {
  searchQuery: string;
  selectedDate?: Date;
  onClearSearch: () => void;
  onClearDate: () => void;
}

export function FilterBar({ searchQuery, selectedDate, onClearSearch, onClearDate }: FilterBarProps) {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  // 如果没有任何筛选条件，不显示FilterBar
  if (!searchQuery && !selectedDate) {
    return null;
  }

  return (
    <View style={styles.filterBarContainer}>
      <Text style={styles.filterLabel}>Filters:</Text>
      <View style={styles.filterBadgesContainer}>
        {searchQuery && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>
                Search: "{searchQuery}"
              </Text>
            <TouchableOpacity
              onPress={onClearSearch}
              style={styles.filterClearButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={12} color="#6b7280" />
            </TouchableOpacity>
          </View>
        )}
        {selectedDate && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>
                Date: {dayjs(selectedDate).format('MMM DD')}
              </Text>
            <TouchableOpacity
              onPress={onClearDate}
              style={styles.filterClearButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Feather name="x" size={12} color="#6b7280" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}