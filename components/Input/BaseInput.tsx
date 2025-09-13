import Icon from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from '@/hooks/ThemeContext';
import { createStyles } from "./styles";

import { BaseInputProps } from "./types";

export const BaseInput = forwardRef<TextInput, BaseInputProps>(
  (
    {
      value,
      onChangeText,
      onBlur,
      error,
      label,
      placeholder,
      helperText,
      leftIcon,
      rightIcon,
      inputMode = "text",
      iconColor = "#6b7280",
      iconSize = 20,
      clearable = true,
      disabled = false,
      required = false,
      containerStyle,
      inputContainerStyle,
      inputStyle,
      labelStyle,
      errorStyle,
      helperStyle,
      onClear,
      onIconPress,
      ...textInputProps
    },
    ref
  ) => {
    const {theme} = useTheme();
    const styles = useMemo(() => createStyles(theme), [theme]);
    const [focused, setFocused] = useState(false);
    const blurTimeoutRef = useRef<number | null>(null);

    const handleClear = useCallback(() => {
      // 清除延迟的失焦处理
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }

      onChangeText?.("");
      onClear?.();

      // 立即设置失焦状态
      setFocused(false);
    }, [onChangeText, onClear]);

    const handleFocus = () => {
      // 清除可能存在的延迟失焦
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
      setFocused(true);
    };

    const handleBlur = useCallback(() => {
      // 延迟处理失焦，给清除按钮点击事件留出时间
      blurTimeoutRef.current = setTimeout(() => {
        setFocused(false);
        onBlur?.();
      }, 100); // 100ms 延迟
    }, [onBlur]);

    return (
      <View style={[styles.container, containerStyle]}>
        {/* 标签 */}
        {label && (
          <Text style={[styles.label, labelStyle]}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        )}

        {/* 输入框容器 */}
        <View
          style={[
            styles.inputContainer,
            inputContainerStyle,
            error && styles.errorContainer,
            disabled && styles.disabledContainer,
          ]}
        >
          {/* 左侧图标 */}
          {!!leftIcon && (
            <Icon
              name={leftIcon as any}
              size={iconSize}
              color={iconColor}
              style={[styles.icon, styles.leftIcon]}
            />
          )}

          {/* 输入框 */}
          <TextInput
            ref={ref}
            style={[
              styles.input,
              leftIcon && styles.inputWithLeftIcon,
              (rightIcon || clearable) && styles.inputWithRightIcon,
              Platform.OS === "android" && styles.androidFix,
              inputStyle,
            ]}
            inputMode={inputMode}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            editable={!disabled}
            cursorColor={"#6b7280"}
            underlineColorAndroid="transparent" 
            {...textInputProps}
          />

          {/* 清除按钮 - 只在 focused 状态且有值时显示 */}
          {clearable && !!value && !disabled && focused && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <MaterialIcons name="clear" size={iconSize} color={iconColor} />
            </TouchableOpacity>
          )}

          {/* 右侧图标 */}
          {!!rightIcon && !clearable && (
            <TouchableOpacity
              onPress={onIconPress}
              style={[styles.icon, styles.rightIcon]}
            >
              <Icon name={rightIcon as any} size={iconSize} color={iconColor} />
            </TouchableOpacity>
          )}
        </View>

        {/* 错误信息 */}
        {!!error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}

        {/* 辅助文本 */}
        {!error && !!helperText && (
          <Text style={[styles.helperText, helperStyle]}>{helperText}</Text>
        )}
      </View>
    );
  }
);

BaseInput.displayName = "BaseInput";
