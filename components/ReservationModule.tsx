import { Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useTranslation } from "../hooks/useTranslation";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'rejected';
  specialRequests?: string;
}

// Generate mock reservations for multiple dates
const generateMockReservations = (): Reservation[] => {
  const reservations: Reservation[] = [];
  const today = new Date();
  const names = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Wilson', 'David Chen',
    'Lisa Anderson', 'James Wilson', 'Maria Garcia', 'Robert Taylor', 'Jennifer Lee',
    'William Davis', 'Elizabeth White', 'Christopher Harris', 'Amanda Clark', 'Matthew Lopez',
    'Jessica Rodriguez', 'Daniel Martinez', 'Ashley Jackson', 'Anthony Thompson', 'Nicole Moore'
  ];
  
  const times = ['11:30', '12:00', '12:30', '13:00', '13:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
  const statuses: ('pending' | 'confirmed' | 'rejected')[] = ['pending', 'confirmed', 'rejected'];
  
  let idCounter = 0;
  
  for (let dayOffset = 0; dayOffset < 30; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate 3-8 reservations per day
    const numReservations = Math.floor(Math.random() * 6) + 3;
    
    for (let i = 0; i < numReservations; i++) {
      idCounter++;
      reservations.push({
        id: `reservation-${idCounter}`,
        customerName: names[Math.floor(Math.random() * names.length)],
        phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        date: dateStr,
        time: times[Math.floor(Math.random() * times.length)],
        guests: Math.floor(Math.random() * 8) + 1,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        specialRequests: Math.random() > 0.7 ? 'Special dietary requirements' : undefined
      });
    }
  }
  
  return reservations.sort((a, b) => {
    if (a.date !== b.date) {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return a.time.localeCompare(b.time);
  });
};

const ITEMS_PER_PAGE = 20;

export default function ReservationModule() {
  const { t } = useTranslation();
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [displayedReservations, setDisplayedReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  // Initialize data
  useEffect(() => {
    const mockData = generateMockReservations();
    const today = new Date().toISOString().split('T')[0];
    
    // Filter to show only today and future reservations
    const futureReservations = mockData.filter(reservation => reservation.date >= today);
    
    setAllReservations(futureReservations);
    setDisplayedReservations(futureReservations.slice(0, ITEMS_PER_PAGE));
    setHasMore(futureReservations.length > ITEMS_PER_PAGE);
  }, []);

  const handleReservationAction = (id: string, action: 'confirm' | 'reject') => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${action} this reservation?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: () => {
            const newStatus = action === 'confirm' ? 'confirmed' : 'rejected';
            
            setAllReservations(prev => 
              prev.map(reservation => 
                reservation.id === id 
                  ? { ...reservation, status: newStatus }
                  : reservation
              )
            );
            
            setDisplayedReservations(prev => 
              prev.map(reservation => 
                reservation.id === id 
                  ? { ...reservation, status: newStatus }
                  : reservation
              )
            );
            
            setSelectedReservation(null);
          }
        }
      ]
    );
  };

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const filteredReservations = getFilteredReservations();
      const startIndex = page * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const newItems = filteredReservations.slice(startIndex, endIndex);
      
      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setDisplayedReservations(prev => {
          // Ensure no duplicates by filtering out items that already exist
          const existingIds = new Set(prev.map(item => item.id));
          const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
          return [...prev, ...uniqueNewItems];
        });
        setPage(prev => prev + 1);
        setHasMore(endIndex < filteredReservations.length);
      }
      
      setLoading(false);
    }, 500);
  }, [loading, hasMore, page, searchQuery, selectedDate, allReservations]);

  const getFilteredReservations = () => {
    let filtered = allReservations;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(reservation =>
        reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reservation.phone.includes(searchQuery)
      );
    }
    
    // Filter by selected date
    if (selectedDate) {
      const selectedDateStr = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter(reservation => reservation.date === selectedDateStr);
    }
    
    return filtered;
  };

  // Handle search and date filter changes
  useEffect(() => {
    const filteredReservations = getFilteredReservations();
    setDisplayedReservations(filteredReservations.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(filteredReservations.length > ITEMS_PER_PAGE);
  }, [searchQuery, selectedDate, allReservations]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: string) => {
    const getBadgeStyle = () => {
      switch (status) {
        case 'pending':
          return { backgroundColor: '#fef3c7', borderColor: '#f59e0b' };
        case 'confirmed':
          return { backgroundColor: '#dcfce7', borderColor: '#10b981' };
        case 'rejected':
          return { backgroundColor: '#fee2e2', borderColor: '#ef4444' };
        default:
          return { backgroundColor: '#f3f4f6', borderColor: '#6b7280' };
      }
    };

    const getTextColor = () => {
      switch (status) {
        case 'pending': return '#f59e0b';
        case 'confirmed': return '#10b981';
        case 'rejected': return '#ef4444';
        default: return '#6b7280';
      }
    };

    return (
      <ThemedView style={[styles.badge, getBadgeStyle()]}>
        <ThemedText style={[styles.badgeText, { color: getTextColor() }]}>
          {status === 'pending' ? t('pending') : status === 'confirmed' ? t('confirmed') : t('cancelled')}
        </ThemedText>
      </ThemedView>
    );
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
      return 'Today';
    } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  // Calculate statistics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayReservations = allReservations.filter(r => r.date === todayStr);
  const pendingCount = allReservations.filter(r => r.status === 'pending').length;
  const confirmedCount = allReservations.filter(r => r.status === 'confirmed').length;
  const totalGuests = todayReservations.reduce((sum, r) => sum + r.guests, 0);

  if (selectedReservation) {
    return (
      <ScrollView style={styles.container}>
        {/* Back Button */}
        <ThemedView style={styles.backButtonContainer}>
          <TouchableOpacity 
            onPress={() => setSelectedReservation(null)}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <ThemedText style={styles.detailTitle}>Reservation Details</ThemedText>
        </ThemedView>

        {/* Status */}
        <ThemedView style={styles.statusContainer}>
          {getStatusBadge(selectedReservation.status)}
        </ThemedView>

        {/* Customer Info */}
        <ThemedView style={styles.card}>
          <ThemedView style={styles.customerInfo}>
            <ThemedView style={styles.avatar}>
              <ThemedText style={styles.avatarText}>
                {selectedReservation.customerName.charAt(0)}
              </ThemedText>
            </ThemedView>
            <ThemedText style={styles.customerName}>
              {selectedReservation.customerName}
            </ThemedText>
            <ThemedView style={styles.phoneContainer}>
              <Feather name="phone" size={14} color="#6b7280" />
              <ThemedText style={styles.phoneText}>
                {selectedReservation.phone}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Reservation Details */}
        <ThemedView style={styles.card}>
          <ThemedText style={styles.cardTitle}>Reservation Information</ThemedText>
          
          <ThemedView style={styles.detailsGrid}>
            <ThemedView style={styles.detailItem}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="clock" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>Date & Time</ThemedText>
              </ThemedView>
              <ThemedText style={styles.detailValue}>
                {formatDate(selectedReservation.date)}
              </ThemedText>
              <ThemedText style={styles.detailSubValue}>
                {selectedReservation.time}
              </ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.detailItem}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="users" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>Party Size</ThemedText>
              </ThemedView>
              <ThemedText style={styles.detailValue}>
                {selectedReservation.guests} guests
              </ThemedText>
            </ThemedView>
          </ThemedView>

          {selectedReservation.specialRequests && (
            <ThemedView style={styles.specialRequests}>
              <ThemedView style={styles.detailHeader}>
                <Feather name="message-square" size={16} color="#6b7280" />
                <ThemedText style={styles.detailLabel}>Special Requests</ThemedText>
              </ThemedView>
              <ThemedView style={styles.requestsBox}>
                <ThemedText style={styles.requestsText}>
                  {selectedReservation.specialRequests}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          )}
        </ThemedView>

        {/* Actions */}
        {selectedReservation.status === 'pending' && (
          <ThemedView style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectButton]}
              onPress={() => handleReservationAction(selectedReservation.id, 'reject')}
            >
              <Feather name="x" size={20} color="#fff" />
              <ThemedText style={styles.actionButtonText}>
                {t('decline')}
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.confirmButton]}
              onPress={() => handleReservationAction(selectedReservation.id, 'confirm')}
            >
              <Feather name="check" size={20} color="#fff" />
              <ThemedText style={styles.actionButtonText}>
                {t('accept')}
              </ThemedText>
            </TouchableOpacity>
          </ThemedView>
        )}
      </ScrollView>
    );
  }

  const renderReservationItem = ({ item }: { item: Reservation }) => (
    <TouchableOpacity 
      style={styles.reservationItem}
      onPress={() => setSelectedReservation(item)}
    >
      <ThemedView style={styles.reservationContent}>
        <ThemedView style={styles.reservationLeft}>
          <ThemedView style={styles.smallAvatar}>
            <ThemedText style={styles.smallAvatarText}>
              {item.customerName.charAt(0)}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.reservationInfo}>
            <ThemedView style={styles.reservationHeader}>
              <ThemedText style={styles.customerNameSmall} numberOfLines={1}>
                {item.customerName}
              </ThemedText>
              {getStatusBadge(item.status)}
            </ThemedView>
            <ThemedView style={styles.reservationDetails}>
              <ThemedView style={styles.detailRow}>
                <Feather name="clock" size={12} color="#6b7280" />
                <ThemedText style={styles.detailTextSmall}>
                  {item.time}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.detailRow}>
                <Feather name="users" size={12} color="#6b7280" />
                <ThemedText style={styles.detailTextSmall}>
                  {item.guests} guests
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );

  // Group displayed reservations by date
  const groupedData = displayedReservations.reduce((acc, reservation) => {
    const date = reservation.date;
    const existingGroup = acc.find(group => group.date === date);
    
    if (existingGroup) {
      existingGroup.data.push(reservation);
    } else {
      acc.push({
        date,
        title: formatDateHeader(date),
        data: [reservation]
      });
    }
    
    return acc;
  }, [] as { date: string; title: string; data: Reservation[] }[]);

  const flatData = groupedData.flatMap(group => [
    { type: 'header', date: group.date, title: group.title, count: group.data.length },
    ...group.data.map(item => ({ type: 'item', ...item }))
  ]);
  console.log("flatData",flatData)

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === 'header') {
      return (
        <ThemedView style={styles.dateHeader}>
          <ThemedText style={styles.dateHeaderText}>{item.title}</ThemedText>
          <ThemedView style={styles.countBadge}>
            <ThemedText style={styles.countBadgeText}>
              {item.count} reservation{item.count !== 1 ? 's' : ''}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      );
    }
    
    return renderReservationItem({ item });
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedView>
          <ThemedText style={styles.title}>{t('reservations')}</ThemedText>
          <ThemedText style={styles.subtitle}>
            Manage your restaurant bookings
          </ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Statistics Row */}
      <ThemedView style={styles.statsCard}>
        <ThemedView style={styles.statsGrid}>
          <ThemedView style={styles.statItem}>
            <ThemedView style={styles.statIconContainer}>
              <Feather name="calendar" size={14} color="#6b7280" />
              <ThemedText style={styles.statLabel}>Today</ThemedText>
            </ThemedView>
            <ThemedText style={styles.statValue}>{todayReservations.length}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.statItem}>
            <ThemedView style={styles.statIconContainer}>
              <Feather name="alert-circle" size={14} color="#6b7280" />
              <ThemedText style={styles.statLabel}>{t('pending')}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.statValue}>{pendingCount}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.statItem}>
            <ThemedView style={styles.statIconContainer}>
              <Feather name="check-circle" size={14} color="#6b7280" />
              <ThemedText style={styles.statLabel}>{t('confirmed')}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.statValue}>{confirmedCount}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.statItem}>
            <ThemedView style={styles.statIconContainer}>
              <Feather name="users" size={14} color="#6b7280" />
              <ThemedText style={styles.statLabel}>{t('guests')}</ThemedText>
            </ThemedView>
            <ThemedText style={styles.statValue}>{totalGuests}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>

      {/* Search Input */}
      <ThemedView style={styles.searchContainer}>
        <ThemedView style={styles.searchInputContainer}>
          <Feather name="search" size={16} color="#6b7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or phone..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6b7280"
          />
        </ThemedView>
      </ThemedView>

      {/* Reservations List */}
      <FlatList
         data={flatData}
         renderItem={renderItem}
         keyExtractor={(item, index) => 
           item.type === 'header' ? `header-${item.date}` : `item-${(item as any).id || index}`
         }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
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
    color: '#6b7280',
    marginLeft: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
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
  dateHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 12,
    color: '#6b7280',
  },
  reservationItem: {
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reservationContent: {
    padding: 16,
    borderRadius: 8,
  },
  reservationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  smallAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
    color: '#111827',
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
    color: '#6b7280',
    marginLeft: 4,
  },
  badge: {
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // Detail view styles
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
    color: '#111827',
  },
  statusContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  card: {
  
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  customerInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  customerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
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
    color: '#6b7280',
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  detailSubValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  specialRequests: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  requestsBox: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  requestsText: {
    fontSize: 14,
    color: '#111827',
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
    backgroundColor: '#ef4444',
  },
  confirmButton: {
    backgroundColor: '#10b981',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});