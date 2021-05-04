import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@apisuite/fe-base";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import { notificationCardSelector } from "./selector";
import useStyles from "./styles";
import { NotificationCardProps } from "./types";
import { toggleNotificationCard } from "store/notificationCards/actions/toggleNotificationCard";

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notificationCardText,
  notificationCardTitle,
  notificationCardButtonAction,
  notificationCardButtonClassName,
  notificationCardButtonLabel,
  notificationCardButtonLink,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // Temporary until notification cards become clearer
  const notificationCards = useSelector(notificationCardSelector);

  const [showing, setShowing] = React.useState(notificationCards.show);

  useEffect(() => {
    setShowing(notificationCards.show);
  }, [notificationCards.show]);

  return (
    <section
      className={
        showing
          ? classes.showNotificationCardContentsContainer
          : classes.hideNotificationCardContentsContainer
      }
    >
      <div>
        <p className={classes.notificationCardTitle}>
          {notificationCardTitle}
        </p>

        {
          typeof notificationCardText === "string"
            ? (
              <p className={classes.notificationCardText}>
                {notificationCardText}
              </p>
            )
            : notificationCardText
        }
      </div>

      {
        notificationCardButtonClassName
          ? (
            <Button
              className={notificationCardButtonClassName}
              href={notificationCardButtonLink}
              onClick={notificationCardButtonAction}
            >
              {notificationCardButtonLabel}
            </Button>
          )
          : (
            <Button
              className={classes.notificationCardButton}
              fullWidth
              href={notificationCardButtonLink}
              onClick={notificationCardButtonAction}
            >
              {notificationCardButtonLabel}
            </Button>
          )
      }

      <CloseRoundedIcon
        className={classes.notificationCardCloseButton}
        onClick={() => dispatch(toggleNotificationCard())}
      />
    </section>
  );
};
