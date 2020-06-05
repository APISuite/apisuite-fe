import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import { TabProps } from 'components/Navigation/types'

export const initTabs: TabProps[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Contact',
    route: '/',
    disabled: true,
  },
  {
    label: 'Log in',
    route: '/auth/login',
  },
  {
    label: 'Demo',
    route: '/',
    disabled: true,
  },
]

const ConsoleLabel = () => (
  <div style={{ backgroundColor: '#A9A9A9', borderRadius: 4, paddingLeft: 4, paddingRight: 4, pointerEvents: 'none' }}>
    <SvgIcon
      name='code'
      size={24}
      color='white'
      style={{ backgroundColor: 'transparent' }}
    />
  </div>
)

export const loginTabs: TabProps[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Documentation',
    route: '',
    disabled: true,
  },
  {
    label: 'Contact',
    route: '',
    disabled: true,
  },
  {
    label: 'Dashboard',
    route: '/dashboard',
    subTabs: [
      {
        label: 'Landing page',
        route: '/dashboard',
      },
      {
        label: 'Subscriptions',
        route: '/dashboard/subscriptions',
      },
      {
        label: 'Client Applications',
        route: '/dashboard/apps',
      },
      {
        label: 'Test',
        route: '/dashboard/test',
      },
      // #conditional-loader-start: console
      {
        label: <ConsoleLabel />,
        route: '/dashboard/console',
      },
      // #conditional-loader-end
    ],
  },
]

export const gobackConfig = [
  {
    path: '/dashboard/apps/create',
    label: 'Cancel',
  },
  {
    path: '/dashboard/apps/detail',
    label: 'Back to overview',
  },
]
