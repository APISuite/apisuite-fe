import React from 'react'
import { useTranslation, Button, Avatar, TextField } from '@apisuite/fe-base'
import Close from '@material-ui/icons/Close'
import CustomizableDialog from 'components/CustomizableDialog/CustomizableDialog'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'

import { useForm } from 'util/useForm'
import Select from 'components/Select'
import { SelectOption } from 'components/Select/types'
import { isValidImage, isValidPhoneNumber, isValidURL } from 'components/FormField'

import useStyles from './styles'
import { Organization, ProfileProps } from './types'

const Profile: React.FC<ProfileProps> = ({
  deleteAccount,
  getProfile,
  logout,
  profile,
  switchOrg,
  updateProfile,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const [ssoIsActive, setSSOIsActive] = React.useState(false)

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'profile')
    of all user-related information we presently have. */
    getProfile()
  }, [getProfile])

  React.useEffect(() => {
    /* Once our store's 'profile' details load, we check its 'oidcProvider'
    field to determine whether the user signed in regularly or by way of SSO.

    If 'oidcProvider' amounts to 'null', it means that the user signed in regularly,
    and if not, it means that the user signed in by way of SSO. */
    if (profile.user.oidcProvider) {
      setSSOIsActive(true)
    }
  }, [profile])

  /*
  User details

  Note:
  - 'formState' refers to our own, local copy of a user's details.
  - 'profile' refers to our stored, back-end approved copy of a user's details.
  */

  let userNameInitials = '...'

  if (profile.user.name) {
    const userNameInitialsArray = profile.user.name.split(' ')

    userNameInitials = userNameInitialsArray[0].charAt(0).toLocaleUpperCase()
  }

  const [avatarHasBeenClicked, setAvatarHasBeenClicked] = React.useState(false)
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

  const {
    formState,
    handleChange,
    handleFocus,
    resetForm,
  } = useForm(
    // Initial user details
    {
      userAvatarURL: '',
      userBio: '',
      userEmailAddress: '',
      userName: '',
      userPhoneNumber: '',
    },
    // Rules for the user details
    {
      userAvatarURL: {
        rules: [
          (URI) => {
            const stringURI = URI.toString()

            if (URI === null || stringURI.length === 0) {
              /* Empty URI? That's okay - it just means we don't want,
              or have an image to display on the user's Avatar. */
              setValidImage(true)
              return true
            } else {
              /* Non-empty URI? Cool! First, we determine if that URI is valid,
              and then we need to check if the URI points to an actual image.
              If any of these conditions are not met, we display an error message. */
              const doesImageExist = isValidURL(stringURI)
              if (doesImageExist) {
                validateAvatar(stringURI)
              }

              return doesImageExist
            }
          },
        ],
        message: t('profileTab.overviewSubTab.warningLabels.userAvatarURL'),
      },

      userPhoneNumber: {
        rules: [
          (phoneNumber) => {
            const stringPhoneNumber = phoneNumber.toString()

            if (stringPhoneNumber.length === 0) {
              return true
            } else {
              return isValidPhoneNumber(phoneNumber)
            }
          },
        ],
        message: t('profileTab.overviewSubTab.warningLabels.userPhoneNumber'),
      },
    })

  /* Whenever the store's 'profile' changes (i.e., upon mounting this component,
  and immediately after saving one's details), our form's values are 'reset'
  to whatever is in 'profile'. */
  React.useEffect(() => {
    resetForm(
      {
        userAvatarURL: profile.user.avatar ? profile.user.avatar : '',
        userBio: '',
        userEmailAddress: profile.user.email,
        userName: profile.user.name,
        userPhoneNumber: (profile.user.mobile && profile.user.mobile !== '0')
          ? profile.user.mobile
          : '',
      },
    )
  // FIXME: adding resetForm to the dependencies causes an infinite loop
  }, [profile])

  /* Organisation details */

  const [profileHasOrgDetails, setProfileHasOrgDetails] = React.useState(false)

  const [currentlySelectedOrganisation, setCurrentlySelectedOrganisation] = React.useState({
    group: '',
    label: '',
    value: '',
  })

  const organisationSelector = (organisations: Organization[]) => {
    return organisations.map((organisation) => ({
      group: '',
      label: organisation.name,
      value: organisation.id,
    }))
  }

  const handleOrganisationSelection = (event: React.ChangeEvent<{}>, selectedOrganisation: SelectOption) => {
    event.preventDefault()

    const newlySelectedOrganisation = {
      group: '',
      label: selectedOrganisation.label,
      value: selectedOrganisation.value,
    }

    setCurrentlySelectedOrganisation(newlySelectedOrganisation)
  }

  React.useEffect(() => {
    // Once our store's 'profile' details load, we check if there's organisation data associated to it
    const hasOrgDetails = Object.keys(profile.current_org).length !== 0 && profile.current_org.id !== ''

    setProfileHasOrgDetails(hasOrgDetails)
  }, [profile])

  React.useEffect(() => {
    // Once our store's 'profile' details load, we store them locally
    setCurrentlySelectedOrganisation({
      group: '',
      label: profile.current_org.name,
      value: profile.current_org.id,
    })
  }, [profile])

  /* All details (i.e., user & organisation details) */

  const updateProfileDetails = (event: React.ChangeEvent<{}>, selectedOrganisation?: SelectOption) => {
    event.preventDefault()

    if (selectedOrganisation && selectedOrganisation.value) {
      const userID = profile.user.id
      const userAvatarURL = profile.user.avatar ? profile.user.avatar : ''
      const userBio = ''
      const userName = profile.user.name
      const userPhoneNumber = profile.user.mobile ? profile.user.mobile : ''

      updateProfile(userID, userName, userBio, userAvatarURL, userPhoneNumber)
    } else {
      const userID = profile.user.id
      const userAvatarURL = formState.values.userAvatarURL
      const userBio = formState.values.userBio
      const userName = formState.values.userName
      const userPhoneNumber = formState.values.userPhoneNumber
        ? formState.values.userPhoneNumber
        : ''

      updateProfile(userID, userName, userBio, userAvatarURL, userPhoneNumber)
    }
  }

  const switchOrganisation = (event: React.ChangeEvent<{}>) => {
    event.preventDefault()

    if (
      currentlySelectedOrganisation &&
      currentlySelectedOrganisation.value &&
      currentlySelectedOrganisation.value !== profile.current_org.id
    ) {
      switchOrg(profile.user.id, currentlySelectedOrganisation.value)
    }
  }

  /* Account deletion */

  const [openDialog, setOpenDialog] = React.useState<boolean>(false)

  const handleDelete = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <main className='page-container'>
      <section className={classes.allUserDetailsContainer}>
        <div className={classes.leftSideDetailsContainer}>
          <div className={classes.userNameAndRoleContainer}>
            <p className={classes.userName}>
              {
                profile.user.name !== ''
                  ? profile.user.name
                  : t('profileTab.overviewSubTab.loadingDetails')
              }
            </p>

            <p className={classes.userRole}>
              {
                !profileHasOrgDetails
                  ? t('profileTab.overviewSubTab.roleRelatedLabels.baseUser')
                  : (
                    profile.current_org.role.name === 'admin'
                      ? t('profileTab.overviewSubTab.roleRelatedLabels.admin')
                      : (
                        profile.current_org.role.name === 'organizationOwner'
                          ? t('profileTab.overviewSubTab.roleRelatedLabels.orgOwner')
                          : t('profileTab.overviewSubTab.roleRelatedLabels.developer')
                      )
                  )
              }
            </p>
          </div>

          <p className={classes.subtitle}>
            {t('profileTab.overviewSubTab.subtitle')}
          </p>

          <div>
            <p className={classes.organisationDetailsTitle}>
              {t('profileTab.overviewSubTab.orgRelatedLabels.selectorTitle')}
            </p>

            {
              profile.orgs_member.length !== 0
                ? (
                  <>
                    <Select
                      className={classes.organisationSelector}
                      customCloseIcon={<ExpandLessRoundedIcon />}
                      customOpenIcon={<ExpandMoreRoundedIcon />}
                      fieldLabel={t('profileTab.overviewSubTab.orgRelatedLabels.selectorLabel')}
                      onChange={handleOrganisationSelection}
                      options={organisationSelector(profile.orgs_member)}
                      selected={
                        organisationSelector(profile.orgs_member).find((selectedOrganisation) => {
                          return currentlySelectedOrganisation.value === ''
                            ? (selectedOrganisation.value === profile.current_org.id)
                            : (selectedOrganisation.value === currentlySelectedOrganisation.value)
                        })
                      }
                    />

                    <Button
                      className={
                        currentlySelectedOrganisation.value !== profile.current_org.id
                          ? classes.enabledOrganisationButton
                          : classes.disabledOrganisationButton
                      }
                      onClick={switchOrganisation}
                    >
                      {t('profileTab.overviewSubTab.orgRelatedLabels.switchOrgButtonLabel')}
                    </Button>
                  </>
                )
                : (
                  <Button
                    className={classes.createOrganisationButton}
                    href='profile/organisation'
                  >
                    {t('profileTab.overviewSubTab.orgRelatedLabels.createOrgButtonLabel')}
                  </Button>
                )
            }
          </div>

          <hr
            className={
              profile.orgs_member.length !== 0
                ? classes.regularSectionSeparator
                : classes.alternativeSectionSeparator
            }
          />

          <div className={classes.otherActionsContainerOne}>
            {
              !ssoIsActive &&
              <Button
                className={classes.otherActionsButtons}
                href='profile/security'
              >
                {t('profileTab.overviewSubTab.otherActionsLabels.changePassword')}
              </Button>
            }

            <Button
              className={classes.otherActionsButtons}
              href='profile/team'
            >
              {t('profileTab.overviewSubTab.otherActionsLabels.viewTeam')}
            </Button>
          </div>
        </div>

        <div className={classes.rightSideDetailsContainer}>
          {/* 'Form' div */}
          <div className={classes.formFieldsContainer}>
            <div>
              {
                avatarHasBeenClicked
                  ? (
                    <Close
                      className={classes.avatarIcons}
                      onClick={() => setAvatarHasBeenClicked(!avatarHasBeenClicked)}
                    />
                  )
                  : (
                    <ImageSearchRoundedIcon
                      className={classes.avatarIcons}
                      onClick={() => setAvatarHasBeenClicked(!avatarHasBeenClicked)}
                    />
                  )
              }

              <Avatar
                className={classes.avatar}
                src={formState.values.userAvatarURL}
                onClick={() => setAvatarHasBeenClicked(!avatarHasBeenClicked)}
              >
                {userNameInitials}
              </Avatar>

              {
                avatarHasBeenClicked
                  ? (
                    <TextField
                      className={classes.inputFields}
                      error={(formState.touched.userAvatarURL && formState.errors.userAvatarURL) || !validImage}
                      fullWidth
                      helperText={
                        ((formState.touched.userAvatarURL &&
                          formState.errors.userAvatarURL) || !validImage) &&
                        formState.errorMsgs.userAvatarURL
                      }
                      label={t('profileTab.overviewSubTab.userRelatedLabels.userAvatarURL')}
                      margin='dense'
                      name='userAvatarURL'
                      onChange={handleChange}
                      onFocus={handleFocus}
                      type='url'
                      value={formState.values.userAvatarURL}
                      variant='outlined'
                    />
                  )
                  : null
              }
            </div>

            <hr className={classes.formSectionSeparator} />

            <TextField
              className={
                !ssoIsActive
                  ? classes.inputFields
                  : classes.disabledInputFields
              }
              fullWidth
              label={t('profileTab.overviewSubTab.userRelatedLabels.userName')}
              margin='dense'
              name='userName'
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              value={formState.values.userName}
              variant='outlined'
            />

            <TextField
              className={
                !ssoIsActive
                  ? classes.inputFields
                  : classes.disabledInputFields
              }
              fullWidth
              label={t('profileTab.overviewSubTab.userRelatedLabels.userEmailAddress')}
              margin='dense'
              name='userEmailAddress'
              onChange={handleChange}
              onFocus={handleFocus}
              type='email'
              value={formState.values.userEmailAddress}
              variant='outlined'
            />

            {
              !ssoIsActive &&
              (
                <>
                  <TextField
                    className={classes.inputFields}
                    error={formState.touched.userPhoneNumber && formState.errors.userPhoneNumber}
                    fullWidth
                    helperText={
                      formState.touched.userPhoneNumber &&
                      formState.errors.userPhoneNumber &&
                      formState.errorMsgs.userPhoneNumber
                    }
                    label={t('profileTab.overviewSubTab.userRelatedLabels.userPhoneNumber')}
                    margin='dense'
                    name='userPhoneNumber'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    type='tel'
                    value={formState.values.userPhoneNumber}
                    variant='outlined'
                  />

                  <Button
                    className={
                      formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0)
                        ? classes.enabledUpdateDetailsButton
                        : classes.disabledUpdateDetailsButton
                    }
                    onClick={updateProfileDetails}
                  >
                    {t('profileTab.overviewSubTab.otherActionsLabels.updateProfileDetails')}
                  </Button>
                </>
              )
            }

            <div className={classes.userStatusAndType}>
              {/* A mere dot */}
              <span>&#9679;</span>

              <p>
                {
                  !profileHasOrgDetails
                    ? t('profileTab.overviewSubTab.roleRelatedLabels.baseUser')
                    : (
                      profile.current_org.role.name === 'admin'
                        ? t('profileTab.overviewSubTab.roleRelatedLabels.admin')
                        : (
                          profile.current_org.role.name === 'organizationOwner'
                            ? t('profileTab.overviewSubTab.roleRelatedLabels.orgOwner')
                            : t('profileTab.overviewSubTab.roleRelatedLabels.developer')
                        )
                    )
                }
              </p>
            </div>
          </div>

          {/* 'Logout' and 'Delete' buttons div */}
          <div className={classes.otherActionsContainerTwo}>
            <Button
              className={classes.deleteAccountButton}
              onClick={handleDelete}
            >
              {t('profileTab.overviewSubTab.otherActionsLabels.deleteAccount')}
            </Button>

            <Button
              className={classes.signOutButton}
              onClick={logout}
            >
              {t('profileTab.overviewSubTab.otherActionsLabels.signOut')}
            </Button>
          </div>
        </div>

        {
          openDialog &&
          <CustomizableDialog
            closeDialogCallback={handleCloseDialog}
            confirmButtonCallback={() => {
              deleteAccount()

              handleCloseDialog()
            }}
            confirmButtonLabel={t('profileTab.overviewSubTab.otherActionsLabels.deleteAccountModalConfirmButton')}
            open={openDialog}
            optionalTitleIcon='warning'
            providedText={
              t('profileTab.overviewSubTab.otherActionsLabels.deleteAccountModalWarningText') +
              ` ${profile.user.email}?`
            }
            providedSubText={t('profileTab.overviewSubTab.otherActionsLabels.deleteAccountModalWarningSubText')}
            providedTitle={t('profileTab.overviewSubTab.otherActionsLabels.deleteAccountModalTitle')}
          />
        }
      </section>

      {
        ssoIsActive &&
        <section className={classes.openIDInfoBoxContainer}>
          <div className={classes.infoBox}>
            <InfoRoundedIcon className={classes.infoBoxIcon} />

            <div>
              <p className={classes.infoBoxText}>
                {t('profileTab.overviewSubTab.openIDInfoBoxContainerPartOne')}
              </p>

              <p className={classes.infoBoxText}>
                <span>
                  <a
                    href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/760774663/Open+ID'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {t('profileTab.overviewSubTab.openIDInfoBoxContainerPartTwo')}
                  </a>
                </span>
                <span>{t('profileTab.overviewSubTab.openIDInfoBoxContainerPartThree')}</span>
              </p>
            </div>
          </div>
        </section>
      }
    </main>
  )
}

export default Profile
