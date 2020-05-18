import * as React from 'react'
import useStyles from './styles'
import clsx from 'clsx'

import { PanelProps } from './types'

const Panel: React.FC<PanelProps> = ({ className, children }) => {
  const classes = useStyles()

  return (
    <section className={clsx(classes.card, className)}>
      <div className={classes.cardShadow} />
      <div className={classes.cardShadowSide} />
    
      {children}
    </section>
  )
}

export default Panel
