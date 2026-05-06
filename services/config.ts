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
    dev: "http://localhost:2025/neo/api",
    // Production base URL is read from app.json `expo.extra.apiBaseUrl`.
    // Setting an explicit value here as a final fallback prevents shipping a
    // dangling "yourapp.com" placeholder.
    prod: "http://localhost:2025/neo/api",
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
  const fromExtra = (Constants.expoConfig?.extra as { apiBaseUrl?: string } | undefined)
    ?.apiBaseUrl;
  if (fromExtra) {
    return fromExtra;
  }
  return API_CONFIG.BASE_URL[CURRENT_ENV as keyof typeof API_CONFIG.BASE_URL];
};
