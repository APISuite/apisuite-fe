import React from 'react'
import qs from 'qs'
import { useSelector, useDispatch } from 'react-redux'
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded'
import {
  InvitationFormProps,
} from './types'
import { TextField, TextFieldProps, useTranslation } from '@apisuite/fe-base'
import {
  acceptInvitationWithSignIn,
  invitationSignIn,
  acceptInvitation,
  rejectInvitation,
  validateInvitationToken,
} from 'store/auth/actions/invitation'
import { Invitation } from 'store/auth/types'
import FormCard from 'components/FormCard'
import useStyles from './styles'
import { LoadingView } from 'components/SignUpForm/LoadingView'
import { invitationFormSelector } from './selector'

const InvitationConfirmationForm: React.FC<{
  invitation: Invitation,
  token: string,
  provider: string,
  isLogged: boolean,
}> = ({ invitation, token, provider, isLogged }) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const dispatch = useDispatch()

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonIcon={isLogged ? null : <VpnKeyRoundedIcon className={classes.ssoSignIcon} />}
        buttonLabel={isLogged ? t('invitationForm.accept') : t('invitationForm.signin', { provider })}
        handleSubmit={() => dispatch(isLogged ? acceptInvitation({ token }) : invitationSignIn({ token, provider }))}
        showReject
        rejectLabel={t('invitationForm.reject')}
        customRejectButtonStyles={classes.rejectButton}
        handleReject={() => rejectInvitation({ token: token || '' })}
      >
        <div className={classes.fieldContainer}>
          <TextField
            id='organization-field'
            label='Organisation'
            variant='outlined'
            type='text'
            name='organization'
            value={invitation.organization}
            autoFocus
            fullWidth
            disabled
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
        <div className={classes.fieldContainer}>
          <TextField
            id='email-field'
            label='E-mail'
            variant='outlined'
            type='email'
            placeholder=''
            name='email'
            value={invitation.email}
            fullWidth
            disabled
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
      </FormCard>
    </div>
  )
}

export const InvitationForm: React.FC<InvitationFormProps> = ({
  isLogged,
  sso,
}) => {
  const dispatch = useDispatch()
  const { invitation, invitationError } = useSelector(invitationFormSelector)
  // get token from url
  const invitationToken = qs.parse(window.location.search.slice(1)).token || undefined
  const code = qs.parse(window.location.search.slice(1)).code || undefined
  const STATE_STORAGE_INVITATION = 'ssoStateInvitationStorage'

  const stateToken = localStorage.getItem(STATE_STORAGE_INVITATION)

  React.useEffect(() => {
    if (stateToken && code) {
      dispatch(acceptInvitationWithSignIn({
        token: stateToken,
        provider: (sso?.length && sso[0]) || 'keycloak',
        code,
      }))
    } else if (invitationToken && !invitation.organization && !invitation.email && !invitationError) {
      dispatch(validateInvitationToken({ token: invitationToken }))
    }
  }, [invitationToken, invitation.organization, invitation.email, invitationError, stateToken, code, sso, dispatch])

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
              invitation={invitation}
              token={invitationToken}
              provider={(sso?.length && sso[0]) || ''}
            />
          }
        </>
      }
      {
        !invitationToken && !code &&
        <LoadingView
          isLoading={!!code}
          isError
          errorMessage='This invitation is invalid or expired.'
        />
      }
    </>
  )
}
