import { i18n } from "@/utils/i18n";
import React, { useMemo } from "react";
import {
  Modal as RNModal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useTheme } from '@/hooks/ThemeContext';
import { createStyles } from "./styles";
import { ModalProps } from "./types";


export const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  cancelText = i18n.t("modelCancel"),
  sureText = i18n.t("modelOk"),
  onCancel,
  onOk,
  showCancel = true,
  showOk = true,
  cancelButtonColor = "#f5f5f5",
  okButtonColor = "#000",
  cancelTextColor = "#333",
  okTextColor = "#fff",
  onBackdropPress,
  footer = true,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const handleBackdropPress = () => {
    if (onBackdropPress) {
      onBackdropPress();
    } else if (onCancel) {
      onCancel();
    }
  };

  const renderButtons = () => {
    // 如果 footer 为 false，不渲染底部按钮
    if (!footer) {
      return null;
    }

    const hasCancel = showCancel;
    const hasOk = showOk;

    if (!hasCancel && !hasOk) {
      return null;
    }

    if (hasCancel && hasOk) {
      // 两个按钮的样式
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.cancelButton,
              { backgroundColor: cancelButtonColor },
            ]}
            onPress={onCancel}
          >
            <Text style={[styles.buttonText, { color: cancelTextColor }]}>
              {cancelText}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              styles.okButton,
              { backgroundColor: okButtonColor },
            ]}
            onPress={onOk}
          >
            <Text style={[styles.buttonText, { color: okTextColor }]}>
              {sureText}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    // 单个按钮的样式
    const singleButtonColor = hasOk ? okButtonColor : cancelButtonColor;
    const singleTextColor = hasOk ? okTextColor : cancelTextColor;
    const singleButtonText = hasOk ? sureText : cancelText;
    const singleButtonAction = hasOk ? onOk : onCancel;

    return (
      <View style={styles.singleButtonContainer}>
        <TouchableOpacity
          style={[styles.singleButton, { backgroundColor: singleButtonColor }]}
          onPress={singleButtonAction}
        >
          <Text style={[styles.buttonText, { color: singleTextColor }]}>
            {singleButtonText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleBackdropPress}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* 右上角关闭按钮 - 只在 footer 为 false 时显示 */}
              {!footer && onCancel && (
                <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              )}

              {title && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                </View>
              )}

              <View style={styles.content}>{children}</View>

              {renderButtons()}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export default Modal;
