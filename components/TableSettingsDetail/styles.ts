import { Colors } from "@/constants/Colors";
import { StyleSheet, ColorSchemeName } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  const colors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      padding: 8,
      marginRight: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    saveButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    saveIcon: {
      marginRight: 4,
    },
    saveText: {
      color: colors.primaryForeground,
      fontSize: 14,
      fontWeight: "500",
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginTop: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    lastCard: {
      marginBottom: 20,
    },
    cardRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardContent: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
      color: colors.text,
    },
    cardSubtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    row: {
      flexDirection: "row",
      gap: 12,
      marginTop: 12,
    },
    inputGroup: {
      flex: 1,
    },
    label: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 6,
    },
    timeInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    numberInput: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: colors.inputBackground,
      color: colors.text,
    },
    intervalRow: {
      flexDirection: "row",
      gap: 8,
      marginTop: 12,
    },
    intervalButton: {
      flex: 1,
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: "center",
    },
    intervalButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    intervalButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.mutedForeground,
    },
    intervalButtonTextActive: {
      color: colors.primaryForeground,
    },
    counterRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 8,
    },
    counterButton: {
      width: 32,
      height: 32,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
    },
    counterButtonDisabled: {
      backgroundColor: colors.muted,
    },
    counterContent: {
      flex: 1,
      alignItems: "center",
    },
    counterValue: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    counterLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    slotsHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    badge: {
      backgroundColor: colors.muted,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    badgeText: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    slotsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 12,
    },
    slotButton: {
      width: "30%",
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 6,
      borderWidth: 1,
      alignItems: "center",
    },
    slotButtonActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    slotButtonInactive: {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    slotButtonText: {
      fontSize: 14,
      fontWeight: "500",
    },
    slotButtonTextActive: {
      color: colors.primaryForeground,
    },
    slotButtonTextInactive: {
      color: colors.mutedForeground,
    },
    guestGroup: {
      flex: 1,
    },
    guestCounter: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    guestButton: {
      width: 28,
      height: 28,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.card,
      alignItems: "center",
      justifyContent: "center",
    },
    guestButtonDisabled: {
      backgroundColor: colors.muted,
    },
    guestValue: {
      fontSize: 14,
      fontWeight: "500",
      minWidth: 24,
      textAlign: "center",
      color: colors.text,
    },
  });
};
  