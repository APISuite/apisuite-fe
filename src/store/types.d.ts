import { APIVersionStore } from './apiDetails/types'
import { ApplicationsStore } from './applications/types'
import { AuthStore } from 'store/auth/types'
import { InvitationFormStore } from 'components/InvitationForm/types'
// Temporary until notification cards become clearer
import { NotificationCardsStore } from './notificationCards/types'
import { NotificationStackStore } from './notificationStack/types'
import { ProfileStore } from 'store/profile/types'
import { RouterState } from 'connected-react-router'
import { SubscriptionsStore } from './subscriptions/types'

export interface Store {
  apiDetails: APIVersionStore,
  applications: ApplicationsStore,
  auth: AuthStore,
  invitation: InvitationFormStore,
  notifications: NotificationStackStore,
  // Temporary until notification cards become clearer
  notificationCards: NotificationCardsStore,
  profile: ProfileStore,
  register: any,
  router: RouterState,
  subscriptions: SubscriptionsStore,
}
