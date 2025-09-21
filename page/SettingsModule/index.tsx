import { NavBack } from "@/components";
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from "@/hooks/useTranslation";
import { toggleAutoConfirmStatus, toggleReservationStatus } from "@/services/api/reservationService";
import { getQuickSettingInfoApi } from "@/services/api/restaurantSetting";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import QuickSettings from "./QuickSettings";
import SettingsCategory from "./SettingsCategory";
import { createStyles } from "./styles";
import { QuickSettingsState } from "./types";
import { getRestaurantStatus, getSettingsCategories } from "./utils";

export default function SettingsModule() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [quickSettings, setQuickSettings] = useState<QuickSettingsState>({
    acceptReservations: true,
    autoConfirm: false
  });
  useEffect(() => {
    getQuickSettingInfoApi().then((res) => {
      const {isAutoConfirm,acceptReservations}:any = res.data
      setQuickSettings({acceptReservations,autoConfirm:isAutoConfirm});
    });
  }, []);

  const handleSettingChange = (
    key: keyof QuickSettingsState,
    value: boolean
  ) => {
    setQuickSettings((prev) => ({ ...prev, [key]: value }));
    if (key === 'acceptReservations') {
      toggleReservationStatus();
    } else if (key === 'autoConfirm') {
      toggleAutoConfirmStatus();
    }
  };
  const onNavigate = (section: string) => {
    switch (section) {
      case "business-hours":
        router.push("/reserveTimeSetting" as any);
        break;
      case "restaurant-info-setting":
        router.push("/restaurantInfoSetting" as any);
        break;
      default:
        console.log("Navigate to:", section);
    }
  };

  const settingsCategories = getSettingsCategories(onNavigate);
  const restaurantStatus = getRestaurantStatus();
  return (
    <View style={styles.container}>
      <NavBack
        title={t("settings")}
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
