import { NavBack, Toast } from "@/components";
import { useTheme } from '@/hooks/ThemeContext';
import storage from "@/utils/storage";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import includes from "lodash/includes";
import isEmpty from "lodash/isEmpty";
import times from "lodash/times";
import React, { useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { getReservationSettingInfo, getReservationSettingUpdate } from "../../services/api/reservationService";
import { createStyles } from "./styles";
import {
  IntervalOption,
  TableSettings,
  TableSettingsDetailProps,
  TimeSlot,
} from "./types";

export default function TableSettingsDetail({
  onBack,
}: TableSettingsDetailProps) {
  const { t } = useTranslation();
  const {theme} = useTheme();
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
    restaurantId: 1,
  });

  // Generate time slots based on business hours and interval
  const generateTimeSlots = (
    startTime: string,
    endTime: string,
    intervalMinutes: number,
    activeTimeSlots: string[] = []
  ): TimeSlot[] => {
    const start = dayjs(`2000-01-01 ${startTime}`);
    const end = dayjs(`2000-01-01 ${endTime}`);
    const totalMinutes = end.diff(start, 'minute');
    const slotCount = Math.floor(totalMinutes / intervalMinutes);
    return times(slotCount, (i) => {
      const time = start.add(i * intervalMinutes, 'minute').format('HH:mm');
      const enabled = isEmpty(activeTimeSlots) || includes(activeTimeSlots, time);
      return { time, enabled };
    });
  };

  // Initialize time slots on mount and fetch data from API
  useEffect(() => {
    const fetchReservationSettings = async () => {
      try {
        const restaurantId:any = await  storage.getItem('restaurantId')
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
        console.error('Failed to fetch reservation settings:', error);
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

  const updateGuestCount = (
    field: "maxGuests" | "minGuests",
    value: number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [field]: Math.max(1, value),
    }));
  };

  const updateMaxReservationsPerSlot = (value: number) => {
    setSettings((prev) => ({
      ...prev,
      maxReservationsPerSlot: Math.max(1, value),
    }));
  };

  const handleBusinessHoursChange = (field: "start" | "end", value: string,onlyUpdate:boolean) => {
    // 限制只能输入数字和冒号，格式为 HH:MM
    const timeRegex = /^[0-9:]*$/;
    if (!timeRegex.test(value)) {
      return; // 如果输入不符合格式，直接返回不更新
    }
    
    if(onlyUpdate){
      setSettings((prev) => ({
        ...prev,
        businessHours: { ...prev.businessHours, [field]: value },
      }));
      return
    }
    setSettings((prev) => {
      const newBusinessHours = { ...prev.businessHours, [field]: value };
      // 获取当前启用的时间段
      const currentActiveSlots = prev.timeSlots
        .filter(slot => slot.enabled)
        .map(slot => slot.time)
      
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

  const handleSave = async() => {
    const {timeSlots,...rest} = settings
    const selectTime = timeSlots.filter(slot => slot.enabled).map(slot=>slot.time)
    const restaurantId = await  storage.getItem('restaurantId')
    const response:any = await getReservationSettingUpdate({...rest,timeSlots:selectTime,restaurantId});
    if(response.code === 200){
     Toast.success(t('saveSuccess'))
    }
  };

  const enabledSlotsCount = settings.timeSlots.filter(
    (slot) => slot.enabled
  ).length;

  const intervalOptions: IntervalOption[] = [
    { value: 60, label: "1h"},
    { value: 30, label: "30min" },
    { value: 15, label: "15min"},
  ];


  return (
    <View style={styles.container}>
      {/* Header */}
      <NavBack
        title={t("reservationSettings")}
        onBack={onBack}
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
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>
                {t("acceptReservations")}
              </Text>
              <Text style={styles.cardSubtitle}>
                {t("allowCustomersBookOnline")}
              </Text>
            </View>
            <Switch
              value={settings.acceptReservations}
              onValueChange={(value) =>
                setSettings((prev) => ({ ...prev, acceptReservations: value }))
              }
            />
          </View>
        </View>

        {/* Business Hours */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("businessHours")}</Text>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("openingTime")}</Text>
              <TextInput
                inputMode="numeric"
                style={styles.timeInput}
                value={settings.businessHours.start}
                onChangeText={(value) =>
                  handleBusinessHoursChange("start", value,true)
                }
                onBlur={(e) => {
                  handleBusinessHoursChange("start", e.nativeEvent.text, false)
                }}
                placeholder="09:00"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("closingTime")}</Text>
              <TextInput
                inputMode="numeric"
                style={styles.timeInput}
                value={settings.businessHours.end}
                onChangeText={(value) =>
                  handleBusinessHoursChange("end", value,true)
                }
                 onBlur={(e) => {
                  handleBusinessHoursChange("end", e.nativeEvent.text,false)
                }}
                placeholder="23:00"
              />
            </View>
          </View>
        </View>

        {/* Time Interval */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("timeInterval")}</Text>
          <View style={styles.intervalRow}>
            {intervalOptions.map(({ value, label }) => (
              <TouchableOpacity
                key={value}
                onPress={() => handleTimeIntervalChange(value)}
                style={[
                  styles.intervalButton,
                  settings.timeInterval === value &&
                    styles.intervalButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.intervalButtonText,
                    settings.timeInterval === value &&
                      styles.intervalButtonTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Max Reservations per Slot */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t("maxReservationsPerSlot")}
          </Text>
          <Text style={styles.cardSubtitle}>
            {t("maxReservationsDescription")}
          </Text>
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={[
                styles.counterButton,
                settings.maxReservationsPerSlot <= 1 &&
                  styles.counterButtonDisabled,
              ]}
              onPress={() =>
                updateMaxReservationsPerSlot(
                  settings.maxReservationsPerSlot - 1
                )
              }
              disabled={settings.maxReservationsPerSlot <= 1}
            >
              <Ionicons
                name="remove"
                size={14}
                color={settings.maxReservationsPerSlot <= 1 ? "#ccc" : "#000"}
              />
            </TouchableOpacity>
            <View style={styles.counterContent}>
              <Text style={styles.counterValue}>
                {settings.maxReservationsPerSlot}
              </Text>
              <Text style={styles.counterLabel}>
                {t("reservations")}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() =>
                updateMaxReservationsPerSlot(
                  settings.maxReservationsPerSlot + 1
                )
              }
            >
              <Ionicons name="add" size={14} color={theme.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Time Slots */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.slotsHeader}>
              <Ionicons name="time" size={18} color="#000" />
              <Text style={styles.cardTitle}>
                {t("availableTimeSlots")}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {enabledSlotsCount} {t("active")}
              </Text>
            </View>
          </View>

          <View style={styles.slotsGrid}>
            {settings.timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={`${slot.time}-${settings.timeInterval}`}
                onPress={() => toggleTimeSlot(index)}
                style={[
                  styles.slotButton,
                  slot.enabled
                    ? styles.slotButtonActive
                    : styles.slotButtonInactive,
                ]}
              >
                <Text
                  style={[
                    styles.slotButtonText,
                    slot.enabled
                      ? styles.slotButtonTextActive
                      : styles.slotButtonTextInactive,
                  ]}
                >
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Party Size Limits */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {t("partySizeLimits")}
          </Text>

          <View style={styles.row}>
            <View style={styles.guestGroup}>
              <Text style={styles.label}>{t("minimumGuests")}</Text>
              <View style={styles.guestCounter}>
                <TouchableOpacity
                  style={[
                    styles.guestButton,
                    settings.minGuests <= 1 && styles.guestButtonDisabled,
                  ]}
                  onPress={() =>
                    updateGuestCount("minGuests", settings.minGuests - 1)
                  }
                  disabled={settings.minGuests <= 1}
                >
                  <Ionicons
                    name="remove"
                    size={14}
                    color={settings.minGuests <= 1 ? "#ccc" : "#000"}
                  />
                </TouchableOpacity>
                <Text style={styles.guestValue}>{settings.minGuests}</Text>
                <TouchableOpacity
                  style={styles.guestButton}
                  onPress={() =>
                    updateGuestCount("minGuests", settings.minGuests + 1)
                  }
                >
                  <Ionicons name="add" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.guestGroup}>
              <Text style={styles.label}>{t("maximumGuests")}</Text>
              <View style={styles.guestCounter}>
                <TouchableOpacity
                  style={[
                    styles.guestButton,
                    settings.maxGuests <= settings.minGuests &&
                      styles.guestButtonDisabled,
                  ]}
                  onPress={() =>
                    updateGuestCount("maxGuests", settings.maxGuests - 1)
                  }
                  disabled={settings.maxGuests <= settings.minGuests}
                >
                  <Ionicons
                    name="remove"
                    size={14}
                    color={
                      settings.maxGuests <= settings.minGuests ? "#ccc" : "#000"
                    }
                  />
                </TouchableOpacity>
                <Text style={styles.guestValue}>{settings.maxGuests}</Text>
                <TouchableOpacity
                  style={styles.guestButton}
                  onPress={() =>
                    updateGuestCount("maxGuests", settings.maxGuests + 1)
                  }
                >
                  <Ionicons name="add" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
