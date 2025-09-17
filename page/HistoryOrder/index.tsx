import { Icon, NavBack, Toast } from "@/components";
import { useTheme } from "@/hooks/ThemeContext";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterBar } from "@/page/ReservationModule/FilterBar";
import { SearchBar } from "@/page/ReservationModule/SearchBar";
import {
  formatDateHeader,
  getFlatData,
} from "@/page/ReservationModule/utils";
import { getReservations } from "@/services/api/reservationService";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import groupBy from "lodash/groupBy";
import merge from "lodash/merge";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View
} from "react-native";
import { createStyles } from "./styles";

const HistoryOrder = ({ onBack }: { onBack: any }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [allReservations, setAllReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
   // 用于跟踪是否是首次渲染
  const isFirstRender = useRef(true);



  // 搜索和筛选变化时重新加载
  useEffect(() => {
    // 如果是首次渲染，跳过执行
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeoutId = setTimeout(() => {
      loadReservations(1, true);
    }, 300); // 防抖

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedDate]);
  const onDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  const handleClearDate = () => {
    setSelectedDate(undefined);
  };
  const flatData = useMemo(() => {
    return getFlatData(allReservations);
  }, [allReservations]);
  // 按日期重新分组合并数据的函数
  const mergeReservationsByDate = useCallback(
    (existingReservations: any, newReservations: any) => {
      // 将现有数据按日期分组
      const existingByDate = groupBy(existingReservations, (item) =>
        dayjs(item.reserveTime).format("YYYY-MM-DD")
      );

      // 将新数据按日期分组
      const newByDate: { [date: string]: any } = groupBy(
        newReservations,
        (item) => dayjs(item.reserveTime).format("YYYY-MM-DD")
      );

      // 合并数据：对于相同日期，合并并去重；对于新日期，直接添加
      const mergedByDate: { [date: string]: any } = merge(
        existingByDate,
        newByDate
      );

      // 将分组数据转换回扁平数组，按日期排序
      const result: any = [];
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
      if (isLoading) return;
      setIsLoading(true);

      try {
        const params = {
          queryType: 1,
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

          const hasMore = page * params.pageSize < response.total;
          setHasNextPage(hasMore);
        } else {
          Toast.fail(response.msg || "获取预订列表失败");
        }
      } catch (error) {
        Toast.fail("网络错误，请稍后重试");
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, searchQuery, selectedDate, mergeReservationsByDate]
  );

  // 加载更多数据
  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) {
      console.log("loadMore");
      loadReservations(currentPage + 1, false);
    }
  }, [hasNextPage, isLoading, currentPage, loadReservations]);
  // 加载下一页数据的函数
  const loadNextPage = useCallback(() => {
    if (isLoading || !hasNextPage) {
      return;
    }
    console.log("loadNextPage triggered");
    loadMore();
  }, [isLoading, hasNextPage, loadMore]);
  // 刷新数据
  const refreshData = useCallback(() => {
    loadReservations(1, true);
  }, [loadReservations]);
  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "header") {
      return (
        <View style={styles.dateHeader}>
          <Text style={styles.dateHeaderText}>
            {formatDateHeader(item.date, t)}
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={[styles.countBadge]}>
              <Text style={styles.countBadgeText}>{item.count}</Text>
              <Text style={styles.countBadgeText}>
                {item.count === 1 ? "reservation" : "reservations"}
              </Text>
            </View>
            {!!item.pendingCount && item.pendingCount > 0 && (
              <View style={[styles.countBadge]}>
                <Text style={[styles.countBadgeText]}>
                  {item.pendingCount} {t("pending")}
                </Text>
              </View>
            )}
          </View>
        </View>
      );
    }

    if (item.type === "reservation") {
      return (
        <View style={styles.reservationContent}>
          <View style={styles.reservationLeft}>
            <View style={styles.reservationInfo}>
              <View style={styles.reservationHeader}>
                <Text style={styles.customerNameSmall}>
                  {item.reservation.contactName}
                </Text>
              </View>

              <View style={styles.reservationDetails}>
                <View style={styles.detailRow}>
                  <Feather name="clock" size={12} color="#6b7280" />
                  <Text style={styles.detailTextSmall}>
                    {dayjs(item.reservation.reserveTime).format("HH:mm")}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Feather name="users" size={12} color="#6b7280" />
                  <Text style={styles.detailTextSmall}>
                    {item.reservation.guests}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }

    return null;
  };
  return (
    <View style={styles.container}>
      <NavBack
        title={t("historyOrder")}
        onBack={onBack || (() => {})}
        showBackButton={!!onBack}
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
              <Icon
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
              <View style={{ padding: 20, alignItems: "center" }}>
                <ActivityIndicator size="small" />
                <Text style={{ marginTop: 8, opacity: 0.6 }}>
                  Loading reservations...
                </Text>
              </View>
            ) : (
              <View style={{ padding: 20, alignItems: "center" }}>
                <Text style={{ opacity: 0.6 }}>No more reservations</Text>
              </View>
            )
          }
        />
      
    </View>
  );
};
export default HistoryOrder;
