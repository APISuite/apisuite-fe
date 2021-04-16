import { bindActionCreators, Dispatch } from 'redux'

import { connect } from 'react-redux'

import {
  previousStepAction,
  submitOrganisationDetailsActions,
  submitProfileDetailsActions,
  submitSecurityDetailsActions,
  validateRegisterTokenActions,
} from './ducks'

import { Store } from 'store/types'

import SignUpForm from './SignUpForm'

export const mapStateToProps = ({ register }: Store) => ({
  register,
})

export const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(
    {
      previousStep: previousStepAction,
      submitOrganisationDetails: submitOrganisationDetailsActions.request,
      submitProfileDetails: submitProfileDetailsActions.request,
      submitSecurityDetails: submitSecurityDetailsActions.request,
      validateToken: validateRegisterTokenActions.request,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
