import React, { useMemo } from 'react';
import { useTheme } from '@/hooks/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import { Text, View } from 'react-native';
import { createStyles } from './styles';

interface StatusBadgeProps {
  status: number
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const getBadgeStyle = () => {
    switch (status) {
      case 0:
        return { backgroundColor: '#fef3c7', borderColor: '#f59e0b' };
      case 1:
        return { backgroundColor: '#dcfce7', borderColor: '#10b981' };
      case 2:
        return { backgroundColor: '#fee2e2', borderColor: '#ef4444' };
      default:
        return { backgroundColor: '#f3f4f6', borderColor: '#6b7280' };
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 0: return '#f59e0b';
      case 1: return '#10b981';
      case 2: return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 0: return t('pending');
      case 1: return t('confirmed');
      case 2: return t('cancelled');
      default: return status;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle()]}>
        <Text style={[styles.badgeText, { color: getTextColor() }]}>
          {getStatusText()}
        </Text>
      </View>
  );
};