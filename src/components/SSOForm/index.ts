import { Dispatch } from 'redux'

import { connect, MapDispatchToPropsFunction } from 'react-redux'

import { authActions } from 'containers/Auth/ducks'

import { AuthPayloads } from 'containers/Auth/types'

import { Store } from 'store/types'

import { SSODispatchToProps } from './types'

import SSOForm from './SSOForm'

const mapStateToProps = ({ auth }: Store) => ({
  auth: auth,
})

const mapDispatchToProps: MapDispatchToPropsFunction<SSODispatchToProps, any> = (dispatch: Dispatch) => ({
  ssoLogin: (payload: AuthPayloads['sso']['ssoLogin']) => dispatch(authActions.ssoLogin(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SSOForm)
