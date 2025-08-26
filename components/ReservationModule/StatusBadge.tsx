import React from 'react';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { useTranslation } from '../../hooks/useTranslation';
import { styles } from './styles';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'rejected';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const { t } = useTranslation();

  const getBadgeStyle = () => {
    switch (status) {
      case 'pending':
        return { backgroundColor: '#fef3c7', borderColor: '#f59e0b' };
      case 'confirmed':
        return { backgroundColor: '#dcfce7', borderColor: '#10b981' };
      case 'rejected':
        return { backgroundColor: '#fee2e2', borderColor: '#ef4444' };
      default:
        return { backgroundColor: '#f3f4f6', borderColor: '#6b7280' };
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'confirmed': return '#10b981';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending': return t('pending');
      case 'confirmed': return t('confirmed');
      case 'rejected': return t('cancelled');
      default: return status;
    }
  };

  return (
    <ThemedView style={[styles.badge, getBadgeStyle()]}>
      <ThemedText style={[styles.badgeText, { color: getTextColor() }]}>
        {getStatusText()}
      </ThemedText>
    </ThemedView>
  );
};