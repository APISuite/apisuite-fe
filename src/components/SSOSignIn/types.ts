import { AuthPayloads } from 'containers/Auth/types'

export interface SSOSignInProps {
  ssoTokenExchange: (payload: AuthPayloads['sso']['ssoTokenExchange']) => void,
}
