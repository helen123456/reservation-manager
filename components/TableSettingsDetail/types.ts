export interface TableSettingsDetailProps {
  onBack: () => void;
}

export interface TimeSlot {
  time: string;
  enabled: boolean;
}

export interface BusinessHours {
  start: string;
  end: string;
}

export interface TableSettings {
  acceptReservations: boolean;
  maxGuests: number;
  minGuests: number;
  businessHours: BusinessHours;
  timeInterval: number; // minutes: 60 = 1h, 30 = 30min, 15 = 15min
  maxReservationsPerSlot: number; // maximum reservations allowed per time slot
  timeSlots: TimeSlot[];
  advanceBookingDays: number;
  minAdvanceHours: number;
}

export interface IntervalOption {
  value: number;
  label: string;
}