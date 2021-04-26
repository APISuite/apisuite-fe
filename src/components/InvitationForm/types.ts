import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'
import { ReturnNestedType } from 'util/typeUtils'
import {
  acceptInvitationActions,
  rejectInvitationActions,
  validateInvitationTokenActions,
} from './ducks'

export type InvitationFormProps =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    isLogged?: boolean,
    sso: string[]|undefined,
  }

export type InvitationDetails = {
  organization: string,
  email: string,
  token?: string,
}

export type InvitationResponse = {
  email: string,
  organization: string,
  isUser: boolean,
  hasOrganizations: boolean,
}

export type InvitationFormStore = {
  isRequesting: boolean,
  error?: string,
  submittedEmail: string,
  invitation?: InvitationResponse,
  invitationError?: string,
}

export type InvitationFormActions =
  ReturnNestedType<typeof acceptInvitationActions> |
  ReturnNestedType<typeof rejectInvitationActions> |
  ReturnNestedType<typeof validateInvitationTokenActions>
