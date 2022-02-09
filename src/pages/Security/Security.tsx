import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation, Button, TextField, InputAdornment, IconButton, Typography, Box, Grid, Icon, useTheme, Divider } from "@apisuite/fe-base";
import VisibilityOffRoundedIcon from "@material-ui/icons/VisibilityOffRounded";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import { updatePasswordRequest } from "store/security/actions/updatePassword";

import { isValidPass } from "util/forms";

import { securitySelector } from "./selector";
import { getProfile } from "store/profile/actions/getProfile";
import { PageContainer } from "components/PageContainer";
import Notice from "components/Notice";
import { ReCaptchaPrivacyCopy } from "components/ReCaptchaPrivacyCopy";

export const Security: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { palette } = useTheme();
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

  const blockPasswordChange = (currentPassword: string, newPassword: string) => {
    if (
      !currentPassword.length ||
      !newPassword.length ||
      currentPassword === newPassword ||
      !isValidPass(newPassword)
    ) {
      return true;
    }

    return false;
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

  const passwordComparison = (currentPassword: string, newPassword: string): boolean => {
    if (!newPassword) return false;

    if (currentPassword === newPassword) return true;

    return !isValidPass(newPassword);
  };

  const passwordHelperText = (currentPassword: string, newPassword: string): string => {
    if (!newPassword) return t("signUpForm.warnings.password");
    
    if (currentPassword === newPassword) {
      return t("profileTab.securitySubTab.errorMessages.samePasswordErrorMessage");
    }

    if (!isValidPass(newPassword)) return t("profileTab.securitySubTab.errorMessages.tooWeakPasswordErrorMessage");
    
    return "";
  };

  const handlePasswordChangeRequest = () => {
    dispatch(updatePasswordRequest({ oldPassword: providedPasswords[0], newPassword: providedPasswords[1] }));

    setProvidedPasswords(["", ""]);
  };

  return (
    <PageContainer>
      <Typography variant="h2">
        {t("profileTab.securitySubTab.securityTitle")}
      </Typography>

      <Typography variant="body1" color="textSecondary">
        {!ssoIsActive ? t("profileTab.securitySubTab.securitySubtitleWithoutActiveSSO")
          : t("profileTab.securitySubTab.securitySubtitleWithActiveSSO")}
      </Typography>

      <Grid container>
        <Grid item md>
          <Box clone mt={3} mb={2}>
            <Typography variant="h3">
              {t("profileTab.securitySubTab.updatePasswordTitle")}
            </Typography>
          </Box>

          {ssoIsActive && (
            <Box mt={3}>
              <Notice
                noticeIcon={<Icon>info</Icon>}
                noticeText={
                  <Typography variant="body2" style={{ color: palette.info.contrastText }}>
                    {t("profileTab.securitySubTab.activeSSOBoxText")}
                  </Typography>
                }
              />
            </Box>
          )}

          {!ssoIsActive && (
            <>
              <TextField
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

              <Box mb={3} mt={1.5}>
                <TextField
                  fullWidth
                  error={passwordComparison(providedPasswords[0], providedPasswords[1])}
                  helperText={passwordHelperText(providedPasswords[0], providedPasswords[1])}
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
              </Box>

              <Button
                variant="contained"
                color="primary"
                size="large"
                disableElevation
                disabled={blockPasswordChange(providedPasswords[0], providedPasswords[1])}
                onClick={handlePasswordChangeRequest}
              >
                {t("profileTab.securitySubTab.buttonLabels.updatePasswordButtonLabel")}
              </Button>

              <Box mt={1.5}>
                <ReCaptchaPrivacyCopy />
              </Box>
            </>
          )}
        </Grid>

        <Grid item md />
      </Grid>

      <Box my={5}>
        <Divider />
      </Box>

      {/* TODO: remove text secondary after we develop user activity */}
      <Typography variant="h3" color="textSecondary">
        {t("profileTab.securitySubTab.userActivityTitle")}
      </Typography>
    </PageContainer>
  );
};

export default Security;
