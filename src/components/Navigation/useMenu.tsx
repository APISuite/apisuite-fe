import { useCallback, useMemo } from "react";
import { useConfig } from "@apisuite/fe-base";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { MenuEntry, Menus } from "@apisuite/extension-ui-types";
import {
  DEFAULT_INSTANCE_OWNER_SUPPORT_URL,
  DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL,
} from "constants/global";
import { getMenuEntries } from "util/extensions";
import { getRoleName } from "pages/Profile/selectors";

import { LeftActions, TabProps } from "./types";
import { NavigationLeftActionTypes } from "./constants";

// Navigation's left actions
export const leftActionsConfig: LeftActions[] = [
  {
    type: NavigationLeftActionTypes.goBack,
    path: "/dashboard/apps/create",
    label: "Cancel",
  },
  {
    type: NavigationLeftActionTypes.goBack,
    path: "/dashboard/apps/detail",
    label: "Back to overview",
  },
  {
    type: NavigationLeftActionTypes.goBack,
    path: "/api-products/details",
    label: "Back to overview",
  },
  {
    type: NavigationLeftActionTypes.goBack,
    path: "/profile/organisation",
    label: "Back to profile",
  },
  {
    type: NavigationLeftActionTypes.openCard,
    path: "/dashboard",
    label: "",
  },
];

export function useMenu () {
  const roleName = useSelector(getRoleName);
  const { pathname } = useLocation();
  const { documentationURL, supportURL } = useConfig();

  /*
   * Create an array for each accumulated level of pathnames of the current URI.
   * E.g.: '/dashboard/subscriptions' -> ['/dashboard', '/dashboard/subscriptions']
   */
  const levelPathnames = useMemo(() => {
    const pathParts = pathname.split("/");
    return pathParts.reduce((accum, _part, index) => {
      const levelParts = pathParts.slice(0, index + 1);

      return [...accum, levelParts.join("/")];
    }, [] as string[]).slice(1);
  }, [pathname]);

  /*
   * Iterates through all menu and sub-menu entries, and sets which entries are
   * active. Active entries are either those whose path matches with the current
   * page, or where any of the sub-menu items is active.
   */
  const setMenuActiveEntries = useCallback((entries, level = 0) => {
    return entries.map((entry: MenuEntry) => {
      const hasLevelPathname = !!levelPathnames[level];
      const currentActiveEntry =
        entry.route === levelPathnames[level] || entry.route === pathname;
      const matchesPrevLevelPath =
        !hasLevelPathname && entry.route === levelPathnames[level - 1];

      let subTabs = entry.subTabs;
      let hasActiveSubtab;

      if (subTabs) {
        subTabs = setMenuActiveEntries(entry.subTabs, level + 1);
        hasActiveSubtab = !!subTabs && subTabs.some((entry) => entry.active);
      }

      return {
        ...entry,
        subTabs,
        active: hasActiveSubtab || currentActiveEntry || matchesPrevLevelPath,
      };
    });
  }, [pathname, levelPathnames]);

  const [
    extensionsInitTabs,
    extensionsLoginTabs,
    extensionsLoginDashboardTabs,
    extensionsLoginProfileTabs,
  ] = useMemo(
    () => {
      return [
        getMenuEntries(Menus.HeaderAnonymousMain, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedMain, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedDashboard, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedProfile, roleName),
      ];
    },
    [roleName],
  );

  // Tabs and sub-tabs
  const topTabs = useMemo((): TabProps[] => {
    return [
      {
        label: "Sign up",
        route: "/auth/signup",
        active: pathname === "/auth/signup",
      },
      {
        // Used to convert the 'Log in' tab's label into a Material UI icon
        isLogin: true,
        label: "Sign in",
        route: "/auth/signin",
        active: pathname === "/auth/signin",
      },
    ];
  }, [pathname]);

  const initTabs = useMemo((): TabProps[] => {
    const entries = [
      {
        label: "API Products",
        route: "/api-products",
      },
      {
        label: "Documentation",
        route: documentationURL || "/documentation",
      },
      {
        label: "Support",
        route: supportURL || (
          roleName === "admin"
            ? DEFAULT_INSTANCE_OWNER_SUPPORT_URL
            : DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL
        ),
      },

      ...extensionsInitTabs,
    ].filter(Boolean);

    return setMenuActiveEntries(entries);
  }, [extensionsInitTabs, documentationURL, roleName, setMenuActiveEntries, supportURL]);

  const loginTabs = useMemo((): TabProps[] => {
    const entries = [
      {
        label: "API Products",
        route: "/api-products",
      },
      {
        label: "Documentation",
        route: documentationURL || "/documentation",
      },
      {
        label: "Support",
        route: supportURL || (
          roleName === "admin"
            ? DEFAULT_INSTANCE_OWNER_SUPPORT_URL
            : DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL
        ),
      },
      {
        label: "Dashboard",
        route: "/dashboard",
        subTabs: [
          {
            label: "Overview",
            route: "/dashboard",
          },
          /*
          This page is currently breaking, but it's being fixed in another branch. Keep it hidden for the time being.
          {
            label: "Team",
            route: "/profile/team",
          },
          */
          {
            label: "Subscriptions",
            route: "/dashboard/subscriptions",
          },
          {
            /* FIXME: Revert to 'Applications' once ESA Demo is complete. */
            label: "Services",
            route: "/dashboard/apps",
          },
          ...extensionsLoginDashboardTabs,
        ],
      },
      {
        // Used to make the user's name or avatar access the 'Profile' tab
        isProfileTab: true,
        label: "Profile",
        route: "/profile",
        subTabs: [
          {
            label: "Overview",
            route: "/profile",
          },
          {
            label: "Security",
            route: "/profile/security",
          },
          {
            label: "Organisation",
            route: "/profile/organisation",
          },
          {
            // Used to convert the 'Log out' sub-tab's label into a Material UI icon
            isLogout: true,
            label: "Log out",
            route: "",
            active: false,
          },
          ...extensionsLoginProfileTabs,
        ],
      },
      ...extensionsLoginTabs,
    ].filter(Boolean);

    return setMenuActiveEntries(entries);
  }, [
    extensionsLoginTabs,
    extensionsLoginDashboardTabs,
    extensionsLoginProfileTabs,
    documentationURL,
    roleName,
    supportURL,
    setMenuActiveEntries,
  ]);

  const goBack = useMemo(() => {
    return leftActionsConfig.find((config) => config.path === pathname);
  }, [pathname]);

  return { topTabs, initTabs, loginTabs, goBack };
}
