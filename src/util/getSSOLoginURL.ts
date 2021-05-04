import { API_URL } from "constants/endpoints";
import { LOCAL_STORAGE_KEYS } from "constants/global";
import stateGenerator from "util/stateGenerator";

export const getSSOLoginURL = (sso: string[]) => {
  let state = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE);
  if (!state) {
    state = stateGenerator();
    localStorage.setItem(LOCAL_STORAGE_KEYS.SSO_STATE_STORAGE, state);
  }

  const provider = sso[0];
  localStorage.setItem(LOCAL_STORAGE_KEYS.SSO_PROVIDER_STATE_STORAGE, provider);
  return `${API_URL}/auth/oidc/${provider}?state=${state}`;
};
