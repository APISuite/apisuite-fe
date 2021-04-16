import React from 'react'
import { useTranslation, Button, CircularProgress } from '@apisuite/fe-base'

import { ROLES } from 'constants/global'
import Select from 'components/Select'
import { FetchTeamMembersResponse, Role } from 'containers/Profile/types'
import { User } from 'containers/Auth/types'
import FormField, { isValidEmail } from 'components/FormField'

import { FormFieldEvent } from 'components/FormField/types'
import { SelectOption } from 'components/Select/types'

import useStyles from './styles'
import { TeamPageProps } from './types'

const AUTHORIZED_ROLES = [
  ROLES.admin.value,
  ROLES.organizationOwner.value,
]

const TeamPage: React.FC<TeamPageProps> = ({
  changeRole,
  currentOrganisation,
  fetchRoleOptions,
  fetchTeamMembers,
  inviteMember,
  members,
  requestStatuses,
  resetErrors,
  roleOptions,
  user,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  const [inviteVisible, showInvite] = React.useState(false)

  const [input, setInput] = React.useState({
    email: '',
    roleId: '',
  })

  const selectOptions = (roles: Role[]) => {
    return roles.map(role => ({
      label: ROLES[role.name]?.label,
      value: role.id,
      group: 'Role',
    }))
  }

  const handleInputs = (e: FormFieldEvent) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  React.useEffect(() => {
    if (Object.keys(currentOrganisation).length !== 0 && currentOrganisation.id !== '') {
      fetchTeamMembers()

      fetchRoleOptions()
    }
  }, [fetchRoleOptions, fetchTeamMembers])

  function chooseRole (e: React.ChangeEvent<{}>, option: SelectOption) {
    if (e && option) {
      setInput({
        ...input,
        roleId: option.value,
      })
    }
  }

  const handleChangeRole = (userId: number, orgId: string) => (e: React.ChangeEvent<{}>, option: SelectOption) => {
    e.preventDefault()
    // TODO: review; there's is something wrongly typed somewhere
    if (option.value) changeRole(userId.toString(), orgId.toString(), option.value.toString())
  }

  const toggle = () => {
    showInvite(true)
  }

  const inputErrors = {
    email: input.email.length > 0 && !isValidEmail(input.email),
    role: !input.roleId,
  }

  const resetFields = () => {
    input.email = ''
  }

  const canInvite = (role: string) => {
    return AUTHORIZED_ROLES.includes(role)
  }

  const isEmpty = (members: FetchTeamMembersResponse[], roleOptions: Role[]) => {
    // check if the arrays contain empty data
    const hasEmptyMember = members.some((m) => !(m.Organization.id && m.Role.id && m.User.id))
    const hasEmptyRole = roleOptions.some((r) => !(r.id && r.name))

    return hasEmptyMember || hasEmptyRole
  }

  const getUserMemberRole = (user: User) => {
    const member = members.find((member) => user.id === member.User.id)
    return member?.Role || user.role
  }

  React.useEffect(() => {
    if (requestStatuses.inviteMemberRequest.invited || requestStatuses.inviteMemberRequest.error) {
      showInvite(false)
      resetErrors()
      resetFields()
    }
  }, [requestStatuses.inviteMemberRequest])

  const inviteCard = () => (
    <form
      className={classes.inviteCard}
      onSubmit={(e) => {
        e.preventDefault()

        inviteMember(input.email, input.roleId.toString())
      }}
    >
      <Button
        className={classes.btn}
        disabled={input.email.length === 0 || inputErrors.email || inputErrors.role}
        type='submit'
      >
        {
          requestStatuses.inviteMemberRequest.isRequesting
            ? <CircularProgress className={classes.loading} size={20} />
            : t('rbac.team.send')
        }
      </Button>

      <FormField
        autoFocus
        error={inputErrors.email}
        errorPlacing='bottom'
        fullWidth={false}
        helperText={inputErrors.email && 'Please insert a valid email.'}
        id='email-field'
        InputProps={{
          classes: { input: classes.emailTextfield },
        }}
        label='E-mail'
        name='email'
        onChange={handleInputs}
        placeholder='john.doe@email.com'
        type='email'
        value={input.email}
        variant='outlined'
      />

      <Select
        className={classes.select}
        onChange={chooseRole}
        options={selectOptions(roleOptions)}
      />
    </form>
  )

  const showMembers = () => (
    <>
      <div className={classes.table}>
        <div className={classes.header}>
          <div>{t('rbac.team.header')}</div>
          <div className={classes.actions}>{t('rbac.team.actions')}</div>
        </div>

        {
          !isEmpty(members, roleOptions) && members.map((member, indx) => (
            <div key={indx} className={classes.row}>
              <div>
                <div className={classes.name}>
                  {member.User.name}
                </div>

                <div>
                  <p className={classes.auth}>{`Current role: ${ROLES[member.Role.name]?.label}`}</p>
                </div>
              </div>

              {
                user &&
                <Select
                  className={classes.select}
                  disabled={getUserMemberRole(user).name === 'developer' || user.id === member.User.id || ROLES[getUserMemberRole(user).name].level > ROLES[member.Role.name].level}
                  onChange={handleChangeRole(member.User.id, member.Organization.id)}
                  options={selectOptions(roleOptions)}
                  selected={selectOptions(roleOptions).find(option => option.label === ROLES[member.Role.name].label)}
                />
              }
            </div>
          ))
        }
      </div>

      {
        !inviteVisible && user
          ? (
            canInvite(getUserMemberRole(user).name) &&
            <Button className={classes.btn} onClick={toggle} style={{ marginTop: 24 }}>{t('rbac.team.invite')} </Button>
          )
          : inviteCard()
      }
    </>
  )

  const loading = requestStatuses.getMembersRequest.isRequesting || requestStatuses.getRolesRequest.isRequesting

  return (
    <div className={`page-container ${classes.root}`}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('rbac.team.title')}</h1>

        <>
          {
            loading &&
            <div className={classes.loadingPage}>
              <CircularProgress size={50} />
            </div>
          }

          {!loading && showMembers()}
        </>
      </section>
    </div>
  )
}

export default TeamPage
