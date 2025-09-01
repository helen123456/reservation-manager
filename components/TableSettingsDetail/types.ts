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

export interface TableSettingsDetailProps {
  onBack: () => void;
}

export interface SettingsHeaderProps {
  title: string;
  onBack: () => void;
  onSave: () => void;
}

export interface ReservationToggleProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export interface BusinessHoursProps {
  businessHours: BusinessHours;
  onBusinessHoursChange: (field: 'start' | 'end', value: string) => void;
}

export interface TimeIntervalProps {
  timeInterval: number;
  onTimeIntervalChange: (intervalMinutes: number) => void;
}

export interface TimeSlotsProps {
  timeSlots: TimeSlot[];
  timeInterval: number;
  onToggleTimeSlot: (index: number) => void;
}

export interface GuestLimitsProps {
  minGuests: number;
  maxGuests: number;
  onUpdateGuestCount: (field: 'maxGuests' | 'minGuests', value: number) => void;
}

export interface BookingRulesProps {
  advanceBookingDays: number;
  minAdvanceHours: number;
  onAdvanceBookingDaysChange: (value: number) => void;
  onMinAdvanceHoursChange: (value: number) => void;
}

export interface CounterProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  label?: string;
  subtitle?: string;
}

export interface IntervalOption {
  value: number;
  label: string;
}