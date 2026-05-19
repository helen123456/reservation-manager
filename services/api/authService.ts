/**
 * 认证相关API服务
 *
 * 安全策略（满足 App Store / Google Play 上架审核 + OWASP MASVS-STORAGE-1）：
 * - 永远不在本地持久化用户密码。
 * - 登录态（JWT token）写入 Keychain / Keystore（utils/secureStorage）。
 * - “记住我”仅记住邮箱用于回填，长效登录态由后端 SaLoginParameter 控制。
 */

import request, { resetUnauthorizedState } from "@/services/request";
import secureStorage from "@/utils/secureStorage";
import storage from "@/utils/storage";
import { resetUnreadCount, setUnreadCount } from "@/utils/unreadCountStore";

const REMEMBERED_EMAIL_KEY = "rememberedEmail";

// 历史版本曾以明文形式保存 {email,password}，从此版本起统一清除以满足合规。
const LEGACY_REMEMBERED_CREDENTIALS_KEY = "rememberedCredentials";

export const TOKEN_STORAGE_KEY = "token";

/**
 * 一次性迁移：抹掉旧版本写入的明文密码，并把可能残留在 AsyncStorage / localStorage
 * 中的 token 迁移到 Keychain / Keystore。建议在 App 启动早期（例如 AuthProvider）调用。
 */
export async function migrateInsecureAuthStorage(): Promise<void> {
  // 1) 清掉历史明文凭据
  try {
    const legacy = await storage.getItem(LEGACY_REMEMBERED_CREDENTIALS_KEY);
    if (legacy) {
      try {
        const parsed = JSON.parse(legacy);
        if (parsed && typeof parsed.email === "string") {
          // 把邮箱保留到新 key，方便用户继续享受“记住我”体验
          const existing = await storage.getItem(REMEMBERED_EMAIL_KEY);
          if (!existing) {
            await storage.setItem(REMEMBERED_EMAIL_KEY, parsed.email);
          }
        }
      } catch {
        /* ignore parse error */
      }
      await storage.removeItem(LEGACY_REMEMBERED_CREDENTIALS_KEY);
    }
  } catch {
    /* ignore */
  }

  // 2) 把残留在普通存储中的 token 迁到安全存储
  try {
    const legacyToken = await storage.getItem(TOKEN_STORAGE_KEY);
    if (legacyToken) {
      const inSecure = await secureStorage.getItem(TOKEN_STORAGE_KEY);
      if (!inSecure) {
        await secureStorage.setItem(TOKEN_STORAGE_KEY, legacyToken);
      }
      await storage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch {
    /* ignore */
  }
}

export async function getRememberedEmail(): Promise<string | null> {
  try {
    return await storage.getItem(REMEMBERED_EMAIL_KEY);
  } catch {
    return null;
  }
}

export async function clearRememberedEmail(): Promise<void> {
  await storage.removeItem(REMEMBERED_EMAIL_KEY);
}

export async function login(data: {
  password: string;
  email: string;
  rememberMe?: boolean;
}) {
  try {
    const response: any = await request.post("/auth/login", data);
    const { token, user, restaurantId, notReadMessageCount } =
      response.data || {};

    // token 写入安全存储；其它非敏感元数据继续走普通存储以兼容 Web。
    if (token) {
      await secureStorage.setItem(TOKEN_STORAGE_KEY, token);
    }
    storage.setItem("notReadMessageCount", notReadMessageCount);
    storage.setItem("user", JSON.stringify(user));
    storage.setItem("uid", String(user?.id || ""));
    storage.setItem("restaurantId", String(restaurantId || ""));
    setUnreadCount(Number(notReadMessageCount ?? 0));
    resetUnauthorizedState();

    // “记住我”：仅持久化邮箱用于下次回填；密码绝不落盘。
    if (data.rememberMe) {
      await storage.setItem(REMEMBERED_EMAIL_KEY, data.email);
    } else {
      await clearRememberedEmail();
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function logout(): Promise<void> {
  try {
    const res: any = await request.post("/auth/logout");
    return res;
  } finally {
    await secureStorage.removeItem(TOKEN_STORAGE_KEY);
    storage.removeItem("user");
    storage.removeItem("uid");
    storage.removeItem("notReadMessageCount");
    storage.removeItem("restaurantId");
    // 注意：保留 rememberedEmail，让用户重新登录时邮箱仍可回填。
    resetUnreadCount();
    resetUnauthorizedState();
  }
}
export async function sendResetPwdEmail(data: {
  email: string;
}): Promise<void> {
  try {
    const res: any = await request.post("/user/sendResetPwdEmail", data);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function verifyResetPwdCode(data: {
  email: string;
  code: string;
}): Promise<void> {
  try {
    const res: any = await request.post("/user/verifyResetPwdCode", data);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function resetPwd(data: {
  email: string;
  pwd: string;
}): Promise<void> {
  try {
    const res: any = await request.post("/user/resetPwd", data);
    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
