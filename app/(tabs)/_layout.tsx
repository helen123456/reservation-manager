import { Header, Icon } from "@/components";
import { HapticTab } from "@/components/base/HapticTab";
import { useTheme } from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        header: () => <Header />,
        tabBarActiveTintColor: theme.tint,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            borderTopWidth: 1,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
          default: {
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 5,
            paddingTop: 5,
            backgroundColor: theme.background,
            borderTopColor: theme.border,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="reservation/index"
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
