import { Input } from "@/components";
import { useTheme } from '@/hooks/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Popover from "react-native-popover-view";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { createStyles } from "./styles";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedDate?: Date;
  onDateChange?: (date?: Date) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedDate,
  onDateChange,
}) => {
  const {theme} = useTheme();
  const { t } = useTranslation();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const defaultStyles = useDefaultStyles();
  const [dateOpen, setDateOpen] = useState(false);

  const handleDateChange = (params: any) => {
    console.log(params)
    setDateOpen(false);
    onDateChange?.(params.date);
  
  };

  const clearDate = () => {
    onDateChange?.(undefined);
    setDateOpen(false);
  };

  return (
    <View style={styles.searchContainer}>
     
        <Input
          containerStyle={{marginBottom:0,flex:1}}
          inputContainerStyle={{ height: 40 }}
          inputStyle={{height:60}}
          iconSize={16}
          leftIcon="search"
          placeholder={t("searchReservations")}
          placeholderTextColor={theme.mutedForeground}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
    
      {/* Date Filter Button with Popover */}
      <Popover
        arrowSize={{ width: 0, height: 0 }}
        isVisible={dateOpen}
        onRequestClose={() => setDateOpen(false)}
        from={
          <TouchableOpacity
            style={selectedDate ? styles.dateButtonSelected : styles.dateButton}
            onPress={() => setDateOpen(true)}
          >
            <Feather
              name="calendar"
              size={16}
              color={selectedDate ? theme.primaryForeground : theme.mutedForeground}
            />
          </TouchableOpacity>
        }
      >
        <View style={styles.popoverContent}>
          <Text style={styles.popoverTitle}>
            {t("filterByDate")}
          </Text>
          <DateTimePicker
            mode="single"
            date={selectedDate ?? undefined}
            onChange={handleDateChange}
            minDate={dayjs().format("YYYY-MM-DD 00:00:00")}
            styles={{
              ...defaultStyles,
              today: { backgroundColor: theme.muted }, // Add a border to today's date
              selected: { backgroundColor: theme.primary }, // Highlight the selected day
              selected_label: { color: theme.primaryForeground }, // Highlight the selected day label
            }}
          />
        </View>
      </Popover>
    </View>
  );
};
