import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { authActions } from 'containers/Auth/ducks'
import { Store } from 'store/types'
import LoginForm from './LoginForm'
import { Dispatch } from 'redux'
import { LoginDispatchToProps } from './types'
import { AuthPayloads } from 'containers/Auth/types'

const mapDispatchToProps: MapDispatchToPropsFunction<LoginDispatchToProps, any> = (dispatch: Dispatch) => ({
  login: (loginData: AuthPayloads['login']) => dispatch(authActions.login(loginData)),
})

const mapStateToProps = ({ auth }: Store) => ({
  auth: auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
