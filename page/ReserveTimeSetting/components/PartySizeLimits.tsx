import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../../../hooks/useTranslation";

interface PartySizeLimitsProps {
  minGuests: number;
  maxGuests: number;
  onUpdateGuestCount: (field: "maxGuests" | "minGuests", value: number) => void;
  onGuestInputChange: (field: "maxGuests" | "minGuests", text: string) => void;
  styles: any;
}

export default function PartySizeLimits({
  minGuests,
  maxGuests,
  onUpdateGuestCount,
  onGuestInputChange,
  styles,
}: PartySizeLimitsProps) {
  const { t } = useTranslation();

  return (
    <View style={[styles.card,styles.partyLimitsContainer]}>
      <Text style={styles.cardTitle}>{t("partySizeLimits")}</Text>

      <View style={styles.row}>
        <View style={styles.guestGroup}>
          <Text style={styles.label}>{t("minimumGuests")}</Text>
          <View style={styles.guestCounter}>
            <TouchableOpacity
              style={[
                styles.guestButton,
                minGuests <= 1 && styles.guestButtonDisabled,
              ]}
              onPress={() => onUpdateGuestCount("minGuests", minGuests - 1)}
              disabled={minGuests <= 1}
            >
              <Ionicons
                name="remove"
                size={14}
                color={minGuests <= 1 ? "#ccc" : "#000"}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.guestInput}
              value={minGuests.toString()}
              onChangeText={(text) => onGuestInputChange("minGuests", text)}
              keyboardType="numeric"
              maxLength={3}
            />
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => onUpdateGuestCount("minGuests", minGuests + 1)}
            >
              <Ionicons name="add" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.guestGroup}>
          <Text style={styles.label}>{t("maximumGuests")}</Text>
          <View style={styles.guestCounter}>
            <TouchableOpacity
              style={[
                styles.guestButton,
                maxGuests <= minGuests && styles.guestButtonDisabled,
              ]}
              onPress={() => onUpdateGuestCount("maxGuests", maxGuests - 1)}
              disabled={maxGuests <= minGuests}
            >
              <Ionicons
                name="remove"
                size={14}
                color={maxGuests <= minGuests ? "#ccc" : "#000"}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.guestInput}
              value={maxGuests.toString()}
              onChangeText={(text) => onGuestInputChange("maxGuests", text)}
              keyboardType="numeric"
              maxLength={3}
            />
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => onUpdateGuestCount("maxGuests", maxGuests + 1)}
            >
              <Ionicons name="add" size={14} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}