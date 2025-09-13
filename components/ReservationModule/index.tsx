import { useTheme } from "@/hooks/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { getReservations } from "@/services/api/reservationService";
import { Reservation } from "@/services/types";
import { message } from "@/utils/message";
import dayjs from "dayjs";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from "react-native";
import { NavBack } from "../NavBack";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { IconSymbol } from "../ui/IconSymbol";
import { FilterBar } from "./FilterBar";
import { ReservationDetail } from "./ReservationDetail";
import { ReservationItem } from "./ReservationItem";
import { SearchBar } from "./SearchBar";
import { StatsCard } from "./StatsCard";
import { createStyles } from "./styles";
import { FlatDataItem } from "./types";
import { calculateStats, formatDateHeader, getFlatData } from "./utils";

export default function ReservationModule() {
  const { t } = useTranslation();
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // 按日期重新分组合并数据的函数
  const mergeReservationsByDate = useCallback(
    (existingReservations: Reservation[], newReservations: Reservation[]) => {
      // 将现有数据按日期分组
      const existingByDate = _.groupBy(existingReservations, (item) =>
        dayjs(item.reserveTime).format("YYYY-MM-DD")
      );

      // 将新数据按日期分组
      const newByDate: { [date: string]: Reservation[] } = _.groupBy(
        newReservations,
        (item) => dayjs(item.reserveTime).format("YYYY-MM-DD")
      );

      // 合并数据：对于相同日期，合并并去重；对于新日期，直接添加
      const mergedByDate: { [date: string]: Reservation[] } = _.merge(
        existingByDate,
        newByDate
      );

      // 将分组数据转换回扁平数组，按日期排序
      const result: Reservation[] = [];
      Object.keys(mergedByDate)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .forEach((date) => {
          result.push(...mergedByDate[date]);
        });

      return result;
    },
    []
  );

  // 加载预订数据
  const loadReservations = useCallback(
    async (page: number = 1, reset: boolean = false) => {
      console.log("reset", reset);
      if (isLoading) return;
      setIsLoading(true);
      setError(null);

      try {
        const params = {
          page,
          pageSize: 10,
          ...(searchQuery && { search: searchQuery }),
          ...(selectedDate && {
            date: dayjs(selectedDate).format("YYYY-MM-DD"),
          }),
        };
        const response: any = await getReservations(params);

        if (response.code === 200) {
          if (reset) {
            setAllReservations(response.data);
            setCurrentPage(1);
          } else {
            // 使用新的按日期合并逻辑
            setAllReservations((prev) =>
              mergeReservationsByDate(prev, response.data)
            );
            setCurrentPage(page);
          }

          setTotal(response.total);
          const hasMore = page * params.pageSize < response.total;
          setHasNextPage(hasMore);
        } else {
          message.error(response.msg || "获取预订列表失败");
        }
      } catch (error) {
        message.error("网络错误，请稍后重试");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, searchQuery, selectedDate, mergeReservationsByDate]
  );

  // 初始加载
  useEffect(() => {
    loadReservations(1, true);
  }, []);

  // 搜索和筛选变化时重新加载
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadReservations(1, true);
    }, 300); // 防抖

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedDate]);

  // 加载更多数据
  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      loadReservations(currentPage + 1, false);
    }
  }, [hasNextPage, isLoading, currentPage, loadReservations]);

  // 刷新数据
  const refreshData = useCallback(() => {
    loadReservations(1, true);
  }, [loadReservations]);

  const stats = useMemo(() => {
    return calculateStats(allReservations);
  }, [allReservations]);

  // 加载下一页数据的函数
  const loadNextPage = useCallback(() => {
    if (isLoading || !hasNextPage) {
      return;
    }
    console.log("loadNextPage triggered");
    loadMore();
  }, [isLoading, hasNextPage, loadMore]);

  const flatData: FlatDataItem[] = useMemo(() => {
    return getFlatData(allReservations);
  }, [allReservations]);

  const handleReservationPress = (reservation: Reservation) => {
    setSelectedReservation(reservation);
  };

  const handleBack = () => {
    setSelectedReservation(null);
  };

  const handleUpdateReservation = (reservation: Reservation) => {
    setAllReservations((prev) =>
      prev.map((r) => (r.id === reservation.id ? reservation : r))
    );
    setSelectedReservation(null);
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
            <ThemedView style={[styles.countBadge]}>
              <ThemedText style={styles.countBadgeText}>
                {item.count}
              </ThemedText>
              <ThemedText style={styles.countBadgeText}>
                {item.count === 1 ? "reservation" : "reservations"}
              </ThemedText>
            </ThemedView>
            {!!item.pendingCount && item.pendingCount > 0 && (
              <ThemedView style={[styles.countBadge]}>
                <ThemedText style={[styles.countBadgeText]}>
                  {item.pendingCount} {t("pending")}
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
  const onDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  if (selectedReservation) {
    return (
      <ReservationDetail
        reservation={selectedReservation}
        onBack={handleBack}
        onAccept={handleUpdateReservation}
        onReject={handleUpdateReservation}
      />
    );
  }

  return (
    <ThemedView style={[styles.container]}>
      <ThemedView>
        <NavBack
          title={t("reservations")}
          subtitle="Manage your restaurant reservations"
          showBackButton={false}
          onBack={() => {}}
        />

        <StatsCard
          todayReservations={stats.todayReservations}
          pendingCount={stats.pendingCount}
          confirmedCount={stats.confirmedCount}
          totalGuests={stats.totalGuests}
        />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDate={selectedDate}
          onDateChange={onDateChange}
        />

        <FilterBar
          searchQuery={searchQuery}
          selectedDate={selectedDate}
          onClearSearch={handleClearSearch}
          onClearDate={handleClearDate}
        />
      </ThemedView>

      {error && (
        <ThemedView style={{ padding: 16, backgroundColor: "#ffebee" }}>
          <ThemedText style={{ color: "#c62828" }}>{error}</ThemedText>
        </ThemedView>
      )}

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
        onEndReachedThreshold={0.5}
        onRefresh={refreshData}
        refreshing={isLoading && currentPage === 1}
        removeClippedSubviews={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <IconSymbol
              library="Feather"
              size={26}
              name="calendar"
              color={theme.primary}
            />
            <Text style={styles.emptyText}>这里还没有内容哦</Text>
          </View>
        }
        ListFooterComponent={
          flatData.length === 0 ? null : isLoading && currentPage > 1 ? (
            <ThemedView style={{ padding: 20, alignItems: "center" }}>
              <ActivityIndicator size="small" />
              <ThemedText style={{ marginTop: 8, opacity: 0.6 }}>
                Loading reservations...
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={{ padding: 20, alignItems: "center" }}>
              <ThemedText style={{ opacity: 0.6 }}>
                No more reservations
              </ThemedText>
            </ThemedView>
          )
        }
      />
    </ThemedView>
  );
}
