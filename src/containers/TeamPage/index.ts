import { bindActionCreators, Dispatch } from 'redux'

import { connect } from 'react-redux'

import {
  changeRoleActions,
  fetchRoleOptionsActions,
  fetchTeamMembersActions,
  inviteMemberActions,
  resetErrorAction,
} from 'containers/Profile/ducks'

import { Store } from 'store/types'

import TeamPage from './TeamPage'

export const mapStateToProps = ({ auth, profile }: Store) => ({
  currentOrganisation: profile.profile.current_org,
  members: profile.members,
  requestStatuses: profile.requestStatuses,
  roleOptions: profile.roleOptions,
  user: auth.user,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  changeRole: changeRoleActions.request,
  fetchRoleOptions: fetchRoleOptionsActions.request,
  fetchTeamMembers: fetchTeamMembersActions.request,
  inviteMember: inviteMemberActions.request,
  resetErrors: resetErrorAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)
