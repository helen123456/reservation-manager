export interface Reservation {
  id: number;
  restaurantId: string;
  contactName: string;
  // 后端 services/types 中并未返回 firstName/lastName，UI 仅在有值时显示，
  // 故保留为可选以便与后端响应类型兼容。
  firstName?: string;
  lastName?: string;
  contactPhone: string;
  contactEmail: string;
  guests: number;
  reserveDate: string;
  reserveTimeSlot: string;
  otherRequirements: string;
  status: number;
  createTime: string;
}

export interface GroupedReservation {
  date: string;
  title: string;
  data: Reservation[];
}

export type FlatDataItem =
  | { type: "header"; date: string; count: number; pendingCount?: number }
  | { type: "reservation"; reservation: Reservation };
