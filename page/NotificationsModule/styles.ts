import { StyleSheet } from "react-native";

export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    content: {
      maxWidth: 600,
      alignSelf: "center",
      width: "100%",
      paddingHorizontal: 16,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
      marginTop: 16,
      marginRight: 16,
    },
    headerLeft: {
      flexDirection: "row",
      alignItems: "flex-start",
      flex: 1,
    },
    backButton: {
      padding: 8,
      marginRight: 12,
      marginTop: -4,
    },
    titleContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      fontSize: 16,
      color: theme.text,
      marginRight: 8,
    },
    badge: {
      backgroundColor: theme.destructive,
      borderRadius: 10,
      paddingHorizontal: 6,
      paddingVertical: 2,
      minWidth: 20,
      alignItems: "center",
    },
    badgeText: {
      color: theme.destructiveForeground,
      fontSize: 12,
      fontWeight: "600",
    },
    subtitle: {
      fontSize: 14,
      color: theme.mutedForeground,
    },
    headerActions: {
      flexDirection: "row",
      gap: 8,
      justifyContent: "flex-end",
      marginBottom: 16,
      marginRight: 16,
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    actionButtonText: {
      color: theme.text,
      fontSize: 14,
      marginLeft: 4,
    },
    emptyState: {
      borderRadius: 12,
      padding: 32,
      alignItems: "center",
    },
    emptyIcon: {
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 8,
    },
    emptyDescription: {
      fontSize: 14,
      color: theme.mutedForeground,
      textAlign: "center",
    },
    notificationsList: {
      gap: 12,
    },
    loadingState: {
      paddingVertical: 32,
      alignItems: "center",
      justifyContent: "center",
    },
    notificationCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    unreadCard: {
      backgroundColor: theme.muted,
      borderColor: theme.primary,
      borderLeftWidth: 3,
    },
    notificationContent: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    iconContainer: {
      marginRight: 12,
      marginTop: 2,
    },
    notificationBody: {
      flex: 1,
    },
    notificationHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    notificationTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
      flex: 1,
    },
    readTitle: {
      fontWeight: "500",
      color: theme.mutedForeground,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.primary,
      marginLeft: 8,
    },
    notificationMessage: {
      fontSize: 14,
      color: theme.mutedForeground,
      lineHeight: 20,
      marginBottom: 8,
    },
    readMessage: {
      color: theme.mutedForeground,
      opacity: 0.75,
    },
    notificationFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    timestamp: {
      fontSize: 12,
      color: theme.mutedForeground,
    },
    customerInfo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    customerText: {
      fontSize: 12,
      color: theme.mutedForeground,
    },
    separator: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 12,
    },
    /** Filter chips row */
    filterRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      paddingHorizontal: 16,
      marginBottom: 12,
    },
    filterChip: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    filterChipActive: {
      backgroundColor: theme.primary,
      borderColor: theme.primary,
    },
    filterChipText: {
      color: theme.text,
      fontSize: 13,
      fontWeight: "500",
    },
    filterChipTextActive: {
      color: "#fff",
    },
    filterChipBadge: {
      backgroundColor: theme.destructive,
      borderRadius: 9,
      paddingHorizontal: 5,
      minWidth: 18,
      alignItems: "center",
    },
    filterChipBadgeText: {
      color: "#fff",
      fontSize: 10,
      fontWeight: "600",
    },
    /** Section header for time grouping */
    sectionHeader: {
      paddingTop: 8,
      paddingBottom: 6,
    },
    sectionHeaderText: {
      fontSize: 12,
      fontWeight: "600",
      color: theme.mutedForeground,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    /** Swipe action background */
    swipeAction: {
      backgroundColor: theme.destructive,
      justifyContent: "center",
      alignItems: "flex-end",
      paddingHorizontal: 24,
      borderRadius: 12,
      flex: 1,
      marginVertical: 0,
    },
    swipeActionText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
      marginLeft: 6,
    },
  });
};
