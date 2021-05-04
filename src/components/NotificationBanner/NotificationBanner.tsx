import React from "react";

import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import useStyles from "./styles";

import { NotificationBannerProps } from "./types";

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  customNotificationBannerContents,
  notificationBannerText,
  notificationBannerTitle,
  showNotificationBanner,
}) => {
  const classes = useStyles();

  const [showing, setShowing] = React.useState(showNotificationBanner || false);

  const handleClose = () => {
    setShowing(false);
  };

  return (
    showing
      ? (
        <section className={classes.notificationBannerContentsContainer}>
          <div className={classes.notificationBannerTextContainer}>
            <h2 className={classes.notificationBannerHeader}>
              {notificationBannerTitle}
            </h2>

            {
              customNotificationBannerContents || (
                <p className={classes.notificationBannerParagraph}>
                  {notificationBannerText}
                </p>
              )
            }
          </div>

          <div>
            <CloseRoundedIcon
              className={classes.notificationBannerCloseButton}
              onClick={handleClose}
            />
          </div>
        </section>
      )
      : null
  );
};

export default NotificationBanner;
