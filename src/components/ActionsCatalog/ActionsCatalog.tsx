import React from "react";
import Link from "components/Link";

import useStyles from "./styles";
import { ActionsCatalogProps, ActionDetails } from "./types";
import { Box, Typography, useTheme } from "@material-ui/core";

const ActionsCatalog: React.FC<ActionsCatalogProps> = ({
  actionsToDisplay,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();

  const generateActionsCatalogEntry = (actionDetails: ActionDetails, index: number) => {
    return (
      <div
        className={classes.actionsCatalogEntry}
        key={`actionsCatalogEntry${index}`}
      >
        <img
          className={actionDetails.actionLink === "" ? classes.disabledAction : ""}
          src={actionDetails.actionImage}
        />

        <Box color={palette.grey[700]} clone>
          <Typography variant="body1">
            {actionDetails.actionText}
          </Typography>
        </Box>
      </div>
    );
  };

  const actionsCatalogEntries = actionsToDisplay.map((actionDetails, index) => {
    if (actionDetails.actionLink) {
      return (
        <Link
          className={classes.actionsCatalogEntryLink}
          to={actionDetails.actionLink}
        >
          {generateActionsCatalogEntry(actionDetails, index)}
        </Link>
      );
    } else {
      return generateActionsCatalogEntry(actionDetails, index);
    }
  });

  return (
    <section className={classes.actionsCatalogContainer}>
      {actionsCatalogEntries}
    </section>
  );
};

export default ActionsCatalog;
