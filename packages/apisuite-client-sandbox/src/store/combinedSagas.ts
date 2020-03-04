/*
 * Combine all sagas in the this file and export them.
 */

import auth from 'containers/Auth/sagas'
import register from 'components/RegisterPortal/sagas'
import informDialog from 'components/InformDialog/sagas'
import applications from 'containers/Applications/sagas'
import subscriptions from 'containers/Subscriptions/sagas'

const sagas = [
  auth,
  register,
  applications,
  subscriptions,
  informDialog,
]

export default sagas
