import { Input, NavBack, TimePicker, Toast } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getBaseSettingInfoApi,
  updateBaseSettingInfoApi,
} from "@/services/api/restaurantSetting";
import storage from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import z from "zod";
import { AcceptReservations, BusinessHours } from "./components";
import { createStyles } from "./styles";

const schema = z.object({
  name: z.string().min(1, { message: "请输入姓名" }),
  email: z.string().email({ message: "请输入有效的邮箱" }),
  phone: z.string().min(1, { message: "请输入手机号" }),
  address: z.string().min(1, { message: "请输入地址" }),
});

export default function TableSettingsDetail() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [settings, setSettings] = useState({
    businessHours: {
      start: "09:00",
      end: "23:00",
    },
    acceptReservations: true,
  });

  // TimePicker 状态管理
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "Marie Dubois",
      email: "marie@lepetitbistro.com",
      phone: "122",
      address: "123 Rue de la Paix, Paris, France",
    },
    resolver: zodResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isValid },
    reset,
  } = methods;

  // Initialize time slots on mount and fetch data from API
  useEffect(() => {
    const fetchReservationSettings = async () => {
      try {
        const res = await getBaseSettingInfoApi();
        const { businessHours, acceptReservations, ...rest } = res.data || {};
        setSettings((prev) => ({
          ...prev,
          businessHours,
        }));
        reset(rest);
      } catch (error) {
        console.log(error);
      }
      fetchReservationSettings();
    };
  }, []);

  // 处理开始时间选择
  const handleStartTimeSelect = (time: string) => {
    const currentTime = dayjs(`2000-01-01 ${time}`);
    const endTime = dayjs(`2000-01-01 ${settings.businessHours.end}`);
    if (currentTime.isAfter(endTime)) {
      Toast.fail(t("startTimeAfterEndTime"));
      return;
    }
    setSettings((prev) => {
      const newBusinessHours = { ...prev.businessHours, start: time };

      return {
        ...prev,
        businessHours: newBusinessHours,
      };
    });
    setShowStartTimePicker(false);
  };

  // 处理结束时间选择
  const handleEndTimeSelect = (time: string) => {
    const currentTime = dayjs(`2000-01-01 ${time}`);
    const startTime = dayjs(`2000-01-01 ${settings.businessHours.start}`);
    if (currentTime.isBefore(startTime)) {
      Toast.fail(t("endTimeBeforeStartTime"));
      return;
    }
    setSettings((prev) => {
      const newBusinessHours = { ...prev.businessHours, end: time };
      return {
        ...prev,
        businessHours: newBusinessHours,
      };
    });
    setShowEndTimePicker(false);
  };

  const handleSave = async (data: z.infer<typeof schema>) => {
    if (!isValid) return;
    try {
      const restaurantId = await storage.getItem("restaurantId");
      updateBaseSettingInfoApi({
        ...settings,
        ...data,
        restaurantId,
      })
        .then(() => {
          Toast.success(t("saveSuccess"));
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {/* Header */}
      <NavBack
        title={t("reservationSettings")}
        rightComponent={
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit(handleSave)}
          >
            <Ionicons
              name="save"
              size={14}
              color={theme.primaryForeground}
              style={styles.saveIcon}
            />
            <Text style={styles.saveText}>{t("save")}</Text>
          </TouchableOpacity>
        }
      />

      <KeyboardAwareScrollView
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1 }} // 确保内容容器可扩展
        enableOnAndroid={true} // 确保在Android上也启用
        extraScrollHeight={200} // 可额外多滚动一点高度，使输入框更突出据需要调整
        showsVerticalScrollIndicator={false}
      >
          <FormProvider {...methods}>
            <Input
              name={"name"}
              label={t("name")}
              placeholder={"请输入店铺名称"}
            />

            <Input
              inputMode="email"
              name={"email"}
              label={t("email")}
              placeholder={"请输入店铺邮箱"}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              inputMode="tel"
              name={"phone"}
              label={t("phone")}
              placeholder={"请输入店铺手机号"}
              keyboardType="phone-pad"
            />

            <Input
              name={"address"}
              label={t("address")}
              placeholder={"请输入店铺地址"}
              multiline
              numberOfLines={2}
            />
          </FormProvider>
          {/* Accept Reservations */}
          <AcceptReservations
            acceptReservations={settings.acceptReservations}
            onToggle={(value: any) =>
              setSettings({ ...settings, acceptReservations: value })
            }
            styles={styles}
          />
          {/* Business Hours */}
          <BusinessHours
            startTime={settings.businessHours.start}
            endTime={settings.businessHours.end}
            onStartTimePress={() => setShowStartTimePicker(true)}
            onEndTimePress={() => setShowEndTimePicker(true)}
            styles={styles}
          />
        </KeyboardAwareScrollView>

      <TimePicker
        visible={showStartTimePicker}
        value={settings.businessHours.start}
        flag="start"
        endTime={settings.businessHours.end}
        onConfirm={handleStartTimeSelect}
        onCancel={() => setShowStartTimePicker(false)}
      />
      <TimePicker
        flag="end"
        visible={showEndTimePicker}
        value={settings.businessHours.end}
        startTime={settings.businessHours.start}
        onConfirm={handleEndTimeSelect}
        onCancel={() => setShowEndTimePicker(false)}
      />
    </SafeAreaView>
  );
}
