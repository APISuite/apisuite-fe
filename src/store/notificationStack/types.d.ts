export type NotificationType = "success" | "error" | ""

export interface Notification {
  notificationNumber: number,
  open: boolean,
  type: NotificationType,
  msg: string,
  timer: number,
}

export interface NotificationStackStore {
  notifications: Notification[],
}
