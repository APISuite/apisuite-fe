import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MenuEntry, Menus } from '@apisuite/extension-ui-types'
import { getMenuEntries } from 'util/extensions'
import { useSettings } from 'util/useSetting'
import { getRoleName } from 'containers/Profile/selectors'
import { TabProps } from './types'

export function useMenu (): Array<TabProps[]> {
  const [settings] = useSettings()
  const roleName = useSelector(getRoleName)
  const { pathname } = useLocation()

  // Create an array for each accumulated level of pathnames of the current URI
  // Ex: /dashboard/subscriptions -> [/dashboard, /dashboard/subscriptions]
  const levelPathnames = React.useMemo(() => {
    const pathParts = pathname.split('/')
    return pathParts.reduce((accum, _part, index) => {
      const levelParts = pathParts.slice(0, index + 1)
      return [...accum, levelParts.join('/')]
    }, [] as string[]).slice(1)
  }, [pathname])

  // Iterates through all menu and sub-menu entries and sets which entries are
  // active. Active entries are either those whose path match with the current
  // page or where any of the sub menu items is active.
  const setMenuActiveEntries = React.useCallback((entries, level = 0) => {
    return entries.map((entry: MenuEntry) => {
      const hasLevelPathname = !!levelPathnames[level]
      const curEntryActive =
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
        active: hasActiveSubtab || curEntryActive || matchesPrevLevelPath,
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

  const topTabs = React.useMemo((): TabProps[] => {
    return [
      {
        label: 'Register',
        route: '/auth/register',
        active: pathname === '/auth/register',
      },
      {
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
        label: 'Home',
        route: '/',
      },
      {
        authRelated: true,
        label: 'Log in',
        route: '/auth/login',
        active: pathname === '/auth/login',
      },
      {
        authRelated: true,
        label: 'Register',
        route: '/auth/register',
        active: pathname === '/auth/register',
      },
      ...extensionsInitTabs,
    ].filter(Boolean)

    if (settings.supportURL) {
      entries.splice(1, 0, {
        label: 'Support',
        route: settings.supportURL,
      })
    }

    return setMenuActiveEntries(entries)
  }, [settings, extensionsInitTabs])

  const loginTabs = React.useMemo((): TabProps[] => {
    const entries = [
      {
        label: 'Home',
        route: '/',
      },
      {
        label: 'Dashboard',
        route: '/dashboard',
        subTabs: [
          {
            label: 'Landing page',
            route: '/dashboard',
          },
          {
            label: 'Subscriptions',
            route: '/dashboard/subscriptions',
          },
          {
            label: 'Client Applications',
            route: '/dashboard/apps',
          },
          {
            label: 'Test',
            route: '/dashboard/test',
          },
          ...extensionsLoginDashboardTabs,
        ],
      },
      {
        label: 'Profile',
        route: '/profile',
        subTabs: [
          {
            label: 'Profile',
            route: '/profile',
          },
          {
            label: 'Team',
            route: '/profile/team',
          },
          {
            label: 'Organisation',
            route: '/profile/organisation',
          },
          ...extensionsLoginProfileTabs,
        ],
      },
      ...extensionsLoginTabs,
    ].filter(Boolean)

    if (settings.supportURL) {
      entries.splice(1, 0, {
        label: 'Support',
        route: settings.supportURL,
      })
    }

    if (settings.documentationURL) {
      entries.splice(1, 0, {
        label: 'Documentation',
        route: settings.documentationURL,
      })
    }

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

export const goBackConfig = [
  {
    path: '/dashboard/apps/create',
    label: 'Cancel',
  },
  {
    path: '/dashboard/apps/detail',
    label: 'Back to overview',
  },
]
