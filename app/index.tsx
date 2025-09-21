import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function IndexPage() {
  const { isLogged, isLoading } = useAuth();

  // 显示加载状态
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 根据登录状态重定向
  if (isLogged) {
    return <Redirect href="/(tabs)/reservation" />;
  } else {
    return <Redirect href="/(auth)/login" />;
  }
}