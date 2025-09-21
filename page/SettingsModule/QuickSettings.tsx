import { useTheme } from '@/contexts/ThemeContext';
import React, { useMemo } from 'react';
import { Switch, Text, View } from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
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

      
    </View>
  );
}