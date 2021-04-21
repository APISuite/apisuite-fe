import { createSelector } from 'reselect'
import { Store } from 'store/types'

export const signUpFormSelector = createSelector(({ register }: Store) => register, (register) => register)
