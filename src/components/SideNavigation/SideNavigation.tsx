import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Tabs, Tab } from "@apisuite/fe-base";

import { SideNavigationProps } from "./types";
import useStyles from "./styles";

export const SideNavigation: React.FC<SideNavigationProps> = ({
  menuEntries,
}) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <Tabs
      aria-label="side navigation"
      classes={{ indicator: classes.indicator }}
      indicatorColor="primary"
      orientation="vertical"
      value={pathname}
    >
      {menuEntries.map((entry, idx) => (
        <Tab
          classes={{ root: classes.tabRoot }}
          className="entry"
          component={Link}
          disabled={entry.disabled}
          disableRipple
          key={`sidenav-entry-${idx}`}
          label={entry.label}
          selected={entry.active}
          to={entry.route}
          value={entry.route}
        />
      ))}
    </Tabs>
  );
};
