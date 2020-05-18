import * as React from 'react'
import useStyles from './styles'
import clsx from 'clsx'

import { PanelProps } from './types'

const Panel: React.FC<PanelProps> = ({ className, children, title, subtitle }) => {
  const classes = useStyles()

  return (
    <section className={clsx(classes.card, className)}>
      <div className={classes.cardShadow} />
      <div className={classes.cardShadowSide} />
      {(title || subtitle) &&
        <div className={classes.cardContent}>
          <h1 className={classes.featuresTitle}>{title}</h1>
          <p className={classes.featuresDesc}>{subtitle}</p>
        </div>}

      {children}
    </section>
  )
}

export default Panel
