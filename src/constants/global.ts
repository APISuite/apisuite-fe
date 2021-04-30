
import { Roles } from './types'

export const DEFAULT_INSTANCE_OWNER_SUPPORT_URL =
  'https://intercom.help/api-suite/en/articles/4710860-api-portal-owners'

export const DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL =
  'https://intercom.help/api-suite/en/articles/4586659-api-portal-users'

export const ROLES: Roles = {
  // Instance owners
  admin: {
    label: 'Admin',
    value: 'admin',
    level: 2,
  },

  // Non-instance owners
  organizationOwner: {
    label: 'Organization Owner',
    value: 'organizationOwner',
    level: 3,
  },

  developer: {
    label: 'Developer',
    value: 'developer',
    level: 4,
  },

  baseUser: {
    label: 'Base user',
    value: 'baseUser',
    level: 5,
  },
}

export const SSO_STATE_STORAGE = 'ssoStateStorage'
export const SSO_INVITATION_STATE_STORAGE = 'ssoInvitationStateStorage'
export const SSO_PROVIDER_STATE_STORAGE = 'attemptingSignInWithProvider'
