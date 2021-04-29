import { createSelector } from 'reselect'
import { Store } from 'store/types'

export const invitationFormSelector = createSelector(
  ({ auth }: Store) => auth,
  (auth) => ({
    invitation: auth.invitation,
    invitationError: auth.error,
  }),
)
