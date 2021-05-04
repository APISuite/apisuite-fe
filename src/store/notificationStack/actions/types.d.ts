import { NotificationType } from "../types";
import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from "./notification";

export type NotificationActions = CloseNotificationAction | OpenNotificationAction

export type CloseNotificationAction = {
  type: typeof CLOSE_NOTIFICATION,
  notificationNumber: number,
}

export type OpenNotificationAction = {
  type: typeof OPEN_NOTIFICATION,
  notificationType: NotificationType,
  msg: string,
  timer: number,
}
