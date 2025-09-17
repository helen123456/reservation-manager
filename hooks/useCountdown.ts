import { useState, useEffect, useRef } from 'react';

export interface UseCountdownOptions {
  initialCount: number;
  onComplete?: () => void;
  interval?: number;
}

export interface UseCountdownReturn {
  count: number;
  isActive: boolean;
  start: () => void;
  stop: () => void;
  reset: (newCount?: number) => void;
}

export const useCountdown = ({
  initialCount,
  onComplete,
  interval = 1000
}: UseCountdownOptions): UseCountdownReturn => {
  const [count, setCount] = useState(initialCount);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCompleteRef = useRef(onComplete);

  // 更新回调引用
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // 倒计时逻辑
  useEffect(() => {
    if (isActive && count > 0) {
      intervalRef.current = setTimeout(() => {
        setCount(prevCount => {
          const newCount = prevCount - 1;
          if (newCount === 0) {
            setIsActive(false);
            onCompleteRef.current?.();
          }
          return newCount;
        });
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [isActive, count, interval]);

  const start = () => {
    if (count > 0) {
      setIsActive(true);
    }
  };

  const stop = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
  };

  const reset = (newCount?: number) => {
    stop();
    setCount(newCount ?? initialCount);
  };

  return {
    count,
    isActive,
    start,
    stop,
    reset
  };
};