import NavBack from "@/components/NavBack";
import { Colors } from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useTranslation } from '../../hooks/useTranslation';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { styles } from './styles';
import {
  IntervalOption,
  TableSettings,
  TableSettingsDetailProps,
  TimeSlot,
} from './types';

export default function TableSettingsDetail({ onBack }: TableSettingsDetailProps) {
  const { t } = useTranslation();
  
  const [settings, setSettings] = useState<TableSettings>({
    acceptReservations: true,
    maxGuests: 8,
    minGuests: 1,
    businessHours: {
      start: '09:00',
      end: '23:00'
    },
    timeInterval: 60, // minutes: 60 = 1h, 30 = 30min, 15 = 15min
    maxReservationsPerSlot: 10, // maximum reservations allowed per time slot
    timeSlots: [] as TimeSlot[],
    advanceBookingDays: 30,
    minAdvanceHours: 2
  });

  // Generate time slots based on business hours and interval
  const generateTimeSlots = (startTime: string, endTime: string, intervalMinutes: number): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const start = new Date(`2000-01-01T${startTime}:00`);
    const end = new Date(`2000-01-01T${endTime}:00`);
    
    let current = new Date(start);
    while (current < end) {
      const timeString = current.toTimeString().slice(0, 5);
      slots.push({ time: timeString, enabled: true });
      current.setMinutes(current.getMinutes() + intervalMinutes);
    }
    
    return slots;
  };

  // Initialize time slots on mount
  useEffect(() => {
    const newSlots = generateTimeSlots('09:00', '23:00', 60);
    // Set default enabled states (disable afternoon slots 14:00-16:00)
    const defaultSlots = newSlots.map(slot => ({
      ...slot,
      enabled: !(slot.time >= '14:00' && slot.time < '17:00')
    }));
    
    setSettings(prev => ({
      ...prev,
      timeSlots: defaultSlots
    }));
  }, []);

  const toggleTimeSlot = (index: number) => {
    setSettings(prev => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, i) => 
        i === index ? { ...slot, enabled: !slot.enabled } : slot
      )
    }));
  };

  const updateGuestCount = (field: 'maxGuests' | 'minGuests', value: number) => {
    setSettings(prev => ({
      ...prev,
      [field]: Math.max(1, value)
    }));
  };

  const updateMaxReservationsPerSlot = (value: number) => {
    setSettings(prev => ({
      ...prev,
      maxReservationsPerSlot: Math.max(1, value)
    }));
  };

  const handleBusinessHoursChange = (field: 'start' | 'end', value: string) => {
    setSettings(prev => {
      const newBusinessHours = { ...prev.businessHours, [field]: value };
      const newSlots = generateTimeSlots(
        newBusinessHours.start, 
        newBusinessHours.end, 
        prev.timeInterval
      );
      
      // Preserve existing enabled/disabled states where possible
      const updatedSlots = newSlots.map(newSlot => {
        const existingSlot = prev.timeSlots.find(slot => slot.time === newSlot.time);
        return existingSlot ? existingSlot : newSlot;
      });
      
      return {
        ...prev,
        businessHours: newBusinessHours,
        timeSlots: updatedSlots
      };
    });
  };

  const handleTimeIntervalChange = (intervalMinutes: number) => {
    setSettings(prev => {
      const newSlots = generateTimeSlots(
        prev.businessHours.start, 
        prev.businessHours.end, 
        intervalMinutes
      );
      
      // Preserve existing enabled/disabled states where possible
      const updatedSlots = newSlots.map(newSlot => {
        const existingSlot = prev.timeSlots.find(slot => slot.time === newSlot.time);
        return existingSlot ? existingSlot : newSlot;
      });
      
      return {
        ...prev,
        timeInterval: intervalMinutes,
        timeSlots: updatedSlots
      };
    });
  };

  const handleSave = () => {
    Alert.alert(t('success'), t('settingsSaved'));
  };

  const enabledSlotsCount = settings.timeSlots.filter(slot => slot.enabled).length;

  const intervalOptions: IntervalOption[] = [
    { value: 60, label: '1h' },
    { value: 30, label: '30min' },
    { value: 15, label: '15min' }
  ];
  // 获取当前主题颜色
const colorScheme = useColorScheme() ?? 'light';
const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <NavBack 
        title={t('reservationSettings')}
        onBack={onBack}
        rightComponent={
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons name="save" size={14} color={colors.primary} style={styles.saveIcon} />
            <Text style={styles.saveText}>{t('save')}</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Accept Reservations */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.cardContent}>
              <ThemedText style={styles.cardTitle}>{t('acceptReservations')}</ThemedText>
              <ThemedText style={styles.cardSubtitle}>{t('allowCustomersBookOnline')}</ThemedText>
            </View>
            <Switch
              value={settings.acceptReservations}
              onValueChange={(value) => 
                setSettings(prev => ({ ...prev, acceptReservations: value }))
              }
            />
          </View>
        </View>

        {/* Business Hours */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>{t('businessHours')}</ThemedText>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>{t('openingTime')}</ThemedText>
              <TextInput
                style={styles.timeInput}
                value={settings.businessHours.start}
                onChangeText={(value) => handleBusinessHoursChange('start', value)}
                placeholder="09:00"
              />
            </View>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>{t('closingTime')}</ThemedText>
              <TextInput
                style={styles.timeInput}
                value={settings.businessHours.end}
                onChangeText={(value) => handleBusinessHoursChange('end', value)}
                placeholder="23:00"
              />
            </View>
          </View>
        </View>

        {/* Time Interval */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>{t('timeInterval')}</ThemedText>
          <View style={styles.intervalRow}>
            {intervalOptions.map(({ value, label }) => (
              <TouchableOpacity
                key={value}
                onPress={() => handleTimeIntervalChange(value)}
                style={[
                  styles.intervalButton,
                  settings.timeInterval === value && styles.intervalButtonActive
                ]}
              >
                <Text style={[
                  styles.intervalButtonText,
                  settings.timeInterval === value && styles.intervalButtonTextActive
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Max Reservations per Slot */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>{t('maxReservationsPerSlot')}</ThemedText>
          <ThemedText style={styles.cardSubtitle}>{t('maxReservationsDescription')}</ThemedText>
          <View style={styles.counterRow}>
            <TouchableOpacity
              style={[
                styles.counterButton,
                settings.maxReservationsPerSlot <= 1 && styles.counterButtonDisabled
              ]}
              onPress={() => updateMaxReservationsPerSlot(settings.maxReservationsPerSlot - 1)}
              disabled={settings.maxReservationsPerSlot <= 1}
            >
              <Ionicons name="remove" size={14} color={settings.maxReservationsPerSlot <= 1 ? '#ccc' : '#000'} />
            </TouchableOpacity>
            <View style={styles.counterContent}>
              <ThemedText style={styles.counterValue}>{settings.maxReservationsPerSlot}</ThemedText>
              <ThemedText style={styles.counterLabel}>{t('reservations')}</ThemedText>
            </View>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={() => updateMaxReservationsPerSlot(settings.maxReservationsPerSlot + 1)}
            >
              <Ionicons name="add" size={14} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Time Slots */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={styles.slotsHeader}>
              <Ionicons name="time" size={18} color="#000" />
              <ThemedText style={styles.cardTitle}>{t('availableTimeSlots')}</ThemedText>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{enabledSlotsCount} {t('active')}</Text>
            </View>
          </View>
          
          <View style={styles.slotsGrid}>
            {settings.timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={`${slot.time}-${settings.timeInterval}`}
                onPress={() => toggleTimeSlot(index)}
                style={[
                  styles.slotButton,
                  slot.enabled ? styles.slotButtonActive : styles.slotButtonInactive
                ]}
              >
                <Text style={[
                  styles.slotButtonText,
                  slot.enabled ? styles.slotButtonTextActive : styles.slotButtonTextInactive
                ]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Party Size Limits */}
        <View style={styles.card}>
          <ThemedText style={styles.cardTitle}>{t('partySizeLimits')}</ThemedText>
          
          <View style={styles.row}>
            <View style={styles.guestGroup}>
              <ThemedText style={styles.label}>{t('minimumGuests')}</ThemedText>
              <View style={styles.guestCounter}>
                <TouchableOpacity
                  style={[
                    styles.guestButton,
                    settings.minGuests <= 1 && styles.guestButtonDisabled
                  ]}
                  onPress={() => updateGuestCount('minGuests', settings.minGuests - 1)}
                  disabled={settings.minGuests <= 1}
                >
                  <Ionicons name="remove" size={14} color={settings.minGuests <= 1 ? '#ccc' : '#000'} />
                </TouchableOpacity>
                <Text style={styles.guestValue}>{settings.minGuests}</Text>
                <TouchableOpacity
                  style={styles.guestButton}
                  onPress={() => updateGuestCount('minGuests', settings.minGuests + 1)}
                >
                  <Ionicons name="add" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.guestGroup}>
              <ThemedText style={styles.label}>{t('maximumGuests')}</ThemedText>
              <View style={styles.guestCounter}>
                <TouchableOpacity
                  style={[
                    styles.guestButton,
                    settings.maxGuests <= settings.minGuests && styles.guestButtonDisabled
                  ]}
                  onPress={() => updateGuestCount('maxGuests', settings.maxGuests - 1)}
                  disabled={settings.maxGuests <= settings.minGuests}
                >
                  <Ionicons name="remove" size={14} color={settings.maxGuests <= settings.minGuests ? '#ccc' : '#000'} />
                </TouchableOpacity>
                <Text style={styles.guestValue}>{settings.maxGuests}</Text>
                <TouchableOpacity
                  style={styles.guestButton}
                  onPress={() => updateGuestCount('maxGuests', settings.maxGuests + 1)}
                >
                  <Ionicons name="add" size={14} color="#000" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Booking Rules */}
        <View style={[styles.card, styles.lastCard]}>
          <ThemedText style={styles.cardTitle}>{t('bookingRules')}</ThemedText>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>{t('maxAdvanceBookingDays')}</ThemedText>
              <TextInput
                style={styles.numberInput}
                value={settings.advanceBookingDays.toString()}
                onChangeText={(value) => 
                  setSettings(prev => ({ ...prev, advanceBookingDays: parseInt(value) || 0 }))
                }
                keyboardType="numeric"
                placeholder="30"
              />
            </View>
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>{t('minAdvanceNoticeHours')}</ThemedText>
              <TextInput
                style={styles.numberInput}
                value={settings.minAdvanceHours.toString()}
                onChangeText={(value) => 
                  setSettings(prev => ({ ...prev, minAdvanceHours: parseInt(value) || 0 }))
                }
                keyboardType="numeric"
                placeholder="2"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}