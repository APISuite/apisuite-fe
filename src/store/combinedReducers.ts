/*
* Combine all reducers in the this file and export them.
*/

import { combineReducers } from "redux";

import apiDetails from "./apiDetails/reducer";
import applications from "./applications/reducer";
import auth from "./auth/reducer";
// Temporary until notification cards become clearer
import notificationCards from "./notificationCards/reducer";
import notifications from "./notificationStack/reducer";
import profile from "./profile/reducer";
import reduceReducers from "./reduceReducers";
import security from "./security/reducer";
import subscriptions from "./subscriptions/reducer";
import markdownPages from "./markdownPages/reducer";

export default (additionalReducers: Record<string, any[]> = {}) => {
  const reducers: Record<string, any[]> = {
    apiDetails: [apiDetails],
    applications: [applications],
    auth: [auth],
    notifications: [notifications],
    // Temporary until notification cards become clearer
    notificationCards: [notificationCards],
    profile: [profile],
    security: [security],
    subscriptions: [subscriptions],
    markdownPages: [markdownPages],
  };

  Object.keys(additionalReducers).map((key) => {
    if (!reducers[key]) {
      reducers[key] = [];
    }
    reducers[key] = [...reducers[key], ...additionalReducers[key]];
  });

  const reducedReducers = Object.keys(reducers).reduce((accum, key) => {
    return {
      ...accum,
      [key]: reduceReducers(...reducers[key]),
    };
  }, {});

  return combineReducers(reducedReducers);
};
