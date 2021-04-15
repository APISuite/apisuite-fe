import React from 'react'
import { useParams } from 'react-router'
import { useTranslation, CircularProgress } from '@apisuite/fe-base'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

import useStyles from './styles'
import { APIDetailParams, APIVersionProps } from './types'

const APIDetails: React.FC<APIVersionProps> = ({
  getApiVersion,
  apiDetails,
}) => {
  const classes = useStyles()
  const { apiId, versionId } = useParams<APIDetailParams>()
  const [t] = useTranslation()

  React.useEffect(() => {
    getApiVersion({
      apiId: apiId || '0',
      versionId: versionId || '0',
    })
  }, [getApiVersion, apiId, versionId])

  const hasSpec = (): boolean => {
    return !!(apiDetails && apiDetails.version && apiDetails.version.spec)
  }

  const getAccessStyle = (): string => {
    return apiDetails.version.live ? classes.live : classes.docs
  }

  const getBadgeStyle = (): string => {
    return !apiDetails.version.live ? classes.live : classes.docs
  }

  return (
    <div className={classes.root}>
      {
        !apiDetails.requested &&
        <div className={classes.centerVertical}>
          <CircularProgress />
        </div>
      }
      {
        apiDetails.requested &&
        <>
          {
            hasSpec() &&
            <>
              <div className={`${classes.header} ${getAccessStyle()}`}>
                <h3>{apiDetails.version.title}</h3>
                <span className={`${classes.badge} ${getBadgeStyle()}`}>{apiDetails.version.version}</span>
              </div>
              <div className={classes.swagger}>
                <SwaggerUI spec={apiDetails.version.spec || {}} />
              </div>
            </>
          }
          {
            !hasSpec() &&
            <>
              <div className={`${classes.header} ${classes.docs}`}>&nbsp;</div>
              <div className={classes.centerVertical}>
                <h2>{t('apidetails.notfound')}</h2>
              </div>
            </>
          }
        </>
      }
    </div>
  )
}

export default APIDetails
