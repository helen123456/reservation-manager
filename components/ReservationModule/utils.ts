import { Reservation } from './types';

// Generate mock reservations for multiple dates
export const generateMockReservations = (count?: number, page?: number): Reservation[] => {
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
  
  let idCounter = page ? (page - 1) * (count || 20) : 0;
  const daysToGenerate = count ? Math.ceil(count / 4) : 5;
  const startDayOffset = page ? (page - 1) * 2 : 0;
  
  for (let dayOffset = startDayOffset; dayOffset < startDayOffset + daysToGenerate && dayOffset < 10; dayOffset++) {
   
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

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatDateHeader = (dateStr: string) => {
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

export const getFilteredReservations = (
  allReservations: Reservation[],
  searchQuery: string,
  selectedDate?: Date
) => {
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

export const calculateStats = (allReservations: Reservation[]) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const todayReservations = allReservations.filter(r => r.date === todayStr);
  const pendingCount = allReservations.filter(r => r.status === 'pending').length;
  const confirmedCount = allReservations.filter(r => r.status === 'confirmed').length;
  const totalGuests = todayReservations.reduce((sum, r) => sum + r.guests, 0);
  
  return {
    todayReservations: todayReservations.length,
    pendingCount,
    confirmedCount,
    totalGuests
  };
};