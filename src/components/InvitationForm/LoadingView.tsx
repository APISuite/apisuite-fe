import React from "react";
import { CircularProgress } from "@apisuite/fe-base";

import useStyles from "./styles";

export const LoadingView: React.FC<{
  errorMessage: string,
  isError: boolean,
  isLoading: boolean,
}> = ({ errorMessage, isError, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.centerContent}>
      {isLoading && <CircularProgress size={50} className={classes.loading} />}

      {isError && <p>{errorMessage}</p>}
    </div>
  );
};
