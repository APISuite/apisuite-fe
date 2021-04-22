export const GET_INSTANCE_OWNER = 'NotificationCards/GET_INSTANCE_OWNER'
export const GET_NON_INSTANCE_OWNER = 'NotificationCards/GET_NON_INSTANCE_OWNER'

export function getInstanceOwner () {
  return { type: GET_INSTANCE_OWNER }
}

export function getNonInstanceOwnerNotificationCards () {
  return { type: GET_NON_INSTANCE_OWNER }
}
