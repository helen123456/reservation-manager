

// 环境配置
export const ENV = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
}

// 当前环境（可以通过环境变量或构建配置来设置）
export const CURRENT_ENV = __DEV__ ? ENV.DEVELOPMENT : ENV.PRODUCTION;

// API基础配置
export const API_CONFIG = {
  // 基础URL配置
  BASE_URL: {
    dev: 'https://m1.apifoxmock.com/m1/7045660-6765697-default/api',
    prod: 'https://api.yourapp.com/api',
  },
  
};

// 获取当前环境的基础URL
export const getBaseURL = () => {
  return API_CONFIG.BASE_URL[CURRENT_ENV as keyof typeof API_CONFIG.BASE_URL];
};




