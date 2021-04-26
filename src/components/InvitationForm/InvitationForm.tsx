import React from 'react'
import qs from 'qs'
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded'
import {
  InvitationFormProps, InvitationFormStore,
} from './types'
import { useTranslation } from '@apisuite/fe-base'
import FormCard from 'components/FormCard'
import FormField, {
  parseErrors,
} from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import useStyles from './styles'
import LoadingView from 'components/SignUpForm/LoadingView'

const InvitationConfirmationForm: React.FC<{
  handleSubmit: (token: string, provider: string) => void,
  handleReject: (token: string) => void,
  invitation: InvitationFormStore,
  token: string,
  provider: string,
  isLogged: boolean,
}> = ({ handleSubmit, handleReject, invitation, token, provider, isLogged }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [hasEmail, setEmail] = React.useState(false)
  const [input, setInput] = React.useState({
    email: '',
    organization: '',
    token,
  })

  const handleInputs = (e: FormFieldEvent, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })

    const eventTarget = e.target

    // @ts-ignore
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  React.useEffect(() => {
    if (invitation.invitation && invitation.invitation.email && !input.email && !hasEmail) {
      setEmail(true)
      setInput({
        ...input,
        organization: invitation.invitation.organization,
        email: invitation.invitation.email,
      })
    }
    // @ts-ignore
    setFormValid(errors && errors.length === 0)
  }, [errors, hasEmail, input, invitation])

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonIcon={isLogged ? null : <VpnKeyRoundedIcon className={classes.ssoSignIcon} />}
        buttonLabel={isLogged ? t('invitationForm.accept') : t('invitationForm.signin', { provider })}
        buttonDisabled={!isFormValid}
        handleSubmit={() => isFormValid ? handleSubmit(input.token || '', provider) : () => {
          // do nothing
        }}
        loading={invitation.isRequesting}
        showReject
        rejectLabel={t('invitationForm.reject')}
        rejectDisabled={!isFormValid}
        customRejectButtonStyles={classes.rejectButton}
        handleReject={() => isFormValid ? handleReject(input.token || '') : () => {
          // do nothing
        }}
      >
        <div className={classes.fieldContainer}>
          <FormField
            id='organization-field'
            label='Organisation'
            variant='outlined'
            type='text'
            name='organization'
            value={input.organization}
            onChange={handleInputs}
            autoFocus
            fullWidth
            disabled={hasEmail}
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
        <div className={classes.fieldContainer}>
          <FormField
            id='email-field'
            label='E-mail'
            variant='outlined'
            type='email'
            placeholder=''
            name='email'
            value={input.email}
            onChange={handleInputs}
            fullWidth
            disabled={hasEmail}
            errorPlacing='bottom'
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
      </FormCard>
    </div>
  )
}

const InvitationForm: React.FC<InvitationFormProps> = ({
  invitationStore,
  acceptInvitationWithSignIn,
  invitationSignIn,
  acceptInvitation,
  rejectInvitation,
  validateToken,
  isLogged,
  sso,
}) => {
  // get token from url
  const invitationToken = qs.parse(window.location.search.slice(1)).token || undefined
  const invitationCode = qs.parse(window.location.search.slice(1)).code || undefined
  const code = qs.parse(window.location.search.slice(1)).code || undefined
  const { invitation, invitationError } = invitationStore
  const STATE_STORAGE_INVITATION = 'ssoStateInvitationStorage'

  const stateToken = localStorage.getItem(STATE_STORAGE_INVITATION)

  React.useEffect(() => {
    if (stateToken && code) {
      acceptInvitationWithSignIn(stateToken, (sso?.length && sso[0]) || 'keycloak', code)
    } else if (invitationToken && !invitation?.organization && !invitation?.email && invitationError === undefined) {
      validateToken(invitationToken)
    }
  }, [invitationToken, invitation, invitationError, stateToken])

  return (
    <>
      {
        invitationToken &&
        <>
          {
            !invitation?.email &&
            <LoadingView
              isLoading={!invitation?.email && !invitationError}
              isError={!!invitationError}
              errorMessage='This invitation is invalid or expired.'
            />
          }
          {
            invitation?.email &&
            <InvitationConfirmationForm
              key='invitation-confirmation-1'
              isLogged={isLogged || false}
              invitation={invitationStore}
              token={invitationToken}
              provider={(sso?.length && sso[0]) || ''}
              handleSubmit={!isLogged ? invitationSignIn : acceptInvitation}
              handleReject={rejectInvitation}
            />
          }
        </>
      }
      {
        !invitationToken && !invitationCode &&
        <LoadingView
          isLoading={!!invitationCode}
          isError
          errorMessage='This invitation is invalid or expired.'
        />
      }
    </>
  )
}

export default InvitationForm
