import { NavBack, TimePicker, Toast } from "@/components";
import { useTheme } from "@/contexts/ThemeContext";
import storage from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import times from "lodash/times";
import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useTranslation } from "../../hooks/useTranslation";
import {
  getReservationSettingInfo,
  getReservationSettingUpdate,
} from "../../services/api/reservationService";
import {
  AcceptReservations,
  AvailableTimeSlots,
  BusinessHours,
  MaxReservationsPerSlot,
  PartySizeLimits,
  TimeInterval,
} from "./components";
import { createStyles } from "./styles";
import { IntervalOption, TableSettings, TimeSlot } from "./types";

export default function TableSettingsDetail() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [settings, setSettings] = useState<TableSettings>({
    acceptReservations: true,
    maxGuests: 8,
    minGuests: 1,
    businessHours: {
      start: "09:00",
      end: "23:00",
    },
    timeInterval: 60, // minutes: 60 = 1h, 30 = 30min, 15 = 15min
    maxReservationsPerSlot: 10, // maximum reservations allowed per time slot
    timeSlots: [] as TimeSlot[],
    minAdvanceHours: 2,
    restaurantId: "1",
  });

  // TimePicker 状态管理
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [timeValidationError, setTimeValidationError] = useState<string>("");

  // Generate time slots based on business hours and interval
  const generateTimeSlots = (
    startTime: string,
    endTime: string,
    intervalMinutes: number,
    activeTimeSlots: string[] = []
  ): TimeSlot[] => {
    const start = dayjs(`2000-01-01 ${startTime}`);
    const end = dayjs(`2000-01-01 ${endTime}`);
    const totalMinutes = end.diff(start, "minute");
    const slotCount = Math.floor(totalMinutes / intervalMinutes);
    return times(slotCount, (i) => {
      const time = start.add(i * intervalMinutes, "minute").format("HH:mm");
      const enabled =
        isEmpty(activeTimeSlots) || includes(activeTimeSlots, time);
      return { time, enabled };
    });
  };

  // Initialize time slots on mount and fetch data from API
  useEffect(() => {
    const fetchReservationSettings = async () => {
      try {
        const restaurantId: any = await storage.getItem("restaurantId");
        const data: any = await getReservationSettingInfo(restaurantId);
        // 根据接口数据生成时间段
        const newSlots = generateTimeSlots(
          data.businessHours.start,
          data.businessHours.end,
          data.timeInterval,
          data.timeSlots
        );

        setSettings((prev) => ({
          ...prev,
          acceptReservations: data.acceptReservations,
          maxGuests: data.maxGuests,
          minGuests: data.minGuests,
          businessHours: data.businessHours,
          timeInterval: data.timeInterval,
          maxReservationsPerSlot: data.maxReservationsPerSlot,
          minAdvanceHours: data.minAdvanceHours,
          timeSlots: newSlots,
        }));
      } catch (error) {
        // 如果接口失败，使用默认值
        const defaultSlots = generateTimeSlots("09:00", "23:00", 60, []);
        setSettings((prev) => ({
          ...prev,
          timeSlots: defaultSlots,
        }));
      }
    };
    fetchReservationSettings();
  }, []);

  const toggleTimeSlot = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) =>
        i === index ? { ...slot, enabled: !slot.enabled } : slot
      ),
    }));
  };

  const updateGuestCount = (field: "maxGuests" | "minGuests", value: any) => {
    setSettings((prev: any) => {
      // 验证逻辑：确保 minGuests 不大于 maxGuests
      if (value && field === "minGuests" && value > prev.maxGuests) {
        Toast.fail(t("minGuestsCannotExceedMaxGuests"));
        return prev;
      }

      if (value && field === "maxGuests" && value < prev.minGuests) {
        Toast.fail(t("maxGuestsCannotBeLessThanMinGuests"));
        return prev;
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  // 处理输入框输入
  const handleGuestInputChange = (
    field: "maxGuests" | "minGuests",
    text: string
  ) => {
    // 只允许数字输入
    const numericValue = text.replace(/[^0-9]/g, "");

    const value = numericValue ? Number(numericValue) : numericValue;
    updateGuestCount(field, value);
  };

  const updateMaxReservationsPerSlot = (value: number) => {
    setSettings((prev) => ({
      ...prev,
      maxReservationsPerSlot: Math.max(1, value),
    }));
  };

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
      // 获取当前启用的时间段
      const currentActiveSlots = prev.timeSlots
        .filter((slot) => slot.enabled)
        .map((slot) => slot.time);

      // 根据新的营业时间重新生成时间段
      const newSlots = generateTimeSlots(
        newBusinessHours.start,
        newBusinessHours.end,
        prev.timeInterval,
        currentActiveSlots
      );

      return {
        ...prev,
        businessHours: newBusinessHours,
        timeSlots: newSlots,
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
      // 获取当前启用的时间段
      const currentActiveSlots = prev.timeSlots
        .filter((slot) => slot.enabled)
        .map((slot) => slot.time);

      // 根据新的营业时间重新生成时间段
      const newSlots = generateTimeSlots(
        newBusinessHours.start,
        newBusinessHours.end,
        prev.timeInterval,
        currentActiveSlots
      );

      return {
        ...prev,
        businessHours: newBusinessHours,
        timeSlots: newSlots,
      };
    });
    setShowEndTimePicker(false);
  };

  const handleTimeIntervalChange = (intervalMinutes: number) => {
    setSettings((prev) => {
      // 间隔改变时重置为全选（activeTimeSlots 为空数组表示全选）
      const newSlots = generateTimeSlots(
        prev.businessHours.start,
        prev.businessHours.end,
        intervalMinutes,
        [] // 传入空数组，表示全选状态
      );

      return {
        ...prev,
        timeInterval: intervalMinutes,
        timeSlots: newSlots,
      };
    });
  };

  const handleSave = async () => {
    const { timeSlots, ...rest } = settings;
    const selectTime = timeSlots
      .filter((slot) => slot.enabled)
      .map((slot) => slot.time);
    const restaurantId = await storage.getItem("restaurantId");
    const response: any = await getReservationSettingUpdate({
      ...rest,
      timeSlots: selectTime,
      restaurantId,
    });
    if (response.code === 200) {
      Toast.success(t("saveSuccess"));
    }
  };

  const enabledSlotsCount = settings.timeSlots.filter(
    (slot) => slot.enabled
  ).length;

  const intervalOptions: IntervalOption[] = [
    { value: 60, label: "1h" },
    { value: 30, label: "30min" },
    { value: 15, label: "15min" },
  ];

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }} // 确保内容容器可扩展
        enableOnAndroid={true} // 确保在Android上也启用
        extraScrollHeight={200} // 可额外多滚动一点高度，使输入框更突出据需要调整
      >
        {/* Header */}
        <NavBack
          title={t("reservationSettings")}
          rightComponent={
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Accept Reservations */}
          <AcceptReservations
            acceptReservations={settings.acceptReservations}
            onToggle={(value) =>
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

          {/* Time Interval */}
          <TimeInterval
            currentInterval={settings.timeInterval}
            onIntervalChange={handleTimeIntervalChange}
            styles={styles}
          />

          {/* Max Reservations per Slot */}
          <MaxReservationsPerSlot
            maxReservationsPerSlot={settings.maxReservationsPerSlot}
            onUpdate={updateMaxReservationsPerSlot}
            styles={styles}
          />

          {/* Available Time Slots */}
          <AvailableTimeSlots
            timeSlots={settings.timeSlots}
            onToggleSlot={toggleTimeSlot}
            timeInterval={settings.timeInterval}
            styles={styles}
          />

          {/* Party Size Limits */}
          <PartySizeLimits
            minGuests={settings.minGuests}
            maxGuests={settings.maxGuests}
            onUpdateGuestCount={updateGuestCount}
            onGuestInputChange={handleGuestInputChange}
            styles={styles}
          />
        </ScrollView>

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
      </KeyboardAwareScrollView>
    </View>
  );
}
