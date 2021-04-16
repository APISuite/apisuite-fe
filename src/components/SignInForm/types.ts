import { AuthPayloads, AuthStore } from 'containers/Auth/types'

import { History } from 'history'

export interface SignInFormProps extends LoginDispatchToProps {
  auth: AuthStore,
  history: History,
}

export interface LoginDispatchToProps {
  getProviders: () => void,
  login: (payload: AuthPayloads['login']) => void,
}
