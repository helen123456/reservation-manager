import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

/**
 * 跨平台存储工具
 * 在Web端使用localStorage，在原生端使用AsyncStorage
 * 所有方法都返回Promise以保持接口一致性，即使在Web端localStorage是同步API
 */
const storage = {
  /**
   * 存储数据
   * @param key 键名
   * @param value 值
   */
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, value);
        }
      } catch {
        // 忽略Web端存储错误
      }
      return Promise.resolve();
    }
    return AsyncStorage.setItem(key, value);
  },
  
  /**
   * 获取数据
   * @param key 键名
   * @returns 存储的值或null
   */
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          // localStorage是同步API，包装成Promise以保持接口一致性
          return Promise.resolve(window.localStorage.getItem(key));
        }
      } catch {
        // 忽略Web端存储错误
      }
      return Promise.resolve(null);
    }
    return AsyncStorage.getItem(key);
  },
  
  /**
   * 删除数据
   * @param key 键名
   */
  async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(key);
        }
      } catch {
        // 忽略Web端存储错误
      }
      return Promise.resolve();
    }
    return AsyncStorage.removeItem(key);
  },

  /**
   * 清除所有数据
   */
  async clear(): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.clear();
        }
      } catch {
        // 忽略Web端存储错误
      }
      return Promise.resolve();
    }
    return AsyncStorage.clear();
  }
};

export default storage;