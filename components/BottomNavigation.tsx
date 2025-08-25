import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from '../hooks/useTranslation';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const { t } = useTranslation();

  const tabs = [
    {
      id: 'reservations',
      title: t('reservations'),
      icon: 'calendar-outline',
      activeIcon: 'calendar'
    },
    {
      id: 'tables',
      title: 'Tables',
      icon: 'grid-outline',
      activeIcon: 'grid'
    },
    {
      id: 'customers',
      title: 'Customers',
      icon: 'people-outline',
      activeIcon: 'people'
    }
  ];

  return (
    <ThemedView style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => setActiveTab(tab.id)}
        >
          <Ionicons
            name={activeTab === tab.id ? tab.activeIcon as any : tab.icon as any}
            size={24}
            color={activeTab === tab.id ? '#000000' : '#6b7280'}
          />
          <ThemedText style={[
            styles.tabText,
            activeTab === tab.id && styles.activeTabText
          ]}>
            {tab.title}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingBottom: 20,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTab: {
    // Additional styling for active tab if needed
  },
  tabText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  activeTabText: {
    color: '#000000',
    fontWeight: '500',
  },
});
