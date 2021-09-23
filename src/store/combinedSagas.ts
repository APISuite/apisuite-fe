/*
* Combine all sagas in the this file and export them.
*/

import apiDetails from "./apiDetails/sagas";
import applications from "store/applications/sagas";
import auth from "store/auth/sagas";
import profile from "./profile/sagas";
import security from "./security/sagas";
import subscriptions from "./subscriptions/sagas";
import markdownPages from "./markdownPages/sagas";

const sagas = [
  apiDetails,
  applications,
  auth,
  profile,
  security,
  subscriptions,
  markdownPages,
];

export default sagas;
