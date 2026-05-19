/**
 * 安全存储：用于敏感凭据（JWT token 等）。
 *
 * - iOS / Android：使用 expo-secure-store，底层映射到 Keychain Services / EncryptedSharedPreferences。
 *   满足 OWASP MASVS-STORAGE-1（不可在明文存储中保存敏感信息）以及 App Store / Google Play
 *   关于凭据保护的审核要求。
 * - Web（仅开发联调用）：localStorage 没有原生加密，作为回退；生产建议改走仅 HttpOnly Cookie。
 *
 * 接口与 utils/storage 保持一致（均返回 Promise<string|null>），调用方可直接替换。
 */
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

// SecureStore 在 Android 上要求 key 仅含 [A-Za-z0-9._-]，这里统一过滤。
const sanitizeKey = (key: string) => key.replace(/[^A-Za-z0-9._-]/g, "_");

const NATIVE_OPTIONS: SecureStore.SecureStoreOptions = {
  // iOS：仅在设备解锁后可读，且不参与 iCloud Keychain 同步，避免凭据上云。
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          return window.localStorage.getItem(key);
        }
      } catch {
        /* ignore */
      }
      return null;
    }
    try {
      return await SecureStore.getItemAsync(sanitizeKey(key), NATIVE_OPTIONS);
    } catch {
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      await SecureStore.setItemAsync(sanitizeKey(key), value, NATIVE_OPTIONS);
    } catch {
      /* ignore */
    }
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      await SecureStore.deleteItemAsync(sanitizeKey(key), NATIVE_OPTIONS);
    } catch {
      /* ignore */
    }
  },
};

export default secureStorage;
