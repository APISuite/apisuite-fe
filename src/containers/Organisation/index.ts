import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import {
  createOrgActions,
  fetchOrgActions,
  resetErrorAction,
  updateOrgActions,
} from 'containers/Profile/ducks'

import Organisation from './Organisation'

import { Store } from 'store/types'

export const mapStateToProps = ({ profile }: Store) => ({
  org: profile.org,
  profile: profile.profile,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  createOrg: createOrgActions.request,
  fetchOrg: fetchOrgActions.request,
  resetErrors: resetErrorAction,
  updateOrg: updateOrgActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Organisation)
