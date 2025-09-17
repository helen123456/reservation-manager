export interface Reservation {
  id: number;
  restaurantId: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  guests: number;
  reserveTime: string;
  otherRequirements: string;
  status: number;
  createTime: string;
}

export interface GroupedReservation {
  date: string;
  title: string;
  data: Reservation[];
}

export type FlatDataItem = 
  | { type: 'header'; date: string; count: number; pendingCount?: number }
  | { type: 'reservation'; reservation: Reservation };