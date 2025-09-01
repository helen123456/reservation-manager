import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Switch, View, useColorScheme } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { ThemedText } from '../ThemedText';
import { createStyles } from './styles';
import { QuickSettingsProps } from './types';

export default function QuickSettings({ settings, onSettingChange }: QuickSettingsProps) {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  // 使用 useMemo 缓存样式以提高性能
  const styles = useMemo(() => createStyles(colorScheme), [colorScheme]);

  return (
    <View style={styles.card}>
      <ThemedText style={styles.cardTitle}>Quick Settings</ThemedText>
      
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <ThemedText style={styles.settingTitle}>{t('acceptReservations')}</ThemedText>
          <ThemedText style={styles.settingDescription}>Allow new bookings</ThemedText>
        </View>
        <Switch
          value={settings.acceptReservations}
          onValueChange={(value) => onSettingChange('acceptReservations', value)}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <ThemedText style={styles.settingTitle}>Auto-confirm Reservations</ThemedText>
          <ThemedText style={styles.settingDescription}>Automatically confirm new bookings</ThemedText>
        </View>
        <Switch
          value={settings.autoConfirm}
          onValueChange={(value) => onSettingChange('autoConfirm', value)}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <View style={styles.iconContainer}>
            <Feather name={settings.darkMode ? "moon" : "sun"} size={16} color="#6b7280" />
          </View>
          <View style={{ marginLeft: -44, paddingLeft: 44 }}>
            <ThemedText style={styles.settingTitle}>Dark Mode</ThemedText>
            <ThemedText style={styles.settingDescription}>Switch between light and dark theme</ThemedText>
          </View>
        </View>
        <Switch
          value={settings.darkMode}
          onValueChange={(value) => onSettingChange('darkMode', value)}
        />
      </View>
    </View>
  );
}