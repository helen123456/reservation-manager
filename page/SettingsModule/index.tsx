import { NavBack } from "@/components";
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from "@/hooks/useTranslation";
import { toggleAutoConfirmStatus, toggleReservationStatus } from "@/services/api/reservationService";
import { getQuickSettingInfoApi } from "@/services/api/restaurantSetting";
import { pushNotificationService } from "@/services/pushNotificationService";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useMemo, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import QuickSettings from "./QuickSettings";
import SettingsCategory from "./SettingsCategory";
import { createStyles } from "./styles";
import { QuickSettingsState } from "./types";
import { getRestaurantStatus, getSettingsCategories } from "./utils";
import storage from "@/utils/storage";

export default function SettingsModule() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [quickSettings, setQuickSettings] = useState<QuickSettingsState>({
    acceptReservations: true,
    autoConfirm: false
  });
  
  // 使用 useFocusEffect 确保每次页面获得焦点时都重新请求数据
  useFocusEffect(
    useCallback(() => {
      const fetchQuickSettings = async () => {
        try {
          const res = await getQuickSettingInfoApi();
          const { isAutoConfirm, acceptReservations }: any = res.data;
          setQuickSettings({ acceptReservations, autoConfirm: isAutoConfirm });
        } catch (error) {
          console.error('Failed to fetch quick settings:', error);
        }
      };
      
      fetchQuickSettings();
    }, [])
  );

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

  // 测试推送通知功能
  const handleTestNotification = useCallback(async () => {
    try {
      let uid = storage.getItem("uid");
      
      const pushToken = pushNotificationService.getCurrentPushToken();
      if (!pushToken) {
        Alert.alert('提示', '推送令牌未获取，请确保已授权通知权限');
        return;
      }

      await pushNotificationService.sendLocalNotification(
        '测试通知',
        '这是一条测试推送通知，功能正常工作！',
        { type: 'test', timestamp: Date.now() }
      );
      
      Alert.alert('成功', '测试通知已发送');
    } catch (error) {
      console.error('发送测试通知失败:', error);
      Alert.alert('错误', '发送测试通知失败');
    }
  }, []);
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

        {/* Test Notification */}
        <TouchableOpacity
          style={[styles.categoryItem]}
          onPress={handleTestNotification}
        >
          <View style={styles.categoryLeft}>
            <View style={styles.iconContainer}>
              <Feather name="bell" size={16} color={theme.primary} />
            </View>
            <View>
              <Text style={styles.categoryItemTitle}>
                测试推送通知
              </Text>
              <Text style={styles.categoryItemDescription}>
                发送一条测试通知验证功能
              </Text>
            </View>
          </View>
          <Feather name="chevron-right" size={16} color="#9ca3af" />
        </TouchableOpacity>

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
