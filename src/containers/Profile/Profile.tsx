import * as React from 'react'

import { useTranslation } from 'react-i18next'

import Button from 'components/Button'
import Select from 'components/Select'
import { SelectOption } from 'components/Select/types'
import { isValidImage, isValidPhoneNumber, isValidURL } from 'components/FormField'

import Avatar from '@material-ui/core/Avatar'
import TextField from '@material-ui/core/TextField'

import Close from '@material-ui/icons/Close'
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded'
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded'
import ImageSearchRoundedIcon from '@material-ui/icons/ImageSearchRounded'
import CustomizableDialog from 'components/CustomizableDialog/CustomizableDialog'

import { Organization, ProfileProps } from './types'

import useStyles from './styles'

import { useForm } from 'util/useForm'

const Profile: React.FC<ProfileProps> = ({
  getProfile,
  logout,
  profile,
  updateProfile,
  deleteAccount,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  React.useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'profile')
    of all user-related information we presently have. */
    getProfile()
  }, [getProfile])

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
        message: t('profileTab.overviewTab.warningLabels.userAvatarURL'),
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
        message: t('profileTab.overviewTab.warningLabels.userPhoneNumber'),
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
  }, [profile, resetForm])

  /* Organisation details */

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
      const userAvatarURL = profile.user.avatar ? profile.user.avatar : ''
      const userBio = ''
      const userName = profile.user.name
      const userOrganisation = selectedOrganisation.value.toString()
      const userPhoneNumber = profile.user.mobile ? profile.user.mobile : '0'

      updateProfile(userName, userBio, userAvatarURL, userPhoneNumber, userOrganisation)
    } else {
      const userAvatarURL = formState.values.userAvatarURL
      const userBio = formState.values.userBio
      const userName = formState.values.userName
      const userOrganisation = profile.current_org.id.toString()
      const userPhoneNumber = formState.values.userPhoneNumber
        ? formState.values.userPhoneNumber
        : '0'

      updateProfile(userName, userBio, userAvatarURL, userPhoneNumber, userOrganisation)
    }
  }

  const shouldUpdateProfileDetails = (event: React.ChangeEvent<{}>) => {
    event.preventDefault()

    if (
      currentlySelectedOrganisation &&
      currentlySelectedOrganisation.value &&
      currentlySelectedOrganisation.value !== profile.current_org.id
    ) {
      updateProfileDetails(event, currentlySelectedOrganisation)
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
            <p className={classes.userName}>{profile.user.name}</p>

            <p className={classes.userRole}>
              {
                profile.current_org.role.name === 'admin'
                  ? t('profileTab.overviewTab.roleRelatedLabels.admin')
                  : (profile.current_org.role.name === 'organizationOwner')
                    ? t('profileTab.overviewTab.roleRelatedLabels.orgOwner')
                    : t('profileTab.overviewTab.roleRelatedLabels.developer')
              }
            </p>
          </div>

          <p className={classes.subtitle}>
            {t('profileTab.overviewTab.subtitle')}
          </p>

          <div>
            <p
              className={
                profile.orgs_member.length !== 0
                  ? classes.regularOrganisationDetailsTitle
                  : classes.alternativeOrganisationDetailsTitle
              }
            >
              <>{t('profileTab.overviewTab.orgRelatedLabels.selectorTitle')}</>
            </p>

            {
              profile.orgs_member.length !== 0
                ? (
                  <>
                    <Select
                      className={classes.organisationSelector}
                      customCloseIcon={<ExpandLessRoundedIcon />}
                      customOpenIcon={<ExpandMoreRoundedIcon />}
                      fieldLabel={t('profileTab.overviewTab.orgRelatedLabels.selectorLabel')}
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
                      customButtonClassName={
                        currentlySelectedOrganisation.value !== profile.current_org.id
                          ? classes.enabledOrganisationButton
                          : classes.disabledOrganisationButton
                      }
                      href='profile/organisation'
                      label='Switch'
                      onClick={shouldUpdateProfileDetails}
                    />
                  </>
                )
                : (
                  <Button
                    customButtonClassName={classes.enabledOrganisationButton}
                    href='profile/organisation'
                    label={t('profileTab.overviewTab.orgRelatedLabels.createOrgButtonLabel')}
                  />
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

          <div className={classes.otherActionsContainer}>
            <Button
              customButtonClassName={classes.otherActionsButtons}
              href='profile/security'
              label={t('profileTab.overviewTab.otherActionsLabels.changePassword')}
            />

            <Button
              customButtonClassName={classes.otherActionsButtons}
              href='profile/team'
              label={t('profileTab.overviewTab.otherActionsLabels.viewTeam')}
            />
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
                      label={t('profileTab.overviewTab.userRelatedLabels.userAvatarURL')}
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
              className={classes.inputFields}
              fullWidth
              label={t('profileTab.overviewTab.userRelatedLabels.userName')}
              margin='dense'
              name='userName'
              onChange={handleChange}
              onFocus={handleFocus}
              type='text'
              value={formState.values.userName}
              variant='outlined'
            />

            <TextField
              className={classes.inputFields}
              fullWidth
              label={t('profileTab.overviewTab.userRelatedLabels.userEmailAddress')}
              margin='dense'
              name='userEmailAddress'
              onChange={handleChange}
              onFocus={handleFocus}
              type='email'
              value={formState.values.userEmailAddress}
              variant='outlined'
            />

            <TextField
              className={classes.inputFields}
              error={formState.touched.userPhoneNumber && formState.errors.userPhoneNumber}
              fullWidth
              helperText={
                formState.touched.userPhoneNumber &&
                formState.errors.userPhoneNumber &&
                formState.errorMsgs.userPhoneNumber
              }
              label={t('profileTab.overviewTab.userRelatedLabels.userPhoneNumber')}
              margin='dense'
              name='userPhoneNumber'
              onChange={handleChange}
              onFocus={handleFocus}
              type='tel'
              value={formState.values.userPhoneNumber}
              variant='outlined'
            />

            <Button
              customButtonClassName={
                formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0)
                  ? classes.enabledUpdateDetailsButton
                  : classes.disabledUpdateDetailsButton
              }
              label={t('profileTab.overviewTab.otherActionsLabels.updateProfileDetails')}
              onClick={updateProfileDetails}
            />

            <div className={classes.userStatusAndType}>
              {/* A mere dot */}
              <span>&#9679;</span>

              <p>
                {
                  profile.current_org.role.name === 'admin'
                    ? t('profileTab.overviewTab.roleRelatedLabels.admin')
                    : (profile.current_org.role.name === 'organizationOwner')
                      ? t('profileTab.overviewTab.roleRelatedLabels.orgOwner')
                      : t('profileTab.overviewTab.roleRelatedLabels.developer')
                }
              </p>
            </div>
          </div>

          {/* 'Logout' and 'Delete' buttons div */}
          <div className={classes.otherActionsContainer}>
            <Button
              customButtonClassName={classes.otherActionsButtons}
              href='#'
              label={t('profileTab.overviewTab.otherActionsLabels.logOut')}
              onClick={logout}
            />

            <Button
              customButtonClassName={classes.deleteProfileButton}
              href='#'
              label={t('profileTab.overviewTab.otherActionsLabels.deleteProfile')}
              onClick={handleDelete}
            />
          </div>
        </div>

        {
          openDialog &&
          <CustomizableDialog
            closeDialogCallback={handleCloseDialog}
            confirmButtonCallback={deleteAccount}
            confirmButtonLabel={t('profileTab.overviewTab.otherActionsLabels.deleteProfileModalConfirmButton')}
            open={openDialog}
            providedText={t('profileTab.overviewTab.otherActionsLabels.deleteProfileModalWarningText')}
            providedTitle={t('profileTab.overviewTab.otherActionsLabels.deleteProfileModalTitle')}
          />
        }
      </section>
    </main>
  )
}

export default Profile
