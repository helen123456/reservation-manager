
import { StyleSheet } from 'react-native';

// 创建动态样式函数
const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background
    },
    scrollContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
    },
    stepIndicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
      alignItems: 'center',
    },
    stepLine: {
      width: 40,
      height: 2,
      backgroundColor: theme.mutedForeground,
      marginHorizontal: 5,
    },
    stepIndicator: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      backgroundColor: theme.mutedForeground,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    stepNumber:{
      color: theme.primaryForeground,
      fontSize: 16,
      fontWeight: "500",
    },
    header: {
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      color: theme.text,
      marginBottom: 30,
      lineHeight: 32,
      fontWeight: "500",
    },
    subtitle: {
      marginTop:4,
      marginBottom:15,
      fontSize: 16,
      color: theme.mutedForeground,
      textAlign: "center",
    },
    form: {
      marginBottom: 24,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.text,
      marginBottom: 8,
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
    inputIcon: {
      position: "absolute",
      left: 12,
      zIndex: 1,
    },
    input: {
      paddingVertical: 0,
      height: 60,
      lineHeight:30,
      flex: 1,
      paddingTop:6,
      paddingLeft: 44,
      paddingRight: 12,
      fontSize: 16,
      color: theme.text,
      textAlignVertical: "center",
    },
    passwordInput: {
      paddingRight: 44,
    },
    eyeIcon: {
      position: "absolute",
      right: 12,
      padding: 4,
    },
    forgotPasswordContainer: {
      alignItems: "flex-end",
      marginBottom: 16,
    },
    forgotPasswordText: {
      fontSize: 14,
      color: theme.mutedForeground,
    },
    signInButton: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 48,
    },
    disabledButton: {
      opacity: 0.6,
    },
    signInButtonText: {
      color: theme.primaryForeground,
      fontSize: 16,
      fontWeight: "500",
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 24,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.border,
    },
    dividerText: {
      paddingHorizontal: 12,
      fontSize: 14,
      color: theme.mutedForeground,
    },
    googleButton: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.card,
      marginBottom: 24,
    },
    googleButtonContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    googleIcon: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: "#4285f4",
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },
    googleIconText: {
      color: "white",
      fontSize: 12,
      fontWeight: "bold",
    },
    googleButtonText: {
      fontSize: 16,
      color: theme.text,
    },
    footer: {
      alignItems: "center",
      marginBottom: 24,
    },
    footerText: {
      fontSize: 14,
      color: theme.mutedForeground,
    },
    signUpLink: {
      color: theme.text,
      fontWeight: "500",
    },
    demoContainer: {
      backgroundColor: theme.muted,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
    },
    demoTitle: {
      fontSize: 12,
      color: theme.mutedForeground,
      marginBottom: 8,
      textAlign: "center",
    },
    demoText: {
      fontSize: 12,
      color: theme.text,
      textAlign: "center",
    },
    demoBold: {
      fontWeight: "bold",
    },
  });
};
export default createStyles;
