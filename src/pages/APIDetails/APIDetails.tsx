import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useTranslation, CircularProgress } from "@apisuite/fe-base";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

import { apiDetailsSelector } from "./selector";
import useStyles from "./styles";
import { APIDetailParams } from "store/apiDetails/types";
import { geAPIVersion } from "store/apiDetails/actions/getAPIVersion";

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

  const getAccessStyle = (): string => {
    return apiDetails.version.live ? classes.live : classes.docs;
  };

  const getBadgeStyle = (): string => {
    return !apiDetails.version.live ? classes.live : classes.docs;
  };

  return (
    <div className={classes.root}>
      {
        !apiDetails.requested &&
        <div className={classes.centerVertical}>
          <CircularProgress />
        </div>
      }
      {
        apiDetails.requested &&
        <>
          {
            hasSpec() &&
            <>
              <div className={`${classes.header} ${getAccessStyle()}`}>
                <h3>{apiDetails.version.title}</h3>
                <span className={`${classes.badge} ${getBadgeStyle()}`}>{apiDetails.version.version}</span>
              </div>
              <div className={classes.swagger}>
                <SwaggerUI spec={apiDetails.version.spec || {}} />
              </div>
            </>
          }
          {
            !hasSpec() &&
            <>
              <div className={`${classes.header} ${classes.docs}`}>&nbsp;</div>
              <div className={classes.centerVertical}>
                <h2>{t("apidetails.notfound")}</h2>
              </div>
            </>
          }
        </>
      }
    </div>
  );
};
