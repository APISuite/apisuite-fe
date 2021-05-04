import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Button, TextField, InputAdornment, IconButton } from "@apisuite/fe-base";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import VisibilityOffRoundedIcon from "@material-ui/icons/VisibilityOffRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import { updatePasswordRequest } from "store/security/actions/updatePassword";

import { isValidPass } from "util/forms";

import { securitySelector } from "./selector";
import useStyles from "./styles";
import { getProfile } from "store/profile/actions/getProfile";

export const Security: React.FC = () => {
  const classes = useStyles();
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { profile } = useSelector(securitySelector);
  const [ssoIsActive, setSSOIsActive] = React.useState(false);

  useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'profile')
    of all user-related information we presently have. */
    dispatch(getProfile({}));
  }, [dispatch]);

  useEffect(() => {
    /* Once our store's 'profile' details load, we check its 'oidcProvider'
    field to determine whether the user signed in regularly or by way of SSO.

    If 'oidcProvider' amounts to 'null', it means that the user signed in regularly,
    and if not, it means that the user signed in by way of SSO. */
    if (profile.user.oidcProvider) {
      setSSOIsActive(true);
    }
  }, [profile]);

  const [providedPasswords, setProvidedPasswords] = useState(["", ""]);

  const [showPassword, setShowPassword] = useState([false, false]);

  const handleShowPassword = (event: any, passwordFieldNumber: number) => {
    event.preventDefault();

    const newShowPasswordsArray = [...showPassword];
    newShowPasswordsArray[passwordFieldNumber] = !newShowPasswordsArray[passwordFieldNumber];

    setShowPassword(newShowPasswordsArray);
  };

  const handlePasswordChanges = (
    changeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    indexOfChangedPasswordField: number,
  ) => {
    changeEvent.preventDefault();

    const newPasswords = [...providedPasswords];
    newPasswords[indexOfChangedPasswordField] = changeEvent.target.value;

    setProvidedPasswords(newPasswords);
  };

  const handlePasswordChangeRequest = () => {
    dispatch(updatePasswordRequest({ oldPassword: providedPasswords[0], newPassword: providedPasswords[1] }));

    setProvidedPasswords(["", ""]);
  };

  return (
    <main className='page-container'>
      <section className={classes.updatePasswordContainer}>
        <p className={classes.securityTitle}>
          {t("profileTab.securitySubTab.securityTitle")}
        </p>

        <p className={classes.securitySubtitle}>
          {
            !ssoIsActive
              ? t("profileTab.securitySubTab.securitySubtitleWithoutActiveSSO")
              : t("profileTab.securitySubTab.securitySubtitleWithActiveSSO")
          }
        </p>

        <p className={classes.updatePasswordTitle}>
          {t("profileTab.securitySubTab.updatePasswordTitle")}
        </p>

        {
          ssoIsActive
            ? (
              <div className={classes.infoBox}>
                <InfoRoundedIcon className={classes.infoBoxIcon} />

                <div>
                  <p className={classes.infoBoxText}>
                    {t("profileTab.securitySubTab.activeSSOBoxText")}
                  </p>
                </div>
              </div>
            )
            : (
              <>
                <TextField
                  className={classes.inputFields}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={(event) => handleShowPassword(event, 0)}
                        >
                          {
                            showPassword[0]
                              ? <VisibilityRoundedIcon />
                              : <VisibilityOffRoundedIcon />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label={t("profileTab.securitySubTab.fieldLabels.currentPasswordFieldLabel")}
                  margin='dense'
                  name='currentPassword'
                  onChange={(changeEvent) => handlePasswordChanges(changeEvent, 0)}
                  type={showPassword[0] ? "text" : "password"}
                  value={providedPasswords[0]}
                  variant='outlined'
                />

                <TextField
                  className={classes.inputFields}
                  error={
                    providedPasswords[1].length === 0
                      ? false
                      : (
                        providedPasswords[0] === providedPasswords[1]
                          ? true
                          : (
                            !isValidPass(providedPasswords[1])
                          )
                      )
                  }
                  fullWidth
                  helperText={
                    providedPasswords[1].length === 0
                      ? ""
                      : (
                        providedPasswords[0] === providedPasswords[1]
                          ? t("profileTab.securitySubTab.errorMessages.samePasswordErrorMessage")
                          : (
                            isValidPass(providedPasswords[1])
                              ? ""
                              : t("profileTab.securitySubTab.errorMessages.tooWeakPasswordErrorMessage")
                          )
                      )
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={(event) => handleShowPassword(event, 1)}
                        >
                          {
                            showPassword[1]
                              ? <VisibilityRoundedIcon />
                              : <VisibilityOffRoundedIcon />
                          }
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label={t("profileTab.securitySubTab.fieldLabels.newPasswordFieldLabel")}
                  margin='dense'
                  name='newPassword'
                  onChange={(changeEvent) => handlePasswordChanges(changeEvent, 1)}
                  type={showPassword[1] ? "text" : "password"}
                  value={providedPasswords[1]}
                  variant='outlined'
                />

                <div className={classes.actionsContainer}>
                  <Button
                    className={
                      (providedPasswords[0] !== providedPasswords[1]) &&
                (providedPasswords[0].length && providedPasswords[1].length) &&
                (isValidPass(providedPasswords[1]))
                        ? classes.enabledUpdatePasswordButton
                        : classes.disabledUpdatePasswordButton
                    }
                    onClick={handlePasswordChangeRequest}
                  >
                    {t("profileTab.securitySubTab.buttonLabels.updatePasswordButtonLabel")}
                  </Button>
                </div>
              </>
            )
        }

        <hr className={classes.sectionSeparator} />

        <p className={classes.userActivityTitle}>
          {t("profileTab.securitySubTab.userActivityTitle")}
        </p>
      </section>
    </main>
  );
};

export default Security;
