import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import { authActions } from 'containers/Auth/ducks'
import {
  deleteAccountActions,
  getProfileActions,
  updateProfileActions,
} from 'containers/Profile/ducks'

import Profile from './Profile'

import { Store } from 'store/types'

export const mapStateToProps = ({ auth, profile }: Store) => ({
  profile: profile.profile,
  requestStatuses: profile.requestStatuses,
  user: auth.user,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    deleteAccount: deleteAccountActions.request,
    getProfile: getProfileActions.request,
    logout: authActions.logout,
    updateProfile: updateProfileActions.request,
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
