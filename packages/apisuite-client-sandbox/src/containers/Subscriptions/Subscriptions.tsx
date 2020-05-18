import * as React from 'react'
import useStyles from './styles'
import SubscriptionsTable from 'components/SubscriptionsTable'
import { useTranslation } from 'react-i18next'
import { config } from 'constants/global'

const Subscriptions: React.FC<{}> = () => {
  const classes = useStyles()
  const [t] = useTranslation()

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('subscriptions.title')}</h1>

        <p className={classes.description}>
          {t('subscriptions.description', { config })}
        </p>

        <div className={classes.subscriptionsContainer}>
          <SubscriptionsTable />
        </div>

      </section>
    </div>
  )
}

export default Subscriptions
