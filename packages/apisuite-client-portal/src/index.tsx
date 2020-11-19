
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from 'store'

import ErrorMonitor from 'components/ErrorMonitor'
import App from 'containers/App'

// Main Application Styles
import 'typeface-roboto'
import 'styles/app.scss'

function render (Component: any) {
  // @ts-ignore
  ReactDOM.unstable_createRoot(document.getElementById('root')).render(
    <ErrorMonitor>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path='/' component={Component} />
        </ConnectedRouter>
      </Provider>
    </ErrorMonitor>,
  )
}

render(App)

// Enable HMR for js files
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(NextApp)
  })
}