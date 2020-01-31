import { connect } from 'react-redux'
import { registerUser } from './ducks'
import RegisterPortal from './RegisterPortal'
import { UserData } from './types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapStateToProps = ({ register }: Store) => {
  return ({
    errorMsg: register.error,
    success: register.success,
  })
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  registerUser: (userData: UserData) => dispatch(registerUser(userData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPortal)
