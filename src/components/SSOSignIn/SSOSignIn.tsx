import React from 'react'
import qs from 'qs'
import { useTranslation } from '@apisuite/fe-base'

import useStyles from './styles'
import { SSOSignInProps } from './types'

const STATE_STORAGE = 'ssoStateStorage'

const SSOSignIn: React.FC<SSOSignInProps> = ({
  ssoTokenExchange,
}) => {
  const classes = useStyles()

  const [t] = useTranslation()

  React.useEffect(() => {
    // URL parameters
    const allURLParameters = qs.parse(window.location.search.slice(1))
    const stateParameter = allURLParameters.state

    // Local storage's tidbits of information
    const stateCodeInLocalStorage = localStorage.getItem(STATE_STORAGE)
    const providerInLocalStorage = localStorage.getItem('attemptingSignInWithProvider')

    if (stateParameter === stateCodeInLocalStorage && providerInLocalStorage) {
      ssoTokenExchange({ code: allURLParameters.code, provider: providerInLocalStorage })
    }
  }, [])

  return (
    <p className={classes.pleaseHoldMessage}>
      {t('signInForm.ssoSignInPleaseHoldMessage')}
    </p>
  )
}

export default SSOSignIn
