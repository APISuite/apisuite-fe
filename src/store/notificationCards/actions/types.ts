import { GET_INSTANCE_OWNER, GET_NON_INSTANCE_OWNER } from './getInstanceOwner'
import { TOGGLE_INSTANCE_OWNER, TOGGLE_NON_INSTANCE_OWNER } from './toggleInstanceOwner'

export type GetInstanceOwnerAction = {
  type: typeof GET_INSTANCE_OWNER,
}

export type GetNonInstanceOwnerAction = {
  type: typeof GET_NON_INSTANCE_OWNER,
}

export type ToggleInstanceOwnerAction = {
  type: typeof TOGGLE_INSTANCE_OWNER,
}

export type ToggleNonInstanceOwnerAction = {
  type: typeof TOGGLE_NON_INSTANCE_OWNER,
}

export type NotificationCardsActions = GetInstanceOwnerAction
| GetNonInstanceOwnerAction
| ToggleInstanceOwnerAction
| ToggleNonInstanceOwnerAction
