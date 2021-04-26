/*
 * Redux Store
 */

import { createStore, applyMiddleware, Reducer, AnyAction } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAuthMiddleware } from 'store/auth/middleware'
import { createInvitationMiddleware } from 'components/InvitationForm/ducks'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'
import { SagaManager } from './SagaManager'

export const history = createBrowserHistory()

const injectedReducers: Record<string, Reducer<any, any>[]> = {}
let injectedSagas: any = []

const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = routerMiddleware(history)
const authMiddleware = createAuthMiddleware(history)
const invitationMiddleware = createInvitationMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware, invitationMiddleware]

let composedMiddleware

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
  composedMiddleware = composeWithDevTools(applyMiddleware(...middleware))
} else {
  composedMiddleware = applyMiddleware(...middleware)
}

const store = createStore(combinedReducers(history), composedMiddleware)

export function injectReducer (name: string, reducer: any) {
  injectedReducers[name] = injectedReducers[name]
    ? [...injectedReducers[name], reducer]
    : [reducer]
  store.replaceReducer(
    combinedReducers(history, injectedReducers) as Reducer<{}, AnyAction>,
  )
}

export function injectSaga (key: string, saga: any, force = false) {
  // If already set, do nothing, except force is specified
  const exists = injectedSagas.includes(key)
  if (!exists || force) {
    if (!exists) {
      injectedSagas = [...injectedSagas, key]
    }
    if (force) {
      SagaManager.cancelSaga(key, store)
    }
    SagaManager.startSaga(sagaMiddleware, key, saga)
  }
}
combinedSagas.forEach((saga, index) => {
  injectSaga(String(index), saga, false)
})

export default store
