import { StyleSheet } from 'react-native';

// 创建动态样式函数
export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 16,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      padding: 8,
      marginRight: 8,
      marginLeft: -8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    moreButton: {
      padding: 8,
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 12,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    settingLeft: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    settingDescription: {
      fontSize: 14,
      color: theme.mutedForeground,
      marginTop: 2,
    },
    categoryTitle: {
      fontSize: 14,
      color: theme.mutedForeground,
      marginBottom: 8,
      marginTop: 8,
    },
    categoryItem: {
      backgroundColor: theme.card,
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.border,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    categoryItemDisabled: {
      opacity: 0.5,
    },
    categoryLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconContainer: {
      width: 32,
      height: 32,
      backgroundColor: theme.muted,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    categoryItemTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: theme.text,
    },
    categoryItemDescription: {
      fontSize: 12,
      color: theme.mutedForeground,
      marginTop: 2,
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
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    statusLeft: {
      flex: 1,
    },
    statusTitle: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    statusTime: {
      fontSize: 14,
      color: theme.mutedForeground,
      marginTop: 2,
    },
    statusDot: {
      width: 12,
      height: 12,
      backgroundColor: theme.success,
      borderRadius: 6,
    },
  });
};