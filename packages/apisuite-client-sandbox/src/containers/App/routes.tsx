import * as React from 'react'
import {
  Route,
  Switch,
} from 'react-router'
import NotFound from 'components/NotFound'
import Terms from 'components/Terms'
import Privacy from 'components/Privacy'
import Sandbox from 'containers/Sandbox'
import LandingPage from 'containers/LandingPage'
import ListApps from 'containers/Applications/ListApps'
import CreateApp from 'containers/Applications/CreateApp'
import AppDetail from 'containers/Applications/AppDetail'
import Subscriptions from 'containers/Subscriptions'
import Console from 'containers/Console'
import Login from 'containers/Login'
import { AppRouteProps } from './types'
import RequireAuth from 'containers/Auth'
import Instructions from 'containers/Instructions'
import RegisterConfirmation from 'containers/RegisterConfirmation'
import RedirectPage from 'containers/RedirectPage'
import ForgotPasswordPage from 'containers/ForgotPasswordPage'

export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: Sandbox },
  { path: '/dashboard', exact: true, component: LandingPage },
  // { path: '/dashboard', exact: true, render: (props) => <RequireAuth component={LandingPage} {...props} /> },
  { path: '/dashboard/apps', exact: true, render: (props) => <RequireAuth component={ListApps} {...props} /> },
  { path: '/dashboard/apps/create', exact: true, render: (props) => <RequireAuth component={CreateApp} {...props} /> },
  { path: '/dashboard/apps/detail/:id', exact: true, render: (props) => <RequireAuth component={AppDetail} {...props} /> },
  { path: '/dashboard/subscriptions', exact: true, render: (props) => <RequireAuth component={Subscriptions} {...props} /> },
  { path: '/dashboard/test', exact: true, render: (props) => <RequireAuth component={Instructions} {...props} /> },
  { path: '/dashboard/console', render: (props) => <RequireAuth component={Console} {...props} /> },
  // #conditional-loader-start: console
  // #conditional-loader-end
  { path: '/auth/:view?/:email?', exact: true, component: Login },
  { path: '/registration/confirm', exact: true, component: RedirectPage },
  { path: '/confirmation/:name?', exact: true, component: RegisterConfirmation },
  { path: '/forgot', exact: true, component: ForgotPasswordPage },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
  { render: () => <NotFound /> },
]

export default () => (
  <Switch key='routes'>
    {routesConfig.map((route, indx) =>
      <Route
        key={`routes-${indx}`}
        path={route.path}
        exact={route.exact}
        render={route.render}
        component={route.component}
      />,
    )}
  </Switch>
)
