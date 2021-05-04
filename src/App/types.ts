import { RouteProps } from "react-router-dom";
import { TabProps } from "components/Navigation/types";
import { LoginAction } from "store/auth/actions/types";

export interface AppDispatchToProps {
  getProfile: () => void,
  loginUser: (payload: Omit<LoginAction, "type">) => void,
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
