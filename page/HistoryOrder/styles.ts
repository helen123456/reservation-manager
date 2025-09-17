import { StyleSheet } from "react-native";

export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    reservationItem: {
      borderRadius: 8,
      marginVertical: 4,
      borderWidth: 1,
      borderColor: theme.border,
    },
    list: {
      flex: 1,
      paddingHorizontal: 16,
    },
    emptyText: {
      marginTop: 30,
      color: theme.primary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 60,
    },
    dateHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 12,
      paddingHorizontal: 4,
    },
    countBadge: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    countBadgeText: {
      fontSize: 12,
      color: theme.mutedForeground,
    },
    dateHeaderText: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.mutedForeground,
    },
    reservationContent: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme.card,
      marginVertical: 4,
      borderWidth: 1,
      borderColor: theme.border,
    },
    reservationLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    reservationInfo: {
      flex: 1,
    },
    reservationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 2,
    },
    customerNameSmall: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
      flex: 1,
      marginRight: 8,
    },
    reservationDetails: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 12,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    detailTextSmall: {
      fontSize: 12,
      color: theme.mutedForeground,
      marginLeft: 4,
    },
  });
};
