import { Colors } from '@/constants/Colors';
import { ColorSchemeName, StyleSheet } from 'react-native';

export const createStyles = (colorScheme: ColorSchemeName) => {
  const colors = Colors[colorScheme ?? 'light'];
  
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: colors.card,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    subtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    statsCard: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    statItem: {
      alignItems: 'center',
      flex: 1,
    },
    statIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginLeft: 4,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    searchContainer: {
       flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    searchInputContainer: {
     flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 12,
      height: 40,
      flex:1
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    dateButton: {
      marginLeft: 8,
      width: 40,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      position: 'relative',
    },
    dateButtonSelected: {
      marginLeft: 8,
      width: 40,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      position: 'relative',
    },
    selectedDot: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.success,
    },
    list: {
      flex: 1,
      paddingHorizontal: 16
    },
    dateHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 4,
    },
    popoverContent: {
      backgroundColor: colors.card,
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    filterBarContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      gap: 8,
    },
    filterLabel: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    filterBadgesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      flex: 1,
    },
    filterBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.muted,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      gap: 4,
    },
    filterBadgeText: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    filterClearButton: {
      padding: 2,
      borderRadius: 10,
    },
    dateHeaderText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.mutedForeground,
    },
    countBadge: {
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    countBadgeText: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    reservationItem: {
      borderRadius: 8,
      marginVertical: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reservationContent: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: colors.card,
    },
    reservationLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    smallAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    smallAvatarText: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    reservationInfo: {
      flex: 1,
    },
    reservationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 2,
    },
    customerNameSmall: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
      marginRight: 8,
    },
    reservationDetails: {
      flexDirection: 'row',
      justifyContent: "flex-start",
      gap: 12,
    },
    detailRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    detailTextSmall: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginLeft: 4,
    },
    badge: {
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.text,
    },
    backButtonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
    },
    backButton: {
      padding: 8,
      marginRight: 16,
    },
    detailTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    statusContainer: {
      alignItems: 'center',
      paddingVertical: 16,
    },
    card: {
      backgroundColor: colors.card,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    customerInfo: {
      alignItems: 'center',
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: colors.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    contactName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    phoneText: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginLeft: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
    },
    detailsGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    detailItem: {
      flex: 1,
      marginRight: 16,
    },
    detailHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    detailLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginLeft: 8,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    detailSubValue: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    specialRequests: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    requestsBox: {
      backgroundColor: colors.muted,
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
    },
    requestsText: {
      fontSize: 14,
      color: colors.text,
    },
    actionsContainer: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 12,
    },
    actionButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      borderRadius: 8,
    },
    rejectButton: {
      backgroundColor: colors.muted,
    },
    confirmButton: {
      backgroundColor: colors.primary,
    },
    actionButtonText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    rejectButtonText: {
      color: colors.primaryForeground,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    emptyContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      marginTop:60
    },
    emptyText:{
      marginTop:30,
       color:colors.primary,
    }
  });
};