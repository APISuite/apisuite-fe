import React from 'react'
import { CircularProgress } from '@apisuite/fe-base'

import useStyles from './styles'

const LoadingView: React.FC<{
  isLoading: boolean,
  isError: boolean,
  errorMessage: string,
}> = ({ isLoading, isError, errorMessage }) => {
  const classes = useStyles()

  return (
    <div className={classes.centerContent}>
      {isLoading && <CircularProgress size={50} className={classes.loading} />}
      {isError && <p>{errorMessage}</p>}
    </div>
  )
}
export default LoadingView
