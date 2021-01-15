import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import { isValidImage, isValidURL } from 'components/FormField/index'

import Avatar from '@material-ui/core/Avatar'
import Fade from '@material-ui/core/Fade'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import AddRoundedIcon from '@material-ui/icons/AddRounded'
import Close from '@material-ui/icons/Close'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'

import { OrganisationPageProps } from './types'

import useStyles from './styles'

import { useForm } from 'util/useForm'

import { config } from 'constants/global'

const OrganisationPage: React.FC<OrganisationPageProps> = ({
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
  const [validImage, setValidImage] = React.useState<boolean>(false)

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
        rules: [(URI) => uriBasicChecks(URI) && validImage],
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
                  />
                )
                : (
                  <ImageSearchRoundedIcon
                    className={classes.avatarIcons}
                  />
                )
            }

            <Avatar
              className={
                avatarInputIsInFocus
                  ? classes.focusedAvatar
                  : classes.notFocusedAvatar
              }
              src={formState.values.orgAvatarURL}
            >
              {orgNameInitials}
            </Avatar>

            <TextField
              className={classes.avatarURLInputField}
              error={formState.touched.orgAvatarURL && formState.errors.orgAvatarURL}
              fullWidth
              helperText={
                formState.touched.orgAvatarURL && formState.errors.orgAvatarURL
                  ? formState.errorMsgs.orgAvatarURL
                  : t('profileTab.organisationSubTab.fieldLabels.orgAvatarSubLabel', { config })
              }
              InputLabelProps={{
                shrink: true,
              }}
              label={t('profileTab.organisationSubTab.fieldLabels.orgAvatarLabel', { config })}
              margin='dense'
              name='orgAvatarURL'
              onChange={(changeEvent) => {
                handleChange(changeEvent)
                validateAvatar(formState.values.orgAvatarURL)
              }}
              onFocus={(focusEvent) => {
                handleFocus(focusEvent)
                setAvatarInputIsInFocus(true)
                validateAvatar(formState.values.orgAvatarURL)
              }}
              onBlur={() => {
                formState.values.orgAvatarURL
                  ? setAvatarInputIsInFocus(true)
                  : setAvatarInputIsInFocus(false)
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
              Additional information
            </p>

            <TextField
              className={classes.inputFields}
              fullWidth
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
                error={formState.touched.orgWebsiteURL && formState.errors.orgWebsiteURL}
                fullWidth
                helperText={
                  formState.touched.orgWebsiteURL && formState.errors.orgWebsiteURL
                    ? formState.errorMsgs.orgWebsiteURL
                    : ''
                }
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
                  error={formState.touched.orgTermsURL && formState.errors.orgTermsURL}
                  fullWidth
                  helperText={
                    formState.touched.orgTermsURL && formState.errors.orgTermsURL
                      ? formState.errorMsgs.orgTermsURL
                      : ''
                  }
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
                  error={formState.touched.orgPrivacyURL && formState.errors.orgPrivacyURL}
                  fullWidth
                  helperText={
                    formState.touched.orgPrivacyURL && formState.errors.orgPrivacyURL
                      ? formState.errorMsgs.orgPrivacyURL
                      : ''
                  }
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
                  error={formState.touched.orgYouTubeURL && formState.errors.orgYouTubeURL}
                  fullWidth
                  helperText={
                    formState.touched.orgYouTubeURL && formState.errors.orgYouTubeURL
                      ? formState.errorMsgs.orgYouTubeURL
                      : ''
                  }
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
                  error={formState.touched.orgSupportURL && formState.errors.orgSupportURL}
                  fullWidth
                  helperText={
                    formState.touched.orgSupportURL && formState.errors.orgSupportURL
                      ? formState.errorMsgs.orgSupportURL
                      : ''
                  }
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
                customButtonClassName={
                  formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0)
                    ? classes.enabledUpdateDetailsButton
                    : classes.disabledUpdateDetailsButton
                }
                label={t('profileTab.organisationSubTab.buttonLabels.updateOrgButtonLabel', { config })}
                onClick={updateOrgDetails}
              />
            )
            : (
              <Button
                customButtonClassName={
                  formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0)
                    ? classes.enabledCreateOrgButton
                    : classes.disabledCreateOrgButton
                }
                label={t('profileTab.organisationSubTab.buttonLabels.createOrgButtonLabel', { config })}
                onClick={createOrgDetails}
              />
            )
        }
      </section>
    </main>
  )
}

export default OrganisationPage
