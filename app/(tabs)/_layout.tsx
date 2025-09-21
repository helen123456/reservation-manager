import { Icon } from "@/components";
import { HapticTab } from "@/components/base/HapticTab";
import { useTheme } from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // 不显示header，因为使用全局Header
        tabBarActiveTintColor: theme.tint,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            borderTopWidth: 1,
            height: 60 + insets.bottom,
            paddingBottom: 5 + insets.bottom,
            paddingTop: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
          default: {
            borderTopWidth: 1,
            height: 60 + insets.bottom,
            paddingBottom: 5 + insets.bottom,
            paddingTop: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="reservation"
        options={{
          title: "预订管理",
          tabBarIcon: ({ color }) => (
            <Icon library="Feather" size={24} name="calendar" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
