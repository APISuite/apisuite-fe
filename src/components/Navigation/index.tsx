import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { authActions } from 'containers/Auth/ducks'
import {
  toggleInstanceOwnerNotificationCards,
  toggleNonInstanceOwnerNotificationCards,
} from 'containers/NotificationCards/ducks'

import { appStoreActionCreators } from 'components/InformDialog/ducks'

import { Store } from 'store/types'

import Navigation from './Navigation'

const mapStateToProps = ({ notificationCards, profile }: Store) => ({
  // Temporary until notification cards become clearer
  notificationCards: notificationCards,
  profile: profile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(authActions.logout()),
  toggleInform: () => dispatch(appStoreActionCreators.informOpen()),
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards: () => dispatch(toggleInstanceOwnerNotificationCards()),
  toggleNonInstanceOwnerNotificationCards: () => dispatch(toggleNonInstanceOwnerNotificationCards()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
