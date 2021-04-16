import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { nextStepAction } from 'components/SignUpForm/ducks'
import { Store } from 'store/types'

import SignUpConfirmation from './SignUpConfirmation'

export const mapStateToProps = ({ register }: Store) => ({
  register,
})

export const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(
    {
      nextStep: nextStepAction,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(SignUpConfirmation)
