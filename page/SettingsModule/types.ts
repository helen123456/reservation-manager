export interface SettingsModuleProps {
  onNavigate: (section: string) => void;

}

export interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  disabled?: boolean;
  action: () => void;
}

export interface SettingsCategory {
  title: string;
  items: SettingItem[];
}

export interface QuickSettingsState {
  acceptReservations: boolean;
  autoConfirm: boolean;
  darkMode: boolean;
}

export interface RestaurantStatus {
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  status: string;
}

export interface QuickSettingsProps {
  settings: QuickSettingsState;
  onSettingChange: (key: keyof QuickSettingsState, value: boolean) => void;
}

export interface SettingsCategoryProps {
  categories: SettingsCategory[];
}

export interface RestaurantStatusProps {
  status: RestaurantStatus;
}