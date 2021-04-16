import React from 'react'
import { useConfig, useTranslation, Button, Fade, MenuItem, Modal, Select } from '@apisuite/fe-base'
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'

import SubscriptionsModalProps from './types'
import useStyles from './styles'

const SubscriptionsModal: React.FC<SubscriptionsModalProps> = ({
  allUserApps,
  apisByName,
  isModalOpen,
  requestAPIAccessAction,
  toggleModal,
}) => {
  const classes = useStyles()
  const { portalName, ownerInfo, clientName } = useConfig()
  const [t] = useTranslation()

  /* 'Client app' selection */

  const initialClientApp = {
    clientId: '',
    clientSecret: '',
    createdAt: '',
    description: '',
    id: '',
    logo: '',
    name: '',
    orgId: '',
    privacyUrl: '',
    redirectUrl: '',
    shortDescription: '',
    subscriptions: [],
    supportUrl: '',
    tosUrl: '',
    updatedAt: '',
    websiteUrl: '',
    youtubeUrl: '',
  }

  const [selectedClientApp, setSelectedClientApp] = React.useState(
    allUserApps.length === 1
      // If there's one single user app, we default the 'Client app' selection to it
      ? allUserApps[0]
      // If there's more than one single user app, we leave the 'Client app' selection up to the user
      : initialClientApp,
  )
  const [isClientAppSelected, setIsClientAppSelected] = React.useState(
    allUserApps.length === 1,
  )

  const handleClientAppSelection = (dataOfSelectedApp: any) => {
    setSelectedClientApp(dataOfSelectedApp)
    setIsClientAppSelected(true)
  }

  /* 'API product' selection */

  // const [selectedAPIProducts, setSelectedAPIProducts] = React.useState([])
  const [isAPIProductSelected, setIsAPIProductSelected] = React.useState(
    new Array(apisByName.length).fill(true),
  )

  /*
  TODO: Keep 'handleAPIProductsSelection' commented - for now, Koen wants all API Products to be selected by default.
  The selection and deselection features are to be added at a later date.
  */
  // const handleAPIProductsSelection = (dataOfSelectedAPIProduct: any, indexOfSelectedAPIProduct: number) => {
  //   const currentSelectionOfAPIProducts = [...selectedAPIProducts]
  //   const currentStateOfSelectedAPIProducts = [...isAPIProductSelected]

  //   // If there are API products that have already been selected, (...)
  //   if (currentSelectionOfAPIProducts.length > 0) {
  //     /* (...) we need to check if the currently selected API product is one that
  //     has already been previously selected, so as to handle selections and deselections. */
  //     const indexOfAPIProduct = currentSelectionOfAPIProducts.findIndex((apiProduct: any) => {
  //       return apiProduct.versions[0].id === dataOfSelectedAPIProduct.versions[0].id
  //     })

  //     // If the currently selected API product has NOT been selected yet, we handle its selection.
  //     if (indexOfAPIProduct === -1) {
  //       const newSelectionOfAPIProducts = currentSelectionOfAPIProducts.concat(dataOfSelectedAPIProduct)
  //       const newStateOfSelectedAPIProducts = currentStateOfSelectedAPIProducts
  //       newStateOfSelectedAPIProducts[indexOfSelectedAPIProduct] = true

  //       setSelectedAPIProducts(newSelectionOfAPIProducts)
  //       setIsAPIProductSelected(newStateOfSelectedAPIProducts)

  //       return
  //     }

  //     // If the currently selected API product has already been selected, we handle its deselection.
  //     currentSelectionOfAPIProducts.splice(indexOfSelectedAPIProduct, 1)
  //     const newSelectionOfAPIProducts = currentSelectionOfAPIProducts
  //     const newStateOfSelectedAPIProducts = currentStateOfSelectedAPIProducts
  //     newStateOfSelectedAPIProducts[indexOfSelectedAPIProduct] = false

  //     setSelectedAPIProducts(newSelectionOfAPIProducts)
  //     setIsAPIProductSelected(newStateOfSelectedAPIProducts)

  //     return
  //   }

  //   // If no API products have already been selected, (...)
  //   const newSelectionOfAPIProducts = currentSelectionOfAPIProducts.concat(dataOfSelectedAPIProduct)
  //   const newStateOfSelectedAPIProducts = currentStateOfSelectedAPIProducts
  //   newStateOfSelectedAPIProducts[indexOfSelectedAPIProduct] = true

  //   setSelectedAPIProducts(newSelectionOfAPIProducts)
  //   setIsAPIProductSelected(newStateOfSelectedAPIProducts)
  // }

  /* Selections reset */

  const resetModalSelections = () => {
    setSelectedClientApp(initialClientApp)
    setIsClientAppSelected(false)

    // setSelectedAPIProducts([])
    setIsAPIProductSelected(new Array(apisByName.length).fill(true))

    toggleModal()
  }

  /* 'API Product' access request */

  const handleAPIProductAccessRequest = () => {
    const idOfSelectedClientApp = Number(selectedClientApp.id)

    requestAPIAccessAction(idOfSelectedClientApp)
    resetModalSelections()
  }

  return (
    <Modal
      onClose={toggleModal}
      open={isModalOpen}
    >
      <Fade in={isModalOpen}>
        <div className={classes.modalContentsContainer}>
          {/* Modal header */}
          <div className={classes.modalHeaderContainer}>
            <div className={classes.logoAndNameContainer}>
              {
                ownerInfo.logo ? (
                  <img
                    className={classes.imageLogo}
                    src={ownerInfo.logo}
                  />
                )
                  : (
                    <AmpStoriesRoundedIcon
                      className={classes.iconLogo}
                    />
                  )
              }

              <h3 className={classes.portalName}>
                {portalName}
              </h3>
            </div>

            <div
              className={classes.closeModalButtonContainer}
              onClick={resetModalSelections}
            >
              <p>
                {t('dashboardTab.subscriptionsSubTab.subsModal.modalHeader.closeButtonLabel')}
              </p>

              <CloseRoundedIcon />
            </div>
          </div>

          {/* Modal body */}
          <div className={classes.modalBodyContainer}>
            {/* Modal's title */}
            <h1 className={classes.header}>
              {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.header')}
            </h1>

            {/* 'Steps' section */}
            <ol className={classes.stepsContainer}>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepOne')}</li>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepTwo')}</li>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepThree')}</li>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepFour')}</li>
            </ol>

            <hr className={classes.sectionSeparator} />

            {/* 'Client applications' section */}
            <div className={classes.clientAppsContainer}>
              <div className={classes.clientAppSelectorContainer}>
                <p>
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.title')}
                </p>

                <Select
                  disableUnderline
                  displayEmpty
                  IconComponent={ExpandMoreRoundedIcon}
                  value={
                    selectedClientApp.id === ''
                      ? ''
                      : selectedClientApp.name
                  }
                >
                  <MenuItem disabled value=''>
                    {
                      allUserApps.length > 0
                        ? t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.selectorLabel.moreThanOneApp')
                        : t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.selectorLabel.noApps')
                    }
                  </MenuItem>

                  {
                    allUserApps.map((userApp, index) => {
                      return (
                        <MenuItem
                          key={`userApp${index}`}
                          onClick={() => handleClientAppSelection(userApp)}
                          value={userApp.name}
                        >
                          {userApp.name}
                        </MenuItem>
                      )
                    })
                  }
                </Select>
              </div>

              <div className={classes.clientAppNotificationContainer}>
                <p>
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.subtitle')}
                </p>

                {
                  (selectedClientApp.subscriptions.length === 0)
                    ? (
                      <div className={classes.infoBox}>
                        <QueryBuilderRoundedIcon className={classes.infoBoxIcon} />

                        <p className={classes.infoBoxText}>
                          {/* FIXME: translations support interpolation */}
                          {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.infoBoxNotificationTextPartOne')}
                          {clientName}
                          {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.infoBoxNotificationTextPartTwo')}
                        </p>
                      </div>
                    )
                    : (
                      <div className={classes.warningBox}>
                        <ReportProblemOutlinedIcon className={classes.warningBoxIcon} />

                        <p className={classes.warningBoxText}>
                          {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.warningBoxNotificationText')}
                        </p>
                      </div>
                    )
                }
              </div>
            </div>

            <hr className={classes.sectionSeparator} />

            {/* 'API product subscriptions' section */}
            <div className={classes.apiProductsSubsContainer}>
              <div className={classes.titleAndSubtitleContainer}>
                <p>
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.title')}
                </p>

                <p>
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.subtitle')}
                </p>
              </div>

              <div className={classes.apiProductsSubsTable}>
                <div className={classes.tableHeader}>
                  <p>
                    {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.apiProductsTable.title')}
                  </p>

                  <p>
                    {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.apiProductsTable.subtitle')}
                  </p>
                </div>

                <div className={classes.tableBody}>
                  {
                    apisByName.length > 0 && isClientAppSelected
                      ? (
                        apisByName.map((api, index) => {
                          return (
                            <div
                              className={
                                index % 2 === 0
                                  ? classes.regularAPIProductDetailsContainer
                                  : classes.alternativeAPIProductDetailsContainer
                              }
                              key={`apiProduct${index}`}
                            /*
                            TODO: Keep the call to 'handleAPIProductsSelection' commented - for now,
                            Koen wants all API Products to be selected by default. The selection and
                            deselection features are to be added at a later date.
                            */
                            // onClick={() => handleAPIProductsSelection(api, index)}
                            >
                              <p className={classes.apiProductName}>
                                {api.name}
                              </p>

                              <div className={classes.apiProductVersionAndSelectionContainer}>
                                <p className={classes.apiProductVersion}>
                                  {api.versions.length !== 0 && api.versions[0].version}
                                </p>

                                {
                                  isAPIProductSelected[index]
                                    ? <CheckBoxRoundedIcon className={classes.selectedAPIProduct} />
                                    : <CheckBoxOutlineBlankRoundedIcon className={classes.notSelectedAPIProduct} />
                                }
                              </div>
                            </div>
                          )
                        })
                      )
                      : (
                        <div className={classes.noAPIProductsToShow}>
                          <p>Please, select an app</p>
                        </div>
                      )
                  }
                </div>
              </div>
            </div>

            <hr className={classes.sectionSeparator} />

            {/* 'Buttons' section */}
            <div className={classes.buttonsContainer}>
              <div className={classes.leftSideButtonsContainer}>
                <Button
                  className={
                    (selectedClientApp.subscriptions.length === 0)
                      ? (
                        selectedClientApp.id === ''
                          ? classes.disabledRequestAccessButton
                          : classes.enabledRequestAccessButton
                      )
                      : (
                        selectedClientApp.id === ''
                          ? classes.disabledRevokeAccessButton
                          /* Previously ': classes.enabledRevokeAccessButton'.
                          Go back on this change once the 'revoke' action is possible. */
                          : classes.disabledRevokeAccessButton
                      )
                  }
                  onClick={
                    (selectedClientApp.subscriptions.length === 0)
                      ? handleAPIProductAccessRequest
                      : () => null
                  }
                >
                  {
                    (selectedClientApp.subscriptions.length === 0)
                      ? (t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.requestAccess'))
                      : (t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.revokeAccess'))
                  }
                </Button>

                <Button
                  className={classes.enabledOtherButtons}
                  href='/profile/organisation'
                >
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.reviewOrganisation')}
                </Button>

                <Button
                  className={
                    isClientAppSelected
                      ? classes.enabledOtherButtons
                      : classes.disabledOtherButtons
                  }
                  href={
                    isClientAppSelected
                      ? `/dashboard/apps/${selectedClientApp.id}`
                      : '#'
                  }
                >
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.reviewApp')}
                </Button>
              </div>

              <div className={classes.rightSideButtonsContainer}>
                <Button
                  className={classes.enabledOtherButtons}
                  onClick={resetModalSelections}
                >
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.cancel')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default SubscriptionsModal
