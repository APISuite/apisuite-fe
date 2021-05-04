// Taken from: https://github.com/GuillaumeCisco/redux-sagas-injector/blob/master/src/redux-sagas-injector.js

import { Task } from "@redux-saga/types";
import { take, fork, cancel } from "redux-saga/effects";
export const CANCEL_SAGAS_HMR = "CANCEL_SAGAS_HMR";

function createAbortableSaga (key: string, saga: any) {
  if (process.env.NODE_ENV === "development") {
    return function * main () {
      const sagaTask: Task = yield fork(saga);
      const { payload } = yield take(CANCEL_SAGAS_HMR);

      if (payload === key) {
        yield cancel(sagaTask);
      }
    };
  } else {
    return saga;
  }
}
export const SagaManager = {
  startSaga (sagaMiddleware: any, key: string, saga: any) {
    sagaMiddleware.run(createAbortableSaga(key, saga));
  },
  cancelSaga (key: string, store: any) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR,
      payload: key,
    });
  },
};
