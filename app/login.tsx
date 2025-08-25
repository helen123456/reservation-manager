import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import Login from '../components/Login';

// Cross-platform storage utility
const storage = {
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value);
        }
      } catch {
        // Ignore storage errors on web
      }
      return;
    }
    return AsyncStorage.setItem(key, value);
  }
};

export default function LoginPage() {
  const handleLogin = async () => {
    try {
      // 保存登录状态到存储
      await storage.setItem('isAuthenticated', 'true');
      // 登录成功后跳转到主页面
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error saving auth status:', error);
      // 即使保存失败也跳转，让主页面处理
      router.replace('/(tabs)');
    }
  };

  return <Login onLogin={handleLogin} />;
}