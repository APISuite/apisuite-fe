// Temporary until notification cards become clearer

import { Reducer, AnyAction } from 'redux'
import update from 'immutability-helper'

import { GET_INSTANCE_OWNER, GET_NON_INSTANCE_OWNER } from './actions/getInstanceOwner'
import { TOGGLE_INSTANCE_OWNER, TOGGLE_NON_INSTANCE_OWNER } from './actions/toggleInstanceOwner'
import { NotificationCardsStore } from './types'

/** Initial state */
const initialState: NotificationCardsStore = {
  instanceOwnerNotificationCardsData: [{}],
  nonInstanceOwnerNotificationCardsData: [{}],
  showInstanceOwnerNotificationCards: false,
  showNonInstanceOwnerNotificationCards: true,
}

/** Reducer */
const reducer: Reducer<NotificationCardsStore, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case GET_INSTANCE_OWNER: {
      return state.instanceOwnerNotificationCardsData
    }

    case GET_NON_INSTANCE_OWNER: {
      return state.nonInstanceOwnerNotificationCardsData
    }

    case TOGGLE_INSTANCE_OWNER: {
      const newValueOfShowNotificationCards = !(state.showInstanceOwnerNotificationCards)

      return update(state, {
        showInstanceOwnerNotificationCards: { $set: newValueOfShowNotificationCards },
      })
    }

    case TOGGLE_NON_INSTANCE_OWNER: {
      const newValueOfShowNotificationCards = !(state.showNonInstanceOwnerNotificationCards)

      return update(state, {
        showNonInstanceOwnerNotificationCards: { $set: newValueOfShowNotificationCards },
      })
    }

    default:
      return state
  }
}

export default reducer
