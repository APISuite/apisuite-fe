import * as React from 'react'
import { Route } from 'react-router-dom'

import NotFound from 'components/NotFound'
import PageLoad from 'components/PageLoad'
import LazySwitch from 'components/LazySwitch'

import { AppRouteProps } from './types'

const SSO = React.lazy(() => import(/* webpackChunkName: "sso" */ 'containers/SSO'))
const Terms = React.lazy(() => import(/* webpackChunkName: "terms" */ 'components/Terms'))
const Privacy = React.lazy(() => import(/* webpackChunkName: "privacy" */ 'components/Privacy'))

export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: SSO },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
  { render: () => <NotFound /> },
]

export default () => (
  <React.Suspense fallback={<PageLoad />}>
    <LazySwitch key='routes'>
      {routesConfig.map((options, indx) => <Route key={`routes-${indx}`} {...options} />)}
    </LazySwitch>
  </React.Suspense>
)