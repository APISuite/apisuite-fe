import React from "react";
import { Route, Switch } from "react-router";
import { SideNavigation } from "components/SideNavigation";
import NotFound from "components/NotFound";

import useStyles from "./styles";
import { SideNavFromProps, RouteWrapperProps } from "./types";

function RouteWrapper ({ component: Component, ...rest }: RouteWrapperProps) {
  const renderFunc = React.useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((props: any) => {
      if (!Component) {
        return <NotFound />;
      }

      return <Component {...props} />;
    });
  }, [Component]);

  return (
    <Route render={renderFunc} {...rest} />
  );
}

export const SideNavForm: React.FC<SideNavFromProps> = ({
  entries,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <nav className={classes.navContainer}>
        <SideNavigation menuEntries={entries.map((e) => ({
          active: e.active,
          disabled: e.disabled,
          label: e.label,
          route: e.route,
        }))} />
      </nav>

      <section className={classes.contentContainer}>
        <Switch key="side-nav-form-routes">
          {
            entries.map((entry) => {
              return (
                <RouteWrapper
                  component={entry.component}
                  exact
                  key={`route-entry-${entry.component?.displayName || Date.now()}`}
                  path={entry.path}
                />
              );
            })
          }
        </Switch>
      </section>
    </div>
  );
};
