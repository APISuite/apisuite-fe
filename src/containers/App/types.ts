import { RouteProps } from 'react-router'
import { AuthPayloads, AuthStore } from 'containers/Auth/types'
import { TabProps } from 'components/Navigation/types'

export interface AppProps extends AppDispatchToProps {
  auth: AuthStore,
  logout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export interface AppDispatchToProps {
  getProfile: () => void,
  getSettings: () => void,
  loginUser: (payload: AuthPayloads['loginUser']) => void,
}

export type AppRouteProps = RouteProps & {
  component?: React.ComponentType<any>,
  auth?: boolean,
  role?: string | string[],
  layout?: React.ComponentType<any>,
  layoutProps?: any,
}

export interface TabMenus {
  [key: string]: TabProps[],
}
