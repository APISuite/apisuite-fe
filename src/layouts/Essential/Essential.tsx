import React from "react";
import { LayoutProps } from "./types";
import useStyles from "./styles";

const EssentialLayout: React.FC<LayoutProps> = ({
  // title,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {children}
    </div>
  );
};

export default EssentialLayout;
