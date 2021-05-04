import { NotificationType } from "../types";
import { CloseNotificationAction } from "./types";

export const CLOSE_NOTIFICATION = "Notification/CLOSE_NOFICATION";
export const OPEN_NOTIFICATION = "Notification/OPEN_NOFICATION";

export function closeNotification (payload: Omit<CloseNotificationAction, "type">) {
  return { type: CLOSE_NOTIFICATION, ...payload };
}

export function openNotification (notificationType: NotificationType, msg: string, timer: number) {
  return { type: OPEN_NOTIFICATION, notificationType, msg, timer };
}
