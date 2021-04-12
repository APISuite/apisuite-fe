import * as React from 'react'

import { useTranslation } from 'react-i18next'

import FormField, { isValidEmail, isValidName } from 'components/FormField'
import Link from 'components/Link'
import Select from 'components/Select'

import { FormFieldEvent } from 'components/FormField/types'
import { SelectOption } from 'components/Select/types'

import { Profile, Role } from 'containers/Profile/types'

import { TeamPageProps } from './types'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'

import celebration from 'assets/celebration.svg'

import useStyles from './styles'

import { ROLES } from 'constants/global'
import { TextField } from '@material-ui/core'

const ROLES_AUTHORIZED_TO_INVITE = [
  ROLES.admin.value,
  ROLES.organizationOwner.value,
]

const TeamPage: React.FC<TeamPageProps> = ({
  changeRole,
  fetchRoleOptions,
  fetchTeamMembers,
  inviteMember,
  requestStatuses,
  resetErrors,
  roleOptions,
  settings,
  teamMembers,
  userProfile,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  /* Triggers the retrieval and storage (on the app's Store, under 'profile > teamMembers') of all team-related
  information we presently have on whatever organisation the user happens to be involved with. */
  React.useEffect(() => {
    if (userProfile) {
      fetchTeamMembers(userProfile.current_org.id)
      fetchRoleOptions()
    }
  }, [fetchRoleOptions, fetchTeamMembers, userProfile])

  const [teamHasMembers, setTeamHasMembers] = React.useState(false)

  React.useEffect(() => {
    if (
      teamMembers[0].Organization.name &&
      teamMembers[0].Role.name &&
      teamMembers[0].User.name
    ) {
      setTeamHasMembers(true)
    }
  })

  const [isInvitationCardVisible, setIsInvitationCardVisible] = React.useState(false)

  const [invitationCardDetails, setInvitationCardDetails] = React.useState({
    idOfSelectedRole: '',
    providedEmail: '',
    providedName: '',
  })

  const roleSelectorOptions = (roles: Role[]) => {
    return roles.map(role => ({
      label: ROLES[role.name]?.label,
      value: role.id,
      group: 'Role',
    }))
  }

  const changeInvitationCardDetails = (changeEvent: FormFieldEvent) => {
    setInvitationCardDetails({
      ...invitationCardDetails,
      [changeEvent.target.name]: changeEvent.target.value,
    })
  }

  const changeInvitationCardRole = (changeEvent: React.ChangeEvent<{}>, selectedRole: SelectOption) => {
    if (changeEvent && selectedRole) {
      setInvitationCardDetails({
        ...invitationCardDetails,
        idOfSelectedRole: selectedRole.value,
      })
    }
  }

  const handleTeamMemberRoleChangeClosure = (idOfTeamMember: number, idOfTeamOrg: string) => {
    return (changeEvent: React.ChangeEvent<{}>, selectedRole: SelectOption) => {
      if (changeEvent && selectedRole) {
        changeRole(idOfTeamMember.toString(), idOfTeamOrg.toString(), selectedRole.value.toString())
      }
    }
  }

  const toggleInvitationCard = () => {
    setIsInvitationCardVisible(!isInvitationCardVisible)
    resetFields()
  }

  const invitationCardErrors = {
    providedEmail: invitationCardDetails.providedEmail.length > 0 && !isValidEmail(invitationCardDetails.providedEmail),
    providedName: invitationCardDetails.providedName.length > 0 && !isValidName(invitationCardDetails.providedName),
    role: !invitationCardDetails.idOfSelectedRole,
  }

  const resetFields = () => {
    invitationCardDetails.providedEmail = ''
    invitationCardDetails.providedName = ''
    invitationCardDetails.idOfSelectedRole = ''
  }

  const canInvite = (roleOfInviter: string) => {
    return ROLES_AUTHORIZED_TO_INVITE.includes(roleOfInviter)
  }

  const getTeamMemberRole = (providedTeamMemberDetails: Profile) => {
    const wantedTeamMember = teamMembers.find((teamMember) => {
      return teamMember.User.id === parseInt(providedTeamMemberDetails.user.id)
    })

    return wantedTeamMember?.Role.name || providedTeamMemberDetails.current_org.role.name
  }

  React.useEffect(() => {
    if (
      requestStatuses.inviteMemberRequest.invited ||
      requestStatuses.inviteMemberRequest.error
    ) {
      setIsInvitationCardVisible(false)
      resetErrors()
      resetFields()
    }
  }, [requestStatuses.inviteMemberRequest])

  const handleInvitationSubmission = (submissionEvent: React.FormEvent<HTMLFormElement>) => {
    submissionEvent.preventDefault()

    // TODO: Eventually include the invited user's name in this request
    inviteMember(
      invitationCardDetails.providedEmail,
      invitationCardDetails.idOfSelectedRole.toString()
    )
  }

  const invitationCard = () => (
    <form
      className={
        invitationCardErrors.providedEmail ||
          invitationCardErrors.providedName ||
          (invitationCardDetails.idOfSelectedRole !== '' && invitationCardErrors.role)
          ? classes.invitationCardOuterContainerWithErrors
          : classes.invitationCardOuterContainerWithoutErrors
      }
      onSubmit={(submissionEvent) => handleInvitationSubmission(submissionEvent)}
    >
      <div className={classes.invitationCardInnerContainer}>
        <Button
          className={
            invitationCardDetails.providedEmail.length === 0 ||
              invitationCardErrors.providedEmail ||
              invitationCardErrors.providedName ||
              invitationCardErrors.role
              ? classes.disabledInviteToTeamButton
              : classes.enabledInviteToTeamButton
          }
          type='submit'
        >
          {
            requestStatuses.inviteMemberRequest.isRequesting
              ? <CircularProgress />
              : 'Send'
          }
        </Button>

        <TextField
          className={classes.invitationCardInputField}
          error={invitationCardErrors.providedEmail}
          fullWidth={false}
          helperText={invitationCardErrors.providedEmail && 'Please provide a valid e-mail.'}
          label='E-mail address'
          name='providedEmail'
          onChange={changeInvitationCardDetails}
          type='email'
          value={invitationCardDetails.providedEmail}
          variant='outlined'
        />

        <TextField
          className={classes.invitationCardInputField}
          error={invitationCardErrors.providedName}
          fullWidth={false}
          helperText={invitationCardErrors.providedName && 'Please provide a valid name.'}
          label='Name'
          name='providedName'
          onChange={changeInvitationCardDetails}
          type='text'
          value={invitationCardDetails.providedName}
          variant='outlined'
        />

        <Select
          className={classes.userRoleSelector}
          options={roleSelectorOptions(roleOptions)}
          onChange={changeInvitationCardRole}
        />
      </div>
    </form>
  )

  const showTeamMembersTable = () => (
    <>
      <div className={classes.teamMembersTable}>
        <div className={classes.tableHeader}>
          {/* Header's left-most part */}
          <p>Team members</p>

          {/* Header's right-most part */}
          <div className={classes.rightMostPart}>
            <p>User role</p>

            <p>Actions</p>
          </div>
        </div>

        {
          teamHasMembers && teamMembers.map((teamMember, index) => {
            /* For every organisation's member, we generate a row. Each row contains:

            - The user's name & status (i.e., 'You', 'Invitation pending', or something else entirely)
            - A role selector (except for the user itself - i.e., 'You')
            - Other actions */
            return (
              <div
                className={
                  index % 2 !== 0
                    ? classes.oddTableRow
                    : classes.evenTableRow
                }
                key={`teamMemberRow${index}`}
              >
                {/* 1 - Row's left-most part (user's name & status) */}
                <div className={classes.userNameAndStatusContainer}>
                  <p className={classes.userName}>
                    {teamMember.User.name}
                  </p>

                  {
                    (teamMember.User.id === parseInt(userProfile.user.id)) &&
                    <p className={classes.userStatus}>You</p>
                  }
                </div>

                {/* 2 - Row's right-most part (role selector & other actions) */}
                <div className={classes.roleSelectorAndOtherActionsContainer}>
                  {/* 2.1 - Role selector */}
                  {
                    /* If the user's profile is available, we render a role selector for each member of whatever
                    organisation this user happens to be involved with - we do not, however, render a role
                    selector for the user itself, as he should not have the ability to change his own role. */
                    userProfile && teamMember.User.id !== parseInt(userProfile.user.id)
                      ? (
                        <Select
                          className={classes.userRoleSelector}
                          disabled={
                            getTeamMemberRole(userProfile) === 'developer' ||
                            ROLES[getTeamMemberRole(userProfile)].level > ROLES[teamMember.Role.name].level
                          }
                          onChange={handleTeamMemberRoleChangeClosure(teamMember.User.id, teamMember.Organization.id)}
                          options={roleSelectorOptions(roleOptions)}
                          selected={
                            roleSelectorOptions(roleOptions).find((roleOption) => {
                              return roleOption.label === ROLES[teamMember.Role.name].label
                            })
                          }
                        />
                      )
                      : (
                        <p className={classes.userRoleText}>
                          {ROLES[getTeamMemberRole(userProfile)].label}
                        </p>
                      )
                  }

                  {/* 2.2 - Other actions */}
                  {/* TODO: Clearly define what actions are to be here */}
                  <MoreVertRoundedIcon className={classes.otherActionsSelector} />
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )

  const invitationCardSection = () => {
    return (
      <>
        <div
          className={
            canInvite(getTeamMemberRole(userProfile))
              ? classes.ableToInviteContainer
              : classes.unableToInviteContainer
          }
        >
          {
            canInvite(getTeamMemberRole(userProfile)) &&
            <Button
              className={classes.toggleInvitationCardButton}
              onClick={toggleInvitationCard}
            >
              {
                isInvitationCardVisible
                  ? 'Cancel invitation'
                  : 'Invite member'
              }
            </Button>
          }

          <Link
            className={classes.linkToProfileContainer}
            to='/profile'
          >
            <ChevronRightRoundedIcon />

            <p>My Profile</p>
          </Link>
        </div>

        <div>
          {
            userProfile && isInvitationCardVisible &&
            invitationCard()
          }
        </div>
      </>
    )
  }

  const teamPageSubtitleTextSelector = (userRole: string) => {
    let teamPageSubtitleText

    if (userRole === 'admin' || userRole === 'organizationOwner') {
      teamPageSubtitleText = (
        <>
          <>As an organisation owner, you can invite other users to your team!</>

          <br />

          <>If users already exist in the </>
          <>{settings.portalName} </>
          <>portal, we’ll simply invite them to join your organisation too.</>
        </>
      )
    } else {
      teamPageSubtitleText = (
        <>
          <>In this page, you can see other members of your team.</>

          <br />

          <>If you wish to have your role changed, please contact your organisation owner or administrator.</>
        </>
      )
    }

    return teamPageSubtitleText
  }

  return (
    <div className='page-container'>
      {
        // If the user has yet to create/join an organisation, (...)
        userProfile.current_org.id === ''
          ? (
            <section className={classes.firstUseContentContainer}>
              <div className={classes.firstUseImageContainer}>
                <img className={classes.firstUseImage} src={celebration} />
              </div>

              <div className={classes.firstUseButtonContainer}>
                <Button
                  className={classes.firstUseButton}
                  href='/profile/organisation'
                >
                  Create your organisation
                </Button>
              </div>

              <Link
                className={classes.firstUseLink}
                to='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580354081/Team+Management'
              >
                Read up on how to manage your team
              </Link>

              <div className={classes.warningBox}>
                <ReportProblemOutlinedIcon className={classes.warningBoxIcon} />

                <p className={classes.warningBoxText}>
                  You need to create an Organisation before you can manage your team. Click on the "Create your Organisation" button above to start.
                </p>
              </div>
            </section>
          )
          : (
            // If the user has already created/joined an organisation, (...)
            <section className={classes.teamPageContentContainer}>
              <h1 className={classes.teamPageTitle}>Team</h1>

              <p className={classes.teamPageSubtitle}>
                {teamPageSubtitleTextSelector(ROLES[getTeamMemberRole(userProfile)].value)}
              </p>

              {
                teamHasMembers
                  ? (
                    <>
                      {showTeamMembersTable()}

                      {invitationCardSection()}

                      <hr className={classes.sectionSeparator} />

                      <p className={classes.userActivityTitle}>User Activity</p>
                    </>
                  )
                  : (
                    <div className={classes.loadingSpinnerContainer}>
                      <CircularProgress />
                    </div>
                  )
              }
            </section>
          )
      }
    </div>
  )
}

export default TeamPage
