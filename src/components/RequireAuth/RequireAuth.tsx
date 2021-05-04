import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { validateRoleConfig } from "util/roleSetup";
import { getRoleName } from "pages/Profile/selectors";

import { authSelector } from "./selector";
import { RequireAuthProps } from "./types";

export const RequireAuth: React.FC<RequireAuthProps> = ({
  component,
  requireAuth,
  role,
}) => {
  const auth = useSelector(authSelector);
  const roleName = useSelector(getRoleName);
  const roleAuthorized = validateRoleConfig(role, roleName ? [roleName] : []);

  if (!requireAuth) {
    // Even though it seems absurd to have the `requireAuth` param, this allows
    // us to use this same Component for all routes, even anonymous ones. This
    // way React will not re-mount the Layout route component when we navigate
    // between authentication required and not required routes.
    return component;
  }

  if (auth) {
    if (auth.user && !auth.isAuthorizing && roleAuthorized) {
      return component;
    } else if (!auth.authToken) {
      return <Redirect to='/auth/login' />;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
