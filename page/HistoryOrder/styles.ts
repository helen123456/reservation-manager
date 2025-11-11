import { StyleSheet } from "react-native";

export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    list: {
      flex: 1,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      marginHorizontal: 16,
    },
    countBadge: {
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    countBadgePlain: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    countBadgeIcon: {
      marginRight: 4,
    },
    countBadgeText: {
      fontSize: 12,
      color: theme.mutedForeground,
    },
    countBadgeNumber: {
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
      color: theme.mutedForeground,
    },
    dateHeaderText: {
      fontSize: 16,
      color: theme.mutedForeground,
    },
  });
};
