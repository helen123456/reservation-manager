import { StyleSheet } from "react-native";

export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: theme.card,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
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
      color: theme.text,
    },
    saveButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    saveIcon: {
      marginRight: 4,
    },
    saveText: {
      color: theme.primaryForeground,
      fontSize: 14,
      fontWeight: "500",
    },
    scrollView: {
      flex: 1,
      paddingHorizontal: 16,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 16,
      marginTop: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    partyLimitsContainer:{
marginBottom:60
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
      color: theme.text,
    },
    cardSubtitle: {
      fontSize: 14,
      color: theme.mutedForeground,
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
      color: theme.mutedForeground,
      marginBottom: 6,
    },
    timeInput: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: theme.inputBackground,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    timeInputText: {
      fontSize: 16,
      color: theme.text,
    },
    numberInput: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 6,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      backgroundColor: theme.inputBackground,
      color: theme.text,
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
      borderColor: theme.border,
      backgroundColor: theme.card,
      alignItems: "center",
    },
    intervalButtonActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    intervalButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.mutedForeground,
    },
    intervalButtonTextActive: {
      color: theme.primaryForeground,
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
      borderColor: theme.border,
      backgroundColor: theme.card,
      alignItems: "center",
      justifyContent: "center",
    },
    counterButtonDisabled: {
      backgroundColor: theme.muted,
    },
    counterContent: {
      flex: 1,
      alignItems: "center",
    },
    counterValue: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
    },
    counterLabel: {
      fontSize: 12,
      color: theme.mutedForeground,
    },
    slotsHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    badge: {
      backgroundColor: theme.muted,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: theme.border,
    },
    badgeText: {
      fontSize: 12,
      color: theme.mutedForeground,
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
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    slotButtonInactive: {
      backgroundColor: theme.card,
      borderColor: theme.border,
    },
    slotButtonText: {
      fontSize: 14,
      fontWeight: "500",
    },
    slotButtonTextActive: {
      color: theme.primaryForeground,
    },
    slotButtonTextInactive: {
      color: theme.mutedForeground,
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
      borderColor: theme.border,
      backgroundColor: theme.card,
      alignItems: "center",
      justifyContent: "center",
    },
    guestButtonDisabled: {
      backgroundColor: theme.muted,
    },
    guestValue: {
      fontSize: 14,
      fontWeight: "500",
      minWidth: 24,
      textAlign: "center",
      color: theme.text,
    },
    guestInput: {
      fontSize: 14,
      fontWeight: "500",
      minWidth: 40,
      height:32,
      lineHeight:16,
      textAlign: "center",
      textAlignVertical: 'center',
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 4,
      // backgroundColor: theme.inputBackground,
      paddingHorizontal: 8,
      paddingVertical:0
    },
  });
};
  