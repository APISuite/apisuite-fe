import { connect } from 'react-redux'
import {
  acceptInvitationWithSignInActions,
  acceptInvitationActions,
  invitationSignInActions,
  rejectInvitationActions,
  validateInvitationTokenActions,
} from './ducks'
import InvitationForm from './InvitationForm'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import { Store } from 'store/types'

export const mapStateToProps = ({ invitation }: Store) => ({
  invitationStore: invitation,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  acceptInvitationWithSignIn: acceptInvitationWithSignInActions.request,
  invitationSignIn: invitationSignInActions.request,
  acceptInvitation: acceptInvitationActions.request,
  rejectInvitation: rejectInvitationActions.request,
  validateToken: validateInvitationTokenActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(InvitationForm)
