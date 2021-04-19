import React from 'react'
import {
  useTranslation,
  Avatar,
  Button,
  Fade,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  TextField,
  useConfig,
} from '@apisuite/fe-base'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import Close from '@material-ui/icons/Close'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded'
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded'
import { useForm } from 'util/useForm'
import CustomizableDialog from 'components/CustomizableDialog/CustomizableDialog'
import { isValidImage, isValidURL } from 'components/FormField'

import ApplicationsModalProps from './types'
import useStyles from './styles'

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({
  allUserAppNames,
  createAppAction,
  deleteAppAction,
  getUserAppAction,
  isModalOpen,
  modalDetails,
  modalMode,
  mostRecentlySelectedAppDetails,
  toggleModal,
  updateAppAction,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const { ownerInfo, portalName } = useConfig()

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'applications > currentApp')
    of all information we presently have on a particular app. */
    if (modalDetails.userAppID && modalDetails.userID) {
      getUserAppAction(modalDetails.userAppID, modalDetails.userID)
    }
  }, [modalMode])

  const [avatarInputIsInFocus, setAvatarInputIsInFocus] = React.useState(false)
  const [validImage, setValidImage] = React.useState<boolean>(true)

  const validateAvatar = (avatar: string) => {
    if (avatar !== '') {
      (
        async () => {
          const valid = await isValidImage(avatar)

          setValidImage(valid)
        }
      )()
    }
  }

  /*
  App details
  Note:
  - 'formState' refers to our own, local copy of an app's details.
  - 'mostRecentlySelectedAppDetails' refers to our stored, back-end approved copy of all details
  we presently have on the user's most recently selected app (under 'applications > currentApp').
  */

  // Performs some basic checks on user-provided URIs
  const uriBasicChecks = (uri: string | number) => {
    const stringURI = uri ? uri.toString() : null

    if (stringURI === null || stringURI.length === 0) return true
    if (stringURI.length > 0) return isValidURL(stringURI)

    return false
  }

  const {
    formState,
    handleChange,
    handleFocus,
    resetForm,
  } = useForm(
    // Initial app details
    {
      appAvatarURL: '',
      appClientID: '',
      appClientSecret: '',
      appFullDescription: '',
      appLabels: '',
      appName: '',
      appPrivacyURL: '',
      appRedirectURI: 'https://',
      appShortDescription: '',
      appSupportURL: '',
      appTermsURL: '',
      appWebsiteURL: '',
      appYouTubeURL: '',
    },
    // Rules for (some) app details
    {
      appAvatarURL: {
        rules: [(URI) => {
          const validURL = uriBasicChecks(URI)

          if (validURL) {
            if (URI === null || URI.toString().length === 0) {
              setValidImage(true)
            } else {
              validateAvatar(URI.toString())
            }
          }

          return validURL
        }],
        message: t('dashboardTab.applicationsSubTab.appModal.appAvatarURLError'),
      },

      appPrivacyURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('dashboardTab.applicationsSubTab.appModal.allOtherURLsError'),
      },

      appRedirectURI: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('dashboardTab.applicationsSubTab.appModal.allOtherURLsError'),
      },

      appSupportURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('dashboardTab.applicationsSubTab.appModal.allOtherURLsError'),
      },

      appTermsURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('dashboardTab.applicationsSubTab.appModal.allOtherURLsError'),
      },

      appWebsiteURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('dashboardTab.applicationsSubTab.appModal.allOtherURLsError'),
      },

      appYouTubeURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('dashboardTab.applicationsSubTab.appModal.allOtherURLsError'),
      },
    })

  /*
  Whenever 'modalMode' or 'mostRecentlySelectedAppDetails' changes, our form's values are 'reset' to:
  - Whatever is stored in 'mostRecentlySelectedAppDetails' (if 'modalMode' amounts to 'edit').
  - An empty string (if 'modalMode' amounts to 'new').
  */
  React.useEffect(() => {
    if (modalMode === 'edit') {
      resetForm({
        appAvatarURL: mostRecentlySelectedAppDetails.logo ? mostRecentlySelectedAppDetails.logo : '',
        appClientID: mostRecentlySelectedAppDetails.clientId ? mostRecentlySelectedAppDetails.clientId : '',
        appClientSecret: mostRecentlySelectedAppDetails.clientSecret ? mostRecentlySelectedAppDetails.clientSecret : '',
        appFullDescription: mostRecentlySelectedAppDetails.description ? mostRecentlySelectedAppDetails.description : '',
        appLabels: mostRecentlySelectedAppDetails.labels.length > 0
          ? mostRecentlySelectedAppDetails.labels.join(' ')
          : '',
        appName: mostRecentlySelectedAppDetails.name ? mostRecentlySelectedAppDetails.name : '',
        appPrivacyURL: mostRecentlySelectedAppDetails.privacyUrl ? mostRecentlySelectedAppDetails.privacyUrl : '',
        appRedirectURI: mostRecentlySelectedAppDetails.redirectUrl ? mostRecentlySelectedAppDetails.redirectUrl : '',
        appShortDescription: mostRecentlySelectedAppDetails.shortDescription
          ? mostRecentlySelectedAppDetails.shortDescription
          : '',
        appSupportURL: mostRecentlySelectedAppDetails.supportUrl ? mostRecentlySelectedAppDetails.supportUrl : '',
        appTermsURL: mostRecentlySelectedAppDetails.tosUrl ? mostRecentlySelectedAppDetails.tosUrl : '',
        appWebsiteURL: mostRecentlySelectedAppDetails.websiteUrl ? mostRecentlySelectedAppDetails.websiteUrl : '',
        appYouTubeURL: mostRecentlySelectedAppDetails.youtubeUrl ? mostRecentlySelectedAppDetails.youtubeUrl : '',
      })
    } else {
      resetForm({
        appAvatarURL: '',
        appClientID: '',
        appClientSecret: '',
        appFullDescription: '',
        appLabels: '',
        appName: '',
        appPrivacyURL: '',
        appRedirectURI: 'https://',
        appShortDescription: '',
        appSupportURL: '',
        appTermsURL: '',
        appWebsiteURL: '',
        appYouTubeURL: '',
      })
    }
  }, [modalMode, mostRecentlySelectedAppDetails])

  /* Optional URL selector */

  const [anchorElement, setAnchorElement] = React.useState(null)
  const [isShowing, setIsShowing] = React.useState([false, false, false, false])

  /* Whenever the store's 'applications > currentApp' details become available
  (i.e., upon mounting this React.Component, and immediately after saving an app's details),
  we need to determine what optional URLs have been provided, and are meant to be shown. */
  React.useEffect(() => {
    setIsShowing([
      !!mostRecentlySelectedAppDetails.tosUrl,
      !!mostRecentlySelectedAppDetails.privacyUrl,
      !!mostRecentlySelectedAppDetails.youtubeUrl,
      !!mostRecentlySelectedAppDetails.supportUrl,
    ])
  }, [mostRecentlySelectedAppDetails])

  const handleOpenSelector = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()

    setAnchorElement((event as any).currentTarget)
  }

  const handleCloseSelector = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation()

    setAnchorElement(null)
  }

  const handleShowOptionalURLField = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    indexOfFormFieldToAdd: number,
  ) => {
    event.stopPropagation()

    const newIsShowingArray = [...isShowing]

    newIsShowingArray[indexOfFormFieldToAdd] = true

    setIsShowing(newIsShowingArray)
    setAnchorElement(null)
  }

  const handleHideOptionalURLField = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    indexOfFormFieldToRemove: number,
  ) => {
    event.stopPropagation()

    const newIsShowingArray = [...isShowing]

    newIsShowingArray[indexOfFormFieldToRemove] = false

    if (indexOfFormFieldToRemove === 0 && formState.values.appTermsURL) {
      formState.values.appTermsURL = ''
      // @ts-ignore
      delete formState.errors.appTermsURL
      formState.isDirty = !!mostRecentlySelectedAppDetails.tosUrl
    } else if (indexOfFormFieldToRemove === 1 && formState.values.appPrivacyURL) {
      formState.values.appPrivacyURL = ''
      // @ts-ignore
      delete formState.errors.appPrivacyURL
      formState.isDirty = !!mostRecentlySelectedAppDetails.privacyUrl
    } else if (indexOfFormFieldToRemove === 2 && formState.values.appYouTubeURL) {
      formState.values.appYouTubeURL = ''
      // @ts-ignore
      delete formState.errors.appYouTubeURL
      formState.isDirty = !!mostRecentlySelectedAppDetails.youtubeUrl
    } else if (indexOfFormFieldToRemove === 3 && formState.values.appSupportURL) {
      formState.values.appSupportURL = ''
      // @ts-ignore
      delete formState.errors.appSupportURL
      formState.isDirty = !!mostRecentlySelectedAppDetails.supportUrl
    }

    setIsShowing(newIsShowingArray)
    setAnchorElement(null)
  }

  /* Avatar-related stuff, part two */

  let appNameInitials = '...'

  if (formState.values.appName) {
    const appNameInitialsArray = formState.values.appName.split(' ').filter((word) => {
      return word.length > 0
    })

    appNameInitials = appNameInitialsArray.length >= 2
      ? `${appNameInitialsArray[0][0]}${appNameInitialsArray[1][0]}`
      : (
        appNameInitialsArray[0].length === 1
          ? appNameInitialsArray[0][0]
          : `${appNameInitialsArray[0][0]}${appNameInitialsArray[0][1]}`
      )
  }

  /* App-related actions */

  const checkForLabels = (stringOfLabels: string) => {
    return stringOfLabels.length ? stringOfLabels.split(' ') : []
  }

  // Creating an app

  const createApp = (event: React.ChangeEvent<{}>) => {
    event.preventDefault()

    const newAppDetails = {
      description: formState.values.appFullDescription,
      labels: checkForLabels(formState.values.appLabels),
      logo: formState.values.appAvatarURL,
      name: formState.values.appName,
      privacyUrl: formState.values.appPrivacyURL,
      redirectUrl: formState.values.appRedirectURI,
      shortDescription: formState.values.appShortDescription,
      supportUrl: formState.values.appSupportURL,
      tosUrl: formState.values.appTermsURL,
      websiteUrl: formState.values.appWebsiteURL,
      youtubeUrl: formState.values.appYouTubeURL,
    }

    createAppAction(newAppDetails)

    toggleModal()
  }

  // Updating an app

  const updateApp = (event: React.ChangeEvent<{}>) => {
    event.preventDefault()

    const updatedAppDetails = {
      description: formState.values.appFullDescription,
      id: modalDetails.userAppID,
      labels: checkForLabels(formState.values.appLabels),
      logo: formState.values.appAvatarURL,
      name: formState.values.appName,
      privacyUrl: formState.values.appPrivacyURL,
      redirectUrl: formState.values.appRedirectURI,
      shortDescription: formState.values.appShortDescription,
      supportUrl: formState.values.appSupportURL,
      tosUrl: formState.values.appTermsURL,
      websiteUrl: formState.values.appWebsiteURL,
      youtubeUrl: formState.values.appYouTubeURL,
    }

    updateAppAction(updatedAppDetails)

    toggleModal()
  }

  // Deleting an app

  const [openDialog, setOpenDialog] = React.useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const deleteApp = () => {
    deleteAppAction(modalDetails.userAppID)

    handleCloseDialog()

    toggleModal()
  }

  return (
    <>
      <Modal
        onClose={() => {
          resetForm({
            appAvatarURL: '',
            appClientID: '',
            appClientSecret: '',
            appFullDescription: '',
            appLabels: '',
            appName: '',
            appPrivacyURL: '',
            appRedirectURI: 'https://',
            appShortDescription: '',
            appSupportURL: '',
            appTermsURL: '',
            appWebsiteURL: '',
            appYouTubeURL: '',
          })
          toggleModal()
        }}
        open={isModalOpen}
      >
        <Fade in={isModalOpen}>
          <div className={classes.modalContentsContainer}>
            {/* Modal header */}
            <div className={classes.modalHeaderContainer}>
              <div className={classes.logoAndNameContainer}>
                {
                  ownerInfo.logo
                    ? (
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
                onClick={toggleModal}
              >
                <p>
                  {t('dashboardTab.applicationsSubTab.appModal.closeButtonLabel')}
                </p>

                <CloseRoundedIcon />
              </div>
            </div>

            {/* Modal body */}
            <div className={classes.modalBodyContainer}>
              {/* Modal's title */}
              {
                modalMode === 'new'
                  ? (
                    <h1 className={classes.newApplicationHeader}>
                      {t('dashboardTab.applicationsSubTab.appModal.newAppLabel')}
                    </h1>
                  )
                  : (
                    <div className={classes.editApplicationHeaderContainer}>
                      <h1 className={classes.editApplicationHeader}>
                        {mostRecentlySelectedAppDetails.name}
                      </h1>

                      <div className={classes.editApplicationHeaderStatusContainer}>
                        {/* A mere dot */}
                        <span
                          className={
                            mostRecentlySelectedAppDetails.subscriptions.length === 0
                              ? classes.draftClientApplicationCardStatusIcon
                              : classes.subscribedClientApplicationCardStatusIcon
                          }
                        >
                          <>&#9679;</>
                        </span>

                        <p className={classes.clientApplicationCardStatusText}>
                          {
                            mostRecentlySelectedAppDetails.subscriptions.length === 0
                              ? t('dashboardTab.applicationsSubTab.appModal.draftAppStatus')
                              : t('dashboardTab.applicationsSubTab.appModal.subbedAppStatus')
                          }
                        </p>
                      </div>
                    </div>
                  )
              }

              {/* 'General information' section */}
              <div className={classes.sectionContainer}>
                {/* 'App name and short description' subsection */}
                <div className={classes.leftSubSectionContainer}>
                  <p className={classes.appNameAndShortDescriptionSubSectionTitle}>
                    {t('dashboardTab.applicationsSubTab.appModal.subSectionLabelOne')}
                  </p>

                  <TextField
                    className={classes.inputFields}
                    error={
                      (formState.touched.appName && formState.values.appName.length === 0) ||
                      (modalMode === 'new' && allUserAppNames.includes(formState.values.appName))
                    }
                    fullWidth
                    helperText={
                      (formState.touched.appName && formState.values.appName.length === 0)
                        ? t('dashboardTab.applicationsSubTab.appModal.noAppNameError')
                        : (
                          (modalMode === 'new' && allUserAppNames.includes(formState.values.appName))
                            ? t('dashboardTab.applicationsSubTab.appModal.existingAppNameError')
                            : ''
                        )
                    }
                    label={t('dashboardTab.applicationsSubTab.appModal.appNameFieldLabel')}
                    margin='dense'
                    name='appName'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type='text'
                    value={formState.values.appName}
                    variant='outlined'
                  />

                  <TextField
                    className={classes.inputFields}
                    fullWidth
                    label={t('dashboardTab.applicationsSubTab.appModal.appShortDescriptionFieldLabel')}
                    margin='dense'
                    name='appShortDescription'
                    onChange={handleChange}
                    type='text'
                    value={formState.values.appShortDescription}
                    variant='outlined'
                  />
                </div>

                {/* 'App avatar' subsection */}
                <div className={classes.rightSubSectionContainer}>
                  <p className={classes.appAvatarSubSectionDescription}>
                    {t('dashboardTab.applicationsSubTab.appModal.subSectionLabelTwo')}
                  </p>

                  <div className={classes.appAvatarContainer}>
                    {/* TODO: Eventually add 'upload' capabilities to the following 'Avatar' as an 'onClick' event */}
                    {
                      avatarInputIsInFocus
                        ? (
                          <Close
                            className={classes.avatarIcons}
                            onClick={
                              () => {
                                setAvatarInputIsInFocus(false)
                              }
                            }
                          />
                        )
                        : (
                          <ImageSearchRoundedIcon
                            className={classes.avatarIcons}
                            onClick={
                              () => {
                                setAvatarInputIsInFocus(true)
                              }
                            }
                          />
                        )
                    }

                    <Avatar
                      className={
                        avatarInputIsInFocus || formState.values.appAvatarURL
                          ? classes.focusedAvatar
                          : classes.notFocusedAvatar
                      }
                      src={formState.values.appAvatarURL}
                    >
                      {appNameInitials}
                    </Avatar>

                    <TextField
                      className={classes.avatarURLInputField}
                      error={(formState.touched.appAvatarURL && formState.errors.appAvatarURL) || !validImage}
                      fullWidth
                      helperText={
                        (formState.touched.appAvatarURL && formState.errors.appAvatarURL) || !validImage
                          ? formState.errorMsgs.appAvatarURL
                          : t('dashboardTab.applicationsSubTab.appModal.appAvatarFieldSubLabel')
                      }
                      inputRef={(input) =>
                        avatarInputIsInFocus ? input && input.focus() : input && input.blur()}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label={t('dashboardTab.applicationsSubTab.appModal.appAvatarFieldLabel')}
                      margin='dense'
                      name='appAvatarURL'
                      onBlur={() => {
                        setAvatarInputIsInFocus(false)
                      }}
                      onChange={handleChange}
                      onFocus={(focusEvent) => {
                        handleFocus(focusEvent)
                        setAvatarInputIsInFocus(true)
                      }}
                      type='url'
                      value={formState.values.appAvatarURL}
                      variant='outlined'
                    />
                  </div>
                </div>
              </div>

              <hr className={classes.alternativeSectionSeparator} />

              {/* 'Access details' section */}
              <div className={classes.sectionContainer}>
                {/* 'Redirect URI' subsection */}
                <div className={classes.leftSubSectionContainer}>
                  <p className={classes.redirectURISubSectionTitle}>
                    {t('dashboardTab.applicationsSubTab.appModal.subSectionLabelThree')}
                  </p>

                  <TextField
                    className={classes.inputFields}
                    error={formState.errors.appRedirectURI}
                    fullWidth
                    helperText={
                      formState.errors.appRedirectURI
                        ? formState.errorMsgs.appRedirectURI
                        : ''
                    }
                    label={t('dashboardTab.applicationsSubTab.appModal.subSectionLabelThree')}
                    margin='dense'
                    name='appRedirectURI'
                    onChange={handleChange}
                    type='url'
                    value={formState.values.appRedirectURI}
                    variant='outlined'
                  />
                </div>

                {/* 'Client credentials' subsection */}
                <div className={classes.rightSubSectionContainer}>
                  <p className={classes.clientCredentialsSubSectionDescription}>
                    <>{t('dashboardTab.applicationsSubTab.appModal.subSectionLabelFourPartOne')}</>
                    <a
                      href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580386833/Open+Authentication+2'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {t('dashboardTab.applicationsSubTab.appModal.subSectionLabelFourPartTwo')}
                    </a>
                    <>.</>
                  </p>

                  <TextField
                    className={
                      modalMode === 'new'
                        ? classes.disabledClientIDInputField
                        /* TODO: Previously 'enabledClientIDInputField'.
                        Revisit once it is possible to generate/edit new client IDs. */
                        : classes.disabledClientIDInputField
                    }
                    fullWidth
                    InputProps={{
                      endAdornment:
                        <InputAdornment position='end'>
                          <FileCopyOutlinedIcon />
                        </InputAdornment>,
                    }}
                    label={t('dashboardTab.applicationsSubTab.appModal.appClientIDFieldLabel')}
                    margin='dense'
                    name='appClientID'
                    onChange={handleChange}
                    type='text'
                    value={formState.values.appClientID}
                    variant='outlined'
                  />

                  <div className={classes.clientSecretInputFieldContainer}>
                    <TextField
                      className={
                        modalMode === 'new'
                          ? classes.disabledClientSecretInputField
                          /* TODO: Previously 'enabledClientSecretInputField'.
                          Revisit once it is possible to generate/edit new client secrets. */
                          : classes.disabledClientSecretInputField
                      }
                      fullWidth
                      InputProps={{
                        endAdornment:
                          <InputAdornment position='end'>
                            <FileCopyOutlinedIcon />
                          </InputAdornment>,
                      }}
                      label={t('dashboardTab.applicationsSubTab.appModal.appClientSecretFieldLabel')}
                      margin='dense'
                      name='appClientSecret'
                      onChange={handleChange}
                      type='text'
                      value={formState.values.appClientSecret}
                      variant='outlined'
                    />

                    <div
                      className={
                        modalMode === 'new'
                          ? classes.disabledClientSecretInputFieldRefreshButton
                          /* TODO: Previously 'enabledClientSecretInputFieldRefreshButton'.
                          Revisit once it is possible to generate/edit new client secrets. */
                          : classes.disabledClientSecretInputFieldRefreshButton
                      }
                    >
                      <RefreshRoundedIcon />
                    </div>
                  </div>
                </div>
              </div>

              <hr className={classes.regularSectionSeparator} />

              {/* 'Additional information' section */}
              <div className={classes.sectionContainer}>
                {/* 'Full description' subsection */}
                <div className={classes.leftSubSectionContainer}>
                  <p className={classes.additionalInfoSubSectionTitle}>
                    {t('dashboardTab.applicationsSubTab.appModal.subSectionLabelFive')}
                  </p>

                  <TextField
                    className={classes.inputFields}
                    fullWidth
                    label={t('dashboardTab.applicationsSubTab.appModal.appFullDescriptionFieldLabel')}
                    margin='dense'
                    multiline
                    name='appFullDescription'
                    onChange={handleChange}
                    rows={4}
                    type='text'
                    value={formState.values.appFullDescription}
                    variant='outlined'
                  />

                  <TextField
                    className={classes.inputFields}
                    fullWidth
                    helperText={t('dashboardTab.applicationsSubTab.appModal.appLabelsFieldHelperText')}
                    label={t('dashboardTab.applicationsSubTab.appModal.appLabelsFieldLabel')}
                    margin='dense'
                    name='appLabels'
                    onChange={handleChange}
                    type='text'
                    value={formState.values.appLabels}
                    variant='outlined'
                  />
                </div>

                {/* 'Optional URLs' subsection */}
                <div className={classes.rightSubSectionContainer}>
                  <p className={classes.optionalURLsSubSectionDescription}>
                    {t('dashboardTab.applicationsSubTab.appModal.subSectionLabelSix')}
                  </p>

                  <div className={classes.appURLFieldWrapper}>
                    <TextField
                      className={classes.inputFields}
                      error={formState.errors.appWebsiteURL}
                      fullWidth
                      helperText={
                        formState.errors.appWebsiteURL
                          ? formState.errorMsgs.appWebsiteURL
                          : ''
                      }
                      label={t('dashboardTab.applicationsSubTab.appModal.appWebsiteURLFieldLabel')}
                      margin='dense'
                      name='appWebsiteURL'
                      onChange={handleChange}
                      type='url'
                      value={formState.values.appWebsiteURL}
                      variant='outlined'
                    />

                    <div onClick={handleOpenSelector}>
                      <AddRoundedIcon />
                    </div>
                  </div>

                  <Menu
                    anchorEl={anchorElement}
                    onClose={handleCloseSelector}
                    open={Boolean(anchorElement)}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      className={classes.selectorTitle}
                      disabled
                    >
                      {t('dashboardTab.applicationsSubTab.appModal.selectorTitle')}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[0]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 0)}
                    >
                      {t('dashboardTab.applicationsSubTab.appModal.appToSFieldLabel')}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[1]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 1)}
                    >
                      {t('dashboardTab.applicationsSubTab.appModal.appPrivacyPolicyFieldLabel')}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[2]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 2)}
                    >
                      {t('dashboardTab.applicationsSubTab.appModal.appYouTubeChannelFieldLabel')}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled
                    >
                      {t('dashboardTab.applicationsSubTab.appModal.appWebsiteFieldLabel')}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[3]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 3)}
                    >
                      {t('dashboardTab.applicationsSubTab.appModal.appSupportFieldLabel')}
                    </MenuItem>
                  </Menu>

                  {
                    isShowing[0] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appTermsURL}
                        fullWidth
                        helperText={
                          formState.errors.appTermsURL
                            ? formState.errorMsgs.appTermsURL
                            : ''
                        }
                        label={t('dashboardTab.applicationsSubTab.appModal.appToSURLFieldLabel')}
                        margin='dense'
                        name='appTermsURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appTermsURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 0)}>
                        <CloseRoundedIcon />
                      </div>
                    </div>
                  }

                  {
                    isShowing[1] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appPrivacyURL}
                        fullWidth
                        helperText={
                          formState.errors.appPrivacyURL
                            ? formState.errorMsgs.appPrivacyURL
                            : ''
                        }
                        label={t('dashboardTab.applicationsSubTab.appModal.appPrivacyPolicyURLFieldLabel')}
                        margin='dense'
                        name='appPrivacyURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appPrivacyURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 1)}>
                        <CloseRoundedIcon />
                      </div>
                    </div>
                  }

                  {
                    isShowing[2] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appYouTubeURL}
                        fullWidth
                        helperText={
                          formState.errors.appYouTubeURL
                            ? formState.errorMsgs.appYouTubeURL
                            : ''
                        }
                        label={t('dashboardTab.applicationsSubTab.appModal.appYouTubeChannelURLFieldLabel')}
                        margin='dense'
                        name='appYouTubeURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appYouTubeURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 2)}>
                        <CloseRoundedIcon />
                      </div>
                    </div>
                  }

                  {
                    isShowing[3] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appSupportURL}
                        fullWidth
                        helperText={
                          formState.errors.appSupportURL
                            ? formState.errorMsgs.appSupportURL
                            : ''
                        }
                        label={t('dashboardTab.applicationsSubTab.appModal.appSupportURLFieldLabel')}
                        margin='dense'
                        name='appSupportURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appSupportURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 3)}>
                        <CloseRoundedIcon />
                      </div>
                    </div>
                  }
                </div>
              </div>

              <hr className={classes.regularSectionSeparator} />

              {/* 'App action' buttons section */}
              <div className={classes.buttonsContainer}>
                {
                  modalMode === 'new'
                    ? (
                      <>
                        <div>
                          <Button
                            className={
                              formState.values.appName.length !== 0 &&
                                formState.values.appRedirectURI !== 'http://' &&
                                formState.values.appRedirectURI !== 'https://' &&
                                formState.values.appRedirectURI.length !== 0 &&
                                (formState.isValid || Object.keys(formState.errors).length === 0) &&
                                !(allUserAppNames.includes(formState.values.appName)) &&
                                validImage
                                ? classes.enabledAddOrEditButton
                                : classes.disabledAddOrEditButton
                            }
                            onClick={createApp}
                          >
                            {t('dashboardTab.applicationsSubTab.appModal.addAppButtonLabel')}
                          </Button>

                          <Button
                            className={classes.otherButtons}
                            onClick={toggleModal}
                          >
                            {t('dashboardTab.applicationsSubTab.appModal.cancelModalButtonLabel')}
                          </Button>
                        </div>

                        <div className={classes.infoBox}>
                          <QueryBuilderRoundedIcon className={classes.infoBoxIcon} />

                          <div>
                            <p className={classes.infoBoxText}>
                              {t('dashboardTab.applicationsSubTab.appModal.infoBoxTitleLabel')}
                            </p>

                            <p className={classes.infoBoxText}>
                              {t('dashboardTab.applicationsSubTab.appModal.infoBoxSubTitleLabel')}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                    : (
                      <>
                        <div>
                          <Button
                            className={
                              formState.isDirty &&
                                (formState.isValid || Object.keys(formState.errors).length === 0) &&
                                validImage
                                ? classes.enabledAddOrEditButton
                                : classes.disabledAddOrEditButton
                            }
                            onClick={updateApp}
                          >
                            {t('dashboardTab.applicationsSubTab.appModal.editAppButtonLabel')}
                          </Button>

                          <Button
                            className={classes.otherButtons}
                            href='/dashboard/subscriptions'
                            rel='noopener noreferrer'
                            target='_blank'
                          >
                            {t('dashboardTab.applicationsSubTab.appModal.appSubsButtonLabel')}
                          </Button>

                          <Button
                            className={classes.removeAppButton}
                            onClick={handleOpenDialog}
                          >
                            {t('dashboardTab.applicationsSubTab.appModal.removeAppButtonLabel')}
                          </Button>
                        </div>

                        <Button
                          className={classes.otherButtons}
                          onClick={toggleModal}
                        >
                          {t('dashboardTab.applicationsSubTab.appModal.closeModalButtonLabel')}
                        </Button>
                      </>
                    )
                }
              </div>
            </div>
          </div>
        </Fade>
      </Modal>

      {
        openDialog &&
        <CustomizableDialog
          closeDialogCallback={handleCloseDialog}
          confirmButtonCallback={deleteApp}
          confirmButtonLabel={t('dashboardTab.applicationsSubTab.appModal.dialogConfirmButtonLabel')}
          open={openDialog}
          optionalTitleIcon='warning'
          providedSubText={t('dashboardTab.applicationsSubTab.appModal.dialogSubText')}
          providedText={t('dashboardTab.applicationsSubTab.appModal.dialogText')}
          providedTitle={t('dashboardTab.applicationsSubTab.appModal.dialogTitle')}
        />
      }
    </>
  )
}

export default ApplicationsModal
