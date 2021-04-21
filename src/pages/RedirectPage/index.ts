import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import { confirmInviteActions } from 'containers/Profile/ducks'
import { confirmRegistrationActions } from 'components/SignUpForm/ducks'

import RedirectPage from './RedirectPage'

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  confirmInvite: (token: string) => confirmInviteActions.request(token),
  confirmRegistration: (token: string) => confirmRegistrationActions.request(token),
}, dispatch)

export default connect(null, mapDispatchToProps)(RedirectPage)
