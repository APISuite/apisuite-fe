import React from "react";
import clsx from "clsx";
import { LayoutProps } from "./types";
import { Navigation } from "components/Navigation";
import Footer from "components/Footer";
import useStyles from "./styles";

const MainLayout: React.FC<LayoutProps> = ({
  children,
  contractibleMenu = false,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navigation
        key='app-navigation'
        contractible={contractibleMenu}
      />
      <div
        className={clsx(
          classes.container,
          { [classes.contractible]: contractibleMenu },
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
