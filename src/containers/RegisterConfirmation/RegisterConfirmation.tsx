import React from 'react'
import { useTranslation } from '@apisuite/fe-base'
import useStyles from './styles'
import { RegisterConfirmationProps } from './types'

const RegisterConfirmation: React.FC<RegisterConfirmationProps> = ({
  nextStep,
}) => {
  const [t] = useTranslation()
  const classes = useStyles()

  /* Once this component renders (which means that we've reached the end of
  our registration process), we dispatch a 'NEXT_STEP' type of action so as to
  reset the 'steps' property of our app's store back to 1. */
  React.useEffect(() => {
    nextStep({})
  }, [nextStep])

  return (
    <main className={classes.main}>
      <section className={classes.messageSide}>
        <section className={classes.messageContainer}>
          <h1 className={classes.messageTitle}>{t('registerConfirmation.messageTitle')}</h1>
          <p className={classes.message}>{t('registerConfirmation.message')}</p>
        </section>
      </section>

      <aside className={classes.imageSide} />
    </main>
  )
}

export default RegisterConfirmation
