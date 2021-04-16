import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getProfileActions } from 'containers/Profile/ducks'

import { updatePasswordRequestAction } from './ducks'

import Security from './Security'

import { Store } from 'store/types'

export const mapStateToProps = ({ profile }: Store) => ({
  profile: profile.profile,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProfile: getProfileActions.request,
  updatePasswordRequest: (oldPassword: string, newPassword: string) => {
    dispatch(updatePasswordRequestAction(oldPassword, newPassword))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Security)
