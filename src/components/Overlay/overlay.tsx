import React, { FC } from "react";
import {
  Box,
  Icon,
  Modal,
  Typography,
  useConfig,
} from "@apisuite/fe-base";
import clsx from "clsx";
import useStyles from "./styles";
import { OverlayProps } from "./types";
import { Logo } from "../Logo";

export const Overlay: FC<OverlayProps> = ({
  children,
  showLogo = true,
  noTopBg,
  title,
  onClose,
  open,
}) => {
  const classes = useStyles();

  const { navigation, ownerInfo } = useConfig();

  return (
    <Modal onClose={() => onClose()} open={open}>
      <Box className={classes.overlay} m={0} p={0}>
        <div
          className={clsx(classes.nav, {
            spaced: showLogo,
            transparent: noTopBg,
          })}
        >
          <div className={classes.logoContainer}>
            {showLogo && (
              <>
                <Box>
                  <Logo
                    icon={navigation.title.iconFallbackName}
                    src={ownerInfo.logo}
                  />
                </Box>
                <Typography display="block" variant="h3">
                  {title}
                </Typography>
              </>
            )}
          </div>
          <div className={classes.clickable} onClick={() => onClose()}>
            <Icon>close</Icon>
          </div>
        </div>
        <div className={classes.container}>{children}</div>
      </Box>
    </Modal>
  );
};
