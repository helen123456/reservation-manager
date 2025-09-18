import { Text } from '@/components';
import { useTheme } from "@/hooks/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { PickerView } from "@ant-design/react-native";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import { createStyles } from "./styles";
import { baseColumns } from "./types";

export default function TimePicker({
  visible,
  value,
  startTime,
  endTime,
  flag,
  onConfirm,
  onCancel,
  title,
}: any) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const styles = createStyles(theme);
  const [time, setTime] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  // 先生成并设置columns
  const columns = baseColumns();

  // 在 visible 展示之前计算 columns
  useEffect(() => {
    if (visible) {
      if (value) {
        setTime(value.split(":") || ["00", "00"]);
      } else {
        setTime(["00", "00"]);
      }
    }
  }, [visible, value]);

  // 处理确认
  const handleConfirm = () => {
    const selectedTime = time.join(":");
    const currentTime = dayjs(`2000-01-01 ${selectedTime}`);
    const end = dayjs(`2000-01-01 ${endTime}`);
    const start = dayjs(`2000-01-01 ${startTime}`);
    if (flag === "start" && (currentTime.isAfter(end) || currentTime.isSame(end))) {
      setError(t("startTimeAfterEndTime"));
      return;
    }
    if (flag === "end" && (currentTime.isBefore(start) || currentTime.isSame(start))) {
      setError(t("endTimeBeforeStartTime"));
      return;
    }
    setError("");
    onConfirm(selectedTime);
  };

  // 处理取消
  const handleCancel = () => {
    onCancel();
  };
  const onChange = (time: any) => {
    setTime(time);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleCancel}
      style={{ zIndex: 100 }}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancelText}>{t("cancel")}</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{t("selectTime")}</Text>
            <TouchableOpacity onPress={handleConfirm}>
              <Text style={[styles.confirmText]}>{t("confirm")}</Text>
            </TouchableOpacity>
          </View>

          <PickerView
            data={columns}
            value={time}
            onChange={onChange}
            cascade={false}
          />

          {/* Current Selection Display */}
          <View style={styles.selectionDisplay}>
            <Text style={styles.selectionText}>{t("selectedTime")}: {time.join(":")}</Text>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}
