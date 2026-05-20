import Constants from "expo-constants";

// 环境配置
export const ENV = {
  DEVELOPMENT: "dev",
  PRODUCTION: "prod",
};

// 当前环境
export const CURRENT_ENV = __DEV__ ? ENV.DEVELOPMENT : ENV.PRODUCTION;

// API基础配置
export const API_CONFIG = {
  BASE_URL: {
    // 统一使用线上 HTTPS 网关（由 Nginx 代理到 Spring Boot 的 /neo 上下文）。
    // 如需指向本地后端，请通过 app.json `expo.extra.apiBaseUrl` 覆盖，
    // 而不要把明文 HTTP 写回这里——Android 9+ release 包默认禁止 cleartext。
    dev: "https://api.neogrowth.fr/neo/api",
    prod: "https://api.neogrowth.fr/neo/api",
  },
};

/**
 * Get the API base URL for the current environment.
 *
 * Resolution order:
 *   1. `expo.extra.apiBaseUrl` from app.json / EAS build config
 *   2. Per-environment default in {@link API_CONFIG.BASE_URL}
 */
export const getBaseURL = (): string => {
  const fromExtra = (
    Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined
  )?.apiBaseUrl;
  if (fromExtra) {
    return fromExtra;
  }
  return API_CONFIG.BASE_URL[CURRENT_ENV as keyof typeof API_CONFIG.BASE_URL];
};
