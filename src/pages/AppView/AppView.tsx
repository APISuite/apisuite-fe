import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, useTranslation } from "@apisuite/fe-base";

import {
  ConnectorInput,
  ClientAccess,
  ConnectorOutput,
  ConnectorSettings,
  CustomProperties,
  ExternalSettings,
  GeneralSettings,
  MediaFilesLinks,
} from "components/ApplicationsView";
import { LoadingView } from "components/InvitationForm/LoadingView";
import { SideNavForm } from "components/SideNavForm";
import { AppTypes } from "./types";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { isExtensionActive } from "util/extensions";
import { typesSelector } from "./selector";
import useStyles from "./styles";

export const AppView: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const active = isExtensionActive("@apisuite/apisuite-marketplace-extension-ui");

  const { types, isValid } = useSelector(typesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!types || types.length === 0) {
      dispatch(getAppTypes({}));
    }
  }, [dispatch, types]);

  const isNew = Number.isNaN(Number(appId));
  const type = types.find((tp) => tp.id === Number(typeId));
  const ROUTES = [
    {
      component: GeneralSettings,
      label: t("applications.tabs.general"),
      path: "/dashboard/apps/:appId/type/:typeId/general",
      route: `/dashboard/apps/${appId}/type/${typeId}/general`,
    },
    {
      component: MediaFilesLinks,
      disabled: isNew,
      label: t("applications.tabs.media"),
      path: "/dashboard/apps/:appId/type/:typeId/media",
      route: `/dashboard/apps/${appId}/type/${typeId}/media`,
    },
  ];

  const CLIENT = {
    component: ClientAccess,
    disabled: isNew,
    label: t("applications.tabs.client"),
    path: "/dashboard/apps/:appId/type/:typeId/client",
    route: `/dashboard/apps/${appId}/type/${typeId}/client`,
  };

  const EXTERNAL = {
    component: ExternalSettings,
    disabled: isNew,
    label: t("applications.tabs.external"),
    path: "/dashboard/apps/:appId/type/:typeId/external",
    route: `/dashboard/apps/${appId}/type/${typeId}/external`,
  };

  const EXPERT = {
    component: CustomProperties,
    disabled: isNew,
    label: t("applications.tabs.expert"),
    path: "/dashboard/apps/:appId/type/:typeId/expert",
    route: `/dashboard/apps/${appId}/type/${typeId}/expert`,
  };

  const CONNECTOR_INPUT = {
    component: ConnectorInput,
    disabled: isNew,
    label: t("applications.tabs.connectorInput"),
    path: "/dashboard/apps/:appId/type/:typeId/connector_input",
    route: `/dashboard/apps/${appId}/type/${typeId}/connector_input`,
  };
  const CONNECTOR_OUTPUT = {
    component: ConnectorOutput,
    disabled: isNew || !isValid,
    label: t("applications.tabs.connectorOutput"),
    path: "/dashboard/apps/:appId/type/:typeId/connector_output",
    route: `/dashboard/apps/${appId}/type/${typeId}/connector_output`,
  };
  const CONNECTOR_SETTINGS = {
    component: ConnectorSettings,
    disabled: isNew || !isValid,
    label: t("applications.tabs.connectorSettings"),
    path: "/dashboard/apps/:appId/type/:typeId/connector_settings",
    route: `/dashboard/apps/${appId}/type/${typeId}/connector_settings`,
  };

  if (type && type.type) {
    const appType = type.type;

    if (appType === AppTypes.CLIENT || appType === AppTypes.EXTERNAL || appType === AppTypes.EXPERT) {
      ROUTES.push(CLIENT);
    }
    if (active && (appType === AppTypes.EXTERNAL || appType === AppTypes.EXPERT)) {
      ROUTES.push(EXTERNAL);
    }
    if (active && appType === AppTypes.EXPERT) {
      ROUTES.push(EXPERT);
    }
    if (appType === AppTypes.BLUEPRINT || appType === AppTypes.CONNECTOR) {
      ROUTES.push(CONNECTOR_INPUT);
      ROUTES.push(CONNECTOR_OUTPUT);
      ROUTES.push(CONNECTOR_SETTINGS);
    }
  }

  if (!types) {
    return <LoadingView
      isLoading={true}
      isError={false}
    />;
  }

  return (
    <Box className={classes.root} pt={30} pb={7.5}>
      <SideNavForm entries={[
        ...ROUTES,
      ]} />
    </Box>
  );
};
