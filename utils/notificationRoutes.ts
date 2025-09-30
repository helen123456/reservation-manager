import {
    MessageNotificationData,
    NotificationData,
    NotificationHandleResult,
    PromotionNotificationData,
    ReminderNotificationData,
    ReservationNotificationData,
    SystemNotificationData
} from '@/types/notification.types';
import { router } from 'expo-router';

/**
 * 处理通知点击导航
 */
export function handleNotificationNavigation(
  data: NotificationData
): NotificationHandleResult {
  try {
    console.log("处理通知导航:", data);

    if (!data || !data.type) {
      console.warn("通知数据无效，使用默认导航");
      router.push("/");
      return {
        success: true,
        navigated: true,
        targetUrl: "/",
      };
    }

    // 执行特定类型的导航
    let navigationResult: { pathname: string; params?: any } | string;

    switch (data.type) {
      case "reservation":
        navigationResult = handleReservationNavigation(data as any);
        break;

      case "message":
        navigationResult = handleMessageNavigation(data as any);
        break;

      case "system":
        navigationResult = handleSystemNavigation(data as any);
        break;

      case "promotion":
        navigationResult = handlePromotionNavigation(data as any);
        break;

      case "reminder":
        navigationResult = handleReminderNavigation(data as any);
        break;

      default:
        console.warn(`未知的通知类型: ${data.type}`);
        navigationResult = "/";
    }

    // 执行导航
    if (typeof navigationResult === "string") {
      console.log(`导航到: ${navigationResult}`);
      router.push(navigationResult as any);
      return {
        success: true,
        navigated: true,
        targetUrl: navigationResult,
      };
    } else {
      console.log(
        `导航到: ${navigationResult.pathname}`,
        navigationResult.params
      );
      router.push(navigationResult as any);
      return {
        success: true,
        navigated: true,
        targetUrl: navigationResult.pathname,
      };
    }
  } catch (error) {
    console.error("通知导航处理失败:", error);

    // 降级处理：导航到首页
    try {
      router.push("/");
      return {
        success: false,
        error: (error as Error).message,
        navigated: true,
        targetUrl: "/",
      };
    } catch (fallbackError) {
      return {
        success: false,
        error: `导航失败: ${(error as Error).message}`,
        navigated: false,
      };
    }
  }
}

/**
 * 处理预订通知导航
 */
function handleReservationNavigation(
  data: ReservationNotificationData
): { pathname: string; params?: any } | string {
  console.log(" ----- handleReservationNavigation ----", data);
  if (data && data.id) {
    // 如果有完整的预订数据，传递给详情页面
    return {
      pathname: "/(tabs)/reservation/detail",
      params: {
        reservation: JSON.stringify(data),
      },
    };
  } else {
    // 没有具体预订信息，导航到预订列表
    return "/(tabs)/reservation";
  }
}

/**
 * 处理消息通知导航
 */
function handleMessageNavigation(
  data: MessageNotificationData
): { pathname: string; params?: any } | string {
  if (data.messageId) {
    return {
      pathname: "/notifications",
      params: {
        messageId: data.messageId,
      },
    };
  } else {
    return "/notifications";
  }
}

/**
 * 处理系统通知导航
 */
function handleSystemNavigation(data: SystemNotificationData): string {
  return data.actionUrl || "/settings";
}

/**
 * 处理促销通知导航
 */
function handlePromotionNavigation(
  data: PromotionNotificationData
): { pathname: string; params?: any } | string {
  if (data.promotionId) {
    return {
      pathname: "/(tabs)/reservation",
      params: {
        promotionId: data.promotionId,
      },
    };
  } else {
    return "/(tabs)/reservation";
  }
}

/**
 * 处理提醒通知导航
 */
function handleReminderNavigation(
  data: ReminderNotificationData
): { pathname: string; params?: any } | string {
  if (data.reminderId) {
    return {
      pathname: "/notifications",
      params: {
        reminderId: data.reminderId,
      },
    };
  } else {
    return "/notifications";
  }
}

/**
 * 显示通知消息
 */
export function showNotificationMessage(data: NotificationData): void {
  // 这里可以根据不同类型显示不同样式的消息
  // 暂时使用 console.log，后续可以集成 Toast 或 Modal

  switch (data.type) {
    case "reservation":
      const reservationData = data as ReservationNotificationData;
      console.log("新预订通知:", {
        title: data.title || "新预订",
        body: data.body || "您有一个新的预订",
        action: reservationData.action,
      });
      break;

    case "message":
      console.log("消息通知:", {
        title: data.title || "新消息",
        body: data.body || "您有新的消息",
      });
      break;

    case "system":
      const systemData = data as SystemNotificationData;
      console.log("系统通知:", {
        title: data.title || "系统通知",
        body: data.body || "系统更新",
        level: systemData.level,
      });
      break;

    case "promotion":
      console.log("促销通知:", {
        title: data.title || "促销活动",
        body: data.body || "有新的促销活动",
      });
      break;

    case "reminder":
      console.log("提醒通知:", {
        title: data.title || "提醒",
        body: data.body || "您有一个提醒",
      });
      break;

    default:
      console.log("通用通知:", {
        title: data.title || "通知",
        body: data.body || "您有新的通知",
      });
  }
}

/**
 * 验证通知数据格式
 */
export function validateNotificationData(data: any): data is NotificationData {
  if (!data || typeof data !== "object") {
    return false;
  }

  // 检查必需的 type 字段
  if (!data.type || typeof data.type !== "string") {
    return false;
  }

  // 检查 type 是否为有效值
  const validTypes = [
    "reservation",
    "message",
    "system",
    "promotion",
    "reminder",
  ];
  if (!validTypes.includes(data.type)) {
    return false;
  }

  return true;
}
