import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import { useTranslation } from '@apisuite/fe-base'

import StepsProgress from 'components/StepsProgress'

import { LoadingView } from './LoadingView'
import { ProfileDetailsForm } from './ProfileDetailsForm'
import { OrganisationDetailsForm } from './OrganisationDetailsForm'
import { SecurityDetailsForm } from './SecurityDetailsForm'

import { signUpFormSelector } from './selector'
import useStyles from './styles'
import { SignUpFormProps } from './types'

export let steps = {
  1: 'Step 1',
  2: 'Step 2',
  3: 'Step 3',
  4: 'Success',
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ preFilledEmail }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [t] = useTranslation()
  const register = useSelector(signUpFormSelector)

  const { invitation, invitationError } = register

  // Invitation logic

  // Retrieves the invitation token from the URL
  const invitationToken = qs.parse(window.location.search.slice(1)).token || undefined

  useEffect(() => {
    if (invitationToken && !invitation.email && invitationError === undefined) {
      dispatch(validateRegisterTokenActions.request(invitationToken))
    }
  }, [invitation, invitationError, invitationToken, dispatch])

  // Steps logic

  const step = register.step

  const name = 'TODO'

  steps = {
    ...steps,
    1: t('signUpForm.steps.profileDetails'),
    3: t('signUpForm.steps.securityDetails'),
  }

  if (invitationToken) {
    steps[2] = t('signUpForm.steps.organisationDetails')
  }

  const signUpFormStep = (step: keyof typeof steps) => {
    switch (step) {
      case 1:
        return (
          <ProfileDetailsForm
            key='profileDetailsForm'
            preFilledEmail={preFilledEmail}
            register={register}
            token={invitationToken}
          />
        )

      case 2:
        return (
          <OrganisationDetailsForm
            key='organisationDetailsForm'
            register={register}
          />
        )

      case 3:
        return (
          <SecurityDetailsForm
            key='securityDetailsForm'
            register={register}
            token={invitationToken}
          />
        )

      case 4:
        return (
          <Redirect
            key='redirectToAccountConfirmation'
            to={`/confirmation/${name}`}
          />
        )
    }
  }

  // 'Sign up' form's views logic

  const signUpFormView = (
    <>
      <StepsProgress
        currentStep={step}
        steps={steps}
      />

      {signUpFormStep(step)}

      <div className={classes.privacyPolicyDisclaimerContainer}>
        <p className={classes.privacyPolicyDisclaimerText}>
          {t('signUpForm.privacyPolicyDisclaimerPartOne')}
        </p>

        {/* FIXME: the translations support interpolation, plus this url should be dynamic no? */}
        <a
          className={classes.privacyPolicyDisclaimerLink}
          href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/760938500/Privacy+Policy'
          rel='noopener noreferrer'
          target='_blank'
        >
          {t('signUpForm.privacyPolicyDisclaimerPartTwo')}
        </a>

        <p className={classes.privacyPolicyDisclaimerText}>.</p>
      </div>
    </>
  )

  return (
    <>
      {
        invitationToken
          ? (
            <>
              {
                invitation.email
                  ? (
                    signUpFormView
                  )
                  : (
                    <LoadingView
                      errorMessage={t('signUpForm.warnings.invalidInvitation')}
                      isError={!!invitationError}
                      isLoading={!invitation.email && !invitationError}
                    />
                  )
              }
            </>
          )
          : (
            signUpFormView
          )
      }
    </>
  )
}
