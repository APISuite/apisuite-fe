import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchPath } from "react-router";
import { Avatar, Box, Grid, Icon, TabConfig, Typography, useConfig, useTheme, useTranslation } from "@apisuite/fe-base";

import { testIds } from "testIds";
import { ROLES } from "constants/global";
import { logout } from "store/auth/actions/logout";
import Link from "components/Link";
import { Logo } from "components/Logo";

import { navigationSelector } from "./selector";
import { NavigationProps } from "./types";

export const Navigation: React.FC<NavigationProps> = ({ contractible = false, className, ...rest }) => {
  const dispatch = useDispatch();
  const { palette, zIndex, spacing } = useTheme();
  const { navigation, portalName, ownerInfo } = useConfig();
  const { t } = useTranslation();
  const { user, currentOrg } = useSelector(navigationSelector);
  // FIXME: checking the id because profile is never undefined
  const role = currentOrg?.role?.id ? currentOrg.role.name : user.id ? ROLES.baseUser.value : "anonymous";

  const [isMaxWidth, setIsMaxWidth] = useState(window.innerWidth <= 1024);

  const resizeHandler = useCallback(() => {
    setIsMaxWidth(window.innerWidth <= 1024);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [setIsMaxWidth, resizeHandler]);

  // Expand functionality
  // Note: contractible prop was not changed to prevent breaking changes
  const [expand, setExpand] = useState(contractible);

  // sync expand with contractible
  useEffect(() => {
    setExpand(contractible);
  }, [contractible]);

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

  const actions = {
    $logout: () => dispatch(logout({})),
  };

  function renderTab({ label, action }: TabConfig, { adjustTop = false, subTab = false, exact = false } = {}) {
    let LabelComponent;
    const key = `nav-tab-${label.key}${label.type}${label.fallback}${label.iconName}`;
    let active = !!matchPath(location.pathname, { path: action, exact });
    const pathLvls = location.pathname.split("/").filter(p => !!p);
    const actionLvls = action.split("/").filter(a => !!a);
    const actionLvl2 = actionLvls.slice(1);
    // check action value only the from second level forward
    if (subTab && !active && actionLvl2.length && pathLvls[0] === actionLvls[0]) {
      active = actionLvl2.every(lvl => pathLvls.includes(lvl));
    }

    if (label.type === "avatar") {
      LabelComponent = (
        <Box display="flex" flexDirection="row" alignItems="center">
          {/* Only show name if navigation expanded */}
          {expand && <Typography variant="subtitle1">{user?.name}</Typography>}
          {expand && <Box width={spacing(1.5)} />}

          <Avatar
            alt="User's photo"
            src={user?.avatar}
          >
            {user?.name.charAt(0).toLocaleUpperCase()}
          </Avatar>
        </Box>
      );
    }

    if (label.type === "text") {
      const isEmpty = !label.fallback?.length;

      // TODO: we force inactive sub tab on empty fallbacks so we have a way to show back actions without any
      // relevant match in current navigation. Maybe review this in the future.
      if (isEmpty) {
        active = false;
      }

      LabelComponent = (
        <Typography variant={subTab ? "subtitle1" : "h6"} style={active ? { fontWeight: 700 } : undefined}>
          {/* This empty char will allow the this typography to grow naturally as if it has text */}
          {isEmpty && <>&zwnj;</>}
          {!isEmpty && t([label.key || "", label.fallback || ""])}
        </Typography>
      );
    }

    if (label.type === "icon") {
      LabelComponent = (
        <Icon>{label.iconName}</Icon>
      );
    }

    return (
      <Box
        data-test-id={testIds.navigationTab}
        key={key}
        position="relative"
        display="flex"
        alignItems="center"
        pl={2}
        pr={label.type === "icon" ? 3 : 2}
        py={subTab || expand ? 2 : 6}
        style={adjustTop ? { transform: "translateY(-2px)" } : undefined}
        color={!expand && subTab ? palette.text.primary : palette.secondary.contrastText}
      >
        {/* routing actions - starts with `/` or `http` */}
        {/^(\/|http)/.test(action) && (
          <Link to={action} style={{ textDecoration: "none" }}>
            {LabelComponent}
          </Link>
        )}

        {/* hook actions - first condition is to be taken as explicit */}
        {action.startsWith("$") && actions.hasOwnProperty(action) && (
          <Box
            display="flex"
            alignItems="center"
            onClick={actions[action as never]}
            style={{ cursor: "pointer" }}
          >
            {LabelComponent}
          </Box>
        )}

        <Box
          position="absolute"
          top={subTab ? undefined : 0}
          bottom={subTab ? 0 : undefined}
          left={0}
          width="100%"
          height={3}
          style={{ background: active ? palette.primary.main : "transparent" }}
        />
      </Box>
    );
  }

  const subTabs = navigation[role].tabs.find((tab) => matchPath(location.pathname, tab.action))?.subTabs;
  const backAction = subTabs?.find(
    (tab) => matchPath(location.pathname, { path: tab.action, exact: true })
  )?.backAction;

  return (
    <Grid
      data-test-id={testIds.navigation}
      {...rest}
      component={Box}
      container
      direction="column"
      justifyContent="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      zIndex={zIndex.appBar}
      style={{ background: expand ? "transparent" : palette.secondary.main }}
    >
      {/* Top nav */}
      <Box
        borderBottom={expand ? `1px solid ${palette.primary.light}` : undefined}
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        pt={expand ? 2 : undefined}
        style={{
          marginLeft: !isMaxWidth ? spacing(6) : spacing(4),
          marginRight: !isMaxWidth ? spacing(6) : spacing(4),
        }}
      >
        {/* Logo & Title */}
        <Box
          clone
          display="flex"
          alignItems="center"
          style={{ textDecoration: "none" }}
        >
          <Link data-test-id={testIds.navigationLogoAndTitle} to={navigation.title.route}>
            {/* Portal logo image */}
            <Logo
              src={ownerInfo.logo}
              icon={navigation.title.iconFallbackName}
              expand={expand}
            />

            <Box data-test-id={testIds.navigationTitle} mx={2} clone color={palette.secondary.contrastText}>
              <Typography variant="h3">
                {portalName}
              </Typography>
            </Box>
          </Link>
        </Box>


        {/* Top & Fixed Tabs */}
        <Grid
          data-test-id={testIds.navigationTopFixedTabs}
          container
          xs
          direction="row"
          justify="flex-end"
        >
          {navigation[role].tabs.map((tab) => {
            if (expand && !tab.fixed) return null;

            return renderTab(tab);
          })}
        </Grid>
      </Box>

      {/* Top not Fixed tabs */}
      {expand && (
        <Box
          data-test-id={testIds.navigationTopNotFixedTabs}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          flexWrap="nowrap"
          mx={6}
        >
          {navigation[role].tabs.map((tab) => {
            if (tab.fixed) return null;

            return renderTab(tab, { adjustTop: true });
          })}
        </Box>
      )}

      {/* Bottom nav */}
      {/* At least one tab must match the path for it to appear */}
      {subTabs?.find((tab) => matchPath(location.pathname, { path: tab.action, exact: false })) && (
        <Box
          data-test-id={testIds.navigationSubNav}
          display="flex"
          flexDirection="row"
          justifyContent="flex-end"
          flexWrap="nowrap"
          px={6}
          style={{ background: expand ? "transparent" : palette.grey[100] }}
        >
          {/* Back left action */}
          {backAction && (
            <>
              <Box
                clone
                display="flex"
                flexDirection="row"
                alignItems="center"
                flexWrap="nowrap"
                px={2}
                style={{ textDecoration: "none" }}
              >
                <Link to={backAction.route}>
                  {backAction.iconName && (
                    <Icon>{backAction.iconName}</Icon>
                  )}

                  <Typography variant="subtitle1">
                    {t([backAction.key || "", backAction.fallback || ""])}
                  </Typography>
                </Link>
              </Box>

              <Box flex={1} />
            </>
          )}

          {/* Sub tabs */}
          {subTabs.map((tab) => renderTab(tab, { subTab: true, exact: true }))}
        </Box>
      )}
    </Grid>
  );
};
