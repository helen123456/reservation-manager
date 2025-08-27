import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
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
          tabBarIcon: ({ color }) => <IconSymbol library='Feather' size={26} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
