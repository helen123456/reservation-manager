import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Switch, View } from 'react-native';
import { useTheme } from '@/hooks/ThemeContext';
import { useTranslation } from '../../hooks/useTranslation';
import { Text } from 'react-native';
import { createStyles } from './styles';
import { QuickSettingsProps } from './types';

export default function QuickSettings({ settings, onSettingChange }: QuickSettingsProps) {
  const { t } = useTranslation();
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Quick Settings</Text>
      
      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Text style={styles.settingTitle}>{t('acceptReservations')}</Text>
        <Text style={styles.settingDescription}>Allow new bookings</Text>
        </View>
        <Switch
          value={settings.acceptReservations}
          onValueChange={(value) => onSettingChange('acceptReservations', value)}
        />
      </View>

      <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
          <Text style={styles.settingTitle}>Auto-confirm Reservations</Text>
        <Text style={styles.settingDescription}>Automatically confirm new bookings</Text>
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
            <Text style={styles.settingTitle}>Dark Mode</Text>
        <Text style={styles.settingDescription}>Switch between light and dark theme</Text>
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