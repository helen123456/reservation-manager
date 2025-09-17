import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Icon } from '@/components';
import { HapticTab } from '@/components/base/HapticTab';
import { useTheme } from "@/hooks/ThemeContext";

export default function TabLayout() {
  const {theme} = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'none', // 隐藏tab导航，因为只有一个tab
          },
          default: {
            justifyContent: 'center',
            alignItems: 'center',
            display: 'none', // 隐藏tab导航，因为只有一个tab
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '预订管理',
          tabBarIcon: ({ color }) => <Icon library='Feather' size={26} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
