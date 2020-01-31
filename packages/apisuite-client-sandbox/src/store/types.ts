import { RouterState } from 'connected-react-router'
import { AuthStore } from 'containers/Auth/types'
import { RegisterStore } from 'components/RegisterPortal/types'

export interface Store {
  router: RouterState,
  auth: AuthStore,
  register: RegisterStore,
}
