import { bindActionCreators, Dispatch } from 'redux'

import { connect } from 'react-redux'

import { authActions } from 'containers/Auth/ducks'

import { AuthPayloads } from 'containers/Auth/types'

import SSOSignIn from './SSOSignIn'

export const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(
    {
      ssoTokenExchange: (payload: AuthPayloads['sso']['ssoTokenExchange']) => authActions.ssoTokenExchange(payload),
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(SSOSignIn)
