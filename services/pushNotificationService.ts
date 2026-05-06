import { NotificationData } from "@/types/notification.types";
import {
  handleNotificationNavigation,
  showNotificationMessage,
  validateNotificationData,
} from "@/utils/notificationRoutes";
import storage from "@/utils/storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import {
  PushTokenRegisterRequest,
  registerPushTokenApi,
  sendTest,
} from "./api/pushNotificationService";

// 配置通知处理行为（Expo Go SDK 53 在 Android 上移除了远程通知支持，用 try-catch 防止崩溃）
try {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
} catch (e) {
  console.warn("setNotificationHandler 失败（可能在 Expo Go 中运行）:", e);
}

export class PushNotificationService {
  private static instance: PushNotificationService;
  private pushToken: string | null = null;
  private notificationListener: any = null;
  private responseListener: any = null;

  private constructor() {}

  static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  /**
   * 初始化推送通知服务
   */
  async initialize(): Promise<void> {
    try {
      // Web 端特殊处理：不需要检查真实设备
      if (Platform.OS === "web") {
        console.log("Web 端推送通知初始化开始");
      } else {
        // Expo Go SDK 53 在 Android 上已移除远程推送通知支持，直接跳过
        if (Constants.appOwnership === "expo") {
          console.warn(
            "运行在 Expo Go 中，跳过远程推送通知初始化（SDK 53 不再支持）",
          );
          return;
        }
        // 检查设备是否支持推送通知（仅移动端）
        if (!Device.isDevice) {
          console.warn("推送通知需要在真实设备上运行");
          return;
        }
      }

      // 请求通知权限
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.warn("推送通知权限被拒绝");
        return;
      }

      // 获取推送令牌
      await this.getPushToken();

      // 注册推送令牌到服务器
      await this.registerPushToken();

      // 设置通知监听器
      this.setupNotificationListeners();

      console.log("推送通知服务初始化成功");
    } catch (error) {
      console.error("推送通知服务初始化失败:", error);
    }
  }

  /**
   * 获取推送令牌
   */
  private async getPushToken(): Promise<string | null> {
    try {
      // Web 端使用原生 Push API
      console.log("设备平台: ", Platform.OS);
      if (Platform.OS === "web") {
        return await this.getWebPushToken();
      }

      // 移动端使用 Expo Push Token
      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ||
        Constants.easConfig?.projectId ||
        (Constants.expoConfig as any)?.projectId ||
        "reservation-manager-app";

      console.log("使用的 projectId:", projectId);

      const tokenConfig: any = {
        projectId: projectId,
        applicationId: "com.reservationmanager.app",
      };

      const token = await Notifications.getExpoPushTokenAsync(tokenConfig);
      this.pushToken = token.data;
      console.log("获取移动端推送令牌成功:", this.pushToken);
      return this.pushToken;
    } catch (error) {
      console.error("获取推送令牌失败:", error);
      return null;
    }
  }

  /**
   * Web 端获取推送令牌（使用原生 Push API）
   */
  private async getWebPushToken(): Promise<string | null> {
    try {
      console.log("Web 端开始获取推送令牌");

      // 检查浏览器是否支持 Service Worker 和 Push API
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("浏览器不支持 Push API");
        return null;
      }

      // 注册 Service Worker
      const registration =
        await navigator.serviceWorker.register("/push-sw.js");
      console.log("Service Worker 注册成功:", registration);

      // 获取 VAPID 公钥
      const vapidPublicKey =
        (Constants.expoConfig?.notification as any)?.vapidPublicKey ||
        (Constants.expoConfig?.web as any)?.notification?.vapidPublicKey ||
        "BJRCUJU1li8g_jU0huebXFzlIuf60pZQlIVs9V7PdJ_wXP7rlRtjxaiEaBP1Ku1QRuomBBLimPqrrQb38s84n30";

      console.log("使用的 VAPID 公钥:", vapidPublicKey);

      // 订阅推送服务
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      });

      // 将订阅信息转换为字符串作为推送令牌
      // Web 端的 pushToken 是包含 endpoint 和 keys 的 JSON 字符串
      // 这与移动端的简单字符串格式不同，但都是有效的推送令牌
      const pushToken = JSON.stringify(subscription);
      this.pushToken = pushToken;

      console.log("Web 端推送令牌获取成功，长度:", pushToken.length);
      console.log("推送令牌类型:", typeof pushToken); // 应该是 'string'
      console.log("推送令牌预览:", pushToken.substring(0, 100) + "...");

      return pushToken;
    } catch (error) {
      console.error("Web 端推送令牌获取失败:", error);
      return null;
    }
  }

  /**
   * 注册推送令牌到服务器
   */
  private async registerPushToken(): Promise<void> {
    try {
      if (!this.pushToken) {
        console.warn("推送令牌为空，无法注册");
        return;
      }

      // 获取用户ID（从存储中获取）
      const userIdStr = await storage.getItem("uid");
      if (!userIdStr) {
        console.warn("用户未登录，无法注册推送令牌");
        return;
      }

      const userId = userIdStr;

      // 生成设备ID（可以使用设备信息或生成唯一标识）
      let deviceId = await storage.getItem("deviceId");
      if (!deviceId) {
        deviceId = Device.modelName + "_" + Date.now();
        await storage.setItem("deviceId", deviceId);
      }

      // 获取平台信息
      const platform = Platform.OS;

      const registerData: PushTokenRegisterRequest = {
        userId,
        pushToken: this.pushToken,
        deviceId,
        platform,
      };

      await registerPushTokenApi(registerData);
      console.log("推送令牌注册成功");
    } catch (error) {
      console.error("推送令牌注册失败:", error);
    }
  }

  /**
   * 设置通知监听器
   */
  private setupNotificationListeners(): void {
    // 监听接收到的通知
    this.notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("收到推送通知:", notification);
        this.onNotificationReceived(notification);
      },
    );

    // 监听用户对通知的响应
    this.responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("用户点击了通知:", response);
        this.onNotificationResponse(response);
      });
  }

  /**
   * 处理收到的通知
   */
  private onNotificationReceived(
    notification: Notifications.Notification,
  ): void {
    try {
      const notificationData = notification.request.content.data;

      console.log("收到通知:", {
        title: notification.request.content.title,
        body: notification.request.content.body,
        data: notificationData,
      });

      // 验证通知数据格式
      if (validateNotificationData(notificationData)) {
        // 显示应用内通知消息
        showNotificationMessage(notificationData as NotificationData);

        // 这里可以添加更多的应用内处理逻辑
        // 比如更新应用内的通知计数、更新UI状态等
        this.handleInAppNotification(notificationData as NotificationData);
      } else {
        console.warn("收到的通知数据格式无效:", notificationData);
        // 对于无效格式的通知，显示默认消息
        console.log("显示默认通知:", {
          title: notification.request.content.title || "新通知",
          body: notification.request.content.body || "您有新的通知",
        });
      }
    } catch (error) {
      console.error("处理收到的通知时出错:", error);
    }
  }

  /**
   * 处理用户点击通知的响应
   */
  private onNotificationResponse(
    response: Notifications.NotificationResponse,
  ): void {
    try {
      const notificationData = response.notification.request.content.data;

      console.log("用户点击通知:", {
        data: notificationData,
        actionIdentifier: response.actionIdentifier,
      });

      // 验证通知数据格式
      if (validateNotificationData(notificationData)) {
        // 使用统一的导航处理器
        const result = handleNotificationNavigation(
          notificationData as NotificationData,
        );

        if (result.success) {
          console.log(`成功导航到: ${result.targetUrl}`);
        } else {
          console.error(`导航失败: ${result.error}`);
        }
      } else {
        console.warn("通知数据格式无效，使用默认导航");
        // 对于无效格式的通知，导航到首页
        handleNotificationNavigation({
          type: "system",
          title: response.notification.request.content.title || "通知",
          body: response.notification.request.content.body || "您有新的通知",
        });
      }
    } catch (error) {
      console.error("处理通知点击响应时出错:", error);
      // 降级处理：尝试导航到首页
      try {
        handleNotificationNavigation({
          type: "system",
          title: "通知",
          body: "处理通知时出现错误",
        });
      } catch (fallbackError) {
        console.error("降级导航也失败了:", fallbackError);
      }
    }
  }

  /**
   * 处理应用内通知
   */
  private handleInAppNotification(data: NotificationData): void {
    try {
      console.log("处理应用内通知:", data.type);

      // 根据通知类型执行相应的应用内处理
      switch (data.type) {
        case "reservation":
          // 更新预订相关的UI状态
          this.handleReservationNotification(data);
          break;

        case "message":
          // 更新消息相关的UI状态
          this.handleMessageNotification(data);
          break;

        case "system":
          // 处理系统通知
          this.handleSystemNotification(data);
          break;

        case "promotion":
          // 处理促销通知
          this.handlePromotionNotification(data);
          break;

        case "reminder":
          // 处理提醒通知
          this.handleReminderNotification(data);
          break;

        default:
          console.log("未知通知类型，使用默认处理");
      }
    } catch (error) {
      console.error("处理应用内通知时出错:", error);
    }
  }

  /**
   * 处理预订通知
   */
  private handleReservationNotification(data: NotificationData): void {
    // 这里可以添加预订相关的应用内处理逻辑
    // 比如更新预订列表、显示预订状态变化等
    console.log("处理预订通知:", data);
  }

  /**
   * 处理消息通知
   */
  private handleMessageNotification(data: NotificationData): void {
    // 这里可以添加消息相关的应用内处理逻辑
    // 比如更新未读消息计数等
    console.log("处理消息通知:", data);
  }

  /**
   * 处理系统通知
   */
  private handleSystemNotification(data: NotificationData): void {
    // 这里可以添加系统通知相关的应用内处理逻辑
    console.log("处理系统通知:", data);
  }

  /**
   * 处理促销通知
   */
  private handlePromotionNotification(data: NotificationData): void {
    // 这里可以添加促销通知相关的应用内处理逻辑
    console.log("处理促销通知:", data);
  }

  /**
   * 处理提醒通知
   */
  private handleReminderNotification(data: NotificationData): void {
    // 这里可以添加提醒通知相关的应用内处理逻辑
    console.log("处理提醒通知:", data);
  }

  /**
   * 发送本地通知（用于测试）
   */
  async sendLocalNotification(
    title: string,
    body: string,
    data?: any,
  ): Promise<void> {
    try {
      await sendTest();
      // await Notifications.scheduleNotificationAsync({
      //   content: {
      //     title,
      //     body,
      //     data,
      //   },
      //   trigger: null, // 立即发送
      // });
    } catch (error) {
      console.error("发送本地通知失败:", error);
    }
  }

  /**
   * 获取当前推送令牌
   */
  getCurrentPushToken(): string | null {
    return this.pushToken;
  }

  /**
   * 清理资源
   */
  cleanup(): void {
    if (this.notificationListener) {
      this.notificationListener.remove();
      this.notificationListener = null;
    }

    if (this.responseListener) {
      this.responseListener.remove();
      this.responseListener = null;
    }
  }

  /**
   * 重新注册推送令牌（比如用户重新登录时）
   */
  async reregisterPushToken(): Promise<void> {
    await this.getPushToken();
    await this.registerPushToken();
  }
}

// 导出单例实例
export const pushNotificationService = PushNotificationService.getInstance();
