import React from 'react'
import { useTranslation, Button, CircularProgress } from '@apisuite/fe-base'
import Select from 'components/Select'
import FormField, { isValidEmail } from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import { SelectOption } from 'components/Select/types'
import { Role, FetchTeamMembersResponse } from 'containers/Profile/types'
import { ROLES } from 'constants/global'
import { User } from 'containers/Auth/types'

import useStyles from './styles'
import { TeamPageProps } from './types'

const AUTHORIZED_ROLES = [
  ROLES.admin.value,
  ROLES.organizationOwner.value,
]

const TeamPage: React.FC<TeamPageProps> = ({
  fetchTeamMembers,
  fetchRoleOptions,
  inviteMember,
  changeRole,
  members,
  roleOptions,
  user,
  requestStatuses,
  resetErrors,
}) => {
  const classes = useStyles()
  const [inviteVisible, showInvite] = React.useState(false)
  const [t] = useTranslation()
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
    fetchTeamMembers()
    fetchRoleOptions()
  }, [fetchTeamMembers, fetchRoleOptions])

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
      <Button className={classes.btn} type='submit' disabled={input.email.length === 0 || inputErrors.email || inputErrors.role}>
        {requestStatuses.inviteMemberRequest.isRequesting ? <CircularProgress size={20} className={classes.loading} /> : t('rbac.team.send')}
      </Button>

      <FormField
        id='email-field'
        label='E-mail'
        variant='outlined'
        type='email'
        placeholder='john.doe@email.com'
        name='email'
        value={input.email}
        onChange={handleInputs}
        autoFocus
        fullWidth={false}
        error={inputErrors.email}
        errorPlacing='bottom'
        helperText={inputErrors.email && 'Please insert a valid email.'}
        InputProps={{
          classes: { input: classes.emailTextfield },
        }}
      />

      {/* <FormField
        id='name-field'
        label='Name'
        variant='outlined'
        type='text'
        placeholder=''
        name='name'
        value={input.name}
        onChange={handleInputs}
        autoFocus
        fullWidth={false}
        errorPlacing='bottom'
        InputProps={{
          classes: { input: classes.nameTextfield },
        }}
      /> */}

      <Select
        className={classes.select}
        options={selectOptions(roleOptions)}
        onChange={chooseRole}
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

        {!isEmpty(members, roleOptions) && members.map((member, indx) => (
          <div key={indx} className={classes.row}>
            <div>
              <div className={classes.name}>
                {member.User.name}
              </div>
              <div>
                <p className={classes.auth}>{`Current role: ${ROLES[member.Role.name]?.label}`}</p>
              </div>
            </div>

            {user &&
              <Select
                className={classes.select}
                options={selectOptions(roleOptions)}
                onChange={handleChangeRole(member.User.id, member.Organization.id)}
                disabled={getUserMemberRole(user).name === 'developer' || user.id === member.User.id || ROLES[getUserMemberRole(user).name].level > ROLES[member.Role.name].level}
                selected={selectOptions(roleOptions).find(
                  option => option.label === ROLES[member.Role.name].label)}
              />}
          </div>
        ))}
      </div>

      {!inviteVisible && user
        ? canInvite(getUserMemberRole(user).name) &&
          <Button className={classes.btn} style={{ marginTop: 24 }} onClick={toggle}>{t('rbac.team.invite')} </Button>
        : inviteCard()}
    </>
  )

  const loading = requestStatuses.getMembersRequest.isRequesting || requestStatuses.getRolesRequest.isRequesting
  return (
    <div className={`page-container ${classes.root}`}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('rbac.team.title')}</h1>
        <>
          {loading && <div className={classes.loadingPage}><CircularProgress size={50} /></div>}
          {!loading && showMembers()}
        </>
      </section>
    </div>
  )
}

export default TeamPage
