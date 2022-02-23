import React, { useEffect } from "react";
import { Box, useTranslation } from "@apisuite/fe-base";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SideNavForm } from "components/SideNavForm";
import {
  AccessDetails,
  ClientAccess,
  ConnectorSettings,
  CustomProperties,
  ExternalSettings,
  GeneralSettings,
  MediaFilesLinks,
} from "components/ApplicationsView";
import { isExtensionActive } from "util/extensions";
import { typesSelector } from "./selector";

import useStyles from "./styles";
import { AppTypes } from "./types";
import { LoadingView } from "components/InvitationForm/LoadingView";
import { getAppTypes } from "store/applications/actions/getAppTypes";

export const AppView: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { appId, typeId } = useParams<{ appId: string; typeId: string }>();
  const active = isExtensionActive("@apisuite/apisuite-marketplace-extension-ui");
  const { types } = useSelector(typesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!types || types.length === 0) {
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
  ];

  const MEDIA = {
    component: MediaFilesLinks,
    disabled: isNew,
    label: t("applications.tabs.media"),
    path: "/dashboard/apps/:appId/type/:typeId/media",
    route: `/dashboard/apps/${appId}/type/${typeId}/media`,
  };

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

  const BLUEPRINT = [
    {
      component: AccessDetails,
      disabled: isNew,
      label: t("applications.tabs.accessDetails"),
      path: "/dashboard/apps/:appId/type/:typeId/access",
      route: `/dashboard/apps/${appId}/type/${typeId}/access`,
    },
    {
      component: ConnectorSettings,
      disabled: isNew,
      label: t("applications.tabs.connectorSettings"),
      path: "/dashboard/apps/:appId/type/:typeId/connector",
      route: `/dashboard/apps/${appId}/type/${typeId}/connector`,
    },
  ];

  if (type && type.type) {
    const appType = type.type;

    if (appType === AppTypes.CLIENT || appType === AppTypes.EXTERNAL || appType === AppTypes.EXPERT) {
      ROUTES.push(MEDIA, CLIENT);
    }
    if (active && (appType === AppTypes.EXTERNAL || appType === AppTypes.EXPERT)) {
      ROUTES.push(EXTERNAL);
    }
    if (active && appType === AppTypes.EXPERT) {
      ROUTES.push(EXPERT);
    }
    if (appType === AppTypes.BLUEPRINT) {
      ROUTES.push(...BLUEPRINT);
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
