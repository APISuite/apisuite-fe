/*
 * Redux Store
 */

import { createStore, applyMiddleware, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import loggerMiddleware from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { createAuthMiddleware } from "store/auth/middleware";
import { createApplicationsMiddleware } from "store/applications/middleware";
import { selfRemoveFromTeamMiddleware } from "store/profile/middleware";

import combinedReducers from "./combinedReducers";
import combinedSagas from "./combinedSagas";
import { SagaManager } from "./SagaManager";

export const history = createBrowserHistory();

const injectedReducers: Record<string, Reducer<any, any>[]> = {};
let injectedSagas: any = [];

const sagaMiddleware = createSagaMiddleware();
const authMiddleware = createAuthMiddleware(history);
const applicationsMiddleware = createApplicationsMiddleware(history);
const teamRemovalMiddleware = selfRemoveFromTeamMiddleware(history);

const middleware = [sagaMiddleware, authMiddleware, applicationsMiddleware, teamRemovalMiddleware];

let composedMiddleware;

if (process.env.NODE_ENV === "development") {
  middleware.push(loggerMiddleware as any);
  composedMiddleware = composeWithDevTools(applyMiddleware(...middleware));
} else {
  composedMiddleware = applyMiddleware(...middleware);
}

const store = createStore(combinedReducers(), composedMiddleware);

export function injectReducer (name: string, reducer: any) {
  injectedReducers[name] = injectedReducers[name]
    ? [...injectedReducers[name], reducer]
    : [reducer];
  store.replaceReducer(
    combinedReducers(injectedReducers),
  );
}

export function injectSaga (key: string, saga: any, force = false) {
  // If already set, do nothing, except force is specified
  const exists = injectedSagas.includes(key);
  if (!exists || force) {
    if (!exists) {
      injectedSagas = [...injectedSagas, key];
    }
    if (force) {
      SagaManager.cancelSaga(key, store);
    }
    SagaManager.startSaga(sagaMiddleware, key, saga);
  }
}
combinedSagas.forEach((saga, index) => {
  injectSaga(String(index), saga, false);
});

export default store;
