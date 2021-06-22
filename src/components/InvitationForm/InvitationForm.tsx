import React, { useEffect, useState } from "react";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import update from "immutability-helper";
import { Button, IconButton, InputAdornment, TextField, TextFieldProps, Typography, Trans, useConfig, useTranslation } from "@apisuite/fe-base";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import VpnKeyRoundedIcon from "@material-ui/icons/VpnKeyRounded";
import { isValidPass } from "util/forms";
import {
  acceptInvitationWithSSOSignIn,
  invitationSSOSignIn,
  acceptInvitation,
  rejectInvitation,
  validateInvitationToken,
  invitationSignIn,
  invitationSignUp,
} from "store/auth/actions/invitation";
import { Invitation } from "store/auth/types";
import FormCard from "components/FormCard";
import { LOCAL_STORAGE_KEYS } from "constants/global";
import { LoadingView } from "./LoadingView";
import useStyles from "./styles";
import { invitationFormSelector } from "./selector";

const AnchorBoldWrapper: React.FC<React.DetailedHTMLProps<
React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = (props) => {
  return (
    <strong>
      <a {...props} />
    </strong>
  );
};

const InvitationConfirmationForm: React.FC<{
  invitation: Invitation,
  token: string,
  provider: string,
  isLogged: boolean,
  sso: boolean,
}> = ({ invitation, token, provider, isLogged, sso }) => {
  const classes = useStyles();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [formInputs, setFormInputs] = useState({
    name: "",
    password: "",
    errors: {
      name: "",
      password: "",
    },
  });

  const handleInputChanges: TextFieldProps["onChange"] = ({ target }) => {
    setFormInputs((s) => {
      switch (target.name) {
        case "name": {
          return update(s, {
            name: { $set: target.value },
            errors: { name: { $set: target.value.length > 0 ? "" : t("invitationForm.warnings.name") } },
          });
        }

        case "password": {
          return update(s, {
            password: { $set: target.value },
            errors: { password: { $set: isValidPass(target.value) ? "" : t("invitationForm.warnings.password") } },
          });
        }

        default:
          return s;
      }
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getButtonLabel = () => {
    if (sso && !isLogged) {
      return t("invitationForm.signin", { provider });
    }
    if (!invitation.isUser && !isLogged) {
      return t("invitationForm.inviteSignUp");
    }
    if (invitation.isUser && !isLogged) {
      return t("invitationForm.inviteSignIn");
    }
    return t("invitationForm.accept");
  };

  const ssoForm = () => (
    <div className={classes.registerContainer}>
      <FormCard
        buttonIcon={isLogged ? null : <VpnKeyRoundedIcon className={classes.ssoSignIcon} />}
        buttonLabel={getButtonLabel()}
        handleSubmit={() => dispatch(isLogged ? acceptInvitation({ token }) : invitationSSOSignIn({ token, provider }))}
        showReject
        rejectLabel={t("invitationForm.reject")}
        customRejectButtonStyles={classes.rejectButton}
        handleReject={() => dispatch(rejectInvitation({ token: token || "" }))}
      >
        <div className={classes.fieldContainer}>
          <TextField
            id="organization-field"
            label="Organisation"
            variant="outlined"
            type="text"
            name="organization"
            value={invitation.organization}
            autoFocus
            fullWidth
            disabled
            margin="dense"
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
        <div className={classes.fieldContainer}>
          <TextField
            id="email-field"
            label="E-mail"
            variant="outlined"
            type="email"
            placeholder=""
            name="email"
            value={invitation.email}
            fullWidth
            disabled
            margin="dense"
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
      </FormCard>
    </div>
  );

  const handleInviteFormSubmit = () => {
    if (!invitation.isUser && !isLogged) {
      return invitationSignUp({
        token,
        name: formInputs.name,
        password: formInputs.password,
      });
    }
    if (invitation.isUser && !isLogged) {
      return invitationSignIn({
        token,
        email: invitation.email,
        password: formInputs.password,
      });
    }
    return acceptInvitation({ token });
  };

  const inviteForm = () => (
    <div className={classes.registerContainer}>
      <FormCard
        buttonLabel={getButtonLabel()}
        handleSubmit={() => dispatch(handleInviteFormSubmit())}
        showReject
        rejectLabel={t("invitationForm.reject")}
        customRejectButtonStyles={classes.rejectButton}
        handleReject={() => dispatch(rejectInvitation({ token: token || "" }))}
      >
        <div className={classes.fieldContainer}>
          <TextField
            id="organization-field"
            label="Organisation"
            variant="outlined"
            type="text"
            name="organization"
            value={invitation.organization}
            autoFocus
            fullWidth
            disabled
            margin={"dense"}
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
        <div className={classes.fieldContainer}>
          <TextField
            id="email-field"
            label="E-mail"
            variant="outlined"
            type="email"
            placeholder=""
            name="email"
            value={invitation.email}
            fullWidth
            disabled
            margin={"dense"}
            InputProps={{
              classes: { input: classes.textField },
            }}
          />
        </div>
        {
          !invitation.isUser && !isLogged &&
          <div className={classes.fieldContainer}>
            <TextField
              id="name-field"
              label="Name"
              variant="outlined"
              type="text"
              placeholder={t("invitationForm.name")}
              name="name"
              value={formInputs.name}
              error={!!formInputs.errors.name.length}
              fullWidth
              margin={"dense"}
              InputProps={{
                classes: { input: classes.textField },
              }}
              onChange={handleInputChanges}
            />
          </div>
        }
        {
          !isLogged &&
          <div className={classes.fieldContainer}>
            <TextField
              id="password-field"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              placeholder=""
              name="password"
              value={formInputs.password}
              error={!!formInputs.errors.password.length}
              fullWidth
              margin={"dense"}
              InputProps={{
                classes: { input: classes.textField },
                endAdornment:
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={t("signInForm.togglePasswordVisibilityARIALabel")}
                      edge="end"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>,
              }}
              onChange={handleInputChanges}
            />
          </div>
        }
      </FormCard>
      {
        !invitation.isUser && !isLogged &&
        <div className={classes.privacyPolicyDisclaimerContainer}>
          <Typography
            className={classes.privacyPolicyDisclaimerText}
            variant="caption"
            display="block"
            gutterBottom
          >
            <Trans
              t={t}
              i18nKey="invitationForm.privacyPolicyDisclaimer"
            >
              {[
                /* FIXME: this url should maybe be dynamic */
                <AnchorBoldWrapper
                  key="contact-key-1"
                  className={classes.privacyPolicyDisclaimerLink}
                  href='https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/760938500/Privacy+Policy'
                  rel='noopener noreferrer'
                  target='_blank'
                />,
              ]}
            </Trans>
          </Typography>
        </div>
      }
      {
        invitation.isUser && !isLogged &&
        <a
          className={classes.forgotPasswordLink}
          onClick={() => history.push("/forgot")}
        >
          <Typography variant="caption">{t("signInForm.forgotPasswordLinkLabel")}</Typography>
        </a>
      }
    </div>
  );

  return sso ? ssoForm() : inviteForm();
};

export const InvitationForm = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const { invitation, invitationError, isLogged } = useSelector(invitationFormSelector);
  const { sso, supportURL } = useConfig();
  // get token from url
  const invitationToken = qs.parse(window.location.search.slice(1)).token as string || undefined;
  const code = qs.parse(window.location.search.slice(1)).code as string || undefined;

  const stateToken = localStorage.getItem(LOCAL_STORAGE_KEYS.SSO_INVITATION_STATE_STORAGE);

  useEffect(() => {
    if (stateToken && code) {
      dispatch(acceptInvitationWithSSOSignIn({
        token: stateToken,
        provider: (sso?.length && sso[0]) || "",
        code,
      }));
    }
  }, [dispatch, stateToken, code, sso]);

  useEffect(() => {
    if (invitationToken && !invitation.organization && !invitation.email && !invitationError) {
      dispatch(validateInvitationToken({ token: invitationToken }));
    }
  }, [dispatch, invitation.email, invitation.organization, invitationError, invitationToken]);

  const getErrorView = () => {
    return (
      <>
        <div>
          <Typography variant="caption" display="block" gutterBottom>
            <Trans
              i18nKey="invitationForm.invalid"
              values={{ org: invitation.organization }}>
              {[
                <strong key="org-name-1" />,
              ]}
            </Trans>
          </Typography>
        </div>
        <Button variant="outlined" href="/" fullWidth>{t("invitationForm.backToPortal")}</Button>
        <div>
          <Typography variant="caption" display="block" gutterBottom>
            <Trans
              t={t}
              i18nKey="invitationForm.contact"
            >
              {[
                <AnchorBoldWrapper
                  key="contact-key-1"
                  href={supportURL}
                />,
              ]}
            </Trans>
          </Typography>
        </div>
      </>
    );
  };

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
            >
              {getErrorView()}
            </LoadingView>
          }
          {
            invitation?.email &&
            <InvitationConfirmationForm
              key="invitation-confirmation-1"
              isLogged={isLogged || false}
              invitation={invitation}
              token={invitationToken}
              provider={(sso?.length && sso[0]) || ""}
              sso={!!sso?.length || false}
            />
          }
        </>
      }
      {
        !invitationToken && !code &&
        <LoadingView
          isLoading={!!code}
          isError
        >
          {getErrorView()}
        </LoadingView>
      }
    </>
  );
};
