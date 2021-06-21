import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { PageEntry } from "@apisuite/extension-ui-types";
import { getRoleName } from "pages/Profile/selectors";
import { getRoutes } from "util/extensions";

export const HomePageRedirect: React.FC = () => {
  const roleName = useSelector(getRoleName);
  const marketPlaceActive = getRoutes().filter(
    (route: PageEntry) => {
      return route.path.indexOf("marketplace") > -1;
    }
  ).length;
  let defaultRoute = "/home";

  if (marketPlaceActive) {
    switch (roleName) {
      case "admin":
      case "organizationOwner":
      case "developer":
        defaultRoute = "/dashboard";
        break;
      default:
        defaultRoute = "/marketplace";
        break;
    }
  }

  return <Redirect to={defaultRoute} />;
};
