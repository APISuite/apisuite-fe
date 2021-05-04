import { Notification } from "store/notificationStack/types";

export interface NotificationProps extends Notification {
  closeNotification: (notificationNumber: number) => void,
}
