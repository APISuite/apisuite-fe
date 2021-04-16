import { AuthPayloads, AuthStore } from 'containers/Auth/types'

import { History } from 'history'

export interface SSOFormProps extends SSODispatchToProps {
  auth: AuthStore,
  history: History,
}

export interface SSODispatchToProps {
  ssoLogin: (payload: AuthPayloads['sso']['ssoLogin']) => void,
}
