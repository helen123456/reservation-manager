import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface NavBackProps {
  title: string;
  onBack: () => void;
  rightComponent?: React.ReactNode;
  subtitle?: string;
  showBackButton?: boolean;
  headerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export default function NavBack({
  title,
  onBack,
  rightComponent,
  subtitle,
  showBackButton = true,
  headerStyle,
  titleStyle,
  subtitleStyle,
}: NavBackProps) {
  return (
    <View style={[styles.header, headerStyle]}>
      <View style={styles.headerLeft}>
        {showBackButton && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color="#111827" />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <ThemedText style={[styles.title, titleStyle]}>{title}</ThemedText>
          {subtitle && (
            <ThemedText style={[styles.subtitle, subtitleStyle]}>
              {subtitle}
            </ThemedText>
          )}
        </View>
      </View>
      {rightComponent && (
        <View style={styles.headerRight}>
          {rightComponent}
        </View>
      )}
    </View>
  );
}

const styles = {
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
};

export { NavBack };
export type { NavBackProps };