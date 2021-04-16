/*
* Combine all reducers in the this file and export them.
*/

import { combineReducers } from 'redux'

import { connectRouter } from 'connected-react-router'

import { History } from 'history'

import apiDetails from 'containers/APIDetails/ducks'
import applications from 'containers/Applications/ducks'
import auth from 'containers/Auth/ducks'
import informDialog from 'components/InformDialog/ducks'
// Temporary until notification cards become clearer
import notificationCards from 'containers/NotificationCards/ducks'
import notifications from 'containers/NotificationStack/ducks'
import profile from 'containers/Profile/ducks'
import reduceReducers from './reduceReducers'
import register from 'components/SignUpForm/ducks'
import security from 'containers/Security/ducks'
import subscriptions from 'containers/Subscriptions/ducks'

export default (
  history: History<any>, additionalReducers: Record<string, any[]> = {},
) => {
  const reducers: Record<string, any[]> = {
    apiDetails: [apiDetails],
    applications: [applications],
    auth: [auth],
    informDialog: [informDialog],
    notifications: [notifications],
    // Temporary until notification cards become clearer
    notificationCards: [notificationCards],
    profile: [profile],
    register: [register],
    router: [connectRouter(history)],
    security: [security],
    subscriptions: [subscriptions],
  }

  Object.keys(additionalReducers).map((key) => {
    if (!reducers[key]) {
      reducers[key] = []
    }
    reducers[key] = [...reducers[key], ...additionalReducers[key]]
  })

  const reducedReducers = Object.keys(reducers).reduce((accum, key) => {
    return {
      ...accum,
      [key]: reduceReducers(...reducers[key]),
    }
  }, {})

  return combineReducers(reducedReducers)
}
