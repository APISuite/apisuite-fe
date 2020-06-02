import { connect } from 'react-redux'
import {
  authActions,
} from 'containers/Auth/ducks'
import ForgotPasswordPage from './ForgotPasswordPage'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import { Store } from 'store/types'

export const mapStateToProps = ({ auth }: Store) => ({
  auth,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  forgotPassword: (emailInformation: { email: string}) => authActions.recoverPassword(emailInformation),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage)
