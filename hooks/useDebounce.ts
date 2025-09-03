import { useCallback, useEffect, useRef } from 'react';

/**
 * 通用防抖 Hook
 * @param callback 要防抖的回调函数
 * @param delay 防抖延迟时间（毫秒）
 * @returns 防抖后的函数
 * ## 1. useDebounce - 标准防抖
### 应用场景：
- 搜索框输入 ：用户输入时实时搜索，避免每次按键都发送请求
- 表单验证 ：输入框失焦验证，避免用户输入过程中频繁验证
- 窗口大小调整 ：响应式布局计算，避免频繁重新计算
- 滚动事件处理 ：滚动到底部加载更多，避免频繁触发
 */
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 设置新的定时器
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // 清理函数
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // 在组件卸载时自动清理
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return debouncedCallback;
}

/**
 * 异步函数防抖 Hook
 * @param asyncCallback 要防抖的异步回调函数
 * @param delay 防抖延迟时间（毫秒）
 * @returns 防抖后的异步函数
 * ### 应用场景：
- 表单提交 ：防止用户快速多次点击提交按钮
- API 请求 ：需要等待响应的网络请求
- 文件上传 ：防止重复上传同一文件
- 数据保存 ：自动保存草稿，避免频繁保存
- 支付操作 ：防止重复支付
 */
export function useAsyncDebounce<T extends (...args: any[]) => Promise<any>>(
  asyncCallback: T,
  delay: number
): (...args: Parameters<T>) => Promise<void> {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isExecutingRef = useRef(false);

  const debouncedAsyncCallback = useCallback(
    (...args: Parameters<T>): Promise<void> => {
      return new Promise((resolve, reject) => {
        // 清除之前的定时器
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // 设置新的定时器
        timeoutRef.current = setTimeout(async () => {
          // 防止重复执行
          if (isExecutingRef.current) {
            resolve();
            return;
          }

          isExecutingRef.current = true;
          try {
            await asyncCallback(...args);
            resolve();
          } catch (error) {
            reject(error);
          } finally {
            isExecutingRef.current = false;
          }
        }, delay);
      });
    },
    [asyncCallback, delay]
  );

  // 清理函数
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    isExecutingRef.current = false;
  }, []);

  // 在组件卸载时自动清理
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return debouncedAsyncCallback;
}

/**
 * 立即执行防抖 Hook（首次立即执行，后续防抖）
 * @param callback 要防抖的回调函数
 * @param delay 防抖延迟时间（毫秒）
 * @returns 防抖后的函数
 * -应用场景：
- 按钮点击 ：首次点击立即响应，后续点击防抖
- 页面刷新 ：首次刷新立即执行，短时间内的重复刷新被忽略
- 通知发送 ：立即发送第一条通知，后续重复通知防抖
- 数据同步 ：立即同步一次，后续频繁同步请求防抖
- 用户行为追踪 ：立即记录第一次行为，短时间内的重复行为防抖
 */
export function useImmediateDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasExecutedRef = useRef(false);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      // 首次立即执行
      if (!hasExecutedRef.current) {
        callback(...args);
        hasExecutedRef.current = true;
        return;
      }

      // 清除之前的定时器
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 设置新的定时器
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  // 清理函数
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    hasExecutedRef.current = false;
  }, []);

  // 在组件卸载时自动清理
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return debouncedCallback;
}