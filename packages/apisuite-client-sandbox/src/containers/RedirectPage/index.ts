import { connect } from 'react-redux'
import { confirmRegistrationActions } from 'components/RegisterForm/ducks'
import RedirectPage from './RedirectPage'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  confirmRegistration: (token: string) => confirmRegistrationActions.request(token),
}, dispatch)

export default connect(null, mapDispatchToProps)(RedirectPage)
