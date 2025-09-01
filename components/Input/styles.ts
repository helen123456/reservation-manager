import { Colors } from "@/constants/Colors";
import { Platform, StyleSheet, ColorSchemeName } from 'react-native';

// 创建动态样式函数
export const createStyles = (colorScheme: ColorSchemeName) => {
  const colors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.mutedForeground,
      marginBottom: 6,
    },
    required: {
      color: colors.destructive, // 红色表示必填
    },
    inputContainer: {
      height: 50,
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      backgroundColor: colors.inputBackground,
    },
    focusedContainer: {
      borderColor: colors.primary,
      elevation: 2,
    },
    errorContainer: {
      borderColor: colors.destructive,
    },
    disabledContainer: {
      backgroundColor: colors.muted,
      borderColor: colors.border,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      paddingHorizontal: 12,
      height: 60,
      paddingVertical: Platform.OS === 'ios' ? 12 : 8,
      textAlignVertical: 'center',
    },
    inputWithLeftIcon: {
      paddingLeft: 8,
    },
    inputWithRightIcon: {
      paddingRight: 8,
    },
    androidFix: {
      paddingVertical: 12,
    },
    icon: {
      padding: 8,
    },
    leftIcon: {
      marginLeft: 4,
    },
    rightIcon: {
      marginRight: 4,
    },
    clearButton: {
      padding: 8,
      marginRight: 4,
    },
    errorText: {
      fontSize: 12,
      color: colors.destructive,
      marginTop: 4,
      marginLeft: 4,
    },
    helperText: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 4,
      marginLeft: 4,
    },
  });
};