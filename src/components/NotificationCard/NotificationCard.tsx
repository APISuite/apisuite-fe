import React from 'react'
import { Button } from '@apisuite/fe-base'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import useStyles from './styles'
import { NotificationCardProps } from './types'

const NotificationCard: React.FC<NotificationCardProps> = ({
  // Temporary until notification cards become clearer
  notificationCards,
  notificationCardText,
  notificationCardTitle,
  notificationCardButtonAction,
  notificationCardButtonClassName,
  notificationCardButtonLabel,
  notificationCardButtonLink,
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards,
  toggleNonInstanceOwnerNotificationCards,
  typeOfUser,
}) => {
  const classes = useStyles()

  const [showing, setShowing] = React.useState(
    typeOfUser !== 'admin'
      ? notificationCards.showNonInstanceOwnerNotificationCards
      : notificationCards.showInstanceOwnerNotificationCards,
  )

  React.useEffect(() => {
    if (typeOfUser !== 'admin') {
      if (showing !== notificationCards.showNonInstanceOwnerNotificationCards) {
        setShowing(notificationCards.showNonInstanceOwnerNotificationCards)
      }
    } else {
      if (showing !== notificationCards.showInstanceOwnerNotificationCards) {
        setShowing(notificationCards.showInstanceOwnerNotificationCards)
      }
    }
  }, [notificationCards])

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
          typeof notificationCardText === 'string'
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
        onClick={
          typeOfUser !== 'admin'
            ? toggleNonInstanceOwnerNotificationCards
            : toggleInstanceOwnerNotificationCards
        }
      />
    </section>
  )
}

export default NotificationCard
