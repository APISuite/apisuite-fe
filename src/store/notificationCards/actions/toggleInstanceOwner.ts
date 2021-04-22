export const TOGGLE_INSTANCE_OWNER = 'NotificationCards/TOGGLE_INSTANCE_OWNER'
export const TOGGLE_NON_INSTANCE_OWNER = 'NotificationCards/TOGGLE_NON_INSTANCE_OWNER'

export function toggleInstanceOwner () {
  return { type: TOGGLE_INSTANCE_OWNER }
}

export function toggleNonInstanceOwner () {
  return { type: TOGGLE_NON_INSTANCE_OWNER }
}
