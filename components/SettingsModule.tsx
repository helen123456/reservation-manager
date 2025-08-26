import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTranslation } from '../hooks/useTranslation';

interface SettingsModuleProps {
  onNavigate: (section: string) => void;
  onBack?: () => void;
}

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  disabled?: boolean;
  action: () => void;
}

export default function SettingsModule({ onNavigate, onBack }: SettingsModuleProps) {
  const { t } = useTranslation();
  
  const [quickSettings, setQuickSettings] = useState({
    acceptReservations: true,
    autoConfirm: false,
    darkMode: false,
  });

  const settingsCategories: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Reservation Management',
      items: [
        {
          id: 'business-hours',
          title: t('businessHours'),
          description: 'Set opening and closing times',
          icon: 'clock',
          action: () => onNavigate('business-hours')
        },
        {
          id: 'table-settings',
          title: 'Table Settings',
          description: 'Manage capacity and booking rules',
          icon: 'grid',
          action: () => onNavigate('table-settings')
        }
      ]
    },
    {
      title: 'Future Features',
      items: [
        {
          id: 'delivery',
          title: 'Delivery Settings',
          description: 'Coming soon',
          icon: 'package',
          disabled: true,
          action: () => {}
        },
        {
          id: 'takeaway',
          title: 'Takeaway Settings',
          description: 'Coming soon',
          icon: 'shopping-bag',
          disabled: true,
          action: () => {}
        }
      ]
    }
  ];

  const styles = {
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    scrollContent: {
      padding: 16,
    },
    header: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      marginBottom: 16,
    },
    headerLeft: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },
    backButton: {
      padding: 8,
      marginRight: 8,
      marginLeft: -8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      color: '#111827',
    },
    moreButton: {
      padding: 8,
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600' as const,
      color: '#111827',
      marginBottom: 12,
    },
    settingItem: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
      paddingVertical: 12,
    },
    settingLeft: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: '#111827',
    },
    settingDescription: {
      fontSize: 14,
      color: '#6b7280',
      marginTop: 2,
    },
    categoryTitle: {
      fontSize: 14,
      color: '#6b7280',
      marginBottom: 8,
      marginTop: 8,
    },
    categoryItem: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: '#e5e7eb',
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    categoryItemDisabled: {
      opacity: 0.5,
    },
    categoryLeft: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      flex: 1,
    },
    iconContainer: {
      width: 32,
      height: 32,
      backgroundColor: '#f3f4f6',
      borderRadius: 8,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      marginRight: 12,
    },
    categoryItemTitle: {
      fontSize: 14,
      fontWeight: '500' as const,
      color: '#111827',
    },
    categoryItemDescription: {
      fontSize: 12,
      color: '#6b7280',
      marginTop: 2,
    },
    badge: {
      backgroundColor: '#f3f4f6',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#e5e7eb',
    },
    badgeText: {
      fontSize: 12,
      color: '#6b7280',
    },
    statusContainer: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'space-between' as const,
    },
    statusLeft: {
      flex: 1,
    },
    statusTitle: {
      fontSize: 16,
      fontWeight: '500' as const,
      color: '#111827',
    },
    statusTime: {
      fontSize: 14,
      color: '#6b7280',
      marginTop: 2,
    },
    statusDot: {
      width: 12,
      height: 12,
      backgroundColor: '#10b981',
      borderRadius: 6,
    },
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {onBack && (
              <TouchableOpacity 
                onPress={onBack}
                style={styles.backButton}
              >
                <Feather name="arrow-left" size={20} color="#111827" />
              </TouchableOpacity>
            )}
            <ThemedText style={styles.title}>{t('settings')}</ThemedText>
          </View>
          <TouchableOpacity style={styles.moreButton}>
            <Feather name="more-vertical" size={18} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Quick Settings */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Quick Settings</ThemedText>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <ThemedText style={styles.settingTitle}>{t('acceptReservations')}</ThemedText>
              <ThemedText style={styles.settingDescription}>Allow new bookings</ThemedText>
            </View>
            <Switch
              value={quickSettings.acceptReservations}
              onValueChange={(value) => 
                setQuickSettings(prev => ({ ...prev, acceptReservations: value }))
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <ThemedText style={styles.settingTitle}>Auto-confirm Reservations</ThemedText>
              <ThemedText style={styles.settingDescription}>Automatically confirm new bookings</ThemedText>
            </View>
            <Switch
              value={quickSettings.autoConfirm}
              onValueChange={(value) => 
                setQuickSettings(prev => ({ ...prev, autoConfirm: value }))
              }
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={styles.iconContainer}>
                <Feather name={quickSettings.darkMode ? "moon" : "sun"} size={16} color="#6b7280" />
              </View>
              <View style={{ marginLeft: -44, paddingLeft: 44 }}>
                <ThemedText style={styles.settingTitle}>Dark Mode</ThemedText>
                <ThemedText style={styles.settingDescription}>Switch between light and dark theme</ThemedText>
              </View>
            </View>
            <Switch
              value={quickSettings.darkMode}
              onValueChange={(value) => 
                setQuickSettings(prev => ({ ...prev, darkMode: value }))
              }
            />
          </View>
        </View>

        {/* Settings Categories */}
        {settingsCategories.map((category, categoryIndex) => (
          <View key={categoryIndex}>
            <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
            
            {category.items.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.categoryItem,
                  item.disabled && styles.categoryItemDisabled
                ]}
                onPress={!item.disabled ? item.action : undefined}
                disabled={item.disabled}
              >
                <View style={styles.categoryLeft}>
                  <View style={styles.iconContainer}>
                    <Feather name={item.icon as any} size={16} color="#6b7280" />
                  </View>
                  <View>
                    <ThemedText style={styles.categoryItemTitle}>{item.title}</ThemedText>
                    <ThemedText style={styles.categoryItemDescription}>{item.description}</ThemedText>
                  </View>
                </View>
                {!item.disabled ? (
                  <Feather name="chevron-right" size={16} color="#6b7280" />
                ) : (
                  <View style={styles.badge}>
                    <ThemedText style={styles.badgeText}>Soon</ThemedText>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Restaurant Status */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>Restaurant Status</ThemedText>
          <View style={styles.statusContainer}>
            <View style={styles.statusLeft}>
              <ThemedText style={styles.statusTitle}>Currently Open</ThemedText>
              <ThemedText style={styles.statusTime}>9:00 AM - 11:00 PM</ThemedText>
            </View>
            <View style={styles.statusDot} />
          </View>
        </View>

        {/* About */}
        <TouchableOpacity
          style={[styles.categoryItem, styles.categoryItemDisabled]}
          disabled={true}
        >
          <View style={styles.categoryLeft}>
            <View style={styles.iconContainer}>
              <Feather name="info" size={16} color="#6b7280" />
            </View>
            <View>
              <ThemedText style={styles.categoryItemTitle}>{t('about')}</ThemedText>
              <ThemedText style={styles.categoryItemDescription}>App version and information</ThemedText>
            </View>
          </View>
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>Soon</ThemedText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}