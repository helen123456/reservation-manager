import { Stack } from 'expo-router';
import React from 'react';

export default function ReservationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // 不显示header，使用全局Header
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: "预订管理"
        }}
      />
      <Stack.Screen 
        name="detail" 
        options={{
          title: "预订详情"
        }}
      />
    </Stack>
  );
}