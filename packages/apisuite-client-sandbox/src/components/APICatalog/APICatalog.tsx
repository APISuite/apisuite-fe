import * as React from 'react'

import Link from 'components/Link'

import Avatar from '@material-ui/core/Avatar'

import useStyles from './styles'

import { APICatalogProps, APIDetails } from './types'

const APICatalog: React.FC<APICatalogProps> = ({
  recentlyAddedAPIs,
}) => {
  const classes = useStyles()

  const generateAPICatalogEntry = (apiDetails: APIDetails, index: number) => {
    const apiSplitName = apiDetails.apiName.split(' ')
    const apiInitials = apiSplitName.length >= 2
      ? `${apiSplitName[0].charAt(0)}${apiSplitName[1].charAt(0)}` : apiSplitName[0].slice(0, 2)

    return (
      <div
        className={classes.apiCatalogEntry}
        key={`apiCatalogEntry${index}`}
      >
        <div className={classes.apiCatalogEntryAvatar}>
          <Avatar
            className={apiDetails.apiAccess
              ? classes.colorsOfProductionAPI
              : classes.colorsOfAPIDocumentation}
          >
            {apiInitials.toUpperCase()}
          </Avatar>
        </div>

        <div className={classes.apiCatalogEntryText}>
          <p className={classes.apiCatalogEntryName}>{apiDetails.apiName}</p>

          <p className={classes.apiCatalogEntryVersionAndAccess}>
            <span
              className={
                `
${classes.apiCatalogEntryVersion}
${apiDetails.apiAccess
        ? classes.colorsOfProductionAPI
        : classes.colorsOfAPIDocumentation
      }
`
              }
            >
              {apiDetails.apiVersion}
            </span>
            <>{apiDetails.apiAccess ? 'Production access' : 'API Documentation'}</>
          </p>

          <p className={classes.apiCatalogEntryDescription}>
            {apiDetails.apiDescription}
          </p>
        </div>
      </div>
    )
  }

  const apiCatalogEntries = recentlyAddedAPIs.map((apiDetails, index) => {
    if (apiDetails.hasMoreDetails) {
      return (
        <Link
          className={classes.apiCatalogEntryLink}
          to={`/api-products/details/${apiDetails.id}/spec/${apiDetails.apiRoutingId}`}
        >
          {generateAPICatalogEntry(apiDetails, index)}
        </Link>
      )
    } else {
      return generateAPICatalogEntry(apiDetails, index)
    }
  })

  return <>{apiCatalogEntries}</>
}

export default APICatalog
