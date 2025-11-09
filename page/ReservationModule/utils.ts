import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import { TranslationKey } from "../../utils/i18n";
import { FlatDataItem, Reservation } from "./types";

const getReservationDate = (reservation: Reservation) => {
  return reservation.reserveDate || reservation.createTime?.split("T")[0] || "";
};

const getTimeSlotValue = (timeSlot?: string) => {
  if (!timeSlot) return 0;
  const [hours, minutes, seconds] = timeSlot.split(":");
  const h = Number(hours) || 0;
  const m = Number(minutes) || 0;
  const s = Number(seconds) || 0;
  return h * 3600 + m * 60 + s;
};

export const formatDateHeader = (dateStr: string, t: (key: TranslationKey) => string) => {
    console.log("formaformatDateHeadertDate", dateStr)
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
    return t("today");
  } else if (dateOnly.getTime() === tomorrowOnly.getTime()) {
    return t("tomorrow");
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
  const todayReservations = allReservations.filter(
    (r) => getReservationDate(r) === todayStr
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
    (item) => getReservationDate(item)
  );
  
  // 排序并处理分组数据
  const groupedReservations = Object.entries(grouped)
    .sort(([a], [b]) => {
      const aTime = new Date(a).getTime();
      const bTime = new Date(b).getTime();
      const safeATime = Number.isNaN(aTime) ? 0 : aTime;
      const safeBTime = Number.isNaN(bTime) ? 0 : bTime;
      return safeATime - safeBTime;
    })
    .map(([date, reservations]) => ({
      date,
      reservations: orderBy(
        reservations,
        [
          (item: Reservation) => item.status, // 直接按状态数字排序，0最前，3最后
          (item: Reservation) => getTimeSlotValue(item.reserveTimeSlot), // 时间戳
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
