import { Colors } from "@/constants/Colors";
import { StyleSheet, ColorSchemeName } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  const colors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flex: 1,
      justifyContent: "center",
      padding: 16,
    },
    
    header: {
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
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
      color: colors.text,
      marginBottom: 8,
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
      color: colors.text,
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
      color: colors.mutedForeground,
    },
    signInButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      minHeight: 48,
    },
    disabledButton: {
      opacity: 0.6,
    },
    signInButtonText: {
      color: colors.primaryForeground,
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
      backgroundColor: colors.border,
    },
    dividerText: {
      paddingHorizontal: 12,
      fontSize: 14,
      color: colors.mutedForeground,
    },
    googleButton: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
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
      color: colors.text,
    },
    footer: {
      alignItems: "center",
      marginBottom: 24,
    },
    footerText: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    signUpLink: {
      color: colors.text,
      fontWeight: "500",
    },
    demoContainer: {
      backgroundColor: colors.muted,
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
    },
    demoTitle: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginBottom: 8,
      textAlign: "center",
    },
    demoText: {
      fontSize: 12,
      color: colors.text,
      textAlign: "center",
    },
    demoBold: {
      fontWeight: "bold",
    },
  });
};
