import { User } from "../types";

import { CONFIRM_REGISTRATION, CONFIRM_REGISTRATION_SUCCESS, CONFIRM_REGISTRATION_ERROR } from "./confirmRegistration";
import { SUBMIT_SIGN_UP_DETAILS, SUBMIT_SIGN_UP_DETAILS_SUCCESS, SUBMIT_SIGN_UP_DETAILS_ERROR } from "./submitSignUpDetails";
import { VALIDATE_REGISTRATION_TOKEN, VALIDATE_REGISTRATION_TOKEN_SUCCESS, VALIDATE_REGISTRATION_TOKEN_ERROR } from "./validateRegistrationToken";
import { EXPIRED_SESSION } from "./expiredSession";
import { FORGOT_PASSWORD, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_SUCCESS } from "./forgotPassword";
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_USER, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS } from "./login";
import { LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCESS } from "./logout";
import { RECOVER_PASSWORD, RECOVER_PASSWORD_ERROR, RECOVER_PASSWORD_SUCCESS } from "./recoverPassword";
import { SSO_LOGIN, SSO_LOGIN_ERROR, SSO_LOGIN_SUCCESS } from "./ssoLogin";
import { SSO_PROVIDERS, SSO_PROVIDERS_ERROR, SSO_PROVIDERS_SUCCESS } from "./ssoProviders";
import { SSO_TOKEN_EXCHANGE, SSO_TOKEN_EXCHANGE_ERROR, SSO_TOKEN_EXCHANGE_SUCCESS } from "./ssoTokenExchange";
import {
  VALIDATE_INVITATION_TOKEN, VALIDATE_INVITATION_TOKEN_SUCCESS, VALIDATE_INVITATION_TOKEN_ERROR,
  ACCEPT_INVITATION_WITH_SSO_SIGN_IN,
  ACCEPT_INVITATION_WITH_SSO_SIGN_IN_SUCCESS,
  ACCEPT_INVITATION_WITH_SSO_SIGN_IN_ERROR,
  ACCEPT_INVITATION, ACCEPT_INVITATION_SUCCESS, ACCEPT_INVITATION_ERROR,
  INVITATION_SSO_SIGN_IN, INVITATION_SSO_SIGN_IN_SUCCESS, INVITATION_SSO_SIGN_IN_ERROR,
  REJECT_INVITATION, REJECT_INVITATION_SUCCESS, REJECT_INVITATION_ERROR,
  INVITATION_SIGN_IN, INVITATION_SIGN_IN_SUCCESS, INVITATION_SIGN_IN_ERROR,
  INVITATION_SIGN_UP, INVITATION_SIGN_UP_SUCCESS, INVITATION_SIGN_UP_ERROR,
} from "./invitation";
import { SUBMIT_SIGN_UP_CREDENTIALS, SUBMIT_SIGN_UP_CREDENTIALS_ERROR, SUBMIT_SIGN_UP_CREDENTIALS_SUCCESS } from "./submitSignUpCredentials";
import { SUBMIT_SIGN_UP_ORGANISATION, SUBMIT_SIGN_UP_ORGANISATION_ERROR, SUBMIT_SIGN_UP_ORGANISATION_SUCCESS } from "./submitSignUpOrganisation";

export type AuthActions =
  LoginAction |
  LoginActionSuccess |
  LoginActionError |
  LoginUserAction |
  LoginUserActionSuccess |
  LoginUserActionError |
  ForgotPasswordAction |
  ForgotPasswordActionSuccess |
  ForgotPasswordActionError |
  ExpiredSessionAction |
  RecoverPasswordAction |
  RecoverPasswordActionSuccess |
  RecoverPasswordActionError |
  LogoutAction |
  LogoutActionSuccess |
  LogoutActionError |
  SSOLoginAction |
  SSOLoginActionSuccess |
  SSOLoginActionError |
  SSOProvidersAction |
  SSOProvidersActionSuccess |
  SSOProvidersActionError |
  SSOTokenExchangeAction |
  SSOTokenExchangeActionSuccess |
  SSOTokenExchangeActionError |
  ConfirmRegistrationAction |
  ConfirmRegistrationActionSuccess |
  ConfirmRegistrationActionError |
  SubmitSignUpDetails |
  SubmitSignUpDetailsSuccess |
  SubmitSignUpDetailsError |
  SubmitSignUpCredentials |
  SubmitSignUpCredentialsSuccess |
  SubmitSignUpCredentialsError |
  SubmitSignUpOrganisation |
  SubmitSignUpOrganisationSuccess |
  SubmitSignUpOrganisationError |
  ValidateRegistrationTokenAction |
  ValidateRegistrationTokenActionSuccess |
  ValidateRegistrationTokenActionError |
  ValidateInvitationTokenAction |
  ValidateInvitationTokenActionSuccess |
  ValidateInvitationTokenActionError |
  AcceptInvitationAction |
  AcceptInvitationActionSuccess |
  AcceptInvitationActionError |
  AcceptInvitationWithSignInAction |
  AcceptInvitationWithSignInActionSuccess |
  AcceptInvitationWithSignInActionError |
  InvitationSSOSignInAction |
  InvitationSSOSignInActionSuccess |
  InvitationSSOSignInActionError |
  RejectInvitationAction |
  RejectInvitationActionSuccess |
  RejectInvitationActionError |
  InvitationSignInAction |
  InvitationSignInActionSuccess |
  InvitationSignInActionError |
  InvitationSignUpAction |
  InvitationSignUpActionSuccess |
  InvitationSignUpActionError

export type LoginAction = {
  type: typeof LOGIN,
  email: string,
  password: string,
}

export type LoginActionSuccess = {
  type: typeof LOGIN_SUCCESS,
}

export type LoginActionError = {
  type: typeof LOGIN_ERROR,
  error: string,
}

export type LoginUserAction = {
  type: typeof LOGIN_USER,
  token?: string,
}

export type LoginUserActionSuccess = {
  type: typeof LOGIN_USER_SUCCESS,
  user: User,
}

export type LoginUserActionError = {
  type: typeof LOGIN_USER_ERROR,
  error: string,
}

export type ForgotPasswordAction = {
  type: typeof FORGOT_PASSWORD,
  email: string,
}

export type ForgotPasswordActionSuccess = {
  type: typeof FORGOT_PASSWORD_SUCCESS,
}

export type ForgotPasswordActionError = {
  type: typeof FORGOT_PASSWORD_ERROR,
  error: string,
}

export type ExpiredSessionAction = {
  type: typeof EXPIRED_SESSION,
}

export type RecoverPasswordAction = {
  type: typeof RECOVER_PASSWORD,
  password: string,
  token: string,
}

export type RecoverPasswordActionSuccess = {
  type: typeof RECOVER_PASSWORD_SUCCESS,
}

export type RecoverPasswordActionError = {
  type: typeof RECOVER_PASSWORD_ERROR,
  error: string,
}

export type LogoutAction = {
  type: typeof LOGOUT,
}

export type LogoutActionSuccess = {
  type: typeof LOGOUT_SUCCESS,
}

export type LogoutActionError = {
  type: typeof LOGOUT_ERROR,
  error: string,
}

export type SSOLoginAction = {
  type: typeof SSO_LOGIN,
  provider: string,
}

export type SSOLoginActionSuccess = {
  type: typeof SSO_LOGIN_SUCCESS,
  code: string,
}

export type SSOLoginActionError = {
  type: typeof SSO_LOGIN_ERROR,
  error: string,
}

export type SSOProvidersAction = {
  type: typeof SSO_PROVIDERS,
}

export type SSOProvidersActionSuccess = {
  type: typeof SSO_PROVIDERS_SUCCESS,
  providers: string[],
}

export type SSOProvidersActionError = {
  type: typeof SSO_PROVIDERS_ERROR,
  error: string,
}

export type SSOTokenExchangeAction = {
  type: typeof SSO_TOKEN_EXCHANGE,
  code: string,
  provider: string,
}

export type SSOTokenExchangeActionSuccess = {
  type: typeof SSO_TOKEN_EXCHANGE_SUCCESS,
  token: string,
}

export type SSOTokenExchangeActionError = {
  type: typeof SSO_TOKEN_EXCHANGE_ERROR,
  error: string,
}

export type ConfirmRegistrationAction = {
  type: typeof CONFIRM_REGISTRATION,
  token: string,
}

export type ConfirmRegistrationActionSuccess = {
  type: typeof CONFIRM_REGISTRATION_SUCCESS,
}

export type ConfirmRegistrationActionError = {
  type: typeof CONFIRM_REGISTRATION_ERROR,
  error: string,
}

export type SubmitSignUpDetails = {
  type: typeof SUBMIT_SIGN_UP_DETAILS,
  details: {
    password: string,
  },
}

export type SubmitSignUpDetailsSuccess = {
  type: typeof SUBMIT_SIGN_UP_DETAILS_SUCCESS,
}

export type SubmitSignUpDetailsError = {
  type: typeof SUBMIT_SIGN_UP_DETAILS_ERROR,
  error: string,
}

export type SubmitSignUpCredentials = {
  type: typeof SUBMIT_SIGN_UP_CREDENTIALS,
  details: {
    email: string,
    name: string,
  },
}

export type SubmitSignUpCredentialsSuccess = {
  type: typeof SUBMIT_SIGN_UP_CREDENTIALS_SUCCESS,
  token: string,
}

export type SubmitSignUpCredentialsError = {
  type: typeof SUBMIT_SIGN_UP_CREDENTIALS_ERROR,
  error: string,
}

export type SubmitSignUpOrganisation = {
  type: typeof SUBMIT_SIGN_UP_ORGANISATION,
  details: {
    orgName?: string,
    // TODO: check with delio if we have this
    // vat?: string,
    website?: string,
  },
}

export type SubmitSignUpOrganisationSuccess = {
  type: typeof SUBMIT_SIGN_UP_ORGANISATION_SUCCESS,
}

export type SubmitSignUpOrganisationError = {
  type: typeof SUBMIT_SIGN_UP_ORGANISATION_ERROR,
  error: string,
}

export type ValidateRegistrationTokenAction = {
  type: typeof VALIDATE_REGISTRATION_TOKEN,
  token: string,
}

export type ValidateRegistrationTokenActionSuccess = {
  type: typeof VALIDATE_REGISTRATION_TOKEN_SUCCESS,
}

export type ValidateRegistrationTokenActionError = {
  type: typeof VALIDATE_REGISTRATION_TOKEN_ERROR,
  error: string,
}

export type ValidateInvitationTokenAction = {
  type: typeof VALIDATE_INVITATION_TOKEN,
  token: string,
}

export type ValidateInvitationTokenActionSuccess = {
  type: typeof VALIDATE_INVITATION_TOKEN_SUCCESS,
  invitation: {
    organization: string,
    email: string,
    isUser: boolean,
    hasOrganizations: boolean,
  },
}

export type ValidateInvitationTokenActionError = {
  type: typeof VALIDATE_INVITATION_TOKEN_ERROR,
  error: string,
}

export type AcceptInvitationWithSSOSignInAction = {
  type: typeof ACCEPT_INVITATION_WITH_SIGN_IN,
  token: string,
  provider: string,
  code: string,
}

export type AcceptInvitationWithSSOSignInActionSuccess = {
  type: typeof ACCEPT_INVITATION_WITH_SIGN_IN_SUCCESS,
}

export type AcceptInvitationWithSSOSignInActionError = {
  type: typeof ACCEPT_INVITATION_WITH_SIGN_IN_ERROR,
  error: string,
}

export type AcceptInvitationAction = {
  type: typeof ACCEPT_INVITATION,
  token: string,
}

export type AcceptInvitationActionSuccess = {
  type: typeof ACCEPT_INVITATION_SUCCESS,
  path: string,
}

export type AcceptInvitationActionError = {
  type: typeof ACCEPT_INVITATION_ERROR,
  error: string,
}

export type InvitationSSOSignInAction = {
  type: typeof INVITATION_SSO_SIGN_IN,
  token: string,
  provider: string,
}

export type InvitationSSOSignInActionSuccess = {
  type: typeof INVITATION_SSO_SIGN_IN_SUCCESS,
}

export type InvitationSSOSignInActionError = {
  type: typeof INVITATION_SSO_SIGN_IN_ERROR,
  error: string,
}

export type RejectInvitationAction = {
  type: typeof REJECT_INVITATION,
  token: string,
}

export type RejectInvitationActionSuccess = {
  type: typeof REJECT_INVITATION_SUCCESS,
  path: string,
}

export type RejectInvitationActionError = {
  type: typeof REJECT_INVITATION_ERROR,
  error: string,
}

export type InvitationSignInAction = {
  type: typeof INVITATION_SIGN_IN,
  token: string,
  email: string,
  password: string,
}

export type InvitationSignInActionSuccess = {
  type: typeof INVITATION_SIGN_IN_SUCCESS,
}

export type InvitationSignInActionError = {
  type: typeof INVITATION_SIGN_IN_ERROR,
  error: string,
}

export type InvitationSignUpAction = {
  type: typeof INVITATION_SIGN_UP,
  token: string,
  name: string,
  password: string,
}

export type InvitationSignUpActionSuccess = {
  type: typeof INVITATION_SIGN_UP_SUCCESS,
}

export type InvitationSignUpActionError = {
  type: typeof INVITATION_SIGN_UP_ERROR,
  error: string,
}
