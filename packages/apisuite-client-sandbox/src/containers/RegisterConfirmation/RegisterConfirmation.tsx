import * as React from 'react'
import { useTranslation } from 'react-i18next'
import useStyles from './styles'

const RegisterConfirmation: React.FC<{}> = () => {
  const [t] = useTranslation()
  const classes = useStyles()

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
