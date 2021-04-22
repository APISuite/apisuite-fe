import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { authActions } from 'containers/Auth/ducks'
import {
  toggleInstanceOwner,
  toggleNonInstanceOwner,
} from 'store/notificationCards/actions/toggleInstanceOwner'

import { Store } from 'store/types'

import Navigation from './Navigation'

const mapStateToProps = ({ notificationCards, profile }: Store) => ({
  // Temporary until notification cards become clearer
  notificationCards: notificationCards,
  profile: profile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(authActions.logout()),
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards: () => dispatch(toggleInstanceOwner()),
  toggleNonInstanceOwnerNotificationCards: () => dispatch(toggleNonInstanceOwner()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
