export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: 'pending' | 'confirmed' | 'rejected';
  specialRequests?: string;
}

export interface GroupedReservation {
  date: string;
  title: string;
  data: Reservation[];
}

export type FlatDataItem = 
  | { type: 'header'; date: string; count: number; pendingCount?: number }
  | { type: 'reservation'; reservation: Reservation };