
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

// Translations
import 'Language/i18n'

if (process.env.NODE_ENV === 'development') {
  import('util/reactotronConfig').then(() => console.log('Reactotron Configured'))
}

function render (Component: any) {
  // @ts-ignore
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path='/' component={Component} />
        </ConnectedRouter>
      </Provider>
    </ErrorMonitor>,
    document.getElementById('root'),
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
