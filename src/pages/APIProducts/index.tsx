import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getAllUserAppsAction } from 'containers/Applications/ducks'
import { getAPIs } from 'containers/Subscriptions/ducks'

import { Store } from 'store/types'

import APIProducts from './APIProducts'

const mapStateToProps = ({ auth, subscriptions }: Store) => ({
  auth: auth,
  subscriptions: subscriptions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAllUserAppsAction: (userId: number) => dispatch(getAllUserAppsAction(userId)),
  getAPIs: () => dispatch(getAPIs()),
})

export default connect(mapStateToProps, mapDispatchToProps)(APIProducts)
