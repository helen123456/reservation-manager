import { Colors } from '@/constants/Colors';
import { StyleSheet, ColorSchemeName } from 'react-native';

// 创建动态样式函数
export const createStyles = (colorScheme: ColorSchemeName) => {
  const colors = Colors[colorScheme ?? 'light'];
  
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
      color: colors.text,
    },
    moreButton: {
      padding: 8,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
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
      color: colors.text,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 2,
    },
    categoryTitle: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 8,
      marginTop: 8,
    },
    categoryItem: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.border,
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
      backgroundColor: colors.muted,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    categoryItemTitle: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.text,
    },
    categoryItemDescription: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 2,
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
      color: colors.text,
    },
    statusTime: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 2,
    },
    statusDot: {
      width: 12,
      height: 12,
      backgroundColor: colors.success,
      borderRadius: 6,
    },
  });
};