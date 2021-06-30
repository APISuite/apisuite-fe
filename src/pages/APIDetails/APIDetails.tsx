import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation, CircularProgress, Typography } from "@apisuite/fe-base";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { APIDetailParams } from "store/apiDetails/types";
import { geAPIVersion } from "store/apiDetails/actions/getAPIVersion";
import { PageContainer } from "components/PageContainer";

import { apiDetailsSelector } from "./selector";
import useStyles from "./styles";

export const APIDetails: React.FC = () => {
  const classes = useStyles();
  const { apiId, versionId } = useParams<APIDetailParams>();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const apiDetails = useSelector(apiDetailsSelector);

  useEffect(() => {
    dispatch(geAPIVersion({
      params: {
        apiId: apiId || "0",
        versionId: versionId || "0",
      },
    }));
  }, [dispatch, apiId, versionId]);

  const hasSpec = (): boolean => {
    return !!(apiDetails && apiDetails.version && apiDetails.version.spec);
  };

  return (
    <PageContainer>
      {
        !apiDetails.requested &&
        <div className={classes.centerVertical}>
          <CircularProgress />
        </div>
      }
      {
        apiDetails.requested &&
        <>
          {hasSpec() && (
            <SwaggerUI spec={apiDetails.version.spec || {}} />
          )}

          {!hasSpec() && (
            <div className={classes.centerVertical}>
              <Typography variant="h2">{t("apidetails.notfound")}</Typography>
            </div>
          )}
        </>
      }
    </PageContainer>
  );
};
