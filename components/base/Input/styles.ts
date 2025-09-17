import { StyleSheet } from 'react-native';


// 创建动态样式函数
export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.mutedForeground,
      marginBottom: 10,
    },
    required: {
      color: theme.destructive, // 红色表示必填
    },
    inputContainer: {
      height: 50,
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      backgroundColor: theme.inputBackground,
    },
    focusedContainer: {
      borderColor: theme.primary,
      elevation: 2,
    },
    errorContainer: {
      borderColor: theme.destructive,
    },
    disabledContainer: {
      backgroundColor: theme.muted,
      borderColor: theme.border,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: theme.text,
      height: '100%',
      backgroundColor:'transparent',
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
      color: theme.destructive,
      marginTop: 4,
      marginLeft: 4,
    },
    helperText: {
      fontSize: 12,
      color: theme.mutedForeground,
      marginTop: 4,
      marginLeft: 4,
    },
  });
};