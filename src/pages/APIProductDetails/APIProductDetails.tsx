import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import { APIFeatures } from "components/APIFeatures";
import { APIHighlightsCarousel } from "components/APIHighlightsCarousel";
import { APIProductBanner } from "components/APIProductBanner";
import { APIPublications } from "components/APIPublications";
import { APIUses } from "components/APIUses";
import { SubbedAppsBlock } from "components/SubbedAppsBlock";
import { Api, APIVersion } from "store/subscriptions/types";
import { APIDetailParams } from "store/apiDetails/types";
import { getAllUserApps } from "store/applications/actions/getAllUserApps";
import { getAPIs } from "store/subscriptions/actions/getAPIs";
import { getAPIVersion } from "store/apiDetails/actions/getAPIVersion";
import { apiDetailsSelector } from "./selector";
import { CurrentAPIDetails } from "./types";

export const APIProductDetails: React.FC = () => {
  const { palette } = useTheme();

  const [t] = useTranslation();

  const dispatch = useDispatch();
  const {
    allUserApps,
    apiDetails,
    error,
    orgDetails,
    requested,
    subscriptions,
    userDetails,
  } = useSelector(apiDetailsSelector);

  /* Retrieval of API Product details */

  const { apiId, versionId } = useParams<APIDetailParams>();

  useEffect(() => {
    dispatch(getAPIs({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getAPIVersion({
        params: {
          apiId: apiId || "0",
          versionId: versionId || "0",
        },
      })
    );
  }, [apiId, dispatch, versionId]);

  useEffect(() => {
    dispatch(getAllUserApps({ orgID: orgDetails.id }));
  }, [dispatch, orgDetails]);

  const [currentAPIDetails, setCurrentAPIDetails] = useState<CurrentAPIDetails>({
    appsSubbed: [],
    documentation: null,
    id: 0,
    name: "",
    otherVersions: [],
    version: null,
  });

  useEffect(() => {
    if (subscriptions.apis.length) {
      let currentAPI: Api | null = null;
      let name = "";
      let otherAPIVersions: APIVersion[] = [];

      subscriptions.apis.forEach((api) => {
        if (api.id === apiDetails.version.apiId) {
          currentAPI = api;

          otherAPIVersions = api.apiVersions.filter((apiVersion) => {
            return apiVersion.id !== apiDetails.version.id;
          });
        }

        /* If an API Product has no versions, 'currentAPI' might never be set.
        This, in turn, might cause our 'API Product Details' view to NOT display
        the API Product's title. The following ensures that this does not happen. */
        if (apiId && parseInt(apiId) === api.id) {
          name = api.name;
        }
      });

      const appsSubbedToAPI = allUserApps.filter((app) => {
        return app.subscriptions.includes(apiDetails.version.apiId);
      });

      setCurrentAPIDetails({
        appsSubbed: appsSubbedToAPI,
        documentation: currentAPI && currentAPI["docs"] ? currentAPI["docs"][0] : null,
        id: currentAPI ? currentAPI["id"] : 0,
        name: currentAPI ? currentAPI["name"] : name,
        otherVersions: otherAPIVersions,
        version: apiDetails.version,
      });
    }
  }, [apiDetails, allUserApps, subscriptions]);

  // TODO: Temporary placeholders until API is reworked to support carousel highlight cards.
  const highlightsContent = [
    {
      title: "Highlight title A",
      description: "API Product highlight card, composed by a title, description, and optional image.",
    },
    {
      title: "Highlight title B",
      description: "API Product highlight card, composed by a title, description, and optional image.",
    },
    {
      title: "Highlight title C",
      description: "API Product highlight card, composed by a title, description, and optional image.",
    },
  ];

  // TODO: Temporary placeholders until API is reworked to support 'API Uses' cards.
  const apiUsesContent = [
    {
      title: "Give insights",
      description: "We want to help you to create value-added services and applications. Therefore we give our customers the possibility to give access to their account information if so desired. Combining this data with other valuable data sources puts you in a unique position to give meaningful financial insights to our customers.",
    },
    {
      title: "Advise",
      description: "Giving our customers the possibility to give access to their account information will allow you to go beyond mere insights and give added value advice around spending and earnings decisions in accordance with our customers’ lifestyles.",
    },
    {
      title: "Do something else entirely",
      description: "A human being is a part of the whole that we call 'Universe', a part limited in time and space. He experiences himself, his thoughts and feeling as something separated from the rest, a kind of optical delusion of his consciousness. This delusion is a kind of prison for us, restricting us to our personal desires and to affection for a few persons nearest to us. Our task must be to free ourselves from this prison by widening our circle of compassion to embrace all living creatures and the whole of nature in its beauty.",
    },
  ];  
  
  // TODO: Temporary placeholders until API is reworked to support 'API Feature' cards.
  const apiFeaturesContent = [
    {
      title: "API Feature A",
      description: "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing.",
    },
    {
      title: "API Feature B",
      description: "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing.",
    },
    {
      title: "API Feature C",
      description: "This feature allows you to do X, Y, and Z. By doing X, Y, and Z, you'll be able to show your customers that this API product is amazing.",
    },
  ];
  
  if (!requested) {
    return (
      <Box mt={-6.25} style={{ left: "50%", position: "absolute", top: "50%" }}>
        <CircularProgress color="primary" style={{ height: 50, width: 50 }} />
      </Box>
    );
  }

  if (requested && error) {
    return (
      <Box mt={-6.25} style={{ position: "absolute", textAlign: "center", top: "50%", width: "100%" }}>
        <Typography display="block" style={{ color: palette.text.primary, fontWeight: 300 }} variant="h3">
          {t("apiProductDetails.noAPIProductOrDetailsError")}
        </Typography>
      </Box>
    );
  }

  return (
    <Box style={{ backgroundColor: palette.background.default }}>
      <APIProductBanner currentAPIDetails={currentAPIDetails} />

      <SubbedAppsBlock currentAPIDetails={currentAPIDetails} userDetails={userDetails} />

      <APIPublications currentAPIDetails={currentAPIDetails} />

      <APIHighlightsCarousel highlightsContent={highlightsContent} />

      <APIUses apiUsesContent={apiUsesContent} />

      <APIFeatures apiFeaturesContent={apiFeaturesContent} />
    </Box >
  );
};
