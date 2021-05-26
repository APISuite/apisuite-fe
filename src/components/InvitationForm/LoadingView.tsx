import React, { ReactNode } from "react";
import { CircularProgress } from "@apisuite/fe-base";

import useStyles from "./styles";

export const LoadingView: React.FC<{
  children?: ReactNode,
  errorMessage?: string,
  isError: boolean,
  isLoading: boolean,
}> = ({ children, errorMessage, isError, isLoading }) => {
  const classes = useStyles();

  return (
    <div className={classes.centerContent}>
      {isLoading && <CircularProgress size={50} className={classes.loading} />}

      {(isError && errorMessage) && <p>{errorMessage}</p>}
      {isError && children}
    </div>
  );
};
