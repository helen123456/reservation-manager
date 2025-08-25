import React from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useTranslation } from '../hooks/useTranslation';

interface SettingsModuleProps {
  onNavigate: (section: string) => void;
  onBack: () => void;
}

export default function SettingsModule({ onNavigate, onBack }: SettingsModuleProps) {
  const { t } = useTranslation();

  const settingsItems = [
    {
      id: 'table-settings',
      title: t('reservationSettings'),
      description: 'Manage table settings and reservations',
      icon: 'restaurant-outline'
    },
    {
      id: 'notifications',
      title: t('notifications'),
      description: 'Notification preferences',
      icon: 'notifications-outline'
    },
    {
      id: 'language',
      title: t('language'),
      description: 'Change app language',
      icon: 'language-outline'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText style={styles.title}>{t('settings')}</ThemedText>
      </ThemedView>

      <ScrollView style={styles.content}>
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.settingItem}
            onPress={() => onNavigate(item.id)}
          >
            <Ionicons name={item.icon as any} size={24} color="#6b7280" />
            <ThemedView style={styles.settingContent}>
              <ThemedText style={styles.settingTitle}>{item.title}</ThemedText>
              <ThemedText style={styles.settingDescription}>{item.description}</ThemedText>
            </ThemedView>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
        ))}
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingContent: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
});
