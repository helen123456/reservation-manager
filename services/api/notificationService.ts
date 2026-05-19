import request from "@/services/request";
import storage from "@/utils/storage";
import { setUnreadCount } from "@/utils/unreadCountStore";

const getUid = async () => storage.getItem("uid");

/**
 * Fetch the current user's full message list (newest first).
 * Backend filters out soft-deleted messages automatically.
 */
export const getMessage = async () => {
  try {
    const uid = await getUid();
    return await request.get(`/user/messages/unread/${uid}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Mark a single message as read (when msgId is provided),
 * or mark ALL of the current user's unread messages as read (no msgId).
 */
export const updateMessage = async (msgId?: string | number) => {
  try {
    const uid = await getUid();
    return await request.post("/user/messages/mark-all-read", {
      uid,
      msgId: msgId ?? null,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Soft-delete all READ messages for the current user.
 * Unread messages are preserved.
 */
export const clearMessage = async () => {
  try {
    const uid = await getUid();
    return await request.post(`/user/messages/clear-all-read/${uid}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Soft-delete a single message belonging to the current user.
 */
export const deleteMessageById = async (msgId: string | number) => {
  try {
    const uid = await getUid();
    return await request.delete(`/user/messages/${uid}/${msgId}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Soft-delete every message belonging to the current user (read + unread).
 */
export const clearAllMessages = async () => {
  try {
    const uid = await getUid();
    return await request.post(`/user/messages/clear-all/${uid}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Fetch the unread count from the server and push it into the global store.
 * Used by tab/header badges and on app focus.
 */
export const fetchUnreadCount = async (): Promise<number> => {
  try {
    const uid = await getUid();
    if (!uid) return 0;
    const res: any = await request.get(`/user/messages/unread-count/${uid}`);
    const count = Number(res?.data ?? res ?? 0);
    const safe = Number.isFinite(count) ? count : 0;
    setUnreadCount(safe);
    return safe;
  } catch {
    return 0;
  }
};
