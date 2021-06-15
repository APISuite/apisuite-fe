import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  Fade,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Trans,
  Typography,
  useConfig,
  useTheme,
  useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";

import { applicationsModalSelector } from "./selector";
import { createApp } from "store/applications/actions/createApp";
import { deleteApp } from "store/applications/actions/deleteApp";
import { deleteAppMedia } from "store/applications/actions/deleteAppMedia";
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { uploadAppMedia } from "store/applications/actions/appMediaUpload";
import CustomizableDialog from "components/CustomizableDialog/CustomizableDialog";
import Link from "components/Link";
import { Logo } from "components/Logo";
import { MediaUpload } from "components/MediaUpload";
import Notice from "components/Notice";

import { getSections } from "util/extensions";
import { isValidAppMetaKey, isValidImage, isValidURL } from "util/forms";
import { useForm } from "util/useForm";

import { ApplicationsModalProps } from "./types";
import useStyles from "./styles";
import { PageContainer } from "components/PageContainer";

export const ApplicationsModal: React.FC<ApplicationsModalProps> = ({
  allUserAppNames,
  isModalOpen,
  modalDetails,
  modalMode,
  toggleModal,
}) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { palette } = useTheme();

  const { mostRecentlySelectedAppDetails } = useSelector(applicationsModalSelector);

  const { ownerInfo, portalName, navigation } = useConfig();

  const metadataKeyDefaultPrefix = "meta_";

  useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'applications > currentApp')
    of all information we presently have on a particular app. */
    if (modalDetails.userAppID && modalDetails.userID) {
      dispatch(getUserApp({ appId: modalDetails.userAppID, orgId: modalDetails.userID }));
    }
  }, [modalMode, modalDetails, dispatch]);

  const [avatarInputIsInFocus, setAvatarInputIsInFocus] = React.useState(false);
  const [validImage, setValidImage] = React.useState<boolean>(true);
  const [visibilityChanged, setVisibilityChange] = React.useState<boolean>(false);

  const validateAvatar = (avatar: string) => {
    if (avatar !== "") {
      (
        async () => {
          const valid = await isValidImage(avatar);

          setValidImage(valid);
        }
      )();
    }
  };

  /*
  App details
  Note:
  - 'formState' refers to our own, local copy of an app's details.
  - 'mostRecentlySelectedAppDetails' refers to our stored, back-end approved copy of all details
  we presently have on the user's most recently selected app (under 'applications > currentApp').
  */

  // Performs some basic checks on user-provided URIs
  const uriBasicChecks = (uri: string | number) => {
    const stringURI = uri ? uri.toString() : null;

    if (stringURI === null || stringURI.length === 0) return true;
    if (stringURI.length > 0) return isValidURL(stringURI);

    return false;
  };

  const {
    formState,
    handleChange,
    handleFocus,
    resetForm,
  } = useForm(
    // Initial app details
    {
      appAvatarURL: "",
      appClientID: "",
      appClientSecret: "",
      appFullDescription: "",
      appLabels: "",
      appName: "",
      appPrivacyURL: "",
      appRedirectURI: "https://",
      appShortDescription: "",
      appSupportURL: "",
      appTermsURL: "",
      appVisibility: "private",
      appWebsiteURL: "",
      appYouTubeURL: "",
      appMetaKey: "",
      appMetaValue: "",
      appMetaTitle: "",
      appMetaDescription: "",
    },
    // Rules for (some) app details
    {
      appAvatarURL: {
        rules: [(URI) => {
          const validURL = uriBasicChecks(URI);

          if (validURL) {
            if (URI === null || URI.toString().length === 0) {
              setValidImage(true);
            } else {
              validateAvatar(URI.toString());
            }
          }

          return validURL;
        }],
        message: t("dashboardTab.applicationsSubTab.appModal.appAvatarURLError"),
      },

      appPrivacyURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"),
      },

      appRedirectURI: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"),
      },

      appShortDescription: {
        rules: [(text) => text.toString().length <= 60],
        message: t("dashboardTab.applicationsSubTab.appModal.errors.shortDescriptionLimit"),
      },

      appSupportURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"),
      },

      appTermsURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"),
      },

      appWebsiteURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"),
      },

      appYouTubeURL: {
        rules: [(URI) => uriBasicChecks(URI)],
        message: t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"),
      },
    });

  /*
  Whenever 'modalMode' or 'mostRecentlySelectedAppDetails' changes, our form's values are 'reset' to:
  - Whatever is stored in 'mostRecentlySelectedAppDetails' (if 'modalMode' amounts to 'edit').
  - An empty string (if 'modalMode' amounts to 'new').
  */
  useEffect(() => {
    if (modalMode === "edit") {
      resetForm({
        appAvatarURL: mostRecentlySelectedAppDetails.logo ? mostRecentlySelectedAppDetails.logo : "",
        appClientID: mostRecentlySelectedAppDetails.clientId ? mostRecentlySelectedAppDetails.clientId : "",
        appClientSecret: mostRecentlySelectedAppDetails.clientSecret ? mostRecentlySelectedAppDetails.clientSecret : "",
        appFullDescription: mostRecentlySelectedAppDetails.description ? mostRecentlySelectedAppDetails.description : "",
        appLabels: mostRecentlySelectedAppDetails.labels.length > 0
          ? mostRecentlySelectedAppDetails.labels.join(", ")
          : "",
        appName: mostRecentlySelectedAppDetails.name ? mostRecentlySelectedAppDetails.name : "",
        appPrivacyURL: mostRecentlySelectedAppDetails.privacyUrl ? mostRecentlySelectedAppDetails.privacyUrl : "",
        appRedirectURI: mostRecentlySelectedAppDetails.redirectUrl ? mostRecentlySelectedAppDetails.redirectUrl : "",
        appShortDescription: mostRecentlySelectedAppDetails.shortDescription
          ? mostRecentlySelectedAppDetails.shortDescription
          : "",
        appSupportURL: mostRecentlySelectedAppDetails.supportUrl ? mostRecentlySelectedAppDetails.supportUrl : "",
        appTermsURL: mostRecentlySelectedAppDetails.tosUrl ? mostRecentlySelectedAppDetails.tosUrl : "",
        appVisibility: mostRecentlySelectedAppDetails.visibility ? mostRecentlySelectedAppDetails.visibility : "private",
        appWebsiteURL: mostRecentlySelectedAppDetails.websiteUrl ? mostRecentlySelectedAppDetails.websiteUrl : "",
        appYouTubeURL: mostRecentlySelectedAppDetails.youtubeUrl ? mostRecentlySelectedAppDetails.youtubeUrl : "",
        appMetaKey: mostRecentlySelectedAppDetails.metadata[0]?.key
          ? mostRecentlySelectedAppDetails.metadata[0].key.slice(5)
          : "",
        appMetaValue: mostRecentlySelectedAppDetails.metadata[0]?.value
          ? mostRecentlySelectedAppDetails.metadata[0].value
          : "",
        appMetaTitle: mostRecentlySelectedAppDetails.metadata[0]?.title
          ? mostRecentlySelectedAppDetails.metadata[0].title
          : "",
        appMetaDescription: mostRecentlySelectedAppDetails.metadata[0]?.description
          ? mostRecentlySelectedAppDetails.metadata[0].description
          : "",
      });
    } else {
      resetForm({
        appAvatarURL: "",
        appClientID: "",
        appClientSecret: "",
        appFullDescription: "",
        appLabels: "",
        appName: "",
        appPrivacyURL: "",
        appRedirectURI: "https://",
        appShortDescription: "",
        appSupportURL: "",
        appTermsURL: "",
        appVisibility: "private",
        appWebsiteURL: "",
        appYouTubeURL: "",
        appMetaKey: "",
        appMetaValue: "",
        appMetaTitle: "",
        appMetaDescription: "",
      });
    }
  }, [modalMode, mostRecentlySelectedAppDetails]);

  /* Optional URL selector */

  const [anchorElement, setAnchorElement] = React.useState(null);
  const [isShowing, setIsShowing] = React.useState([false, false, false, false]);

  /* Whenever the store's 'applications > currentApp' details become available
  (i.e., upon mounting this React.Component, and immediately after saving an app's details),
  we need to determine what optional URLs have been provided, and are meant to be shown. */
  useEffect(() => {
    setIsShowing([
      !!mostRecentlySelectedAppDetails.tosUrl,
      !!mostRecentlySelectedAppDetails.privacyUrl,
      !!mostRecentlySelectedAppDetails.youtubeUrl,
      !!mostRecentlySelectedAppDetails.supportUrl,
    ]);
  }, [mostRecentlySelectedAppDetails]);

  const handleOpenSelector = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();

    setAnchorElement((event as any).currentTarget);
  };

  const handleCloseSelector = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();

    setAnchorElement(null);
  };

  const handleShowOptionalURLField = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    indexOfFormFieldToAdd: number,
  ) => {
    event.stopPropagation();

    const newIsShowingArray = [...isShowing];

    newIsShowingArray[indexOfFormFieldToAdd] = true;

    setIsShowing(newIsShowingArray);
    setAnchorElement(null);
  };

  const handleHideOptionalURLField = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    indexOfFormFieldToRemove: number,
  ) => {
    event.stopPropagation();

    const newIsShowingArray = [...isShowing];

    newIsShowingArray[indexOfFormFieldToRemove] = false;

    if (indexOfFormFieldToRemove === 0 && formState.values.appTermsURL) {
      formState.values.appTermsURL = "";
      delete formState.errors.appTermsURL;
      formState.isDirty = !!mostRecentlySelectedAppDetails.tosUrl;
    } else if (indexOfFormFieldToRemove === 1 && formState.values.appPrivacyURL) {
      formState.values.appPrivacyURL = "";
      delete formState.errors.appPrivacyURL;
      formState.isDirty = !!mostRecentlySelectedAppDetails.privacyUrl;
    } else if (indexOfFormFieldToRemove === 2 && formState.values.appYouTubeURL) {
      formState.values.appYouTubeURL = "";
      delete formState.errors.appYouTubeURL;
      formState.isDirty = !!mostRecentlySelectedAppDetails.youtubeUrl;
    } else if (indexOfFormFieldToRemove === 3 && formState.values.appSupportURL) {
      formState.values.appSupportURL = "";
      delete formState.errors.appSupportURL;
      formState.isDirty = !!mostRecentlySelectedAppDetails.supportUrl;
    }

    setIsShowing(newIsShowingArray);
    setAnchorElement(null);
  };

  /* Avatar-related stuff, part two */

  let appNameInitials = "...";

  if (formState.values.appName) {
    const appNameInitialsArray = formState.values.appName.split(" ").filter((word) => {
      return word.length > 0;
    });

    appNameInitials = appNameInitialsArray.length >= 2
      ? `${appNameInitialsArray[0][0]}${appNameInitialsArray[1][0]}`
      : (
        appNameInitialsArray[0].length === 1
          ? appNameInitialsArray[0][0]
          : `${appNameInitialsArray[0][0]}${appNameInitialsArray[0][1]}`
      );
  }

  /* App-related actions */

  // 1. Support functions

  // 1.a. Label checking

  const checkForLabels = (labels: string) => (
    labels.split(",")
      .map((l) => l.trim())
      .filter(Boolean)
  );

  // 1.b. App visibility handling

  const handleAppVisibility = (selectedAppVisibility: string) => {
    formState.values.appVisibility = selectedAppVisibility;
    setVisibilityChange(formState.values.appVisibility !== mostRecentlySelectedAppDetails.visibility);
  };

  const getFormMetadata = () => {
    return formState.values.appMetaKey.length ? [{
      key: `${metadataKeyDefaultPrefix}${formState.values.appMetaKey}`,
      value: formState.values.appMetaValue,
      title: formState.values.appMetaTitle,
      description: formState.values.appMetaDescription,
    }] : [];
  };

  // 2. Creating an app

  const createNewApp = (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    const newAppDetails = {
      description: formState.values.appFullDescription,
      labels: checkForLabels(formState.values.appLabels),
      logo: formState.values.appAvatarURL,
      metadata: getFormMetadata(),
      name: formState.values.appName,
      privacyUrl: formState.values.appPrivacyURL,
      redirectUrl: formState.values.appRedirectURI,
      shortDescription: formState.values.appShortDescription,
      supportUrl: formState.values.appSupportURL,
      tosUrl: formState.values.appTermsURL,
      visibility: formState.values.appVisibility,
      websiteUrl: formState.values.appWebsiteURL,
      youtubeUrl: formState.values.appYouTubeURL,
    };

    dispatch(createApp({ appData: newAppDetails }));

    toggleModal();
  };

  // 3. Updating an app

  const _updateApp = (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    const updatedAppDetails = {
      description: formState.values.appFullDescription,
      id: modalDetails.userAppID,
      labels: checkForLabels(formState.values.appLabels),
      logo: formState.values.appAvatarURL,
      metadata: getFormMetadata(),
      name: formState.values.appName,
      privacyUrl: formState.values.appPrivacyURL,
      redirectUrl: formState.values.appRedirectURI,
      shortDescription: formState.values.appShortDescription,
      supportUrl: formState.values.appSupportURL,
      tosUrl: formState.values.appTermsURL,
      visibility: formState.values.appVisibility,
      websiteUrl: formState.values.appWebsiteURL,
      youtubeUrl: formState.values.appYouTubeURL,
    };

    dispatch(updateApp({ appData: updatedAppDetails }));

    toggleModal();
  };

  // 4. Deleting an app

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const _deleteApp = () => {
    dispatch(deleteApp({ appId: modalDetails.userAppID }));

    handleCloseDialog();

    toggleModal();
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const uploadMedia = (files: File[]) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(files[i].name, files[i]);
    }

    dispatch(uploadAppMedia({
      appId: mostRecentlySelectedAppDetails.id,
      media: formData,
    }));
  };

  const deleteMedia = (file: string) => {
    dispatch(deleteAppMedia({
      appId: mostRecentlySelectedAppDetails.id,
      media: file,
    }));
  };

  const validMetadata = () => {
    if (formState.values.appMetaKey.length === 0) {
      return formState.values.appMetaValue.length === 0 &&
      formState.values.appMetaTitle.length === 0 &&
      formState.values.appMetaTitle.length === 0;
    } else {
      return isValidAppMetaKey(`${metadataKeyDefaultPrefix}${formState.values.appMetaKey}`) &&
      formState.values.appMetaValue.length !== 0 &&
      formState.values.appMetaTitle.length !== 0 &&
      formState.values.appMetaTitle.length !== 0;
    }
  };

  const hasChanged = () => {
    // FIXME: the form needs to be replaced
    // formState.errors does not update on error so this was needed
    const required = [
      formState.values.appName.length !== 0,
      formState.values.appRedirectURI.length !== 0,
    ];

    const hasRequired = required.every((val) => val);

    const changed = [
      formState.isDirty,
      visibilityChanged,
    ];

    return (formState.isValid || Object.keys(formState.errors).length === 0)
      && hasRequired
      && changed.some((v) => v)
      && validMetadata()
      && validImage;
  };

  return (
    <>
      <Modal
        onClose={() => {
          resetForm({
            appAvatarURL: "",
            appClientID: "",
            appClientSecret: "",
            appFullDescription: "",
            appLabels: "",
            appName: "",
            appPrivacyURL: "",
            appRedirectURI: "https://",
            appShortDescription: "",
            appSupportURL: "",
            appTermsURL: "",
            appVisibility: "private",
            appWebsiteURL: "",
            appYouTubeURL: "",
            appMetaKey: "",
            appMetaValue: "",
            appMetaTitle: "",
            appMetaDescription: "",
          });
          toggleModal();
          mostRecentlySelectedAppDetails.media = [];
        }}
        open={isModalOpen}
      >
        <Fade in={isModalOpen}>
          <div className={classes.modalContentsContainer}>
            {/* Modal header */}
            <div className={classes.modalHeaderContainer}>
              <div className={classes.logoAndNameContainer}>
                {
                  <Box fontSize="60px">
                    <Logo
                      src={ownerInfo.logo}
                      icon={navigation.title.iconFallbackName}
                    />
                  </Box>
                }

                <Typography variant="h3" display="block" gutterBottom>
                  {portalName}
                </Typography>
              </div>

              <div
                className={classes.closeModalButtonContainer}
                onClick={toggleModal}
              >
                <Box>
                  <Typography variant="caption" display="block" gutterBottom>
                    {t("dashboardTab.applicationsSubTab.appModal.closeButtonLabel")}
                  </Typography>
                </Box>

                <Icon>close</Icon>
              </div>
            </div>

            {/* Modal body */}
            <PageContainer disablePaddingY={true}>
              {/* Modal's title */}
              {
                modalMode === "new"
                  ? (
                    <Box py={3}>
                      <Typography variant="h2" display="block" gutterBottom>
                        {t("dashboardTab.applicationsSubTab.appModal.newAppLabel")}
                      </Typography>
                    </Box>
                  )
                  : (
                    <div className={classes.editApplicationHeaderContainer}>
                      <Box>
                        <Typography variant="h2" display="block" gutterBottom>
                          {mostRecentlySelectedAppDetails.name}
                        </Typography>
                      </Box>

                      <div className={classes.editApplicationHeaderStatusContainer}>
                        <Box display="flex">
                          {/* A mere dot */}
                          <Box
                            className={
                              clsx(
                                classes.subscribedClientApplicationCardStatusIcon,
                                !mostRecentlySelectedAppDetails.subscriptions.length &&
                                classes.draftClientApplicationCardStatusIcon,
                              )
                            }
                            pb={1.5}
                            pr={1}
                          >
                            <Icon fontSize="small">circle</Icon>
                          </Box>

                          <Box pb={1.5} clone>
                            <Typography variant="body2" style={{ color: palette.text.secondary }}>
                              {
                                mostRecentlySelectedAppDetails.subscriptions.length === 0
                                  ? t("dashboardTab.applicationsSubTab.appModal.draftAppStatus")
                                  : t("dashboardTab.applicationsSubTab.appModal.subbedAppStatus")
                              }
                            </Typography>
                          </Box>
                        </Box>
                      </div>
                    </div>
                  )
              }

              {/* 'General information' section */}
              <Grid container>
                {/* 'App name and short description' subsection */}
                <Grid item md={12} spacing={3}>
                  <Grid item md={6} spacing={3}>
                    <Box pb={1.5}>
                      <Typography variant="h6" display="block" gutterBottom>
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelOne")}
                      </Typography>
                    </Box>
                    <Box pb={5}>
                      <Typography variant="body2" display="block" gutterBottom style={{ color: palette.text.secondary }}>
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelTwo")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={6} spacing={3}>

                  <TextField
                    className={classes.inputFields}
                    error={
                      (formState.touched.appName && formState.values.appName.length === 0) ||
                      (modalMode === "new" && allUserAppNames.includes(formState.values.appName))
                    }
                    fullWidth
                    helperText={
                      (formState.touched.appName && formState.values.appName.length === 0)
                        ? t("dashboardTab.applicationsSubTab.appModal.noAppNameError")
                        : (
                          (modalMode === "new" && allUserAppNames.includes(formState.values.appName))
                            ? t("dashboardTab.applicationsSubTab.appModal.existingAppNameError")
                            : ""
                        )
                    }
                    label={t("dashboardTab.applicationsSubTab.appModal.appNameFieldLabel")}
                    margin='dense'
                    name='appName'
                    onChange={handleChange}
                    onFocus={handleFocus}
                    required
                    type='text'
                    value={formState.values.appName}
                    variant='outlined'
                  />

                  <TextField
                    className={classes.inputFields}
                    error={formState.errors.appShortDescription}
                    fullWidth
                    helperText={
                      formState.errors.appShortDescription
                        ? formState.errorMsgs.appShortDescription
                        : ""
                    }
                    label={t("dashboardTab.applicationsSubTab.appModal.appShortDescriptionFieldLabel")}
                    margin='dense'
                    name='appShortDescription'
                    onChange={handleChange}
                    type='text'
                    value={formState.values.appShortDescription}
                    variant='outlined'
                  />
                </Grid>

                {/* 'App avatar' subsection */}
                <Grid item md={6} spacing={3}>

                  <div className={classes.appAvatarContainer}>
                    {/* TODO: Eventually add 'upload' capabilities to the following 'Avatar' as an 'onClick' event */}
                    {
                      avatarInputIsInFocus
                        ? (
                          <Icon
                            className={classes.avatarIcons}
                            onClick={
                              () => {
                                setAvatarInputIsInFocus(false);
                              }
                            }
                          >
                            close
                          </Icon>
                        )
                        : (
                          <Icon
                            className={classes.avatarIcons}
                            onClick={
                              () => {
                                setAvatarInputIsInFocus(true);
                              }
                            }
                          >
                            image_search
                          </Icon>
                        )
                    }

                    <Avatar
                      className={
                        avatarInputIsInFocus || formState.values.appAvatarURL
                          ? classes.focusedAvatar
                          : classes.notFocusedAvatar
                      }
                      src={formState.values.appAvatarURL}
                    >
                      {appNameInitials}
                    </Avatar>

                    <TextField
                      className={classes.avatarURLInputField}
                      error={(formState.touched.appAvatarURL && formState.errors.appAvatarURL) || !validImage}
                      fullWidth
                      helperText={
                        (formState.touched.appAvatarURL && formState.errors.appAvatarURL) || !validImage
                          ? formState.errorMsgs.appAvatarURL
                          : t("dashboardTab.applicationsSubTab.appModal.appAvatarFieldSubLabel")
                      }
                      inputRef={(input) =>
                        avatarInputIsInFocus ? input && input.focus() : input && input.blur()}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label={t("dashboardTab.applicationsSubTab.appModal.appAvatarFieldLabel")}
                      margin='dense'
                      name='appAvatarURL'
                      onBlur={() => {
                        setAvatarInputIsInFocus(false);
                      }}
                      onChange={handleChange}
                      onFocus={(focusEvent) => {
                        handleFocus(focusEvent);
                        setAvatarInputIsInFocus(true);
                      }}
                      type='url'
                      value={formState.values.appAvatarURL}
                      variant='outlined'
                    />
                  </div>
                </Grid>
              </Grid>

              <hr className={classes.alternativeSectionSeparator} />

              {/* 'Access details' section */}
              <Grid container>
                {/* 'Redirect URI' subsection */}
                <Grid md={12} spacing={3}>
                  <Grid md={6} spacing={3}>
                    <Box pb={1.5}>
                      <Typography variant="h6" display="block" gutterBottom>
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelThree")}
                      </Typography>
                    </Box>
                    <Box pb={5}>
                      <Typography variant="body2" display="block" gutterBottom style={{ color: palette.text.secondary }}>
                        <Trans i18nKey="dashboardTab.applicationsSubTab.appModal.subSectionLabelFour">
                          {[
                            <Link
                              key="dashboardTab.applicationsSubTab.appModal.subSectionLabelFour"
                              to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580386833/Open+Authentication+2"
                              rel='noopener noreferrer'
                              target='_blank'
                            />,
                          ]}
                        </Trans>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={6} spacing={3}>
                  <TextField
                    className={classes.inputFields}
                    error={formState.errors.appRedirectURI}
                    fullWidth
                    helperText={
                      formState.errors.appRedirectURI
                        ? formState.errorMsgs.appRedirectURI
                        : ""
                    }
                    label={t("dashboardTab.applicationsSubTab.appModal.subSectionLabelThree")}
                    margin='dense'
                    name='appRedirectURI'
                    onChange={handleChange}
                    required
                    type='url'
                    value={formState.values.appRedirectURI}
                    variant='outlined'
                  />
                </Grid>

                {/* 'Client credentials' subsection */}
                <Grid item md={6} spacing={3}>
                  <div className={classes.row}>
                    <TextField
                      fullWidth
                      label={t("dashboardTab.applicationsSubTab.appModal.appClientIDFieldLabel")}
                      margin="dense"
                      name="appClientID"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.appClientID}
                      variant="outlined"
                      disabled
                    />

                    <div className={classes.rowCta}>
                      <IconButton
                        size="medium"
                        disabled={!formState.values.appClientID}
                        onClick={() => copyToClipboard(formState.values.appClientID)}
                      >
                        <Icon>content_copy</Icon>
                      </IconButton>
                    </div>
                  </div>

                  <div className={classes.clientSecretInputFieldContainer}>
                    <TextField
                      fullWidth
                      label={t("dashboardTab.applicationsSubTab.appModal.appClientSecretFieldLabel")}
                      margin="dense"
                      name="appClientSecret"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.appClientSecret}
                      variant="outlined"
                      disabled
                    />

                    <div className={classes.copyCta}>
                      <IconButton
                        size="medium"
                        disabled={!formState.values.appClientSecret}
                        onClick={() => copyToClipboard(formState.values.appClientSecret)}
                      >
                        <Icon>content_copy</Icon>
                      </IconButton>
                    </div>

                    <div
                      className={
                        modalMode === "new"
                          ? classes.disabledClientSecretInputFieldRefreshButton
                          /* TODO: Previously 'enabledClientSecretInputFieldRefreshButton'.
                          Revisit once it is possible to generate/edit new client secrets. */
                          : classes.disabledClientSecretInputFieldRefreshButton
                      }
                    >
                      <Icon>refresh</Icon>
                    </div>
                  </div>
                </Grid>
              </Grid>

              <hr className={classes.regularSectionSeparator} />

              {/* 'Additional information' section */}
              <Grid container>
                {/* 'Full description' subsection */}
                <Grid md={12} spacing={3}>
                  <Grid md={6} spacing={3}>
                    <Box pb={1.5}>
                      <Typography variant="h6" display="block" gutterBottom>
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelFive")}
                      </Typography>
                    </Box>
                    <Box pb={5}>
                      <Typography variant="body2" display="block" gutterBottom style={{ color: palette.text.secondary }}>
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelSix")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid item md={6} spacing={3}>

                  <TextField
                    className={classes.inputFields}
                    fullWidth
                    label={t("dashboardTab.applicationsSubTab.appModal.appFullDescriptionFieldLabel")}
                    margin='dense'
                    multiline
                    name='appFullDescription'
                    onChange={handleChange}
                    rows={4}
                    type='text'
                    value={formState.values.appFullDescription}
                    variant='outlined'
                  />
                </Grid>

                {/* 'Optional URLs' subsection */}
                <Grid item md={6} spacing={3}>
                  <div className={classes.appURLFieldWrapper}>
                    <TextField
                      className={classes.inputFields}
                      error={formState.errors.appWebsiteURL}
                      fullWidth
                      helperText={
                        formState.errors.appWebsiteURL
                          ? formState.errorMsgs.appWebsiteURL
                          : ""
                      }
                      label={t("dashboardTab.applicationsSubTab.appModal.appWebsiteURLFieldLabel")}
                      margin='dense'
                      name='appWebsiteURL'
                      onChange={handleChange}
                      type='url'
                      value={formState.values.appWebsiteURL}
                      variant='outlined'
                    />

                    <div onClick={handleOpenSelector}>
                      <Icon>add</Icon>
                    </div>
                  </div>

                  <Menu
                    anchorEl={anchorElement}
                    onClose={handleCloseSelector}
                    open={Boolean(anchorElement)}
                    TransitionComponent={Fade}
                  >
                    <MenuItem
                      className={classes.selectorTitle}
                      disabled
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.selectorTitle")}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[0]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 0)}
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.appToSFieldLabel")}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[1]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 1)}
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.appPrivacyPolicyFieldLabel")}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[2]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 2)}
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.appYouTubeChannelFieldLabel")}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.appWebsiteFieldLabel")}
                    </MenuItem>

                    <MenuItem
                      className={classes.selectorOption}
                      disabled={isShowing[3]}
                      onClick={(clickEvent) => handleShowOptionalURLField(clickEvent, 3)}
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.appSupportFieldLabel")}
                    </MenuItem>
                  </Menu>

                  {
                    isShowing[0] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appTermsURL}
                        fullWidth
                        helperText={
                          formState.errors.appTermsURL
                            ? formState.errorMsgs.appTermsURL
                            : ""
                        }
                        label={t("dashboardTab.applicationsSubTab.appModal.appToSURLFieldLabel")}
                        margin='dense'
                        name='appTermsURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appTermsURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 0)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }

                  {
                    isShowing[1] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appPrivacyURL}
                        fullWidth
                        helperText={
                          formState.errors.appPrivacyURL
                            ? formState.errorMsgs.appPrivacyURL
                            : ""
                        }
                        label={t("dashboardTab.applicationsSubTab.appModal.appPrivacyPolicyURLFieldLabel")}
                        margin='dense'
                        name='appPrivacyURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appPrivacyURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 1)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }

                  {
                    isShowing[2] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appYouTubeURL}
                        fullWidth
                        helperText={
                          formState.errors.appYouTubeURL
                            ? formState.errorMsgs.appYouTubeURL
                            : ""
                        }
                        label={t("dashboardTab.applicationsSubTab.appModal.appYouTubeChannelURLFieldLabel")}
                        margin='dense'
                        name='appYouTubeURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appYouTubeURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 2)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }

                  {
                    isShowing[3] &&
                    <div className={classes.appURLFieldWrapper}>
                      <TextField
                        className={classes.inputFields}
                        error={formState.errors.appSupportURL}
                        fullWidth
                        helperText={
                          formState.errors.appSupportURL
                            ? formState.errorMsgs.appSupportURL
                            : ""
                        }
                        label={t("dashboardTab.applicationsSubTab.appModal.appSupportURLFieldLabel")}
                        margin='dense'
                        name='appSupportURL'
                        onChange={handleChange}
                        type='url'
                        value={formState.values.appSupportURL}
                        variant='outlined'
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 3)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }
                </Grid>
              </Grid>

              {
                modalMode !== "new" && <>
                  <hr className={classes.regularSectionSeparator} />

                  <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid md={12} spacing={3}>
                      <Grid md={6} spacing={3}>
                        <Box pb={1.5}>
                          <Typography variant="h6" display="block" gutterBottom>
                            {t("mediaUpload.title")}
                          </Typography>
                        </Box>
                        <Box pb={5}>
                          <Typography variant="body2" display="block" gutterBottom style={{ color: palette.text.secondary }}>
                            {t("mediaUpload.description")}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item md={12}>
                      <MediaUpload
                        images={mostRecentlySelectedAppDetails.media || []}
                        accept="image/*"
                        onFileLoaded={uploadMedia}
                        onDeletePressed={deleteMedia}
                      />
                    </Grid>
                  </Grid>
                </>
              }

              <hr className={classes.regularSectionSeparator} />
              {/*
              FIXME: the hr above should be rendered by the extension
              TODO: document getSections so that comments like this are not needed
              The following code checks if a Marketplace extension's section exists,
and if it does, it passes along the form's state, and any necessary logic
to handle an app's visibility and labeling ('handleAppVisibility', and 'handleChange', respectively). */}
              {
                getSections(
                  "MARKETPLACE_APP_VISIBILITY",
                  {
                    formState,
                    handleAppVisibility,
                    handleChange,
                  }
                )
              }

              {/* 'Metadata' section */}
              <div>
                {/* 'Custom properties' text */}
                <Grid md={12} spacing={3}>
                  <Grid md={6} spacing={3}>
                    <Box pb={1.5}>
                      <Typography variant="h6" display="block" gutterBottom>
                        {t("dashboardTab.applicationsSubTab.appModal.customProps.title")}
                      </Typography>
                    </Box>
                    <Box pb={5}>
                      <Typography variant="body2" display="block" gutterBottom style={{ color: palette.text.secondary }}>
                        {t("dashboardTab.applicationsSubTab.appModal.customProps.subtitle")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* 'Custom properties' fields */}
                <div className={classes.customPropsFieldsContainer}>
                  <TextField
                    className={classes.inputFields}
                    error={
                      formState.values.appMetaKey.length !== 0 &&
                      !isValidAppMetaKey(`${metadataKeyDefaultPrefix}${formState.values.appMetaKey}`)
                    }
                    fullWidth
                    helperText={t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldHelperText")}
                    InputProps={{
                      startAdornment: <InputAdornment className={classes.metaPrefix} position="start">{metadataKeyDefaultPrefix}</InputAdornment>,
                    }}
                    label={t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldLabel")}
                    margin="dense"
                    name="appMetaKey"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.appMetaKey}
                    variant="outlined"
                  />

                  <div className={classes.customPropsFieldsInnerContainer}>
                    <TextField
                      className={classes.inputFields}
                      error={
                        formState.values.appMetaKey.length !== 0 &&
                        formState.values.appMetaValue.length === 0
                      }
                      fullWidth
                      label={t("dashboardTab.applicationsSubTab.appModal.customProps.valueFieldLabel")}
                      margin="dense"
                      name="appMetaValue"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.appMetaValue}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.inputFields}
                      error={
                        formState.values.appMetaKey.length !== 0 &&
                        formState.values.appMetaTitle.length === 0
                      }
                      fullWidth
                      label={t("dashboardTab.applicationsSubTab.appModal.customProps.titleFieldLabel")}
                      margin="dense"
                      name="appMetaTitle"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.appMetaTitle}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.inputFields}
                      fullWidth
                      label={t("dashboardTab.applicationsSubTab.appModal.customProps.descriptionFieldLabel")}
                      margin="dense"
                      name="appMetaDescription"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.appMetaDescription}
                      variant="outlined"
                    />
                  </div>
                </div>

                <Grid container>
                  <Grid item md={6} spacing={3}>
                    <Button
                      className={classes.addCustomPropsButton}
                      disabled
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.customProps.addCustomPropsButtonLabel")}
                    </Button>
                  </Grid>

                  <Grid item md={6} spacing={3}>
                    <Notice
                      type="info"
                      noticeIcon={<Icon>info</Icon>}
                      noticeText={
                        <Typography variant="body2" display="block" style={{ color: palette.info.dark }}>
                          <Trans i18nKey="dashboardTab.applicationsSubTab.appModal.customProps.infoBoxRegularText">
                            {[
                              <Link
                                key="dashboardTab.applicationsSubTab.appModal.customProps.infoBoxRegularText"
                                to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/1450835969/Custom+Properties"
                                rel='noopener noreferrer'
                                target='_blank'
                              />,
                            ]}
                          </Trans>
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </div>

              <hr className={classes.regularSectionSeparator} />

              {/* 'App action' buttons section */}
              <div className={classes.buttonsContainer}>
                {
                  modalMode === "new"
                    ? (
                      <Grid container>
                        <Grid item md={6} spacing={3}>
                          <Button
                            disabled={
                              !(
                                formState.values.appName.length !== 0 &&
                                formState.values.appRedirectURI !== "http://" &&
                                formState.values.appRedirectURI !== "https://" &&
                                formState.values.appRedirectURI.length !== 0 &&
                                validMetadata() &&
                                (formState.isValid || Object.keys(formState.errors).length === 0) &&
                                !(allUserAppNames.includes(formState.values.appName)) &&
                                validImage
                              )
                            }
                            color="primary"
                            variant="contained"
                            size="large"
                            disableElevation
                            onClick={createNewApp}
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.addAppButtonLabel")}
                          </Button>

                          <Button
                            className={classes.otherButtons}
                            onClick={toggleModal}
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.cancelModalButtonLabel")}
                          </Button>
                        </Grid>

                        <Grid item md={6} spacing={3}>
                          <Notice
                            type="info"
                            noticeIcon={<Icon>query_builder</Icon>}
                            noticeText={
                              <Box display="flex" flexDirection="column">
                                <Typography variant="body2" display="block" style={{ color: palette.info.dark }}>
                                  {t("dashboardTab.applicationsSubTab.appModal.infoBoxTitleLabel")}
                                </Typography>
                                <Typography variant="body2" display="block" style={{ color: palette.info.dark }}>
                                  {t("dashboardTab.applicationsSubTab.appModal.infoBoxSubTitleLabel")}
                                </Typography>
                              </Box>
                            }
                          />
                        </Grid>
                      </Grid>
                    )
                    : (
                      <>
                        <div>
                          <Button
                            disabled={!hasChanged()}
                            color="primary"
                            variant="contained"
                            size="large"
                            disableElevation
                            onClick={_updateApp}
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.editAppButtonLabel")}
                          </Button>

                          <Button
                            className={classes.otherButtons}
                            href='/dashboard/subscriptions'
                            rel='noopener noreferrer'
                            target='_blank'
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.appSubsButtonLabel")}
                          </Button>

                          <Button
                            className={classes.removeAppButton}
                            onClick={handleOpenDialog}
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.removeAppButtonLabel")}
                          </Button>
                        </div>

                        <Button
                          className={classes.otherButtons}
                          onClick={toggleModal}
                        >
                          {t("dashboardTab.applicationsSubTab.appModal.closeModalButtonLabel")}
                        </Button>
                      </>
                    )
                }
              </div>
            </PageContainer>
          </div>
        </Fade>
      </Modal>

      {
        openDialog &&
        <CustomizableDialog
          closeDialogCallback={handleCloseDialog}
          confirmButtonCallback={_deleteApp}
          confirmButtonLabel={t("dashboardTab.applicationsSubTab.appModal.dialogConfirmButtonLabel")}
          open={openDialog}
          optionalTitleIcon='warning'
          providedSubText={t("dashboardTab.applicationsSubTab.appModal.dialogSubText")}
          providedText={t("dashboardTab.applicationsSubTab.appModal.dialogText")}
          providedTitle={t("dashboardTab.applicationsSubTab.appModal.dialogTitle")}
        />
      }
    </>
  );
};
