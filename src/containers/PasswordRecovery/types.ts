import { AuthStore } from 'containers/Auth/types'
import { History, Location } from 'history'

export interface PasswordRecoveryProps {
  auth: AuthStore,
  forgotPassword: (emailInformation: { email: string }) => void,
  history: History<any>,
  location: Location<{ stage: 'forgot' | 'recover'; token: string }>,
  recoverPassword: (payload: { token: string; password: string }, history: History<any>) => void,
}
