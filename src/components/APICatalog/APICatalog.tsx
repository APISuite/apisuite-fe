import React from "react";

import Link from "components/Link";

import { Avatar } from "@apisuite/fe-base";

import useStyles from "./styles";

import { APICatalogProps, APIDetails } from "./types";

const APICatalog: React.FC<APICatalogProps> = ({
  apisToDisplay,
}) => {
  const classes = useStyles();

  const generateAPICatalogEntry = (apiDetails: APIDetails, index: number) => {
    const apiSplitName = apiDetails.apiName.split(" ");
    const apiInitials = apiSplitName[0].slice(0, 2);

    return (
      <div
        className={classes.apiCatalogEntry}
        key={`apiCatalogEntry${index}`}
      >
        <div className={classes.apiCatalogEntryAvatar}>
          <Avatar
            className={apiDetails.apiAccess
              ? classes.colorsOfProductionAPI
              : classes.colorsOfAPIDocumentation}
          >
            {apiInitials}
          </Avatar>
        </div>

        <div className={classes.apiCatalogEntryText}>
          <p className={classes.apiCatalogEntryName}>{apiDetails.apiName}</p>

          <p className={classes.apiCatalogEntryVersionAndAccess}>
            <span
              className={
                `
${classes.apiCatalogEntryVersion}
${apiDetails.apiAccess
        ? classes.colorsOfProductionAPI
        : classes.colorsOfAPIDocumentation
      }
`
              }
            >
              {`v${apiDetails.apiVersion}`}
            </span>
            <>{apiDetails.apiAccess ? "Production access" : "API Documentation"}</>
          </p>

          <p className={classes.apiCatalogEntryDescription}>
            {apiDetails.apiDescription}
          </p>
        </div>
      </div>
    );
  };

  const apiCatalogEntries = apisToDisplay.map((apiDetails, index) => {
    if (!apiDetails) return <div key={`apiCatalogEntry${index}`} />;
    if (apiDetails.hasMoreDetails) {
      return (
        <Link
          className={classes.apiCatalogEntryLink}
          to={`/api-products/details/${apiDetails.id}/spec/${apiDetails.apiRoutingId}`}
        >
          {generateAPICatalogEntry(apiDetails, index)}
        </Link>
      );
    } else {
      return generateAPICatalogEntry(apiDetails, index);
    }
  });

  return <>{apiCatalogEntries}</>;
};

export default APICatalog;
