import { RouterState } from 'connected-react-router'
import { AuthStore } from 'containers/Auth/types'
import { ApplicationsStore } from 'containers/Applications/types'

export interface Store {
  router: RouterState,
  auth: AuthStore,
  register: any,
  applications: ApplicationsStore,
}
