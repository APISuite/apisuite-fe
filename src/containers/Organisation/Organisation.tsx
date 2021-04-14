import * as React from 'react'

import { useTranslation } from 'react-i18next'

import { isValidImage, isValidURL } from 'components/FormField/index'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import AddRoundedIcon from '@material-ui/icons/AddRounded'
import Close from '@material-ui/icons/Close'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'

import { OrganisationProps } from './types'

import useStyles from './styles'

import { useForm } from 'util/useForm'

import { config } from 'constants/global'

const Organisation: React.FC<OrganisationProps> = ({
  createOrg,
  fetchOrg,
  org,
  profile,
  updateOrg,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'profile > org')
    of all organisation-related information we presently have. */
    fetchOrg(profile.current_org.id)
  }, [fetchOrg])

  /*
  Organisation details

  Note:
  - 'formState' refers to our own, local copy of a organisation's details.
  - 'org' refers to our stored, back-end approved copy of a user's organisation details (under 'profile > org').
  - 'profile' refers to our stored, back-end approved copy of a user's details (under 'profile > profile').
  */

  let orgNameInitials = '...'

  if (org.name) {
    const orgNameInitialsArray = org.name.split(' ')

    orgNameInitials = orgNameInitialsArray[0].charAt(0).toLocaleUpperCase()
  }

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
    // Initial organisation details
    {
      orgAvatarURL: '',
      orgDescription: '',
      orgName: '',
      orgPrivacyURL: '',
      orgSupportURL: '',
      orgTermsURL: '',
      orgVAT: '',
      orgWebsiteURL: '',
      orgYouTubeURL: '',
    },
    // Rules for the organisation details
    {
      orgAvatarURL: {
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
        message: t('profileTab.organisationSubTab.warningLabels.orgAvatarURL', { config }),
      },

      orgPrivacyURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('profileTab.organisationSubTab.warningLabels.allOtherURLs', { config }),
      },

      orgSupportURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('profileTab.organisationSubTab.warningLabels.allOtherURLs', { config }),
      },

      orgTermsURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('profileTab.organisationSubTab.warningLabels.allOtherURLs', { config }),
      },

      orgWebsiteURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('profileTab.organisationSubTab.warningLabels.allOtherURLs', { config }),
      },

      orgYouTubeURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t('profileTab.organisationSubTab.warningLabels.allOtherURLs', { config }),
      },
    })

  /* Whenever the store's 'profile > org' changes (i.e., upon mounting this component,
  and immediately after saving one's details), our form's values are 'reset'
  to whatever is now in 'profile > org'. */
  React.useEffect(() => {
    resetForm({
      orgAvatarURL: org.logo ? org.logo : '',
      orgDescription: org.description ? org.description : '',
      orgName: org.name ? org.name : '',
      orgPrivacyURL: org.privacyUrl ? org.privacyUrl : '',
      orgSupportURL: org.supportUrl ? org.supportUrl : '',
      orgTermsURL: org.tosUrl ? org.tosUrl : '',
      orgVAT: org.vat ? org.vat : '',
      orgWebsiteURL: org.websiteUrl ? org.websiteUrl : '',
      orgYouTubeURL: org.youtubeUrl ? org.youtubeUrl : '',
    })
  }, [org])

  /* All organisation details */

  const createOrgDetails = (event: React.ChangeEvent<{}>) => {
    event.preventDefault()

    const newOrgDetails = {
      name: formState.values.orgName,
      description: formState.values.orgDescription,
      vat: formState.values.orgVAT,
      tosUrl: formState.values.orgTermsURL,
      privacyUrl: formState.values.orgPrivacyURL,
      youtubeUrl: formState.values.orgYouTubeURL,
      websiteUrl: formState.values.orgWebsiteURL,
      supportUrl: formState.values.orgSupportURL,
      logo: formState.values.orgAvatarURL,
    }

    createOrg(newOrgDetails)
  }

  const updateOrgDetails = (event: React.ChangeEvent<{}>) => {
    event.preventDefault()

    const orgId = org.id.toString()

    const orgDetails = {
      name: formState.values.orgName,
      description: formState.values.orgDescription,
      vat: formState.values.orgVAT,
      tosUrl: formState.values.orgTermsURL,
      privacyUrl: formState.values.orgPrivacyURL,
      youtubeUrl: formState.values.orgYouTubeURL,
      websiteUrl: formState.values.orgWebsiteURL,
      supportUrl: formState.values.orgSupportURL,
      logo: formState.values.orgAvatarURL,
    }

    updateOrg(orgId, orgDetails)
  }

  /* URL selector */

  const [anchorElement, setAnchorElement] = React.useState(null)
  const [isShowing, setIsShowing] = React.useState([false, false, false, false])

  /* Whenever the store's 'profile > org' details become available
  (i.e., upon mounting this component, and immediately after saving one's details),
  we need to determine what optional URLs have been provided, and are meant to be shown. */
  React.useEffect(() => {
    setIsShowing([
      !!org.tosUrl,
      !!org.privacyUrl,
      !!org.youtubeUrl,
      !!org.supportUrl,
    ])
  }, [org])

  const handleOpenSelector = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()

    setAnchorElement((event as any).currentTarget)
  }

  const handleCloseSelector = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation()

    setAnchorElement(null)
  }

  const handleShowOrgURLField = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    indexOfFormFieldToAdd: number,
  ) => {
    event.stopPropagation()

    const newIsShowingArray = [...isShowing]

    newIsShowingArray[indexOfFormFieldToAdd] = true

    setIsShowing(newIsShowingArray)
    setAnchorElement(null)
  }

  const handleHideOrgURLField = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    indexOfFormFieldToRemove: number,
  ) => {
    event.stopPropagation()

    const newIsShowingArray = [...isShowing]

    newIsShowingArray[indexOfFormFieldToRemove] = false

    if (indexOfFormFieldToRemove === 0 && formState.values.orgTermsURL) {
      formState.values.orgTermsURL = ''
      // @ts-ignore
      delete formState.errors.orgTermsURL
      formState.isDirty = !!org.tosUrl
    } else if (indexOfFormFieldToRemove === 1 && formState.values.orgPrivacyURL) {
      formState.values.orgPrivacyURL = ''
      // @ts-ignore
      delete formState.errors.orgPrivacyURL
      formState.isDirty = !!org.privacyUrl
    } else if (indexOfFormFieldToRemove === 2 && formState.values.orgYouTubeURL) {
      formState.values.orgYouTubeURL = ''
      // @ts-ignore
      delete formState.errors.orgYouTubeURL
      formState.isDirty = !!org.youtubeUrl
    } else if (indexOfFormFieldToRemove === 3 && formState.values.orgSupportURL) {
      formState.values.orgSupportURL = ''
      // @ts-ignore
      delete formState.errors.orgSupportURL
      formState.isDirty = !!org.supportUrl
    }

    setIsShowing(newIsShowingArray)
    setAnchorElement(null)
  }

  return (
    <main className='page-container'>
      <section className={classes.orgDetailsContainer}>
        <section className={classes.orgTitleAndSubtitleContainer}>
          <p className={classes.orgTitle}>
            {
              org.name
                ? org.name
                : t('profileTab.organisationSubTab.newOrgTitle', { config })
            }
          </p>

          <p className={classes.orgSubtitle}>
            {t('profileTab.organisationSubTab.orgSubtitle', { config })}
          </p>
        </section>

        <section className={classes.orgMainDetailsContainer}>
          <section className={classes.leftSideDetailsContainer}>
            <TextField
              className={classes.inputFields}
              fullWidth
              InputLabelProps={{ shrink: true }}
              label={t('profileTab.organisationSubTab.fieldLabels.orgNameLabel', { config })}
              margin='dense'
              name='orgName'
              onChange={handleChange}
              type='text'
              value={formState.values.orgName}
              variant='outlined'
            />

            <TextField
              className={classes.inputFields}
              fullWidth
              InputLabelProps={{ shrink: true }}
              label={t('profileTab.organisationSubTab.fieldLabels.orgVATLabel', { config })}
              margin='dense'
              name='orgVAT'
              onChange={handleChange}
              type='text'
              value={formState.values.orgVAT}
              variant='outlined'
            />
          </section>

          <section className={classes.rightSideDetailsContainer}>
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
                avatarInputIsInFocus || formState.values.orgAvatarURL
                  ? classes.focusedAvatar
                  : classes.notFocusedAvatar
              }
              src={formState.values.orgAvatarURL}
            >
              {orgNameInitials}
            </Avatar>

            <TextField
              className={classes.avatarURLInputField}
              error={(formState.touched.orgAvatarURL && formState.errors.orgAvatarURL) || !validImage}
              fullWidth
              helperText={
                (formState.touched.orgAvatarURL && formState.errors.orgAvatarURL) || !validImage
                  ? formState.errorMsgs.orgAvatarURL
                  : t('profileTab.organisationSubTab.fieldLabels.orgAvatarSubLabel', { config })
              }
              inputRef={(input) =>
                avatarInputIsInFocus ? input && input.focus() : input && input.blur()}
              InputLabelProps={{
                shrink: true,
              }}
              label={t('profileTab.organisationSubTab.fieldLabels.orgAvatarLabel', { config })}
              margin='dense'
              name='orgAvatarURL'
              onBlur={() => {
                setAvatarInputIsInFocus(false)
              }}
              onChange={handleChange}
              onFocus={(focusEvent) => {
                handleFocus(focusEvent)
                setAvatarInputIsInFocus(true)
              }}
              type='url'
              value={formState.values.orgAvatarURL}
              variant='outlined'
            />
          </section>
        </section>

        <hr className={classes.firstSectionSeparator} />

        <section className={classes.orgAdditionalDetailsContainer}>
          <section className={classes.leftSideDetailsContainer}>
            <p className={classes.orgAdditionalDetailsTitle}>
              {t('profileTab.organisationSubTab.orgAdditionalDetailsTitle', { config })}
            </p>

            <TextField
              className={classes.inputFields}
              fullWidth
              InputLabelProps={{ shrink: true }}
              label={t('profileTab.organisationSubTab.fieldLabels.orgDescriptionLabel', { config })}
              margin='dense'
              multiline
              name='orgDescription'
              onChange={handleChange}
              rows={5}
              type='text'
              value={formState.values.orgDescription}
              variant='outlined'
            />
          </section>

          <section className={classes.rightSideDetailsContainer}>
            <p className={classes.orgAdditionalDetailsSubtitle}>
              {t('profileTab.organisationSubTab.orgAdditionalDetailsSubtitle', { config })}
            </p>

            <div className={classes.orgURLFieldWrapper}>
              <TextField
                className={classes.inputFields}
                error={formState.errors.orgWebsiteURL}
                fullWidth
                helperText={
                  formState.errors.orgWebsiteURL
                    ? formState.errorMsgs.orgWebsiteURL
                    : ''
                }
                InputLabelProps={{ shrink: true }}
                label={t('profileTab.organisationSubTab.fieldLabels.orgWebsiteLabel', { config })}
                margin='dense'
                name='orgWebsiteURL'
                onChange={handleChange}
                type='url'
                value={formState.values.orgWebsiteURL}
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
                {t('profileTab.organisationSubTab.selectorTitle', { config })}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[0]}
                onClick={(clickEvent) => handleShowOrgURLField(clickEvent, 0)}
              >
                {t('profileTab.organisationSubTab.fieldLabels.orgToSLabel', { config })}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[1]}
                onClick={(clickEvent) => handleShowOrgURLField(clickEvent, 1)}
              >
                {t('profileTab.organisationSubTab.fieldLabels.orgPrivacyPolicyLabel', { config })}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[2]}
                onClick={(clickEvent) => handleShowOrgURLField(clickEvent, 2)}
              >
                {t('profileTab.organisationSubTab.fieldLabels.orgYouTubeChannelLabel', { config })}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled
              >
                {t('profileTab.organisationSubTab.fieldLabels.orgWebsiteLabel', { config })}
              </MenuItem>

              <MenuItem
                className={classes.selectorOption}
                disabled={isShowing[3]}
                onClick={(clickEvent) => handleShowOrgURLField(clickEvent, 3)}
              >
                {t('profileTab.organisationSubTab.fieldLabels.orgSupportLabel', { config })}
              </MenuItem>
            </Menu>

            {
              isShowing[0] &&
              <div className={classes.orgURLFieldWrapper}>
                <TextField
                  className={classes.inputFields}
                  error={formState.errors.orgTermsURL}
                  fullWidth
                  helperText={
                    formState.errors.orgTermsURL
                      ? formState.errorMsgs.orgTermsURL
                      : ''
                  }
                  InputLabelProps={{ shrink: true }}
                  label={t('profileTab.organisationSubTab.fieldLabels.orgToSLabel', { config })}
                  margin='dense'
                  name='orgTermsURL'
                  onChange={handleChange}
                  type='url'
                  value={formState.values.orgTermsURL}
                  variant='outlined'
                />

                <div onClick={(clickEvent) => handleHideOrgURLField(clickEvent, 0)}>
                  <CloseRoundedIcon />
                </div>
              </div>
            }

            {
              isShowing[1] &&
              <div className={classes.orgURLFieldWrapper}>
                <TextField
                  className={classes.inputFields}
                  error={formState.errors.orgPrivacyURL}
                  fullWidth
                  helperText={
                    formState.errors.orgPrivacyURL
                      ? formState.errorMsgs.orgPrivacyURL
                      : ''
                  }
                  InputLabelProps={{ shrink: true }}
                  label={t('profileTab.organisationSubTab.fieldLabels.orgPrivacyPolicyLabel', { config })}
                  margin='dense'
                  name='orgPrivacyURL'
                  onChange={handleChange}
                  type='url'
                  value={formState.values.orgPrivacyURL}
                  variant='outlined'
                />

                <div onClick={(clickEvent) => handleHideOrgURLField(clickEvent, 1)}>
                  <CloseRoundedIcon />
                </div>
              </div>
            }

            {
              isShowing[2] &&
              <div className={classes.orgURLFieldWrapper}>
                <TextField
                  className={classes.inputFields}
                  error={formState.errors.orgYouTubeURL}
                  fullWidth
                  helperText={
                    formState.errors.orgYouTubeURL
                      ? formState.errorMsgs.orgYouTubeURL
                      : ''
                  }
                  InputLabelProps={{ shrink: true }}
                  label={t('profileTab.organisationSubTab.fieldLabels.orgYouTubeChannelLabel', { config })}
                  margin='dense'
                  name='orgYouTubeURL'
                  onChange={handleChange}
                  type='url'
                  value={formState.values.orgYouTubeURL}
                  variant='outlined'
                />

                <div onClick={(clickEvent) => handleHideOrgURLField(clickEvent, 2)}>
                  <CloseRoundedIcon />
                </div>
              </div>
            }

            {
              isShowing[3] &&
              <div className={classes.orgURLFieldWrapper}>
                <TextField
                  className={classes.inputFields}
                  error={formState.errors.orgSupportURL}
                  fullWidth
                  helperText={
                    formState.errors.orgSupportURL
                      ? formState.errorMsgs.orgSupportURL
                      : ''
                  }
                  InputLabelProps={{ shrink: true }}
                  label={t('profileTab.organisationSubTab.fieldLabels.orgSupportLabel', { config })}
                  margin='dense'
                  name='orgSupportURL'
                  onChange={handleChange}
                  type='url'
                  value={formState.values.orgSupportURL}
                  variant='outlined'
                />

                <div onClick={(clickEvent) => handleHideOrgURLField(clickEvent, 3)}>
                  <CloseRoundedIcon />
                </div>
              </div>
            }
          </section>
        </section>

        <hr className={classes.secondSectionSeparator} />

        {
          org.name
            ? (
              <Button
                className={
                  formState.isDirty &&
                (formState.isValid || Object.keys(formState.errors).length === 0) &&
                validImage
                    ? classes.enabledUpdateDetailsButton
                    : classes.disabledUpdateDetailsButton
                }
                onClick={updateOrgDetails}
              >
                {t('profileTab.organisationSubTab.buttonLabels.updateOrgButtonLabel', { config })}
              </Button>
            )
            : (
              <Button
                className={
                  formState.isDirty &&
                (formState.isValid || Object.keys(formState.errors).length === 0) &&
                validImage
                    ? classes.enabledCreateOrgButton
                    : classes.disabledCreateOrgButton
                }
                onClick={createOrgDetails}
              >
                {t('profileTab.organisationSubTab.buttonLabels.createOrgButtonLabel', { config })}
              </Button>
            )
        }
      </section>
    </main>
  )
}

export default Organisation
