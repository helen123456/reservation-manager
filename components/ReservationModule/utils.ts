import dayjs from "dayjs";
import _ from "lodash";
import { Reservation, FlatDataItem } from "./types";

// Generate mock reservations for multiple dates
export const generateMockReservations = (
  count?: number,
  page?: number
): Reservation[] => {
  const reservations: Reservation[] = [];
  const today = new Date();
  const names = [
    "John Smith",
    "Emma Johnson",
    "Michael Brown",
    "Sarah Wilson",
    "David Chen",
    "Lisa Anderson",
    "James Wilson",
    "Maria Garcia",
    "Robert Taylor",
    "Jennifer Lee",
    "William Davis",
    "Elizabeth White",
    "Christopher Harris",
    "Amanda Clark",
    "Matthew Lopez",
    "Jessica Rodriguez",
    "Daniel Martinez",
    "Ashley Jackson",
    "Anthony Thompson",
    "Nicole Moore",
  ];

  const times = [
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
  ];
  const statuses: ("pending" | "confirmed" | "rejected")[] = [
    "pending",
    "confirmed",
    "rejected",
  ];

  let idCounter = page ? (page - 1) * (count || 20) : 0;
  const daysToGenerate = count ? Math.ceil(count / 4) : 5;
  const startDayOffset = page ? (page - 1) * 2 : 0;

  for (
    let dayOffset = startDayOffset;
    dayOffset < startDayOffset + daysToGenerate && dayOffset < 10;
    dayOffset++
  ) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);
    const dateStr = date.toISOString().split("T")[0];

    // Generate 3-8 reservations per day
    const numReservations = Math.floor(Math.random() * 6) + 3;

    for (let i = 0; i < numReservations; i++) {
      idCounter++;
      reservations.push({
        id: idCounter,
        restaurantId: 1,
        contactName: names[Math.floor(Math.random() * names.length)],
        contactPhone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 9000) + 1000
        }`,
        contactEmail: `user${idCounter}@example.com`,
        reserveTime: `${dateStr} ${times[Math.floor(Math.random() * times.length)]}:00`,
        guests: Math.floor(Math.random() * 8) + 1,
        status: Math.floor(Math.random() * 4), // 0-3
        otherRequirements:
          Math.random() > 0.7 ? "Special dietary requirements" : "",
        createTime: new Date().toISOString(),
      });
    }
  }

  return reservations.sort((a, b) => {
    const dateA = a.reserveTime.split(' ')[0];
    const dateB = b.reserveTime.split(' ')[0];
    if (dateA !== dateB) {
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    }
    return a.reserveTime.localeCompare(b.reserveTime);
  });
};

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

// export const getFilteredReservations = (
//   allReservations: Reservation[],
//   searchQuery: string,
//   selectedDate?: Date
// ) => {
//   let filtered = allReservations;

//   // Filter by search query
//   if (searchQuery) {
//     filtered = filtered.filter(reservation =>
//       reservation.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       reservation.phone.includes(searchQuery)
//     );
//   }

//   // Filter by selected date
//   if (selectedDate) {
//     const selectedDateStr = selectedDate.toISOString().split('T')[0];
//     filtered = filtered.filter(reservation => reservation.date === selectedDateStr);
//   }

//   return filtered;
// };

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
  const grouped: { [key: string]: Reservation[] } = _.groupBy(
    allReservations,
    (item) => dayjs(item.reserveTime).format("YYYY-MM-DD")
  );
  
  // 排序并处理分组数据
  const groupedReservations = Object.entries(grouped)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, reservations]) => ({
      date,
      reservations: _.orderBy(
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


