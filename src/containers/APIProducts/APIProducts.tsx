import React from 'react'
import { useTranslation, Button, InputBase } from '@apisuite/fe-base'

import APICatalog from 'components/APICatalog'
import SubscriptionsModal from 'components/SubscriptionsModal'

import ChromeReaderModeRoundedIcon from '@material-ui/icons/ChromeReaderModeRounded'
import PowerRoundedIcon from '@material-ui/icons/PowerRounded'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded'

// TODO: Uncomment once this view does account for 'sandbox' accessible API products.
// import SubscriptionsRoundedIcon from '@material-ui/icons/SubscriptionsRounded'

import useStyles from './styles'

import { APIProductsProps } from './types'

import { APIDetails } from 'components/APICatalog/types'

import apiProductCard from 'assets/apiProductCard.svg'

/* TODO: This view does NOT account for 'sandbox' accessible API products.
In the future, add logic for this kind of API product. */
const APIProducts: React.FC<APIProductsProps> = ({
  auth,
  getAllUserAppsAction,
  getAPIs,
  subscriptions,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const initialAPIState: APIDetails = {
    apiAccess: false,
    apiDescription: '',
    apiName: '',
    apiRoutingId: '',
    apiVersion: '',
    hasMoreDetails: false,
    id: 0,
  }

  const [recentlyUpdatedAPIs, setRecentlyUpdatedAPIs] = React.useState<APIDetails[]>([])
  const [latestUpdatedAPI, setLatestUpdatedAPI] = React.useState(initialAPIState)

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'subscriptions')
    of all API-related information we presently have. */
    getAPIs()
  }, [getAPIs])

  React.useEffect(() => {
    /* Triggers the retrieval and storage of all app-related information we presently
    have on a given user. */
    if (auth?.user) {
      getAllUserAppsAction(auth.user.id)
    }
  }, [auth, getAllUserAppsAction])

  React.useEffect(() => {
    /* Once 'subscriptions' info is made available, we process it so as to display it
    on our 'All API products' section. */
    const allAvailableAPIs = subscriptions.apis

    if (allAvailableAPIs.length) {
      const newRecentlyUpdatedAPIs: APIDetails[] = allAvailableAPIs.map((api) => {
        return {
          /* An API that is 'live' (i.e., 'production accessible') is one that has versions, and has
          its 'live' property set to 'true'. Ones that do NOT meet any of the above criteria are ones
          that, presently, only have 'API Documentation' to show for it. */
          apiAccess: (api.apiVersions.length > 0 && api.apiVersions[0].live),
          /* Determines if an 'API Catalog' entry will be clickable, and link to its corresponding
          'API Details' view. For the time being, an 'API Catalog' entry should be clickable and
          link to its corresponding 'API Details' view if it has versions. */
          apiDescription: api?.docs?.info || 'No description presently available.',
          apiName: api.apiVersions.length ? api.apiVersions[0].title : api.name,
          // Used to link an 'API Catalog' entry to its corresponding 'API Details' view.
          apiRoutingId: api.apiVersions.length ? `${api.apiVersions[0].id}` : '',
          apiVersion: api.apiVersions.length ? api.apiVersions[0].version : 'No version available',
          hasMoreDetails: api.apiVersions.length > 0,
          id: api.apiVersions.length ? api.apiVersions[0].apiId : api.id,
        }
      })

      setRecentlyUpdatedAPIs(newRecentlyUpdatedAPIs)
      setLatestUpdatedAPI(newRecentlyUpdatedAPIs[0])
    }
  }, [subscriptions])

  // API filtering logic

  const [filteredAPIs, setFilteredAPIs] = React.useState<any[]>([])
  const [apiFilters, setAPIFilters] = React.useState<any[]>(['', false, false, false])

  const handleAPIFiltering = (
    changeEvent?: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    buttonFilterIndex?: number,
  ) => {
    const apisToFilter: APIDetails[] = recentlyUpdatedAPIs
    let newFilteredAPIs: APIDetails[] = []
    const newAPIFilters = apiFilters

    // Filtering by access type
    let productionAccessibleAPIs: APIDetails[] = []
    const sandboxAccessibleAPIs: APIDetails[] = []
    let documentationAccessibleAPIs: APIDetails[] = []

    if (buttonFilterIndex) {
      if (newAPIFilters[buttonFilterIndex] === false) {
        newAPIFilters[buttonFilterIndex] = true
      } else {
        newAPIFilters[buttonFilterIndex] = false
      }
    }

    if (newAPIFilters[1]) {
      productionAccessibleAPIs = apisToFilter.filter((api) => {
        return api.apiAccess === true
      })
    }

    if (newAPIFilters[2]) {
      /* TODO: Fully handle this case once we have the means to
      determine if a particular API product is 'sandbox' accessible. */
    }

    if (newAPIFilters[3]) {
      documentationAccessibleAPIs = apisToFilter.filter((api) => {
        return api.apiAccess === false
      })
    }

    newFilteredAPIs = newFilteredAPIs.concat(
      productionAccessibleAPIs,
      sandboxAccessibleAPIs,
      documentationAccessibleAPIs,
    )

    // Filtering by name

    let textFilterContents = apiFilters[0]

    if (changeEvent) {
      textFilterContents = changeEvent?.target.value

      newAPIFilters[0] = textFilterContents
    }

    if (newFilteredAPIs.length) {
      newFilteredAPIs = newFilteredAPIs.filter((api) => {
        return api.apiName.toLowerCase().includes(textFilterContents.toLowerCase())
      })
    } else {
      newFilteredAPIs = apisToFilter.filter((api) => {
        return api.apiName.toLowerCase().includes(textFilterContents.toLowerCase())
      })
    }

    setFilteredAPIs(newFilteredAPIs)
    setAPIFilters(newAPIFilters)
  }

  /* Modal stuff */

  const [isModalOpen, setModalOpen] = React.useState(false)

  const toggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  return (
    <main className='page-container'>
      {/* 'Latest API product update' section */}
      <section className={classes.latestAPIProductUpdateSection}>
        <div className={classes.latestAPIProductUpdateContainer}>
          <img
            className={classes.latestAPIProductImage}
            src={apiProductCard}
          />

          <div className={classes.latestAPIProductDetails}>
            <p className={classes.latestAPIProductTitle}>
              {t('apiProductsTab.latestAPIProductTitle')}
            </p>

            <div className={classes.apiProductNameAndVersion}>
              <p className={classes.apiProductName}>
                {
                  latestUpdatedAPI.apiName
                    ? latestUpdatedAPI.apiName
                    : t('apiProductsTab.retrievingAPIProductMessage')
                }
              </p>

              <p
                className={
                  `
${classes.apiProductVersion}
${latestUpdatedAPI.apiAccess
      ? classes.productionAccess
      : classes.documentationAccess
    }
`
                }
              >
                {
                  latestUpdatedAPI.apiVersion
                    ? `v${latestUpdatedAPI.apiVersion}`
                    : '...'
                }
              </p>
            </div>

            <div className={classes.apiProductButtons}>
              <Button
                className={classes.viewDetailsButton}
                href={
                  (latestUpdatedAPI.id && latestUpdatedAPI.apiRoutingId)
                    ? `/api-products/details/${latestUpdatedAPI.id}/spec/${latestUpdatedAPI.apiRoutingId}`
                    : '#'
                }
              >
                {t('apiProductsTab.apiProductButtons.viewDetailsButtonLabel')}
              </Button>

              {
                auth.user &&
                <Button
                  className={classes.subscribeButton}
                  onClick={toggleModal}
                >
                  {t('apiProductsTab.apiProductButtons.subscribeButtonLabel')}
                </Button>
              }
            </div>

            <div className={classes.apiProductStatusAndAccessType}>
              {
                auth.user
                  ? (
                    <>
                      {/* A mere dot */}
                      <span
                        className={
                          latestUpdatedAPI.apiAccess
                            ? classes.apiProductOnlineStatus
                            : classes.apiProductOfflineStatus
                        }
                      >
                        &#9679;
                      </span>

                      <p>
                        {
                          latestUpdatedAPI.apiAccess
                            ? t('apiProductsTab.productionAccess')
                            : t('apiProductsTab.documentationAccess')
                        }
                      </p>
                    </>
                  )
                  : (
                    <a href='/auth/signup'>
                      {t('apiProductsTab.registerForMoreMessage')}
                    </a>
                  )
              }
            </div>
          </div>
        </div>
      </section>

      {/* 'All API products' section */}
      <section className={classes.allAPIProductsSection}>
        <div className={classes.filtersContainer}>
          <InputBase
            className={classes.textFilter}
            endAdornment={
              <SearchRoundedIcon />
            }
            onChange={(changeEvent) => handleAPIFiltering(changeEvent, undefined)}
            placeholder={t('apiProductsTab.textFilterPlaceholder')}
          />

          <div
            className={
              apiFilters[1]
                ? classes.activeFilterButtonContainer
                : classes.inactiveFilterButtonContainer
            }
            onClick={() => handleAPIFiltering(undefined, 1)}
            title={t('apiProductsTab.apiProductButtons.tooltipLabels.productionAccessible')}
          >
            <PowerRoundedIcon
              className={
                apiFilters[1]
                  ? classes.activeProductionAccessFilterButtonIcon
                  : classes.inactiveFilterButtonIcon
              }
            />
          </div>

          {/* TODO: Uncomment once this view does account for 'sandbox' accessible API products. */}
          {/* <div
className={
apiFilters[2]
? classes.activeFilterButtonContainer
: classes.inactiveFilterButtonContainer
}
onClick={() => handleAPIFiltering(undefined, 2)}
title={t('apiProductsTab.apiProductButtons.tooltipLabels.sandboxAccessible')}
>
<SubscriptionsRoundedIcon
className={
apiFilters[2]
? classes.activeSandboxAccessFilterButtonIcon
: classes.inactiveFilterButtonIcon
}
/>
</div> */}

          <div
            className={
              apiFilters[3]
                ? (
                  `${classes.activeFilterButtonContainer} ${classes.lastFilterButtonContainer}`
                )
                : (
                  `${classes.inactiveFilterButtonContainer} ${classes.lastFilterButtonContainer}`
                )
            }
            onClick={() => handleAPIFiltering(undefined, 3)}
            title={t('apiProductsTab.apiProductButtons.tooltipLabels.documentationAccessible')}
          >
            <ChromeReaderModeRoundedIcon
              className={
                apiFilters[3]
                  ? classes.activeDocumentationAccessFilterButtonIcon
                  : classes.inactiveFilterButtonIcon
              }
            />
          </div>
        </div>
      </section>

      <section className={classes.apiCatalogSectionContainer}>
        {
          recentlyUpdatedAPIs.length === 0
            ? (
              <div className={classes.retrievingAPIProductMessageContainer}>
                <p>
                  {t('apiProductsTab.retrievingAPIProductMessage')}
                </p>
              </div>
            )
            : (
              (apiFilters[0].length === 0 && !apiFilters[1] && !apiFilters[2] && !apiFilters[3])
                ? (
                  <div className={classes.apiCatalogContainer}>
                    <APICatalog apisToDisplay={recentlyUpdatedAPIs} />
                  </div>
                )
                : (
                  <div className={classes.apiCatalogContainer}>
                    <APICatalog apisToDisplay={filteredAPIs} />
                  </div>
                )
            )
        }
      </section>

      {
        isModalOpen &&
        <SubscriptionsModal
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />
      }
    </main>
  )
}

export default APIProducts
