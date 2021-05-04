import { APIVersionStore } from "./apiDetails/types";
import { ApplicationsStore } from "./applications/types";
import { AuthStore } from "store/auth/types";
// Temporary until notification cards become clearer
import { NotificationCardsStore } from "./notificationCards/types";
import { NotificationStackStore } from "./notificationStack/types";
import { ProfileStore } from "store/profile/types";
import { SubscriptionsStore } from "./subscriptions/types";

export interface Store {
  apiDetails: APIVersionStore,
  applications: ApplicationsStore,
  auth: AuthStore,
  notifications: NotificationStackStore,
  // Temporary until notification cards become clearer
  notificationCards: NotificationCardsStore,
  profile: ProfileStore,
  register: any,
  subscriptions: SubscriptionsStore,
}
