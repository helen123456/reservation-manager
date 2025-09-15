import dayjs from "dayjs";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import { FlatDataItem, Reservation } from "./types";



export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const formatDateHeader = (dateStr: string) => {
  const date = new Date(dateStr);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const tomorrowOnly = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate()
  );

  if (dateOnly.getTime() === todayOnly.getTime()) {
    return "Today";
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return "Tomorrow";
  } else {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }
};


export const calculateStats = (allReservations: Reservation[]) => {
  const todayStr = new Date().toISOString().split("T")[0];
  const todayReservations = allReservations.filter((r) => 
    r.reserveTime.split(' ')[0] === todayStr
  );
  const pendingCount = allReservations.filter(
    (r) => r.status === 0
  ).length;
  const confirmedCount = allReservations.filter(
    (r) => r.status === 1
  ).length;
  const totalGuests = todayReservations.reduce((sum, r) => sum + r.guests, 0);

  return {
    todayReservations: todayReservations.length,
    pendingCount,
    confirmedCount,
    totalGuests,
  };
};

// 获取扁平化数据的方法
export const getFlatData = (allReservations: Reservation[]): FlatDataItem[] => {
  // 按日期分组预订
  const grouped: { [key: string]: Reservation[] } = groupBy(
    allReservations,
    (item) => dayjs(item.reserveTime).format("YYYY-MM-DD")
  );
  
  // 排序并处理分组数据
  const groupedReservations = Object.entries(grouped)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, reservations]) => ({
      date,
      reservations: orderBy(
        reservations,
        [
          (item: Reservation) => item.status, // 直接按状态数字排序，0最前，3最后
          (item: Reservation) => new Date(item.reserveTime).getTime(), // 时间戳
        ],
        ["asc", "asc"] // 排序方向：两个条件均为升序
      ),
    }));

  // 生成扁平化数据
  return groupedReservations.flatMap((group) => {
    const pendingCount = group.reservations.filter(
      (r: Reservation) => r.status === 0
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
};


