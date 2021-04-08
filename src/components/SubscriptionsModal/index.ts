import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { requestAPIAccessAction } from 'containers/Applications/ducks'

import { getAPIsByName } from 'containers/Subscriptions/selectors'

import { Store } from 'store/types'

import SubscriptionsModal from './SubscriptionsModal'

export const mapStateToProps = (store: Store) => ({
  allUserApps: store.applications.userApps,
  apisByName: getAPIsByName(store),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestAPIAccessAction: (appId: number) => dispatch(requestAPIAccessAction(appId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsModal)
