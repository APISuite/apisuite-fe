import * as React from 'react'
import useStyles from './styles'
import { useTranslation } from 'react-i18next'
import Select from 'components/Select'
import Button from '@material-ui/core/Button'
import FormField from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import { TeamPageProps } from './types'

const TeamPage: React.FC<TeamPageProps> = ({
  fetchTeamMembers,
  fetchRoleOptions,
  members,
  roleOptions,
}) => {
  const classes = useStyles()
  const [inviteVisible, toggle] = React.useReducer(v => !v, false)
  const [t] = useTranslation()
  const [input, setInput] = React.useState({
    name: '',
    email: '',
  })

  const selectOptions = (roles: typeof roleOptions) => {
    return roles.map(role => ({
      label: role,
      value: role,
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

  const inviteCard = () => (
    <div className={classes.inviteCard}>
      <Button className={classes.btn}>{t('rbac.team.send')}</Button>

      <FormField
        id='email-field'
        label='E-mail'
        variant='outlined'
        type='email'
        placeholder=''
        name='email'
        value={input.email}
        onChange={handleInputs}
        autoFocus
        fullWidth={false}
        errorPlacing='bottom'
        InputProps={{
          classes: { input: classes.emailTextfield },
        }}
      />

      <FormField
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
      />

      <Select
        className={classes.select}
        options={selectOptions(roleOptions)}
        onChange={() => console.log('im changing')}
      />
    </div>
  )

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('rbac.team.title')}</h1>

        <div className={classes.table}>
          <div className={classes.header}>
            <div>{t('rbac.team.header')}</div>
            <div className={classes.actions}>{t('rbac.team.actions')}</div>
          </div>

          {members.map((member, indx) => (
            <div key={indx} className={classes.row}>
              <div>
                <div className={classes.name}>
                  {member.User.name}
                </div>
                <div>
                  <p className={classes.auth}>2 factor authentication not enabled</p>
                </div>
              </div>

              <Select
                className={classes.select}
                options={selectOptions(roleOptions)}
                onChange={() => console.log('im changing')}
                selected={selectOptions(roleOptions).find(
                  option => option.value === member.Role.name)}
              />
            </div>
          ))}
        </div>

        {inviteVisible
          ? inviteCard()
          : <Button className={classes.btn} style={{ marginTop: 24 }} onClick={toggle}>{t('rbac.team.invite')} </Button>}

      </section>
    </div>
  )
}

export default TeamPage
