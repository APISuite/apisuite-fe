import * as React from 'react'

import { Route, Switch } from 'react-router'

import { Layouts } from '@apisuite/extension-ui-types'

import { getRoutes } from 'util/extensions'

import EssentialLayout from 'layouts/Essential'
import MainLayout from 'layouts/Main'

import APIDetails from 'containers/APIDetails'
import APIProducts from 'containers/APIProducts'
import Applications from 'containers/Applications'
import Dashboard from 'containers/Dashboard'
import Instructions from 'containers/Instructions'
import Organisation from 'containers/Organisation'
import PasswordRecovery from 'containers/PasswordRecovery'
import Profile from 'containers/Profile'
import RedirectPage from 'containers/RedirectPage'
import RequireAuth from 'containers/Auth'
import Sandbox from 'containers/Sandbox'
import Security from 'containers/Security'
import SignInOrUp from 'containers/SignInOrUp'
import SignUpConfirmation from 'containers/SignUpConfirmation'
import Subscriptions from 'containers/Subscriptions'
import TeamPage from 'containers/TeamPage'

import NotFound from 'components/NotFound'
import Privacy from 'components/Privacy'
import SSOSignIn from 'components/SSOSignIn'
import Terms from 'components/Terms'

import { AppRouteProps } from './types'

const layouts: Record<string, React.ComponentType<any>> = {
  [Layouts.Main]: MainLayout,
  [Layouts.Essential]: EssentialLayout,
}

const extensionsRoutes = getRoutes().map(
  (route: any): AppRouteProps => {
    if (!route.auth) {
      return route
    }

    return {
      ...route,
      auth: true,
      component: route.component,
      layout: layouts[route.layout] || MainLayout,
      layoutProps: route.layoutProps,
      roleReq: route.role,
    }
  },
)

export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: Sandbox, layoutProps: { contractibleMenu: true } },
  { path: '/api-products', exact: true, component: APIProducts, layoutProps: { contractibleMenu: true } },
  { path: '/api-products/details/:apiId/spec/:versionId', exact: true, component: APIDetails, layoutProps: { contractibleMenu: true } },
  { path: '/auth/:view?/:email?', exact: true, component: SignInOrUp, layout: EssentialLayout },
  { path: '/confirmation/:name?', exact: true, component: SignUpConfirmation, layout: EssentialLayout },
  { path: '/dashboard', exact: true, auth: true, component: Dashboard, layoutProps: { contractibleMenu: true } },
  { path: '/dashboard/apps/:appID?', exact: true, auth: true, component: Applications },
  { path: '/dashboard/subscriptions', exact: true, auth: true, component: Subscriptions },
  { path: '/dashboard/test', exact: true, auth: true, component: Instructions },
  { path: '/documentation', exact: true, component: Instructions },
  { path: '/forgot', exact: true, component: PasswordRecovery, layout: EssentialLayout },
  { path: '/privacy', component: Privacy },
  { path: '/profile', exact: true, auth: true, component: Profile },
  { path: '/profile/organisation', exact: true, auth: true, component: Organisation },
  { path: '/profile/security', exact: true, auth: true, component: Security },
  { path: '/profile/team', exact: true, auth: true, component: TeamPage },
  { path: '/sso/auth', exact: true, component: SSOSignIn, layout: EssentialLayout },
  { path: '/terms', component: Terms },
  { path: ['/:redirect/confirm', '/:redirect/reset'], exact: true, component: RedirectPage },
  ...extensionsRoutes,
  { render: () => <NotFound /> },
]

function RouteWrapper ({
  auth,
  component: Component,
  layout: Layout = MainLayout,
  layoutProps,
  render,
  role,
  ...rest
}: AppRouteProps) {
  const renderFunc = React.useMemo(() => {
    return render || ((props: any) => {
      if (!Component) {
        return <NotFound />
      }

      const LayoutContainer = (
        <Layout
          {...layoutProps}
        >
          <Component {...props} />
        </Layout>
      )

      return (
        <RequireAuth
          component={LayoutContainer}
          requireAuth={auth}
          role={role}
          {...props}
        />
      )
    })
  }, [Layout, Component, render, auth, role])

  return (
    <Route render={renderFunc} {...rest} />
  )
}

export default () => {
  return (
    <Switch key='routes'>
      {routesConfig.map((route) =>
        <RouteWrapper
          auth={route.auth}
          component={route.component}
          exact={route.exact}
          key='route-wrapper-keep-same-key-for-all-please'
          layout={route.layout}
          layoutProps={route.layoutProps}
          path={route.path}
          render={route.render}
          role={route.role}
        />,
      )}
    </Switch>
  )
}
