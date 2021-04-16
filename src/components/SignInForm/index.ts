import { Dispatch } from 'redux'

import { connect, MapDispatchToPropsFunction } from 'react-redux'

import { authActions } from 'containers/Auth/ducks'

import { AuthPayloads } from 'containers/Auth/types'

import { Store } from 'store/types'

import { LoginDispatchToProps } from './types'

import SignInForm from './SignInForm'

const mapStateToProps = ({ auth }: Store) => ({
  auth: auth,
})

const mapDispatchToProps: MapDispatchToPropsFunction<LoginDispatchToProps, any> = (dispatch: Dispatch) => ({
  getProviders: () => dispatch(authActions.getSSOProviders()),
  login: (loginData: AuthPayloads['login']) => dispatch(authActions.login(loginData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm)
