import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import {
  changeRoleActions,
  fetchRoleOptionsActions,
  fetchTeamMembersActions,
  inviteMemberActions,
  resetErrorAction,
} from 'containers/Profile/ducks'

import { Store } from 'store/types'

import TeamPage from './TeamPage'

export const mapStateToProps = ({ auth, profile, settings }: Store) => ({
  requestStatuses: profile.requestStatuses,
  roleOptions: profile.roleOptions,
  settings: settings,
  teamMembers: profile.teamMembers,
  userProfile: profile.profile,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  changeRole: changeRoleActions.request,
  fetchRoleOptions: fetchRoleOptionsActions.request,
  fetchTeamMembers: fetchTeamMembersActions.request,
  inviteMember: inviteMemberActions.request,
  resetErrors: resetErrorAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)
