import React from "react";
import { RouteProps } from "react-router-dom";
import { TabProps } from "components/SideNavigation/types";

export type SideNavEntry = RouteProps & TabProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>,
}

export interface SideNavFromProps {
  entries: SideNavEntry[],
}

export type RouteWrapperProps = RouteProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.ComponentType<any>,
}
