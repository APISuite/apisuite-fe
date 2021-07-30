import { createSelector } from "reselect";
import { Store } from "store/types";

export const signUpFormSelector = createSelector(({ auth }: Store) => auth, (auth) => ({
  signUpError: auth.signUpError,
  isSignUpWorking: auth.isSignUpWorking,
}));

export const credentialsSelector = createSelector(({ auth }: Store) => auth, (auth) => ({
  signUpName: auth.signUpName,
  signUpEmail: auth.signUpEmail,
}));

export const orgDetailsSelector = createSelector(({ auth }: Store) => auth, (auth) => ({
  signUpOrgName: auth.signUpOrgName,
  signUpOrgWebsite: auth.signUpOrgWebsite,
}));
