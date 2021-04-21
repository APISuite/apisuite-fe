import { AuthStore } from 'containers/Auth/types'
import { SubscriptionsStore } from 'containers/Subscriptions/types'

export interface APIProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  auth: AuthStore,
  getAllUserAppsAction: (userId: number) => void,
  getAPIs: () => void,
  subscriptions: SubscriptionsStore,
}
