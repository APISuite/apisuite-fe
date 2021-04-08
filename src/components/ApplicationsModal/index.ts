import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import {
  createAppAction,
  deleteAppAction,
  getUserAppAction,
  updateAppAction,
} from 'containers/Applications/ducks'

import { CreateAppActionData, UpdateAppActionData } from 'containers/Applications/types'

import { Store } from 'store/types'

import ApplicationsModal from './ApplicationsModal'

export const mapStateToProps = (store: Store) => ({
  mostRecentlySelectedAppDetails: store.applications.currentApp,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createAppAction: (appData: CreateAppActionData) => dispatch(createAppAction(appData)),
  deleteAppAction: (appID: number, orgID?: number) => dispatch(deleteAppAction(appID, orgID)),
  getUserAppAction: (appID: number, userID: number) => dispatch(getUserAppAction(appID, userID)),
  updateAppAction: (appData: UpdateAppActionData) => dispatch(updateAppAction(appData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsModal)
