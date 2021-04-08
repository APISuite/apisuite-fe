import { connect, MapDispatchToPropsFunction } from 'react-redux'
import App from './App'
import selector from './selector'
import { AppDispatchToProps } from './types'
import { authActions } from 'containers/Auth/ducks'
import { getProfileActions } from 'containers/Profile/ducks'

const mapDispatchToProps: MapDispatchToPropsFunction<AppDispatchToProps, any> = (dispatch) => ({
  getProfile: () => dispatch(getProfileActions.request()),
  loginUser: (...args) => dispatch(authActions.loginUser(...args)),
  logout: () => dispatch(authActions.logout()),
})

export default connect(selector, mapDispatchToProps)(App)
