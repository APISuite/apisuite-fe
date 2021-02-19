/*
 * Combine all sagas in the this file and export them.
 */

import apiDetails from 'containers/APIDetails/sagas'
import applications from 'containers/Applications/sagas'
import auth from 'containers/Auth/sagas'
import informDialog from 'components/InformDialog/sagas'
import profile from 'containers/Profile/sagas'
import register from 'components/RegisterForm/sagas'
import security from 'containers/Security/sagas'
import settings from 'containers/Settings/sagas'
import subscriptions from 'containers/Subscriptions/sagas'

const sagas = [
  apiDetails,
  applications,
  auth,
  informDialog,
  profile,
  register,
  security,
  settings,
  subscriptions,
]

export default sagas
