import { createSelector } from 'reselect'
import { Store } from 'store/types'

export const signUpFormSelector = createSelector(({ auth }: Store) => auth, (auth) => ({
  invitation: auth.invitation,
  invitationError: auth.error,
}))
