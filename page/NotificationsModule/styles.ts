import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
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
      marginRight: 16
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
      justifyContent: "space-between"
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
      marginRight: 16
    },
    actionButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border
    },
    actionButtonText: {
      color: theme.text,
      fontSize: 14,
      marginLeft: 4,
    },
    emptyState: {
      borderRadius: 12,
      padding: 32,
      alignItems: "center"
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
    notificationCard: {
      backgroundColor: theme.card,
      borderRadius: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    unreadCard: {
      borderColor: theme.border,
      backgroundColor: theme.muted,
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
      fontWeight: "600",
      color: theme.text,
      flex: 1,
    },
    readTitle: {
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
  });
};