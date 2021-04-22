import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import {
  toggleInstanceOwner,
  toggleNonInstanceOwner,
} from 'store/notificationCards/actions/toggleInstanceOwner'

import { Store } from 'store/types'

import NotificationCard from './NotificationCard'

const mapStateToProps = ({ notificationCards }: Store) => ({
  // Temporary until notification cards become clearer
  notificationCards: notificationCards,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards: () => dispatch(toggleInstanceOwner()),
  toggleNonInstanceOwnerNotificationCards: () => dispatch(toggleNonInstanceOwner()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCard)
