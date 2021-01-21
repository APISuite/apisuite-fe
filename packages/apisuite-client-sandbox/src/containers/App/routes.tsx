import * as React from 'react'

import {
  Route,
  Switch,
} from 'react-router'

import { Layouts } from '@apisuite/extension-ui-types'

import { getRoutes } from 'util/extensions'

import MainLayout from 'layouts/Main'
import EssentialLayout from 'layouts/Essential'

import APIDetails from 'containers/APIDetails'
import AppDetail from 'containers/Applications/AppDetail'
import CreateApp from 'containers/Applications/CreateApp'
import ForgotPasswordPage from 'containers/ForgotPasswordPage'
import Instructions from 'containers/Instructions'
import Dashboard from 'containers/Dashboard'
import ListApps from 'containers/Applications/ListApps'
import Login from 'containers/Login'
import OrganisationPage from 'containers/OrganisationPage'
import Profile from 'containers/Profile'
import RedirectPage from 'containers/RedirectPage'
import RegisterConfirmation from 'containers/RegisterConfirmation'
import RequireAuth from 'containers/Auth'
import Sandbox from 'containers/Sandbox'
import Security from 'containers/Security'
import Subscriptions from 'containers/Subscriptions'
import TeamPage from 'containers/TeamPage'

import NotFound from 'components/NotFound'
import Privacy from 'components/Privacy'
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
  { path: '/api-products', exact: true, auth: true, component: Subscriptions },
  { path: '/api-products/details/:apiId/spec/:versionId', exact: true, component: APIDetails, layoutProps: { contractibleMenu: true } },
  { path: '/auth/:view?/:email?', exact: true, component: Login, layout: EssentialLayout },
  { path: '/confirmation/:name?', exact: true, component: RegisterConfirmation, layout: EssentialLayout },
  { path: '/dashboard', exact: true, auth: true, component: Dashboard, layoutProps: { contractibleMenu: true } },
  { path: '/dashboard/apps', exact: true, auth: true, component: ListApps },
  { path: '/dashboard/apps/create', exact: true, auth: true, component: CreateApp },
  { path: '/dashboard/apps/detail/:id', exact: true, auth: true, component: AppDetail },
  { path: '/dashboard/subscriptions', exact: true, auth: true, component: Subscriptions },
  { path: '/dashboard/test', exact: true, auth: true, component: Instructions },
  { path: '/documentation', exact: true, auth: true, component: Instructions },
  { path: '/forgot', exact: true, component: ForgotPasswordPage, layout: EssentialLayout },
  { path: '/privacy', component: Privacy },
  { path: '/profile', exact: true, auth: true, component: Profile },
  { path: '/profile/team', exact: true, auth: true, component: TeamPage },
  { path: '/profile/organisation', exact: true, auth: true, component: OrganisationPage },
  { path: '/profile/security', exact: true, auth: true, component: Security },
  { path: ['/:redirect/confirm', '/:redirect/reset'], exact: true, component: RedirectPage },
  { path: '/terms', component: Terms },
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
