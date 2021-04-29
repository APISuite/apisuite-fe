import { Role } from 'store/profile/types'

export interface AuthStore {
  authToken?: string,
  error?: string,
  isAuthorizing: boolean,
  isRecoveringPassword: boolean,
  providers: null | string[],
  user?: User,
  providerSignupURL: string,
  invitation: Invitation,
}

export interface Invitation {
  email: string,
  organization: string,
  isUser: boolean,
  hasOrganizations: boolean,
}

export interface User {
  fName: string,
  id: number,
  lName: string,
  photo?: string,
  role: Role,
}
