import React, { useEffect } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import { TextField, useConfig, useTranslation } from "@apisuite/fe-base";
import {
  acceptInvitationWithSignIn,
  invitationSignIn,
  acceptInvitation,
  rejectInvitation,
  validateInvitationToken,
} from "store/auth/actions/invitation";
import { Invitation } from "store/auth/types";
import FormCard from "components/FormCard";
import { LOCAL_STORAGE_KEYS } from "constants/global";
import { LoadingView } from "./LoadingView";
import useStyles from "./styles";
import { invitationFormSelector } from "./selector";

const InvitationConfirmationForm: React.FC<{
  invitation: Invitation,
  token: string,
  provider: string,
  isLogged: boolean,
}> = ({ invitation, token, provider, isLogged }) => {
  const classes = useStyles();
  const [t] = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className={classes.registerContainer}>
      <FormCard
        buttonIcon={isLogged ? null : <VpnKeyRoundedIcon className={classes.ssoSignIcon} />}
        buttonLabel={isLogged ? t("invitationForm.accept") : t("invitationForm.signin", { provider })}
        handleSubmit={() => dispatch(isLogged ? acceptInvitation({ token }) : invitationSignIn({ token, provider }))}
        showReject
        rejectLabel={t("invitationForm.reject")}
        customRejectButtonStyles={classes.rejectButton}
        handleReject={() => rejectInvitation({ token: token || "" })}
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
              margin: "dense",
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
              margin: "dense",
            }}
          />
        </div>
      </FormCard>
    </div>
  );
};

export const InvitationForm = () => {
  const dispatch = useDispatch();
  const { invitation, invitationError, isLogged } = useSelector(invitationFormSelector);
  const { sso } = useConfig();
  // get token from url
  const invitationToken = qs.parse(window.location.search.slice(1)).token as string || undefined;
  const code = qs.parse(window.location.search.slice(1)).code as string || undefined;

  const stateToken = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_INVITATION_STATE_STORAGE);

  useEffect(() => {
    if (stateToken && code) {
      dispatch(acceptInvitationWithSignIn({
        token: stateToken,
        provider: (sso?.length && sso[0]) || "keycloak",
        code,
      }));
    }
  }, [dispatch, stateToken, code, sso]);

  useEffect(() => {
    if (invitationToken && !invitation.organization && !invitation.email && !invitationError) {
      dispatch(validateInvitationToken({ token: invitationToken }));
    }
  }, [dispatch, invitation.email, invitation.organization, invitationError, invitationToken]);

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
              provider={(sso?.length && sso[0]) || ""}
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
  );
};
