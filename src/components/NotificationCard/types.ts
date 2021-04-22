import { NotificationCardsStore } from 'store/notificationCards/types'

export type NotificationCardProps = {
  notificationCards: NotificationCardsStore,
  notificationCardTitle: string,
  // Expecting either a string, or a paragraph
  notificationCardText: string | JSX.Element,
  // Either provide an action to the notice card's button, (...)
  notificationCardButtonAction?: () => void,
  notificationCardButtonClassName?: string,
  notificationCardButtonLabel: string,
  // (...) or a link to some place
  notificationCardButtonLink?: string,
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards: () => void,
  toggleNonInstanceOwnerNotificationCards: () => void,
  typeOfUser: string,
}
