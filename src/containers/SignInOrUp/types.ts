import { History } from 'history'

export interface SignInOrUpProps {
  history: History,
}

export type View = 'signup' | 'signin'
