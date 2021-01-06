import * as React from 'react'

import { useSelector } from 'react-redux'

import { useLocation } from 'react-router-dom'

import { getRoleName } from 'containers/Profile/selectors'

import { MenuEntry, Menus } from '@apisuite/extension-ui-types'

import { getMenuEntries } from 'util/extensions'
import { useSettings } from 'util/useSetting'

import { TabProps } from './types'

import {
  DEFAULT_INSTANCE_OWNER_SUPPORT_URL,
  DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL,
} from 'constants/global'

export function useMenu (): Array<TabProps[]> {
  const [settings] = useSettings()
  const roleName = useSelector(getRoleName)
  const { pathname } = useLocation()

  /*
  Create an array for each accumulated level of pathnames of the current URI.
  E.g.: '/dashboard/subscriptions' -> ['/dashboard', '/dashboard/subscriptions']
  */
  const levelPathnames = React.useMemo(() => {
    const pathParts = pathname.split('/')
    return pathParts.reduce((accum, _part, index) => {
      const levelParts = pathParts.slice(0, index + 1)

      return [...accum, levelParts.join('/')]
    }, [] as string[]).slice(1)
  }, [pathname])

  /*
  Iterates through all menu and sub-menu entries, and sets which entries are
  active. Active entries are either those whose path matches with the current
  page, or where any of the sub-menu items is active.
  */
  const setMenuActiveEntries = React.useCallback((entries, level = 0) => {
    return entries.map((entry: MenuEntry) => {
      const hasLevelPathname = !!levelPathnames[level]
      const currentActiveEntry =
        entry.route === levelPathnames[level] || entry.route === pathname
      const matchesPrevLevelPath =
        !hasLevelPathname && entry.route === levelPathnames[level - 1]

      let subTabs = entry.subTabs
      let hasActiveSubtab

      if (subTabs) {
        subTabs = setMenuActiveEntries(entry.subTabs, level + 1)
        hasActiveSubtab = !!subTabs && subTabs.some((entry) => entry.active)
      }

      return {
        ...entry,
        subTabs,
        active: hasActiveSubtab || currentActiveEntry || matchesPrevLevelPath,
      }
    })
  }, [pathname, levelPathnames])

  const [
    extensionsInitTabs,
    extensionsLoginTabs,
    extensionsLoginDashboardTabs,
    extensionsLoginProfileTabs,
  ] = React.useMemo(
    () => {
      return [
        getMenuEntries(Menus.HeaderAnonymousMain, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedMain, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedDashboard, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedProfile, roleName),
      ]
    },
    [roleName],
  )

  // Tabs and sub-tabs

  const topTabs = React.useMemo((): TabProps[] => {
    return [
      {
        label: 'Register',
        route: '/auth/register',
        active: pathname === '/auth/register',
      },
      {
        // Used to convert the 'Log in' tab's label into a Material UI icon
        isLogin: true,
        label: 'Log in',
        route: '/auth/login',
        active: pathname === '/auth/login',
      },
    ]
  }, [])

  const initTabs = React.useMemo((): TabProps[] => {
    const entries = [
      {
        label: 'Support',
        route: settings.supportURL || (
          roleName === 'admin'
            ? DEFAULT_INSTANCE_OWNER_SUPPORT_URL
            : DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL
        ),
      },
      {
        // Used to place this tab at the logo-level of a contractible && NOT scrolled navigation menu
        yetToLogIn: true,
        label: 'Register',
        route: '/auth/register',
        active: pathname === '/auth/register',
      },
      {
        // Used to convert the 'Log in' tab's label into a Material UI icon
        isLogin: true,
        // Used to place this tab at the logo-level of a contractible && NOT scrolled navigation menu
        yetToLogIn: true,
        label: 'Log in',
        route: '/auth/login',
        active: pathname === '/auth/login',
      },
      ...extensionsInitTabs,
    ].filter(Boolean)

    return setMenuActiveEntries(entries)
  }, [settings, extensionsInitTabs])

  const loginTabs = React.useMemo((): TabProps[] => {
    const entries = [
      {
        label: 'API Products',
        route: '/api-products',
        subTabs: [],
      },
      {
        label: 'Documentation',
        route: settings.documentationURL || '/documentation',
      },
      {
        label: 'Support',
        route: settings.supportURL || (
          roleName === 'admin'
            ? DEFAULT_INSTANCE_OWNER_SUPPORT_URL
            : DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL
        ),
      },
      {
        label: 'Dashboard',
        route: '/dashboard',
        subTabs: [
          {
            label: 'Overview',
            route: '/dashboard',
          },
          {
            label: 'Team',
            route: '/profile/team',
          },
          {
            label: 'Subscriptions',
            route: '/dashboard/subscriptions',
          },
          {
            label: 'Applications',
            route: '/dashboard/apps',
          },
          ...extensionsLoginDashboardTabs,
        ],
      },
      {
        // Used to make the user's name or avatar access the 'Profile' tab
        isProfileTab: true,
        label: 'Profile',
        route: '/profile',
        subTabs: [
          {
            label: 'Overview',
            route: '/profile',
          },
          // Hidden until 'Security' view is implemented
          // {
          //   label: 'Security',
          //   route: '/profile/security',
          // },
          {
            label: 'Organisation',
            route: '/profile/organisation',
          },
          {
            // Used to convert the 'Log out' sub-tab's label into a Material UI icon
            isLogout: true,
            label: 'Log out',
            route: '',
            active: false,
          },
          ...extensionsLoginProfileTabs,
        ],
      },
      ...extensionsLoginTabs,
    ].filter(Boolean)

    return setMenuActiveEntries(entries)
  }, [
    settings,
    extensionsLoginTabs,
    extensionsLoginDashboardTabs,
    extensionsLoginProfileTabs,
    levelPathnames,
  ])

  return [topTabs, initTabs, loginTabs]
}

// Navigation's 'back' buttons

export const goBackConfig = [
  {
    path: '/dashboard/apps/create',
    label: 'Cancel',
  },
  {
    path: '/dashboard/apps/detail',
    label: 'Back to overview',
  },
  {
    path: '/api-products/details',
    label: 'Back to overview',
  },
]
