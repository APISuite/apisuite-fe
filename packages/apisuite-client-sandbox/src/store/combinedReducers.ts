/*
 * Combine all reducers in the this file and export them.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import register from 'components/RegisterPortal/ducks'
import informDialog from 'components/InformDialog/ducks'
import auth from 'containers/Auth/ducks'
import applications from 'containers/Applications/ducks'
import subscriptions from 'containers/Subscriptions/ducks'
import notification from 'components/Notification/ducks'

export default (history: History<any>) => combineReducers({
  router: connectRouter(history),
  auth,
  register,
  applications,
  subscriptions,
  informDialog,
  notification,
})
