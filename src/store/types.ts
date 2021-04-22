import { APIVersionStore } from './apiDetails/types'
import { ApplicationsStore } from 'containers/Applications/types'
import { AuthStore } from 'containers/Auth/types'
// Temporary until notification cards become clearer
import { NotificationCardsStore } from './notificationCards/types'
import { NotificationStackStore } from 'containers/NotificationStack/types'
import { ProfileStore } from 'containers/Profile/types'
import { RouterState } from 'connected-react-router'
import { SubscriptionsStore } from 'containers/Subscriptions/types'

export interface Store {
  apiDetails: APIVersionStore,
  applications: ApplicationsStore,
  auth: AuthStore,
  notifications: NotificationStackStore,
  // Temporary until notification cards become clearer
  notificationCards: NotificationCardsStore,
  profile: ProfileStore,
  register: any,
  router: RouterState,
  subscriptions: SubscriptionsStore,
}
