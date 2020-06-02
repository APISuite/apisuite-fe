import { connect } from 'react-redux'
import {
  submitPersonalDetailsActions,
  submitOrganisationDetailsActions,
  submitSecurityStepActions,
} from './ducks'
import RegisterForm from './RegisterForm'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import { Store } from 'store/types'

export const mapStateToProps = ({ register }: Store) => ({
  register,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  submitOrganisationDetails: submitOrganisationDetailsActions.request,
  submitPersonalDetails: submitPersonalDetailsActions.request,
  submitSecurityStep: submitSecurityStepActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
