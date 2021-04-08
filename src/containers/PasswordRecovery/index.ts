import { bindActionCreators, Dispatch } from 'redux'

import { connect } from 'react-redux'

import { History } from 'history'

import { authActions } from 'containers/Auth/ducks'

import { Store } from 'store/types'

import PasswordRecovery from './PasswordRecovery'

export const mapStateToProps = ({ auth }: Store) => ({
  auth,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  forgotPassword: (emailInformation: { email: string }) => authActions.forgotPassword(emailInformation),
  recoverPassword: (recoverInformation: { token: string; password: string }, history: History<any>) =>
    authActions.recoverPassword(recoverInformation, history),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PasswordRecovery)
