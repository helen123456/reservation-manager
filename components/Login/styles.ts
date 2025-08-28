import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";

export const createStyles = () => {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

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
      color: "#111827",
      marginBottom: 8,
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 16,
      color: "#6b7280",
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
      color: "#374151",
      marginBottom: 8,
    },
    inputContainer: {
      height: 50,
      position: "relative",
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      backgroundColor: "#f9fafb",
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
      color: "#111827",
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
      color: "#6b7280",
    },
    signInButton: {
      backgroundColor: "#000000",
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
      color: "white",
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
      backgroundColor: "#e5e7eb",
    },
    dividerText: {
      paddingHorizontal: 12,
      fontSize: 14,
      color: "#6b7280",
    },
    googleButton: {
      borderWidth: 1,
      borderColor: "#d1d5db",
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
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
      color: "#374151",
    },
    footer: {
      alignItems: "center",
      marginBottom: 24,
    },
    footerText: {
      fontSize: 14,
      color: "#6b7280",
    },
    signUpLink: {
      color: "#111827",
      fontWeight: "500",
    },
    demoContainer: {
      backgroundColor: "#f3f4f6",
      borderRadius: 8,
      padding: 12,
      alignItems: "center",
    },
    demoTitle: {
      fontSize: 12,
      color: "#6b7280",
      marginBottom: 8,
      textAlign: "center",
    },
    demoText: {
      fontSize: 12,
      color: "#374151",
      textAlign: "center",
    },
    demoBold: {
      fontWeight: "bold",
    },
  });
};
