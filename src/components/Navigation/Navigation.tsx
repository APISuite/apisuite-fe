import React, { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useConfig, Tabs, Tab, Avatar } from "@apisuite/fe-base";
import AmpStoriesRoundedIcon from "@material-ui/icons/AmpStoriesRounded";
import PowerSettingsNewRoundedIcon from "@material-ui/icons/PowerSettingsNewRounded";
import RoomServiceRoundedIcon from "@material-ui/icons/RoomServiceRounded";

import { testIds } from "testIds";
import { ROLES } from "constants/global";
import { logout } from "store/auth/actions/logout";
import { toggleNotificationCard } from "store/notificationCards/actions/toggleNotificationCard";
import SvgIcon from "components/SvgIcon";
import Link from "components/Link";
import { linker } from "util/linker";
import { getSSOLoginURL } from "util/getSSOLoginURL";

import { useMenu } from "./useMenu";
import useStyles from "./styles";
import { navigationSelector } from "./selector";
import { NavigationProps } from "./types";
import { NavigationLeftActionTypes } from "./constants";

export const Navigation: React.FC<NavigationProps> = ({ contractible = false, className, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { portalName, ownerInfo, sso, providerSignupURL } = useConfig();
  const { user, userProfile, notificationCards } = useSelector(navigationSelector);
  const { topTabs, initTabs, loginTabs, goBack } = useMenu();
  const tabs = user ? loginTabs : initTabs;

  const { activeTab, subTabs, activeSubTab } = useMemo(() => {
    const activeTab = tabs.find((tab) => tab.active);
    const subTabs = activeTab ? activeTab.subTabs : [];
    const activeSubTab = subTabs?.find((tab) => tab.active);

    return { activeTab, subTabs, activeSubTab };
  }, [tabs]);

  // Expand functionality
  // Note: contractible prop was not changed to prevent breaking changes
  const [expand, setExpand] = useState(contractible);

  // sync expand with contractible
  useEffect(() => {
    setExpand(contractible);
  }, [contractible]);

  // sync notifications amount
  const [amountOfNotifications, setAmountOfNotifications] = useState(0);

  useEffect(() => {
    if (user?.role.name !== "admin") {
      if (amountOfNotifications !== notificationCards.instanceOwnerNotificationCardsData.length) {
        setAmountOfNotifications(notificationCards.instanceOwnerNotificationCardsData.length);
      }
    } else {
      if (amountOfNotifications !== notificationCards.nonInstanceOwnerNotificationCardsData.length) {
        setAmountOfNotifications(notificationCards.nonInstanceOwnerNotificationCardsData.length);
      }
    }
  }, [notificationCards, amountOfNotifications, user?.role.name]);

  // for go back label click
  const handleGoBackClick = useCallback(() => history.goBack(), [history]);

  const scrollHandler = useCallback(() => {
    const notScrolled = window.scrollY < 1;

    if (notScrolled !== expand) {
      // if not scrolled expand
      setExpand(notScrolled);
    }
  }, [expand]);

  useEffect(() => {
    // we only listen to scroll if contractible is enabled
    if (!contractible) {
      return;
    }

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [contractible, scrollHandler]);

  // toggle card
  function handleNotificationClick () {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch(toggleNotificationCard());
  }

  const handleSSOTabs = (route: string): { route: string; target: string } => {
    const res = {
      route,
      target: "_blank",
    };
    // FIXME: Use ENUM for string comparinsion
    if (sso.length && route === "/auth/signin") {
      res.route = getSSOLoginURL(sso);
      res.target = "_self";
    }
    if (sso.length && route === "/auth/signup") {
      res.route = linker(providerSignupURL);
    }

    return res;
  };

  // main tabs
  const tabsToRender = tabs.map((tab) => {
    // TODO: why is this rule here?
    if (tab.isProfileTab) return null;

    return (
      <Tab
        key={`nav-tab-${tab.label}`}
        className={clsx(classes.tab, {
          [classes.activeTab]: tab.active,
          // we contract the tabs to a smaller size when navigation is expanded
          contract: expand,
        })}
        label={tab.label}
        value={tab.route}
        to={tab.route}
        component={Link}
        disableRipple
      />
    );
  });

  return (
    <div
      {...rest}
      data-test-id={testIds.navigation}
      className={clsx(classes.root, className, { expand })}
    >
      <header className={clsx({ expand })}>
        <Link className={classes.logoLink} to={user?.role.name === ROLES.admin.value ? "/dashboard" : "/"}>
          {/* Portal logo image */}
          {ownerInfo.logo && <img className={classes.logoImage} src={ownerInfo.logo} />}
          {/* Portal logo fallback */}
          {!ownerInfo.logo && <AmpStoriesRoundedIcon className={classes.logo} />}

          <h3>{portalName}</h3>
        </Link>

        {/* A div that grows as much as it can - this ultimately aligns the tabs to the navigation far right */}
        <div className={classes.space} />

        <Tabs
          value={expand ? false : activeTab?.route || false}
          classes={{ indicator: classes.tabIndicator }}
        >
          {/* Only shows tabs on top if navigation not expanded */}
          {!expand && tabsToRender}

          {/* top tabs are only useful when the user does not exist */}
          {!user && topTabs.map((tab) => {
            const tabWithSSO = handleSSOTabs(tab.route);
            return (
              <Tab
                key={`nav-tab-${tab.label}`}
                // we contract the tabs to a smaller size when navigation is expanded
                className={clsx(classes.tab, { contract: expand })}
                externalTarget={tabWithSSO.target}
                label={tab.label}
                value={tabWithSSO.route}
                to={tabWithSSO.route}
                component={Link}
                disableRipple
              />
            );
          })}
        </Tabs>

        {/* Login info */}
        {user && (
          <Link
            className={classes.profileLink}
            to='/profile'
          >
            {/* Only show name if navigation expanded */}
            {expand && <span>{userProfile.name}</span>}

            <Avatar
              alt="User's photo"
              className={classes.userAvatar}
              src={userProfile.avatar}
            >
              {userProfile.name.charAt(0).toLocaleUpperCase()}
            </Avatar>
          </Link>
        )}
      </header>

      {/* show tabs on bottom if navigation expanded */}
      {expand && (
        <div className={classes.positionBottomTabs}>
          <Tabs
            value={activeTab?.route || false}
            classes={{ indicator: classes.positionBottomTabIndicator }}
          >
            {tabsToRender}
          </Tabs>
        </div>
      )}

      {/* Render sub tabs if any */}
      {!!subTabs?.length && (
        <nav className={clsx({ expand })}>
          {/* Navigation's 'back to (...)' button (if there is one to be shown on a particular sub-tab) */}
          {goBack?.type === NavigationLeftActionTypes.goBack && (
            <div
              className={classes.goBackButton}
              onClick={handleGoBackClick}
              role='button'
            >
              <SvgIcon name='chevron-left-circle' size={28} />
              <span>{goBack.label}</span>
            </div>
          )}

          {goBack?.type === NavigationLeftActionTypes.openCard && (
            <div
              className={clsx(classes.notification, { expand })}
              onClick={handleNotificationClick}
              role='button'
            >
              <RoomServiceRoundedIcon color='inherit' />
              <span className={clsx({ expand })}>{amountOfNotifications}</span>
            </div>
          )}

          {/* A div that grows as much as it can - this ultimately aligns the tabs to the navigation far right */}
          <div className={classes.space} />

          <Tabs
            value={activeSubTab?.route || false}
            classes={{ indicator: expand ? classes.subTabAlternativeIndicator : classes.subTabIndicator }}
          >
            {subTabs.map((tab) => (
              <Tab
                key={`nav-tab-${tab.label}`}
                className={clsx(classes.subTab, { [classes.activeTab]: tab.active, expand })}
                label={tab.isLogout ? <PowerSettingsNewRoundedIcon /> : tab.label}
                value={tab.route}
                component={tab.isLogout ? "div" : Link}
                onClick={tab.isLogout ? () => dispatch(logout({})) : undefined}
                to={tab.isLogout ? undefined : tab.route}
                disableRipple
              />
            ))}
          </Tabs>
        </nav>
      )}
    </div>
  );
};
