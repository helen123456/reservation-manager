import { Feather } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useTheme } from '@/hooks/ThemeContext';
import { useTranslation } from "../../hooks/useTranslation";
import { NavBack } from "../NavBack";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import QuickSettings from "./QuickSettings";
import RestaurantStatus from "./RestaurantStatus";
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

  const settingsCategories = getSettingsCategories(t, onNavigate);
  const restaurantStatus = getRestaurantStatus();

  return (
    <ThemedView style={styles.container}>
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
        <RestaurantStatus status={restaurantStatus} />

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
              <ThemedText style={styles.categoryItemTitle}>
                {t("about")}
              </ThemedText>
              <ThemedText style={styles.categoryItemDescription}>
                App version and information
              </ThemedText>
            </View>
          </View>
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>Soon</ThemedText>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

// 导出类型以供外部使用
export type { QuickSettingsState, SettingsModuleProps } from "./types";
