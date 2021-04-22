/*
* Combine all sagas in the this file and export them.
*/

import apiDetails from './apiDetails/sagas'
import applications from 'store/applications/sagas'
import auth from 'containers/Auth/sagas'
import profile from 'containers/Profile/sagas'
import register from 'components/SignUpForm/sagas'
import security from './security/sagas'
import subscriptions from './subscriptions/sagas'

const sagas = [
  apiDetails,
  applications,
  auth,
  profile,
  register,
  security,
  subscriptions,
]

export default sagas
