import {
  AuthPayloads,
  AuthStore,
} from 'containers/Auth/types'
import { History } from 'history'

export interface LoginFormProps extends LoginDispatchToProps {
  auth: AuthStore,
  history: History,
}

export interface LoginDispatchToProps {
  login: (payload: AuthPayloads['login']) => void,
}
