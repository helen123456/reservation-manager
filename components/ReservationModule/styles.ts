import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },

    header: {
      paddingHorizontal: 16,
      paddingVertical: 16,
      backgroundColor: theme.card,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    subtitle: {
      fontSize: 14,
      color: theme.mutedForeground,
      marginTop: 4,
    },
    statsCard: {
      backgroundColor: theme.card,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
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
      color: theme.mutedForeground,
      marginLeft: 4,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
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
      backgroundColor: theme.card,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
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
      color: theme.text,
    },
    dateButton: {
      marginLeft: 8,
      width: 40,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.card,
      position: 'relative',
    },
    dateButtonSelected: {
      marginLeft: 8,
      width: 40,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.primary,
      position: 'relative',
    },
    selectedDot: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.success,
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
      backgroundColor: theme.card,
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
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
      color: theme.mutedForeground,
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
      backgroundColor: theme.muted,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      gap: 4,
    },
    filterBadgeText: {
      fontSize: 12,
      color: theme.mutedForeground,
    },
    filterClearButton: {
      padding: 2,
      borderRadius: 10,
    },
    dateHeaderText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.mutedForeground,
    },
    countBadge: {
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    countBadgeText: {
      fontSize: 12,
      color: theme.mutedForeground,
    },
    reservationItem: {
      borderRadius: 8,
      marginVertical: 4,
      borderWidth: 1,
      borderColor: theme.border,
    },
    reservationContent: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: theme.card,
    },
    reservationLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    smallAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    smallAvatarText: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
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
      color: theme.text,
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
      color: theme.mutedForeground,
      marginLeft: 4,
    },
    badge: {
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '500',
      color: theme.text,
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
      color: theme.text,
    },
    statusContainer: {
      alignItems: 'center',
      paddingVertical: 16,
    },
    card: {
      backgroundColor: theme.card,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    customerInfo: {
      alignItems: 'center',
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.muted,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
    },
    contactName: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
    },
    phoneContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    phoneText: {
      fontSize: 14,
      color: theme.mutedForeground,
      marginLeft: 8,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
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
      color: theme.mutedForeground,
      marginLeft: 8,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 4,
    },
    detailSubValue: {
      fontSize: 14,
      color: theme.mutedForeground,
    },
    specialRequests: {
      marginTop: 16,
      paddingTop: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    requestsBox: {
      backgroundColor: theme.muted,
      padding: 12,
      borderRadius: 8,
      marginTop: 8,
    },
    requestsText: {
      fontSize: 14,
      color: theme.text,
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
      backgroundColor: theme.muted,
    },
    confirmButton: {
      backgroundColor: theme.primary,
    },
    actionButtonText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 8,
    },
    rejectButtonText: {
      color: theme.primaryForeground,
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
       color:theme.primary,
    }
  });
};