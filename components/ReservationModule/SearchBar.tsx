import Input from "@/components/Input";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import Popover from "react-native-popover-view";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

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
  const defaultStyles = useDefaultStyles();
  const [dateOpen, setDateOpen] = useState(false);

  const handleDateChange = (params: any) => {
    let next: Date | undefined;
    const raw = params?.date;
    if (!raw) {
      next = undefined;
    } else if (dayjs.isDayjs(raw)) {
      next = raw.toDate();
    } else if (raw instanceof Date) {
      next = raw;
    } else if (typeof raw === "string" || typeof raw === "number") {
      const d = new Date(raw);
      next = isNaN(d.getTime()) ? undefined : d;
    }
    onDateChange?.(next);
  };

  const clearDate = () => {
    onDateChange?.(undefined);
    setDateOpen(false);
  };

  return (
    <ThemedView style={styles.searchContainer}>
     
        <Input
          containerStyle={{marginBottom:0,flex:1}}
          inputContainerStyle={{ height: 40 }}
          inputStyle={{height:60}}
          iconSize={16}
          leftIcon="search"
          placeholder={"Search reservations..."}
          placeholderTextColor="#9ca3af"
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
              color={selectedDate ? "#ffffff" : "#6b7280"}
            />
          </TouchableOpacity>
        }
      >
        <ThemedView style={styles.popoverContent}>
          <ThemedText style={{ fontSize: 14, fontWeight: '500' }}>
            Filter by date
          </ThemedText>
          <DateTimePicker
            mode="single"
            date={selectedDate ?? undefined}
            onChange={handleDateChange}
            minDate={new Date(new Date().setHours(0, 0, 0, 0))}
            styles={{
              ...defaultStyles,
              today: { backgroundColor: "#f3f4f6" }, // Add a border to today's date
              selected: { backgroundColor: "#000" }, // Highlight the selected day
              selected_label: { color: "white" }, // Highlight the selected day label
            }}
          />
        </ThemedView>
      </Popover>
    </ThemedView>
  );
};
