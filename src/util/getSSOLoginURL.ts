import { API_URL } from 'constants/endpoints'
import { SSO_STATE_STORAGE, SSO_PROVIDER_STATE_STORAGE } from 'constants/global'
import stateGenerator from 'util/stateGenerator'

export const getSSOLoginURL = (sso: string[]) => {
  let state = localStorage.getItem(SSO_STATE_STORAGE)
  if (!state) {
    state = stateGenerator()
    localStorage.setItem(SSO_STATE_STORAGE, state)
  }

  const provider = sso[0]
  localStorage.setItem(SSO_PROVIDER_STATE_STORAGE, provider)
  return `${API_URL}/auth/oidc/${provider}?state=${state}`
}
