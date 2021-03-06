import { bindActionCreators, Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getAPIs } from './ducks'

import { Store } from 'store/types'

import { getAllUserAppsAction } from 'containers/Applications/ducks'

import Subscriptions from './Subscriptions'

export const mapStateToProps = ({ applications, auth, settings, subscriptions }: Store) => ({
  allUserApps: applications.userApps,
  auth: auth,
  settings: settings,
  subscriptions: subscriptions,
})

export const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(
    {
      getAllUserAppsAction: getAllUserAppsAction,
      getAPIs: getAPIs,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions)
