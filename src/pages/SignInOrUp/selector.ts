import { createSelector } from 'reselect'
import { Store } from 'store/types'

export const signInOrUpSelector = createSelector(
  ({ auth }: Store) => auth,
  ({ invitation }: Store) => invitation,
  (auth, invitation) => {
    return { auth, invitation }
  },
)
