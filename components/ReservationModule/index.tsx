import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, Alert, FlatList } from "react-native";
import { useTranslation } from "../../hooks/useTranslation";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { FilterBar } from "./FilterBar";
import { ReservationDetail } from "./ReservationDetail";
import { ReservationItem } from "./ReservationItem";
import { SearchBar } from "./SearchBar";
import { StatsCard } from "./StatsCard";
import { styles } from "./styles";
import { FlatDataItem, Reservation } from "./types";
import {
  calculateStats,
  formatDateHeader,
  generateMockReservations,
  getFilteredReservations,
} from "./utils";

export default function ReservationModule() {
  const { t } = useTranslation();
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [allReservations, setAllReservations] = useState<Reservation[]>(generateMockReservations());
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReservations = useMemo(() => {
    return getFilteredReservations(allReservations, searchQuery, selectedDate);
  }, [allReservations, searchQuery, selectedDate]);

  const stats = useMemo(() => {
    return calculateStats(allReservations);
  }, [allReservations]);

  // 合并新数据到现有数据的函数
  const mergeReservations = useCallback((existingReservations: Reservation[], newReservations: Reservation[]) => {
    const merged = [...existingReservations];
    const existingIds = new Set(existingReservations.map(r => r.id));
    
    newReservations.forEach(newReservation => {
      if (!existingIds.has(newReservation.id)) {
        merged.push(newReservation);
      }
    });
    
    return merged;
  }, []);

  // 加载下一页数据的函数
  const loadNextPage = useCallback(async () => {
    if (isLoading || !hasNextPage) return;
    
    setIsLoading(true);
    try {
      // 这里应该是实际的API调用
      // const newReservations = await fetchReservations(currentPage + 1);
      
      // 模拟API调用
      const newReservations = generateMockReservations(10, currentPage + 1);
      
      if (newReservations.length === 0) {
        setHasNextPage(false);
      } else {
        setAllReservations(prev => mergeReservations(prev, newReservations));
        setCurrentPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Failed to load next page:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasNextPage, currentPage, mergeReservations]);

  const groupedReservations = useMemo(() => {
    const grouped: { [key: string]: Reservation[] } = {};

    filteredReservations.forEach((reservation) => {
      if (!grouped[reservation.date]) {
        grouped[reservation.date] = [];
      }
      grouped[reservation.date].push(reservation);
    });

    return Object.entries(grouped)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, reservations]) => ({
        date,
        reservations: reservations.sort((a, b) => a.time.localeCompare(b.time)),
      }));
  }, [filteredReservations]);
  console.log("groupedReservations", groupedReservations);

  const flatData: FlatDataItem[] = useMemo(() => {
    return groupedReservations.flatMap((group) => {
      const pendingCount = group.reservations.filter(
        (r) => r.status === "pending"
      ).length;
      return [
        {
          type: "header",
          date: group.date,
          count: group.reservations.length,
          pendingCount,
        },
        ...group.reservations.map((res) => ({
          type: "reservation" as const,
          reservation: res,
        })),
      ];
    });
  }, [groupedReservations]);
  console.log("flatData11", flatData);
  console.log("allReservations", allReservations);
  const handleReservationPress = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const handleBack = () => {
    setSelectedReservation(null);
  };

  const handleAcceptReservation = (reservation: Reservation) => {
    Alert.alert(
      "Accept Reservation",
      `Accept reservation for ${reservation.customerName}?`,
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("accept"),
          onPress: () => {
            reservation.status = "confirmed";
            setSelectedReservation(null);
          },
        },
      ]
    );
  };

  const handleRejectReservation = (reservation: Reservation) => {
    Alert.alert(
      "Decline Reservation",
      `Decline reservation for ${reservation.customerName}?`,
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("decline"),
          style: "destructive",
          onPress: () => {
            reservation.status = "rejected";
            setSelectedReservation(null);
          },
        },
      ]
    );
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleClearDate = () => {
    setSelectedDate(undefined);
  };

  const renderItem = ({ item }: { item: FlatDataItem }) => {
    if (item.type === "header") {
      return (
        <ThemedView style={styles.dateHeader}>
          <ThemedText style={styles.dateHeaderText}>
            {formatDateHeader(item.date)}
          </ThemedText>
          <ThemedView style={{ flexDirection: "row", gap: 8 }}>
            <ThemedView
              style={[styles.countBadge]}
            >
              <ThemedText style={styles.countBadgeText}>
                {item.count} {item.count === 1 ? "reservation" : "reservations"}
              </ThemedText>
            </ThemedView>
            {item.pendingCount && item.pendingCount > 0 && (
              <ThemedView
                style={[styles.countBadge]}
              >
                <ThemedText
                  style={[styles.countBadgeText]}
                >
                  {item.pendingCount} pending
                </ThemedText>
              </ThemedView>
            )}
          </ThemedView>
        </ThemedView>
      );
    }

    if (item.type === "reservation") {
      return (
        <ReservationItem
          reservation={item.reservation}
          onPress={handleReservationPress}
        />
      );
    }

    return null;
  };

  if (selectedReservation) {
    return (
      <ReservationDetail
        reservation={selectedReservation}
        onBack={handleBack}
        onAccept={handleAcceptReservation}
        onReject={handleRejectReservation}
      />
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>{t("reservations")}</ThemedText>
        <ThemedText style={styles.subtitle}>
          Manage your restaurant reservations
        </ThemedText>
      </ThemedView>

      <StatsCard
        todayReservations={stats.todayReservations}
        pendingCount={stats.pendingCount}
        confirmedCount={stats.confirmedCount}
        totalGuests={stats.totalGuests}
      />

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} selectedDate={selectedDate} onDateChange={setSelectedDate} />
      
      <FilterBar 
        searchQuery={searchQuery} 
        selectedDate={selectedDate} 
        onClearSearch={handleClearSearch} 
        onClearDate={handleClearDate} 
      />
      </ThemedView>

      

      <FlatList
        data={flatData}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.type === "header"
            ? `header-${item.date}`
            : `reservation-${item.reservation?.id || index}`
        }
        style={styles.list}
        showsVerticalScrollIndicator={false}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading ? (
            <ThemedView style={{ padding: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" />
              <ThemedText style={{ marginTop: 8, opacity: 0.6 }}>
                Loading more reservations...
              </ThemedText>
            </ThemedView>
          ) : null
        }
      />
      
    </ThemedView>
  );
}
