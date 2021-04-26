import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import {
  toggleInstanceOwner,
  toggleNonInstanceOwner,
} from 'store/notificationCards/actions/toggleInstanceOwner'

import { Store } from 'store/types'

import Navigation from './Navigation'
import { logout } from 'store/auth/actions/logout'

const mapStateToProps = ({ notificationCards, profile }: Store) => ({
  // Temporary until notification cards become clearer
  notificationCards: notificationCards,
  profile: profile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(logout({})),
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards: () => dispatch(toggleInstanceOwner()),
  toggleNonInstanceOwnerNotificationCards: () => dispatch(toggleNonInstanceOwner()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
