import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import { authActions } from 'containers/Auth/ducks'
import {
  deleteAccountActions,
  fetchTeamMembersActions,
  getProfileActions,
  resetErrorAction,
  switchOrgActions,
  updateProfileActions,
} from 'containers/Profile/ducks'

import Profile from './Profile'

import { Store } from 'store/types'

export const mapStateToProps = ({ profile }: Store) => ({
  profile: profile.profile,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    deleteAccount: deleteAccountActions.request,
    fetchTeamMembers: fetchTeamMembersActions.request,
    getProfile: getProfileActions.request,
    logout: () => dispatch(authActions.logout()),
    resetErrors: resetErrorAction,
    switchOrg: switchOrgActions.request,
    updateProfile: updateProfileActions.request,
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
