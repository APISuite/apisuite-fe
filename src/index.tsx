import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ConfigProvider } from '@apisuite/fe-base'
import store, { history } from 'store'
import { API_URL } from 'constants/endpoints'
import App from 'containers/App'
import ErrorMonitor from 'components/ErrorMonitor'

// Translations
import translations from 'language/translations'
// Main Application Styles
import 'typeface-roboto'
import 'styles/app.scss'
// load extensions
import 'util/extensions'

function render (Component: React.ElementType) {
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConfigProvider api={{ base: API_URL }} translations={translations}>
            <Component />
          </ConfigProvider>
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
