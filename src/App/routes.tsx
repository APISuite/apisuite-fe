import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layouts } from "@apisuite/extension-ui-types";

import { getRoutes } from "util/extensions";
import EssentialLayout from "layouts/Essential";
import MainLayout from "layouts/Main";

import NotFound from "components/NotFound";
import Privacy from "components/Privacy";
import SSOSignIn from "components/SSOSignIn";
import Terms from "components/Terms";

import { APIDetails } from "pages/APIDetails";
import { APIProducts } from "pages/APIProducts";
import { Applications } from "pages/Applications";
import { Dashboard } from "pages/Dashboard";
import { Documentation } from "pages/Documentation";
import { HomePageRedirect } from "pages/HomePageRedirect";
import Instructions from "pages/Instructions";
import { Organisation } from "pages/Organisation";
import { PasswordRecovery } from "pages/PasswordRecovery";
import { MarkdownPages } from "pages/MarkdownPages";
import { Profile } from "pages/Profile";
import { RedirectPage } from "pages/RedirectPage";
import { RequireAuth } from "components/RequireAuth";
import { Sandbox } from "pages/Sandbox";
import { Security } from "pages/Security";
import { SignInOrUp } from "pages/SignInOrUp";
import { SignUpConfirmation } from "pages/SignUpConfirmation";
import { Subscriptions } from "pages/Subscriptions";
import { TeamPage } from "pages/TeamPage";

import { AppRouteProps } from "./types";

const layouts: Record<string, React.ComponentType<any>> = {
  [Layouts.Main]: MainLayout,
  [Layouts.Essential]: EssentialLayout,
};

const extensionsRoutes = getRoutes().map(
  (route: any): AppRouteProps => {
    if (!route.auth) {
      return route;
    }

    return {
      ...route,
      auth: true,
      component: route.component,
      layout: layouts[route.layout] || MainLayout,
      layoutProps: route.layoutProps,
      roleReq: route.role,
    };
  },
);

export const routesConfig: AppRouteProps[] = [
  { path: "/", exact: true, component: HomePageRedirect },
  { path: "/home", exact: true, component: Sandbox, layoutProps: { contractibleMenu: true } },
  { path: "/api-products", exact: true, component: APIProducts, layoutProps: { contractibleMenu: true } },
  { path: "/api-products/details/:apiId/spec/:versionId", exact: true, component: APIDetails },
  { path: "/auth/:view?/:email?", exact: true, component: SignInOrUp, layout: EssentialLayout },
  { path: "/confirmation/:name?", exact: true, component: SignUpConfirmation, layout: EssentialLayout },
  { path: "/dashboard", exact: true, auth: true, component: Dashboard, layoutProps: { contractibleMenu: true } },
  { path: "/dashboard/apps/:appID?", exact: true, auth: true, component: Applications },
  { path: "/dashboard/subscriptions", exact: true, auth: true, component: Subscriptions },
  { path: "/dashboard/test", exact: true, component: Documentation },
  { path: "/documentation", exact: true, component: Instructions },
  { path: "/forgot", exact: true, component: PasswordRecovery, layout: EssentialLayout },
  { path: "/pages/:page?", exact: true, component: MarkdownPages },
  { path: "/privacy", component: Privacy },
  { path: "/profile", exact: true, auth: true, component: Profile },
  { path: "/profile/organisation", exact: true, auth: true, component: Organisation },
  { path: "/profile/security", exact: true, auth: true, component: Security },
  { path: "/profile/team", exact: true, auth: true, component: TeamPage },
  { path: "/sso/auth", exact: true, component: SSOSignIn, layout: EssentialLayout },
  { path: "/terms", component: Terms },
  { path: ["/:redirect/confirm", "/:redirect/reset"], exact: true, component: RedirectPage },
  ...extensionsRoutes,
  { render: () => <NotFound /> },
];

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
        return <NotFound />;
      }

      const LayoutContainer = (
        <Layout
          {...layoutProps}
        >
          <Component {...props} />
        </Layout>
      );

      return (
        <RequireAuth
          component={LayoutContainer}
          requireAuth={auth}
          role={role}
          {...props}
        />
      );
    });
  }, [Component, render, auth, role, Layout, layoutProps]);

  return (
    <Route render={renderFunc} {...rest} />
  );
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
  );
};
