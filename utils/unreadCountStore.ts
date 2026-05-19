/**
 * Lightweight global store for unread message count.
 *
 * Persists the latest count to local storage (key: notReadMessageCount) so that
 * it survives reloads and stays in sync with the value returned by login.
 *
 * Components can subscribe via `subscribeUnreadCount(cb)` or use the
 * `useUnreadCount` hook to react to changes (e.g. header badge, tab badge).
 */
import storage from "@/utils/storage";

const STORAGE_KEY = "notReadMessageCount";

let currentCount = 0;
const listeners = new Set<(count: number) => void>();

const notify = () => {
  listeners.forEach((cb) => {
    try {
      cb(currentCount);
    } catch {
      // swallow listener errors so one bad subscriber can't break others
    }
  });
};

export const getUnreadCount = (): number => currentCount;

export const setUnreadCount = (count: number): void => {
  const safe = Number.isFinite(count) && count >= 0 ? Math.floor(count) : 0;
  if (safe === currentCount) return;
  currentCount = safe;
  // Persist (fire-and-forget). Don't await – callers don't need to block.
  void storage.setItem(STORAGE_KEY, String(safe));
  notify();
};

export const incrementUnreadCount = (delta = 1): void => {
  setUnreadCount(currentCount + delta);
};

export const decrementUnreadCount = (delta = 1): void => {
  setUnreadCount(Math.max(0, currentCount - delta));
};

export const resetUnreadCount = (): void => {
  setUnreadCount(0);
};

export const subscribeUnreadCount = (
  cb: (count: number) => void,
): (() => void) => {
  listeners.add(cb);
  // Immediately push the current value to the new subscriber.
  cb(currentCount);
  return () => {
    listeners.delete(cb);
  };
};

/**
 * Bootstrap the in-memory value from local storage on app start / login.
 * Safe to call multiple times.
 */
export const hydrateUnreadCount = async (): Promise<void> => {
  try {
    const raw = await storage.getItem(STORAGE_KEY);
    const n = Number(raw ?? 0);
    setUnreadCount(Number.isFinite(n) ? n : 0);
  } catch {
    setUnreadCount(0);
  }
};
