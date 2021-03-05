import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from 'components/Button'

import Fade from '@material-ui/core/Fade'
import MenuItem from '@material-ui/core/MenuItem'
import Modal from '@material-ui/core/Modal'
import Select from '@material-ui/core/Select'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'

import SubscriptionsModalProps from './types'

import useStyles from './styles'

import { config } from 'constants/global'

const SubscriptionsModal: React.FC<SubscriptionsModalProps> = ({
  allUserApps,
  apisByName,
  isModalOpen,
  requestAPIAccessAction,
  settings,
  toggleModal,
}) => {
  const classes = useStyles()

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
                settings.logoURL
                  ? (
                    <img
                      className={classes.imageLogo}
                      src={settings.logoURL}
                    />
                  )
                  : (
                    <AmpStoriesRoundedIcon
                      className={classes.iconLogo}
                    />
                  )
              }

              <h3 className={classes.portalName}>
                {settings.portalName}
              </h3>
            </div>

            <div
              className={classes.closeModalButtonContainer}
              onClick={resetModalSelections}
            >
              <p>
                {t('dashboardTab.subscriptionsSubTab.subsModal.modalHeader.closeButtonLabel', { config })}
              </p>

              <CloseRoundedIcon />
            </div>
          </div>

          {/* Modal body */}
          <div className={classes.modalBodyContainer}>
            {/* Modal's title */}
            <h1 className={classes.header}>
              {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.header', { config })}
            </h1>

            {/* 'Steps' section */}
            <ol className={classes.stepsContainer}>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepOne', { config })}</li>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepTwo', { config })}</li>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepThree', { config })}</li>
              <li>{t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.steps.stepFour', { config })}</li>
            </ol>

            <hr className={classes.sectionSeparator} />

            {/* 'Client applications' section */}
            <div className={classes.clientAppsContainer}>
              <div className={classes.clientAppSelectorContainer}>
                <p>
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.title', { config })}
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
                        ? t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.selectorLabel.moreThanOneApp', { config })
                        : t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.selectorLabel.noApps', { config })
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
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.subtitle', { config })}
                </p>

                {
                  (selectedClientApp.subscriptions.length === 0)
                    ? (
                      <div className={classes.infoBox}>
                        <QueryBuilderRoundedIcon className={classes.infoBoxIcon} />

                        <p className={classes.infoBoxText}>
                          {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.infoBoxNotificationTextPartOne', { config })}
                          {settings.clientName}
                          {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.infoBoxNotificationTextPartTwo', { config })}
                        </p>
                      </div>
                    )
                    : (
                      <div className={classes.warningBox}>
                        <ReportProblemOutlinedIcon className={classes.warningBoxIcon} />

                        <p className={classes.warningBoxText}>
                          {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.clientApps.warningBoxNotificationText', { config })}
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
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.title', { config })}
                </p>

                <p>
                  {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.subtitle', { config })}
                </p>
              </div>

              <div className={classes.apiProductsSubsTable}>
                <div className={classes.tableHeader}>
                  <p>
                    {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.apiProductsTable.title', { config })}
                  </p>

                  <p>
                    {t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.apiProductSubsContainer.apiProductsTable.subtitle', { config })}
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
                                  {api.versions[0].version}
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
                  customButtonClassName={
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
                  href='#'
                  label={
                    (selectedClientApp.subscriptions.length === 0)
                      ? (t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.requestAccess', { config }))
                      : (t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.revokeAccess', { config }))
                  }
                  onClick={
                    (selectedClientApp.subscriptions.length === 0)
                      ? handleAPIProductAccessRequest
                      : null
                  }
                />

                <Button
                  customButtonClassName={classes.enabledOtherButtons}
                  href='/profile/organisation'
                  label={
                    t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.reviewOrganisation', { config })
                  }
                />

                <Button
                  customButtonClassName={
                    isClientAppSelected
                      ? classes.enabledOtherButtons
                      : classes.disabledOtherButtons
                  }
                  href={
                    isClientAppSelected
                      ? `/dashboard/apps/${selectedClientApp.id}`
                      : '#'
                  }
                  label={
                    t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.reviewApp', { config })
                  }
                />
              </div>

              <div className={classes.rightSideButtonsContainer}>
                <Button
                  customButtonClassName={classes.enabledOtherButtons}
                  href='#'
                  label={
                    t('dashboardTab.subscriptionsSubTab.subsModal.modalBody.buttons.cancel', { config })
                  }
                  onClick={resetModalSelections}
                />
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  )
}

export default SubscriptionsModal
