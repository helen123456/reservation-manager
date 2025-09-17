import { useTheme } from '@/hooks/ThemeContext';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';

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
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={[styles.header, headerStyle]}>
      <View style={styles.headerLeft}>
        {showBackButton && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Feather name="arrow-left" size={20} color={theme.text} />
          </TouchableOpacity>
        )}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, titleStyle]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>
            {subtitle}
          </Text>
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

const createStyles = (theme: any) => ({
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.background,
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
    paddingLeft: 0,
    marginRight: 8
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto_500Medium',
    color: theme.text,
  },
  subtitle: {
    fontSize: 14,
    color: theme.mutedForeground,
    fontFamily: 'Roboto_400Regular',
    marginTop: 2,
  },
});

export { NavBack };
export type { NavBackProps };

