import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from '../hooks/useTranslation';

interface NotificationsPageProps {
  onBack: () => void;
}

export default function NotificationsPage({ onBack }: NotificationsPageProps) {
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      type: 'reservation',
      title: t('newReservation'),
      message: 'New reservation for 4 people at 7:00 PM',
      time: '5 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'cancellation',
      title: t('reservationCancelled'),
      message: 'Reservation for 2 people has been cancelled',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      type: 'confirmed',
      title: t('reservationConfirmed'),
      message: 'Reservation for 6 people confirmed',
      time: '3 hours ago',
      unread: false
    }
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>{t('notificationsTitle')}</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <ThemedView 
              key={notification.id} 
              style={[
                styles.notificationItem,
                notification.unread && styles.unreadNotification
              ]}
            >
              <ThemedView style={styles.notificationIcon}>
                <Ionicons 
                  name={
                    notification.type === 'reservation' ? 'calendar' :
                    notification.type === 'cancellation' ? 'close-circle' :
                    'checkmark-circle'
                  } 
                  size={24} 
                  color={
                    notification.type === 'reservation' ? '#3b82f6' :
                    notification.type === 'cancellation' ? '#ef4444' :
                    '#10b981'
                  }
                />
              </ThemedView>
              <ThemedView style={styles.notificationContent}>
                <ThemedText style={styles.notificationTitle}>
                  {notification.title}
                </ThemedText>
                <ThemedText style={styles.notificationMessage}>
                  {notification.message}
                </ThemedText>
                <ThemedText style={styles.notificationTime}>
                  {notification.time}
                </ThemedText>
              </ThemedView>
              {notification.unread && <ThemedView style={styles.unreadDot} />}
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.emptyState}>
            <Ionicons name="notifications-outline" size={48} color="#d1d5db" />
            <ThemedText style={styles.emptyTitle}>{t('noNotifications')}</ThemedText>
            <ThemedText style={styles.emptyDescription}>
              {t('noNotificationsDescription')}
            </ThemedText>
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  content: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  unreadNotification: {
    backgroundColor: '#f0f9ff',
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3b82f6',
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 64,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});
