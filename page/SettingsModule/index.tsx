import { NavBack } from "@/components";
import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import QuickSettings from "./QuickSettings";
import SettingsCategory from "./SettingsCategory";
import { createStyles } from "./styles";
import { QuickSettingsState, SettingsModuleProps } from "./types";
import { getRestaurantStatus, getSettingsCategories } from "./utils";

export default function SettingsModule({
  onNavigate,
  onBack,
}: SettingsModuleProps) {
  const { t } = useTranslation();
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [quickSettings, setQuickSettings] = useState<QuickSettingsState>({
    acceptReservations: true,
    autoConfirm: false,
    darkMode: false,
  });

  const handleSettingChange = (
    key: keyof QuickSettingsState,
    value: boolean
  ) => {
    setQuickSettings((prev) => ({ ...prev, [key]: value }));
  };

  const settingsCategories = getSettingsCategories(onNavigate);
  const restaurantStatus = getRestaurantStatus();

  return (
    <View style={styles.container}>
      <NavBack
        title={t("settings")}
        onBack={onBack || (() => {})}
        showBackButton={!!onBack}
      />
      <ScrollView style={styles.scrollContent}>
        {/* Quick Settings */}
        <QuickSettings
          settings={quickSettings}
          onSettingChange={handleSettingChange}
        />

        {/* Settings Categories */}
        <SettingsCategory categories={settingsCategories} />

        {/* Restaurant Status */}
        {/* <RestaurantStatus status={restaurantStatus} /> */}

        {/* About */}
        <TouchableOpacity
          style={[styles.categoryItem, styles.categoryItemDisabled]}
          disabled={true}
        >
          <View style={styles.categoryLeft}>
            <View style={styles.iconContainer}>
              <Feather name="info" size={16} color="#6b7280" />
            </View>
            <View>
              <Text style={styles.categoryItemTitle}>
                {t("about")}
              </Text>
              <Text style={styles.categoryItemDescription}>
                App version and information
              </Text>
            </View>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Soon</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// 导出类型以供外部使用
export type { QuickSettingsState, SettingsModuleProps } from "./types";
