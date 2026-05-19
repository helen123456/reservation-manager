import {
    getUnreadCount,
    hydrateUnreadCount,
    subscribeUnreadCount,
} from "@/utils/unreadCountStore";
import { useEffect, useState } from "react";

/**
 * Hook returning the current unread message count, kept in sync with the
 * global unread-count store. Hydrates from local storage on first mount.
 */
export function useUnreadCount(): number {
  const [count, setCount] = useState<number>(getUnreadCount());

  useEffect(() => {
    void hydrateUnreadCount();
    const unsubscribe = subscribeUnreadCount(setCount);
    return unsubscribe;
  }, []);

  return count;
}
