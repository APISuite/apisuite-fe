import { RouteProps } from 'react-router'

import { AuthPayloads, AuthStore } from 'containers/Auth/types'

import { TabProps } from 'components/Navigation/types'

export interface AppProps extends AppDispatchToProps {
  auth: AuthStore,
  logout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export interface AppDispatchToProps {
  getProfile: () => void,
  loginUser: (payload: AuthPayloads['loginUser']) => void,
}

export type AppRouteProps = RouteProps & {
  auth?: boolean,
  component?: React.ComponentType<any>,
  layout?: React.ComponentType<any>,
  layoutProps?: any,
  role?: string | string[],
}

export interface TabMenus {
  [key: string]: TabProps[],
}
