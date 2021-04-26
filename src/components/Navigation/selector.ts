import { createSelector } from 'reselect'
import { Store } from 'store/types'

export const navigationSelector = createSelector(
  ({ auth }: Store) => auth,
  (auth) => ({ auth }),
)
