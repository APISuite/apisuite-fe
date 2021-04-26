/*
* Combine all sagas in the this file and export them.
*/

import apiDetails from './apiDetails/sagas'
import applications from 'store/applications/sagas'
import auth from 'store/auth/sagas'
import profile from './profile/sagas'
import register from 'components/SignUpForm/sagas'
import security from './security/sagas'
import subscriptions from './subscriptions/sagas'
import invitation from 'components/InvitationForm/sagas'

const sagas = [
  apiDetails,
  applications,
  auth,
  invitation,
  profile,
  register,
  security,
  subscriptions,
]

export default sagas
