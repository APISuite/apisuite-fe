import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { useConfig, Avatar, Tabs, Tab } from '@apisuite/fe-base'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded'
import RoomServiceRoundedIcon from '@material-ui/icons/RoomServiceRounded'
import Link from 'components/Link'
import SvgIcon from 'components/SvgIcon'

import { useMenu, goBackConfig } from './useMenu'
import useStyles from './styles'
import './styles.scss'

import { NavigationProps, TabMenus } from './types'
import { navigationSelector } from './selector'

const Navigation: React.FC<NavigationProps> = ({
  contractible = false,
  logout,
  // Temporary until notification cards become clearer
  notificationCards,
  profile,
  title,
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards,
  toggleNonInstanceOwnerNotificationCards,
  ...rest
}) => {
  const classes = useStyles()

  const history = useHistory()
  const { portalName, ownerInfo } = useConfig()

  const { auth } = useSelector(navigationSelector)
  const user = auth.user
  const userProfile = profile.profile.user

  // User's initials (to be used in his Avatar, in the absence of a picture)
  let splitName
  let initials

  if (user) {
    splitName = userProfile.name.split(' ')
    initials = splitName[0].charAt(0).toLocaleUpperCase()
  }

  const [scrollPos, setScrollPos] = useState(0)
  const scrolled = contractible && (scrollPos >= 10)

  const scrollHandler = useCallback(() => {
    setScrollPos(window.scrollY)
  }, [])

  const [activeMenuName, setActiveMenuName] = useState('init')
  const [goBackLabel, setGoBackLabel] = useState('')
  const [topTabs, initTabs, loginTabs] = useMenu()
  const allTabs: TabMenus = {
    init: initTabs,
    login: loginTabs,
  }
  const tabs = allTabs[activeMenuName]

  const { activeTab, subTabs, activeSubTab } = useMemo(() => {
    const activeTab = tabs.find((tab) => tab.active)
    const subTabs = !!activeTab && activeTab.subTabs
    const activeSubTab = !!subTabs && subTabs.find((tab) => tab.active)

    return { activeTab, subTabs, activeSubTab }
  }, [tabs])

  const handleGobackClick = useCallback(() => history.goBack(), [])

  useEffect(() => {
    setActiveMenuName(user ? 'login' : 'init')
  }, [user])

  useEffect(() => {
    const { pathname } = history.location
    const goBack = goBackConfig.find((item) => pathname.indexOf(item.path) === 0)

    if (goBack) {
      setGoBackLabel(goBack.label)
    } else {
      setGoBackLabel('')
    }
  }, [history.location.pathname])

  useEffect(() => {
    if (!contractible) {
      return
    }

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [contractible])

  const [amountOfNotifications, setAmountOfNotifications] = useState(0)

  useEffect(() => {
    if (user?.role.name !== 'admin') {
      if (amountOfNotifications !== notificationCards.instanceOwnerNotificationCardsData.length) {
        setAmountOfNotifications(notificationCards.instanceOwnerNotificationCardsData.length)
      }
    } else {
      if (amountOfNotifications !== notificationCards.nonInstanceOwnerNotificationCardsData.length) {
        setAmountOfNotifications(notificationCards.nonInstanceOwnerNotificationCardsData.length)
      }
    }
  }, [notificationCards])

  return (
    <div
      className={clsx('navigation', {
        contractible,
        scrolled,
      })}
      {...rest}
    >
      <header className={clsx({ scrolled })}>
        <div className={classes.headerContentsContainer}>
          <Link
            className={classes.logoAndNameContainer}
            to={user?.role.name !== 'admin' ? '/' : '/dashboard'}
          >
            {
              ownerInfo.logo ? (
                <img
                  className={classes.imageLogo}
                  src={ownerInfo.logo}
                />
              )
                : (
                  <AmpStoriesRoundedIcon
                    className={
                      clsx({
                        [classes.regularLogo]: !scrolled,
                        [classes.alternativeLogo]: scrolled,
                      })
                    }
                  />
                )
            }

            <h3 className={classes.portalName}>
              {portalName}
            </h3>
          </Link>
        </div>

        <nav className={clsx('container', { scrolled })}>
          <div className={classes.tabs}>
            <Tabs
              aria-label='Navigation tabs'
              classes={{
                indicator: clsx({
                  [classes.transparentMenuActiveTabOverLine]: contractible && !scrolled,
                  [classes.opaqueMenuActiveTabOverLine]: !(contractible && !scrolled),
                }),
              }}
              value={(activeTab && activeTab.route) || false}
            >
              {
                tabs.map((tab, idx) => {
                  if (tab.isProfileTab) return

                  return !(contractible && !scrolled && tab.yetToLogIn)
                    ? (
                      <Tab
                        className={
                          clsx({
                            [classes.transparentMenuTab]: contractible && !scrolled,
                            [classes.opaqueMenuTab]: !(contractible && !scrolled),
                            [classes.activeTab]: tab.active,
                            [classes.yetToLogIn]: contractible && !scrolled && tab.yetToLogIn,
                          })
                        }
                        component={Link}
                        disableRipple
                        key={`nav-tab-${idx}`}
                        label={tab.label}
                        to={tab.route}
                        value={tab.route}
                      />
                    )
                    : null
                })
              }
            </Tabs>
          </div>
        </nav>

        {
          user && (
            <div
              className={
                clsx({
                  [classes.transparentMenuUserNameAndAvatarContainer]: contractible && !scrolled,
                  [classes.opaqueMenuUserNameAndAvatarContainer]: !(contractible && !scrolled),
                })
              }
            >
              {
                (contractible && !scrolled) &&
                <Link
                  className={classes.linkToProfile}
                  to='/profile'
                >
                  <span className={classes.userName}>
                    {userProfile.name}
                  </span>
                </Link>
              }

              <Link
                className={classes.linkToProfile}
                to='/profile'
              >
                <Avatar
                  alt="User's photo"
                  className={classes.userAvatar}
                  src={userProfile.avatar}
                >
                  {initials}
                </Avatar>
              </Link>
            </div>
          )
        }
      </header>

      {!!subTabs && (
        <div className={
          clsx(
            classes.subContainerWithoutScroll,
            {
              [classes.scrolled]: scrolled,
            })
        }
        >
          <div
            className={
              clsx(
                'tabs',
                {
                  [classes.subTabsAndExtraButton]: goBackLabel || (
                    activeTab && activeTab.label === 'Dashboard' &&
                  activeSubTab && activeSubTab.label === 'Overview'
                  ),
                  [classes.subTabs]: goBackLabel || (
                    activeTab && activeTab.label === 'Dashboard' &&
                  activeSubTab && activeSubTab.label === 'Overview'
                  ),
                })
            }
          >
            {/* Assistant icon (to be shown on the 'Overview' sub-tab of the 'Dashboard' tab) */}
            {
              activeTab && activeTab.label === 'Dashboard' &&
              activeSubTab && activeSubTab.label === 'Overview' &&
              (
                <div className={classes.assistantContainer}>
                  <div
                    className={
                      clsx({
                        [classes.regularAssistantButton]: contractible && !scrolled,
                        [classes.alternativeAssistantButton]: !(contractible && !scrolled),
                      })
                    }
                    onClick={
                      user?.role.name !== 'admin'
                        ? () => {
                          // If the user has scrolled, (...)
                          if (scrolled) {
                            // (...) scroll all the way to the top, (...)
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

                            // (...) and if notification cards are not being shown, display them.
                            if (!(notificationCards.showNonInstanceOwnerNotificationCards)) {
                              toggleNonInstanceOwnerNotificationCards()
                            }
                          } else {
                            /* If the user has NOT scrolled, then he's already at the top,
                            so we toggle notification cards as regular. */
                            toggleNonInstanceOwnerNotificationCards()
                          }
                        }

                        : () => {
                          // If the user has scrolled, (...)
                          if (scrolled) {
                            // (...) scroll all the way to the top, (...)
                            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

                            // (...) and if notification cards are not being shown, display them.
                            if (!(notificationCards.showInstanceOwnerNotificationCards)) {
                              toggleInstanceOwnerNotificationCards()
                            }
                          } else {
                            /* If the user has NOT scrolled, then he's already at the top,
                            so we toggle notification cards as regular. */
                            toggleInstanceOwnerNotificationCards()
                          }
                        }

                    }
                    role='button'
                  >
                    <RoomServiceRoundedIcon />
                  </div>

                  {
                    user?.role.name !== 'admin'
                      ? (
                        (amountOfNotifications && !notificationCards.showNonInstanceOwnerNotificationCards) &&
                        <div
                          className={
                            clsx({
                              [classes.regularAssistantAmountOfNotifications]: contractible && !scrolled,
                              [classes.alternativeAssistantAmountOfNotifications]: !(contractible && !scrolled),
                            })
                          }
                        >
                          <p>{amountOfNotifications}</p>
                        </div>
                      ) : (
                        (amountOfNotifications && !notificationCards.showInstanceOwnerNotificationCards) &&
                        <div
                          className={
                            clsx({
                              [classes.regularAssistantAmountOfNotifications]: contractible && !scrolled,
                              [classes.alternativeAssistantAmountOfNotifications]: !(contractible && !scrolled),
                            })
                          }
                        >
                          <p>{amountOfNotifications}</p>
                        </div>
                      )
                  }
                </div>
              )
            }

            {/* Navigation's 'back to (...)' button (if there is one to be shown on a particular sub-tab) */}
            {
              !!goBackLabel && (
                <div
                  className={classes.goBackButton}
                  onClick={handleGobackClick}
                  role='button'
                >
                  <SvgIcon name='chevron-left-circle' size={28} />
                  <span>{goBackLabel}</span>
                </div>
              )
            }

            <Tabs
              aria-label='Navigation sub-tabs'
              classes={{
                indicator: clsx({
                  [classes.transparentSubMenuActiveTabUnderLine]: contractible && !scrolled,
                  [classes.opaqueSubMenuActiveTabUnderLine]: !(contractible && !scrolled),
                }),
              }}
              value={(activeSubTab && activeSubTab.route) || false}
            >
              {subTabs.map((tab, idx) =>
                <Tab
                  className={
                    clsx(
                      classes.subTab,
                      {
                        [classes.activeTab]: tab.active,
                        [classes.logOutTab]: tab.isLogout,
                      })
                  }
                  component={Link}
                  disableRipple
                  key={`nav-sub-tab-${idx}`}
                  label={tab.isLogout ? <PowerSettingsNewRoundedIcon /> : tab.label}
                  onClick={tab.isLogout ? logout : () => null}
                  to={tab.route}
                  value={tab.route}
                />,
              )}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigation
