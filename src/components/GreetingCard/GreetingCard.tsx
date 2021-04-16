import React from 'react'
import { Button } from '@apisuite/fe-base'

import useStyles from './styles'
import { GreetingCardProps } from './types'

const GreetingCard: React.FC<GreetingCardProps> = ({
  greetingCardText,
  greetingCardButtonAction,
  greetingCardButtonClassName,
  greetingCardButtonLabel,
  greetingCardButtonLink,
}) => {
  const classes = useStyles()

  return (
    <section className={classes.greetingCardContentsContainer}>
      {
        typeof greetingCardText === 'string'
          ? (
            <p className={classes.greetingCardText}>
              {greetingCardText}
            </p>
          )
          : greetingCardText
      }

      {
        greetingCardButtonClassName
          ? (
            <Button
              className={greetingCardButtonClassName}
              href={greetingCardButtonLink}
              onClick={greetingCardButtonAction}
            >
              {greetingCardButtonLabel}
            </Button>
          )
          : (
            <Button
              className={classes.greetingCardButton}
              fullWidth
              href={greetingCardButtonLink}
              onClick={greetingCardButtonAction}
            >
              {greetingCardButtonLabel}
            </Button>
          )
      }
    </section>
  )
}

export default GreetingCard
