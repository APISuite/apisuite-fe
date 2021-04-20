import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getAPIs } from 'containers/Subscriptions/ducks'

import { Store } from 'store/types'

import Sandbox from './Sandbox'

const mapStateToProps = ({ auth, subscriptions }: Store) => ({
  auth: auth,
  subscriptions: subscriptions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAPIs: () => dispatch(getAPIs()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sandbox)
