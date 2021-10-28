import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Avatar, Box, Button, Fade, Grid, Icon,
  IconButton, InputAdornment, Menu, MenuItem, Modal, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Trans, Typography, useConfig, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import markdownIcon from "assets/markdownIcon.svg";
import { CustomizableTooltip } from "components/CustomizableTooltip";
import { Logo } from "components/Logo";
import { MediaUpload } from "components/MediaUpload";
import { PageContainer } from "components/PageContainer";
import CustomizableDialog from "components/CustomizableDialog/CustomizableDialog";
import Link from "components/Link";
import Notice from "components/Notice";
import { createApp } from "store/applications/actions/createApp";
import { deleteApp } from "store/applications/actions/deleteApp";
import { deleteAppMedia } from "store/applications/actions/deleteAppMedia";
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { uploadAppMedia } from "store/applications/actions/appMediaUpload";
import { Metadata } from "store/applications/types";
import { getProfile } from "store/profile/actions/getProfile";
import { getSections } from "util/extensions";
import { isValidAppMetaKey, isValidImage, isValidURL } from "util/forms";
import { applicationsModalSelector } from "./selector";
import { profileSelector } from "pages/Profile/selectors";
import useStyles from "./styles";
import { ApplicationsModalProps } from "./types";

export const ApplicationsModal: React.FC<ApplicationsModalProps> = ({
  allUserAppNames,
  isModalOpen,
  modalDetails,
  modalMode,
  toggleModal,
}) => {
  const classes = useStyles();
  const { palette, spacing } = useTheme();
  const { t } = useTranslation();
  const { navigation, ownerInfo, portalName } = useConfig();
  const dispatch = useDispatch();
  const history: any = useHistory();
  const { mostRecentlySelectedAppDetails } = useSelector(applicationsModalSelector);
  const { profile } = useSelector(profileSelector);
  const [openCloseWarning, setOpenCloseWarning] = React.useState(false);
  const [buttonClicked, setButtonClicked] = React.useState("");

  const HTTPS_PREFIX = "https://";

  const handleCloseEditWarning = () => {
    setOpenCloseWarning(false);
  };

  const dialogFunctions: { [index: string]: () => void } = {
    toggleModal: toggleModal,
    regularGoToSubsView: () => history.push("/dashboard/subscriptions"),
    alternativeGoToSubsView: () => history.push("/dashboard/subscriptions", {
      redirected: true,
      appID: history.location.state?.appID || modalDetails.userAppID,
    }),
  };

  const checkNextAction = (fn: string) => {
    if (hasChanged()) {
      fn !== "toggleModal" ? setButtonClicked("subs") : setButtonClicked("close");
      
      return setOpenCloseWarning(true);
    }

    dialogFunctions[fn]();
  };

  const checkHistory = (history: any) => {
    history.location.state?.redirected
      ? checkNextAction("alternativeGoToSubsView")
      : checkNextAction("toggleModal");
  };

  const confirmButtonAction = () => {
    if (modalMode !== "new" || history.location.state?.redirected) {
      dialogFunctions["alternativeGoToSubsView"]();
    } else {
      if (buttonClicked === "subs") {
        dialogFunctions["regularGoToSubsView"]();
      } else {
        dialogFunctions["toggleModal"]();
      }
    }
  };

  const metadataKeyDefaultPrefix = "meta_";

  useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'profile')
    of all user-related information we presently have. */
    dispatch(getProfile({}));
  }, [dispatch]);

  useEffect(() => {
    /* Triggers the retrieval and storage (on the app's Store, under 'applications > currentApp')
    of all information we presently have on a particular app. */
    if (modalDetails.userAppID && modalDetails.userID && profile.current_org.id) {
      dispatch(getUserApp({ orgID: profile.current_org.id, appId: modalDetails.userAppID }));
    }
  }, [dispatch, modalDetails, modalMode, profile]);

  const [avatarInputIsInFocus, setAvatarInputIsInFocus] = React.useState(false);

  const validateAvatar = async (avatar: string) => {
    if (avatar !== "") {
      return await isValidImage(avatar);
    }
    return false;
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

  const appSchema = yup.object().shape({
    appAvatarURL: yup.string()
      .test("isAvatarValid", t("dashboardTab.applicationsSubTab.appModal.appAvatarURLError"), async (value: string|undefined) => {
        const URI = value || "";
        const validURL = uriBasicChecks(URI);

        if (validURL) {
          if (URI === null || URI.length === 0) {
            return true;
          } else {
            return await validateAvatar(URI);
          }
        }

        return validURL;
      }),
    appDirectURL: yup.string()
      .test("isAppDirectURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    appMetadata: yup.array().of(
      yup.object().shape({
        description: yup.string(),
        key: yup.string().test("isKeyValid", t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldHelperText"), (value: string|undefined) => {
          return isValidAppMetaKey(`${currMeta === -1 ? metadataKeyDefaultPrefix : ""}${value}`);
        }).required(),
        title: yup.string().when("key", {
          is: (key: string) => {
            return key && key.length;
          },
          then: yup.string().required(),
        }),
        value: yup.string().when("key", {
          is: (key: string) => {
            return key && key.length;
          },
          then: yup.string().required(),
        }),
      }),
    ),
    appName: yup.string()
      .test("isAppNameValid", t("dashboardTab.applicationsSubTab.appModal.existingAppNameError"),
        (value: string|undefined) => {
          return !(modalMode === "new" && allUserAppNames.includes(value || ""));
        })
      .required(t("dashboardTab.applicationsSubTab.appModal.noAppNameError")),
    appPrivacyURL: yup.string()
      .test("isAppPrivacyURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    appRedirectURI: yup.string()
      .test("isAppRedirectURIValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }).required(t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError")),
    appSummary: yup.string()
      .max(60, t("dashboardTab.applicationsSubTab.appModal.errors.summaryLimit")),
    appSupportURL: yup.string()
      .test("isAppSupportURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    appTermsURL: yup.string()
      .test("isAppTermsURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    appWebsiteURL: yup.string()
      .test("isAppWebsiteURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
    appYouTubeURL: yup.string()
      .test("isAppYoutubeURLValid", t("dashboardTab.applicationsSubTab.appModal.allOtherURLsError"), (value: string|undefined) => {
        const URI = value || "";
        return uriBasicChecks(URI);
      }),
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    register,
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      appAvatarURL: "",
      appClientID: "",
      appClientSecret: "",
      appDirectURL: "",
      appDescription: "",
      appLabels: "",
      appMetadata: [] as Metadata[],
      appName: "",
      appPrivacyURL: "",
      appRedirectURI: HTTPS_PREFIX,
      appSummary: "",
      appSupportURL: "",
      appTermsURL: "",
      appVisibility: "private",
      appWebsiteURL: "",
      appYouTubeURL: "",
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  const { append, fields, remove, update } = useFieldArray({
    control,
    name: "appMetadata",
  });
  const watchAppMetadata = watch("appMetadata");
  const controlledMetadataFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchAppMetadata[index],
    };
  });

  const [metadataFormValues, setMetadataFormValues] = React.useState({
    appMetaDescription: "",
    appMetaKey: "",
    appMetaTitle: "",
    appMetaValue: "",
  });

  /*
  Whenever 'modalMode' or 'mostRecentlySelectedAppDetails' changes, our form's values are 'reset' to:
  - Whatever is stored in 'mostRecentlySelectedAppDetails' (if 'modalMode' amounts to 'edit').
  - An empty string (if 'modalMode' amounts to 'new').
  */
  useEffect(() => {
    if (modalMode === "edit") {
      reset({
        appAvatarURL: mostRecentlySelectedAppDetails.logo ?? "",
        appClientID: mostRecentlySelectedAppDetails.clientId ?? "",
        appClientSecret: mostRecentlySelectedAppDetails.clientSecret ?? "",
        appDirectURL: mostRecentlySelectedAppDetails.directUrl ?? "",
        appDescription: mostRecentlySelectedAppDetails.description ?? "",
        appLabels: mostRecentlySelectedAppDetails.labels.length > 0
          ? mostRecentlySelectedAppDetails.labels.join(", ")
          : "",
        appMetadata: mostRecentlySelectedAppDetails.metadata || [],
        appName: mostRecentlySelectedAppDetails.name ?? "",
        appPrivacyURL: mostRecentlySelectedAppDetails.privacyUrl ?? "",
        appRedirectURI: mostRecentlySelectedAppDetails.redirectUrl ?? "",
        appSummary: mostRecentlySelectedAppDetails.summary ?? "",
        appSupportURL: mostRecentlySelectedAppDetails.supportUrl ?? "",
        appTermsURL: mostRecentlySelectedAppDetails.tosUrl ?? "",
        appVisibility: mostRecentlySelectedAppDetails.visibility ?? "private",
        appWebsiteURL: mostRecentlySelectedAppDetails.websiteUrl ?? "",
        appYouTubeURL: mostRecentlySelectedAppDetails.youtubeUrl ?? "",
      });
    } else {
      reset({
        appAvatarURL: "",
        appClientID: "",
        appClientSecret: "",
        appDirectURL: "",
        appDescription: "",
        appLabels: "",
        appMetadata: [],
        appName: "",
        appPrivacyURL: "",
        appRedirectURI: HTTPS_PREFIX,
        appSummary: "",
        appSupportURL: "",
        appTermsURL: "",
        appVisibility: "private",
        appWebsiteURL: "",
        appYouTubeURL: "",
      });
    }
  }, [modalMode, mostRecentlySelectedAppDetails, reset]);

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

    if (indexOfFormFieldToRemove === 0 && getValues("appTermsURL")) {
      reset({ ...getValues(), appTermsURL: "" }, { keepDirty: true });
    } else if (indexOfFormFieldToRemove === 1 && getValues("appPrivacyURL")) {
      reset({ ...getValues(), appPrivacyURL: "" }, { keepDirty: true });
    } else if (indexOfFormFieldToRemove === 2 && getValues("appYouTubeURL")) {
      reset({ ...getValues(), appYouTubeURL: "" }, { keepDirty: true });
    } else if (indexOfFormFieldToRemove === 3 && getValues("appSupportURL")) {
      reset({ ...getValues(), appSupportURL: "" }, { keepDirty: true });
    }

    setIsShowing(newIsShowingArray);
    setAnchorElement(null);
  };

  /* Avatar-related stuff, part two */

  let appNameInitials = "...";

  if (getValues("appName")) {
    const appNameInitialsArray = getValues("appName").split(" ").filter((word) => {
      return word.length > 0;
    });

    if (appNameInitialsArray.length) {
      appNameInitials = appNameInitialsArray.length >= 2
        ? `${appNameInitialsArray[0][0]}${appNameInitialsArray[1][0]}`
        : (
          appNameInitialsArray[0].length === 1
            ? appNameInitialsArray[0][0]
            : `${appNameInitialsArray[0][0]}${appNameInitialsArray[0][1]}`
        );
    }
  }

  /* App-related actions */

  // 1. Support functions

  // 1.a. Label checking

  // FIXME move to the extension
  const checkForLabels = (labels: string) => (
    labels.split(",")
      .map((l) => l.trim())
      .filter(Boolean)
  );

  // 1.b. App metadata handling

  // FIXME this mapping forces the core to know extension values // there should not exist a mapping
  const mapAppDetails = () => ({
    description: getValues("appDescription"),
    directUrl: getValues("appDirectURL"),
    labels: checkForLabels(getValues("appLabels")),
    logo: getValues("appAvatarURL"),
    metadata: getValues("appMetadata"),
    name: getValues("appName"),
    privacyUrl: getValues("appPrivacyURL"),
    redirectUrl: getValues("appRedirectURI"),
    summary: getValues("appSummary"),
    supportUrl: getValues("appSupportURL"),
    tosUrl: getValues("appTermsURL"),
    visibility: getValues("appVisibility"),
    websiteUrl: getValues("appWebsiteURL"),
    youtubeUrl: getValues("appYouTubeURL"),
  });

  // 2. Creating an app

  const createNewApp = (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    const newAppDetails = mapAppDetails();

    dispatch(createApp({ orgID: profile.current_org.id, appData: newAppDetails }));

    toggleModal();
  };

  // 3. Updating an app

  const _updateApp = (event: React.ChangeEvent<any>) => {
    event.preventDefault();

    const updatedAppDetails = {
      id: modalDetails.userAppID,
      ...mapAppDetails(),
    };

    dispatch(updateApp({ orgID: profile.current_org.id, appData: updatedAppDetails }));

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
    dispatch(deleteApp({ orgID: profile.current_org.id, appId: modalDetails.userAppID }));

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
      orgID: profile.current_org.id,
      appId: mostRecentlySelectedAppDetails.id,
      media: formData,
    }));
  };

  const deleteMedia = (file: string) => {
    dispatch(deleteAppMedia({
      orgID: profile.current_org.id,
      appId: mostRecentlySelectedAppDetails.id,
      media: file,
    }));
  };

  const validMetadata = () => {
    if (metadataFormValues.appMetaKey.length === 0) {
      return metadataFormValues.appMetaValue.length === 0 &&
        metadataFormValues.appMetaTitle.length === 0;
    } else {
      return isValidAppMetaKey(`${metadataKeyDefaultPrefix}${metadataFormValues.appMetaKey}`) &&
        metadataFormValues.appMetaValue.length !== 0 &&
        metadataFormValues.appMetaTitle.length !== 0;
    }
  };

  const hasChanged = () => {
    return (isValid || Object.keys(errors).length === 0)
      && isDirty && validMetadata();
  };

  const [anchorEl, setAnchorEl] = React.useState<{ [x: number]: EventTarget & HTMLButtonElement}|null>(null);
  const [addMeta, setAddMeta] = React.useState(getValues("appMetadata").length > 0);
  const [currMeta, setCurrMeta] = React.useState(-1);
  const [editedMeta, setEditedMeta] = React.useState<Metadata|null>(null);

  const handleClick = (currentTarget: EventTarget & HTMLButtonElement, index = 0) => {
    setAnchorEl({
      [index]: currentTarget,
    });
  };

  const handleEdit = (index: number) => {
    setAnchorEl(null);
    setCurrMeta(index);
    const metadata = {
      ...getValues("appMetadata")[index],
    };
    setEditedMeta(metadata);
  };

  const handleSaveChanges = (index: number) => {
    setCurrMeta(-1);
    setEditedMeta(null);
    const metadata = getValues("appMetadata");
    update(index, metadata[index]);
  };

  const handleCancel = (index: number) => {
    setCurrMeta(-1);
    if (editedMeta) {
      update(index, editedMeta);
      setEditedMeta(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    if (!editedMeta) setCurrMeta(-1);
  };

  const handleDeleteProperty = (index: number) => {
    setAnchorEl(null);
    setCurrMeta(-1);
    const metadata = getValues("appMetadata");
    metadata.splice(index, 1);
    if (!metadata.length) {
      setAddMeta(true);
    }
    remove(index);
  };

  const saveMetadata = () => {
    append({
      key: `${metadataKeyDefaultPrefix}${metadataFormValues.appMetaKey}`,
      value: metadataFormValues.appMetaValue,
      title: metadataFormValues.appMetaTitle,
      description: metadataFormValues.appMetaDescription || "",
    });
    setMetadataFormValues({
      appMetaDescription: "",
      appMetaKey: "",
      appMetaTitle: "",
      appMetaValue: "",
    });
    setAddMeta(false);
  };

  const updateMetaValues = (name: string, value: string) => {
    setMetadataFormValues({
      ...metadataFormValues,
      [name]: value,
    });
  };

  const appMetadataHasErrors = (index: number, prop: string) => {
    return errors && errors.appMetadata
      && errors.appMetadata.length > 0
      && Object.keys(errors.appMetadata[index] || {}).filter(mdta => mdta === prop).length > 0;
  };

  const editMetadataView = () => {
    return <Box mb={1.5} key="edit_metadata_view_123">
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableBody>
            <TableRow style={{ verticalAlign: "baseline" }}>
              <TableCell scope="row" style={{ borderBottom: "none", paddingLeft: spacing(5), paddingTop: spacing(5) }}>
                <TextField
                  className={clsx(classes.inputFields, classes.inputNoMargin)}
                  error={
                    metadataFormValues.appMetaKey.length !== 0 &&
                    !isValidAppMetaKey(`${metadataKeyDefaultPrefix}${metadataFormValues.appMetaKey}`)
                  }
                  fullWidth
                  helperText={t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldHelperText")}
                  InputProps={{
                    startAdornment: <InputAdornment className={classes.metaPrefix} position="start">{metadataKeyDefaultPrefix}</InputAdornment>,
                  }}
                  label={t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldLabel")}
                  onChange={(e) => updateMetaValues(e.target.name, e.target.value)}
                  margin="dense"
                  name="appMetaKey"
                  type="text"
                  variant="outlined"
                />
              </TableCell>

              <TableCell scope="row" style={{ borderBottom: "none" }}>
                <TextField
                  className={clsx(classes.inputFields, classes.inputNoMargin)}
                  error={
                    metadataFormValues.appMetaKey.length !== 0 &&
                    metadataFormValues.appMetaValue.length === 0
                  }
                  fullWidth
                  label={t("dashboardTab.applicationsSubTab.appModal.customProps.valueFieldLabel")}
                  onChange={(e) => updateMetaValues(e.target.name, e.target.value)}
                  margin="dense"
                  name="appMetaValue"
                  type="text"
                  variant="outlined"
                />
              </TableCell>

              <TableCell scope="row" style={{ borderBottom: "none", paddingRight: spacing(5) }}>
                <TextField
                  className={clsx(classes.inputFields, classes.inputNoMargin)}
                  error={
                    metadataFormValues.appMetaKey.length !== 0 &&
                    metadataFormValues.appMetaTitle.length === 0
                  }
                  fullWidth
                  label={t("dashboardTab.applicationsSubTab.appModal.customProps.titleFieldLabel")}
                  onChange={(e) => updateMetaValues(e.target.name, e.target.value)}
                  margin="dense"
                  name="appMetaTitle"
                  type="text"
                  variant="outlined"
                />
              </TableCell>

            </TableRow>

            <TableRow>
              <TableCell colSpan={3} scope="row" style={{ borderBottom: "none", padding: spacing(0, 5) }}>
                <TextField
                  className={clsx(classes.inputFields, classes.inputFullWidth)}
                  fullWidth
                  label={t("dashboardTab.applicationsSubTab.appModal.customProps.descriptionFieldLabel")}
                  onChange={(e) => updateMetaValues(e.target.name, e.target.value)}
                  margin="dense"
                  name="appMetaDescription"
                  type="text"
                  value={metadataFormValues.appMetaDescription}
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} scope="row" style={{ borderBottom: "none", paddingBottom: spacing(5), paddingLeft: spacing(5) }}>
                <Button
                  color="primary"
                  onClick={() => saveMetadata()}
                  variant="contained"
                >
                  {t("dashboardTab.applicationsSubTab.appModal.customProps.save")}
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>;
  };

  const getMetadataTable = () => {
    return (
      <TableContainer component={Paper} key="view_metadata_table_123" style={{ marginBottom: spacing(1.5) }} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell scope="row" style={{ paddingLeft: spacing(5), width: 400 }}>
                {t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldLabel")}
              </TableCell>
              <TableCell scope="row">
                {t("dashboardTab.applicationsSubTab.appModal.customProps.valueFieldLabel")}
              </TableCell>
              <TableCell scope="row" style={{ paddingRight: spacing(5) }}>
                {t("dashboardTab.applicationsSubTab.appModal.customProps.titleFieldLabel")}
              </TableCell>
              <TableCell scope="row" />
            </TableRow>
          </TableHead>

          <TableBody>
            {controlledMetadataFields.map((mdata, index) => ([
              <TableRow
                className={clsx({[classes.tableRow]: index%2 === 0})}
                key={`${mdata.id}`}
                style={{ verticalAlign: "baseline" }}
              >
                <TableCell scope="row" style={{ borderBottom: "none", paddingLeft: spacing(5) }}>
                  <Controller
                    control={control}
                    name={`appMetadata.${index}.key` as const}
                    render={({ field }) => (
                      <TextField
                        className={clsx(classes.inputFields, classes.inputNoMargin)}
                        disabled={currMeta !== index}
                        error={appMetadataHasErrors(index, "key")}
                        {...field}
                        fullWidth
                        helperText={currMeta === index && t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldHelperText")}
                        label={t("dashboardTab.applicationsSubTab.appModal.customProps.keyFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </TableCell>

                <TableCell scope="row" style={{ borderBottom: "none" }}>
                  <Controller
                    control={control}
                    name={`appMetadata.${index}.value` as const}
                    render={({ field }) => (
                      <TextField
                        className={clsx(classes.inputFields, classes.inputNoMargin)}
                        disabled={currMeta !== index}
                        error={appMetadataHasErrors(index, "value")}
                        {...field}
                        label={t("dashboardTab.applicationsSubTab.appModal.customProps.valueFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </TableCell>

                <TableCell colSpan={currMeta === index ? 2 : 1} scope="row" style={{ borderBottom: "none", paddingRight: spacing(currMeta === index ? 5 : 0) }}>
                  <Controller
                    control={control}
                    name={`appMetadata.${index}.title` as const}
                    render={({ field }) => (
                      <TextField
                        className={clsx(classes.inputFields, classes.inputNoMargin)}
                        disabled={currMeta !== index}
                        error={appMetadataHasErrors(index, "title")}
                        {...field}
                        label={t("dashboardTab.applicationsSubTab.appModal.customProps.titleFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </TableCell>

                {
                  currMeta !== index && <TableCell scope="row" style={{ borderBottom: "none", paddingRight: spacing(5), verticalAlign: "top" }}>
                    <IconButton onClick={(e) => handleClick(e.currentTarget, index)}>
                      <Icon>more_vert</Icon>
                    </IconButton>
                    <Menu
                      id={`custom-prop-menu-${index}`}
                      anchorEl={anchorEl && anchorEl[index]}
                      keepMounted
                      open={Boolean(anchorEl && anchorEl[index])}
                      onClose={handleClose}
                    >
                      <MenuItem disabled onClick={() => handleClose()}>{t("dashboardTab.applicationsSubTab.appModal.customProps.menuOptions")}</MenuItem>
                      <MenuItem onClick={() => handleEdit(index)}>{t("dashboardTab.applicationsSubTab.appModal.customProps.menuOptionsEdit")}</MenuItem>
                      <MenuItem onClick={() => handleDeleteProperty(index)}>{t("dashboardTab.applicationsSubTab.appModal.customProps.menuOptionsDelete")}</MenuItem>
                    </Menu>
                  </TableCell>
                }
              </TableRow>,
              currMeta === index && <TableRow
                className={clsx({ [classes.tableRow]: index%2 === 0 })}
                key={`${mdata.key}_description_${index}`}
                style={{ verticalAlign: "baseline" }}
              >
                <TableCell colSpan={4} scope="row" style={{ borderBottom: "none", paddingLeft: spacing(5), paddingRight: spacing(5) }}>
                  <Controller
                    control={control}
                    name={`appMetadata.${index}.description` as const}
                    render={({ field }) => (
                      <TextField
                        className={clsx(classes.inputFields, classes.inputFullWidth)}
                        disabled={currMeta !== index}
                        {...field}
                        fullWidth
                        label={t("dashboardTab.applicationsSubTab.appModal.customProps.descriptionFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </TableCell>
              </TableRow>,
              currMeta === index && <TableRow
                className={clsx({ [classes.tableRow]: index%2 === 0 })}
                key={`${mdata.key}_actions_${index}`}
                style={{ verticalAlign: "baseline" }}
              >
                <TableCell scope="row" style={{ borderBottom: "none", paddingLeft: spacing(5) }}>
                  <Button
                    color="primary"
                    disabled={errors && errors.appMetadata && Object.keys(errors.appMetadata[index] || {}).length > 0}
                    onClick={() => handleSaveChanges(index)}
                    variant="contained"
                  >
                    {t("dashboardTab.applicationsSubTab.appModal.customProps.saveChanges")}
                  </Button>
                </TableCell>
                <TableCell colSpan={3} scope="row" style={{ paddingRight: spacing(5) }}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      className={classes.removeAppButton}
                      onClick={() => handleDeleteProperty(index)}
                      style={{ marginRight: spacing(5) }}
                      variant="contained"
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.customProps.deleteProperty")}
                    </Button>

                    <Button
                      className={classes.addCustomPropsButton}
                      onClick={() => handleCancel(index)}
                      variant="outlined"
                    >
                      {t("dashboardTab.applicationsSubTab.appModal.customProps.cancel")}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>,
            ]))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const getMetadataSection = () => {
    return (
      <>
        <div>
          {/* 'Custom properties' text */}
          <Grid container spacing={3}>
            <Grid item md={6}>
              <Box pb={1.5}>
                <Typography display="block" gutterBottom variant="h6">
                  {t("dashboardTab.applicationsSubTab.appModal.customProps.title")}
                </Typography>
              </Box>

              <Box pb={5}>
                <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                  {t("dashboardTab.applicationsSubTab.appModal.customProps.subtitle")}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* 'Custom properties' fields */}
          {!!getValues("appMetadata").length && getMetadataTable()}
          {addMeta && editMetadataView()}

          <Grid container spacing={3}>
            <Grid item md={6}>
              {
                !addMeta && <Button
                  className={classes.addCustomPropsButton}
                  onClick={() => setAddMeta(true)}
                  variant="outlined"
                >
                  {t("dashboardTab.applicationsSubTab.appModal.customProps.addCustomPropsButtonLabel")}
                </Button>
              }
            </Grid>

            <Grid item md={6}>
              <Notice
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
                type="info"
              />
            </Grid>
          </Grid>
        </div>

        <hr className={classes.regularSectionSeparator} />
      </>
    );
  };

  return (
    <>
      <Modal
        onClose={() => {
          reset({
            appAvatarURL: "",
            appClientID: "",
            appClientSecret: "",
            appDirectURL: "",
            appDescription: "",
            appLabels: "",
            appMetadata: [],
            appName: "",
            appPrivacyURL: "",
            appRedirectURI: HTTPS_PREFIX,
            appSummary: "",
            appSupportURL: "",
            appTermsURL: "",
            appVisibility: "private",
            appWebsiteURL: "",
            appYouTubeURL: "",
          });
          mostRecentlySelectedAppDetails.media = [];
          toggleModal();
        }}
        open={isModalOpen}
      >
        <Fade in={isModalOpen}>
          <div className={classes.modalContentsContainer}>
            {/* Modal header */}
            <div className={classes.modalHeaderContainer}>
              <div className={classes.logoAndNameContainer}>
                <Box>
                  <Logo
                    icon={navigation.title.iconFallbackName}
                    src={ownerInfo.logo}
                  />
                </Box>

                <Typography display="block" gutterBottom variant="h3">
                  {portalName}
                </Typography>
              </div>

              <div
                className={classes.closeModalButtonContainer}
                onClick={() => checkHistory(history)}
              >
                <Box>
                  <Typography gutterBottom variant="caption">
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
                      <Typography display="block" gutterBottom variant="h2">
                        {t("dashboardTab.applicationsSubTab.appModal.newAppLabel")}
                      </Typography>
                    </Box>
                  )
                  : (
                    <div className={classes.editApplicationHeaderContainer}>
                      <Box py={3}>
                        <Typography display="block" gutterBottom variant="h2">
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

                          <Box clone pb={1.5}>
                            <Typography style={{ color: palette.text.secondary }} variant="body2">
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
              <Grid container spacing={3}>
                {/* 'App name and summary' subsection */}
                <Grid item md={12}>
                  <Grid item md={6}>
                    <Box pb={1.5}>
                      <Typography display="block" gutterBottom variant="h6">
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelOne")}
                      </Typography>
                    </Box>

                    <Box pb={5}>
                      <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelTwo")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item md={6}>

                  <Controller
                    control={control}
                    name="appName"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.appName}
                        {...field}
                        fullWidth
                        helperText={errors.appName?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.appNameFieldLabel")}
                        margin="dense"
                        required
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="appSummary"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.appSummary}
                        {...field}
                        fullWidth
                        helperText={errors.appSummary?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.appSummaryFieldLabel")}
                        margin="dense"
                        type="text"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* 'App avatar' subsection */}
                <Grid item md={6}>

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
                        avatarInputIsInFocus || getValues("appAvatarURL")
                          ? classes.focusedAvatar
                          : classes.notFocusedAvatar
                      }
                      src={getValues("appAvatarURL")}
                    >
                      {appNameInitials}
                    </Avatar>

                    <Controller
                      control={control}
                      name="appAvatarURL"
                      render={({ field }) => (
                        <TextField
                          className={classes.avatarURLInputField}
                          error={!!errors.appAvatarURL}
                          {...field}
                          fullWidth
                          helperText={errors.appAvatarURL?.message || t("dashboardTab.applicationsSubTab.appModal.appAvatarFieldSubLabel")}
                          inputRef={(input) =>
                            avatarInputIsInFocus ? input && input.focus() : input && input.blur()}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          label={t("dashboardTab.applicationsSubTab.appModal.appAvatarFieldLabel")}
                          margin="dense"
                          onBlur={() => {
                            setAvatarInputIsInFocus(false);
                          }}
                          onFocus={() => {
                            setAvatarInputIsInFocus(true);
                          }}
                          type="url"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </Grid>

                <Grid item md={12}>
                  <Controller
                    control={control}
                    name="appDescription"
                    render={({ field }) => (
                      <TextField
                        className={clsx(classes.inputFields, classes.descriptionField)}
                        {...field}
                        fullWidth
                        label={t("dashboardTab.applicationsSubTab.appModal.appDescriptionFieldLabel")}
                        margin="dense"
                        multiline
                        rows={9}
                        type="text"
                        variant="outlined"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              className={classes.markdownIcon}
                              position="end"
                            >
                              <CustomizableTooltip
                                tooltipContent={
                                  <Typography variant="caption">
                                    {t("dashboardTab.applicationsSubTab.appModal.markdownTooltipText")}
                                  </Typography>
                                }
                              >
                                <img src={markdownIcon} style={{ height: 24, width: 24 }} />
                              </CustomizableTooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

              </Grid>

              <hr className={classes.alternativeSectionSeparator} />

              {
                modalMode !== "new" &&
                <>
                  <Grid alignItems="center" container direction="row" justify="space-between" spacing={3}>
                    <Grid item md={12}>
                      <Grid item md={6}>
                        <Box pb={1.5}>
                          <Typography display="block" gutterBottom variant="h6">
                            {t("mediaUpload.title")}
                          </Typography>
                        </Box>

                        <Box pb={5}>
                          <Typography
                            display="block"
                            gutterBottom
                            style={{ color: palette.text.secondary }}
                            variant="body2"
                          >
                            {t("mediaUpload.description")}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>

                    <Grid item md={12}>
                      <MediaUpload
                        accept="image/jpg, image/jpeg, image/png, image/gif, image/svg, image/svg+xml"
                        images={mostRecentlySelectedAppDetails.media || []}
                        onDeletePressed={deleteMedia}
                        onFileLoaded={uploadMedia}
                      />
                    </Grid>
                  </Grid>

                  <hr className={classes.regularSectionSeparator} />
                </>
              }

              {/* 'Access details' section */}
              <Grid container spacing={3}>
                {/* 'Redirect URI' subsection */}
                <Grid item md={12}>
                  <Grid item md={6}>
                    <Box pb={1.5}>
                      <Typography display="block" gutterBottom variant="h6">
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelThree")}
                      </Typography>
                    </Box>

                    <Box pb={5}>
                      <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                        <Trans i18nKey="dashboardTab.applicationsSubTab.appModal.subSectionLabelFour">
                          {[
                            <Link
                              key="dashboardTab.applicationsSubTab.appModal.subSectionLabelFour"
                              rel='noopener noreferrer'
                              target='_blank'
                              to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/580386833/Open+Authentication+2"
                            />,
                          ]}
                        </Trans>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Grid item md={6}>
                  <Controller
                    control={control}
                    name="appRedirectURI"
                    render={({ field }) => (
                      <TextField
                        className={classes.inputFields}
                        error={!!errors.appRedirectURI}
                        {...field}
                        fullWidth
                        helperText={errors.appRedirectURI?.message}
                        label={t("dashboardTab.applicationsSubTab.appModal.subSectionLabelThree")}
                        margin="dense"
                        required
                        type="url"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>

                {/* 'Client credentials' subsection */}
                <Grid item md={6}>
                  <div className={classes.row}>
                    <Controller
                      control={control}
                      name="appClientID"
                      render={({ field }) => (
                        <TextField
                          disabled
                          {...field}
                          fullWidth
                          label={t("dashboardTab.applicationsSubTab.appModal.appClientIDFieldLabel")}
                          margin="dense"
                          name="appClientID"
                          type="text"
                          variant="outlined"
                        />
                      )}
                    />

                    <div className={classes.rowCta}>
                      <IconButton
                        disabled={!getValues("appClientID")}
                        onClick={() => copyToClipboard(getValues("appClientID"))}
                        size="medium"
                      >
                        <Icon>content_copy</Icon>
                      </IconButton>
                    </div>
                  </div>

                  <div className={classes.clientSecretInputFieldContainer}>
                    <Controller
                      control={control}
                      name="appClientSecret"
                      render={({ field }) => (
                        <TextField
                          disabled
                          {...field}
                          fullWidth
                          label={t("dashboardTab.applicationsSubTab.appModal.appClientSecretFieldLabel")}
                          margin="dense"
                          name="appClientSecret"
                          type="text"
                          variant="outlined"
                        />
                      )}
                    />

                    <div className={classes.copyCta}>
                      <IconButton
                        disabled={!getValues("appClientSecret")}
                        onClick={() => copyToClipboard(getValues("appClientSecret"))}
                        size="medium"
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
              <Grid container spacing={3}>
                {/* Section's intro */}
                <Grid item md={12}>
                  <Grid item md={6}>
                    <Box pb={1.5}>
                      <Typography display="block" gutterBottom variant="h6">
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelFive")}
                      </Typography>
                    </Box>

                    <Box pb={5}>
                      <Typography display="block" gutterBottom style={{ color: palette.text.secondary }} variant="body2">
                        {t("dashboardTab.applicationsSubTab.appModal.subSectionLabelSix")}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                {/* 'Optional URLs' subsection */}
                <Grid item md={6}>
                  <div className={classes.appURLFieldWrapper}>
                    <Controller
                      control={control}
                      name="appWebsiteURL"
                      render={({ field }) => (
                        <TextField
                          className={classes.inputFields}
                          error={!!errors.appWebsiteURL}
                          {...field}
                          fullWidth
                          helperText={errors.appWebsiteURL?.message}
                          label={t("dashboardTab.applicationsSubTab.appModal.appWebsiteURLFieldLabel")}
                          margin="dense"
                          type="url"
                          variant="outlined"
                        />
                      )}
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
                      <Controller
                        control={control}
                        name="appTermsURL"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.appTermsURL}
                            {...field}
                            fullWidth
                            helperText={errors.appTermsURL?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appToSURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 0)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }

                  {
                    isShowing[1] &&
                    <div className={classes.appURLFieldWrapper}>
                      <Controller
                        control={control}
                        name="appPrivacyURL"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.appPrivacyURL}
                            {...field}
                            fullWidth
                            helperText={errors.appPrivacyURL?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appPrivacyPolicyURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 1)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }

                  {
                    isShowing[2] &&
                    <div className={classes.appURLFieldWrapper}>
                      <Controller
                        control={control}
                        name="appYouTubeURL"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.appYouTubeURL}
                            {...field}
                            fullWidth
                            helperText={errors.appYouTubeURL?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appYouTubeChannelURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 2)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }

                  {
                    isShowing[3] &&
                    <div className={classes.appURLFieldWrapper}>
                      <Controller
                        control={control}
                        name="appSupportURL"
                        render={({ field }) => (
                          <TextField
                            className={classes.inputFields}
                            error={!!errors.appSupportURL}
                            {...field}
                            fullWidth
                            helperText={errors.appSupportURL?.message}
                            label={t("dashboardTab.applicationsSubTab.appModal.appSupportURLFieldLabel")}
                            margin="dense"
                            type="url"
                            variant="outlined"
                          />
                        )}
                      />

                      <div onClick={(clickEvent) => handleHideOptionalURLField(clickEvent, 3)}>
                        <Icon>close</Icon>
                      </div>
                    </div>
                  }
                </Grid>
              </Grid>

              <hr className={classes.regularSectionSeparator} />

              {
                getSections(
                  "MARKETPLACE_APP_SETTINGS",
                  {
                    formUtil: {
                      control,
                      errors,
                      getValues,
                      register,
                      reset,
                      setValue,
                    },
                    data: mostRecentlySelectedAppDetails,
                  }
                )
              }

              {getMetadataSection()}

              {/* 'App action' buttons section */}
              <div className={classes.buttonsContainer}>
                {
                  modalMode === "new"
                    ? (
                      <Grid container spacing={3}>
                        <Grid item md={6}>
                          <Button
                            color="primary"
                            disabled={
                              !getValues("appName") || getValues("appRedirectURI") === HTTPS_PREFIX ||
                              !!errors.appName || !!errors.appRedirectURI
                            }
                            disableElevation
                            onClick={createNewApp}
                            size="large"
                            variant="contained"
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.addAppButtonLabel")}
                          </Button>

                          <Button
                            className={classes.otherButtons}
                            onClick={() => checkHistory(history)}
                            color="primary"
                            variant="outlined"
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.cancelModalButtonLabel")}
                          </Button>
                        </Grid>

                        <Grid item md={6}>
                          <Notice
                            noticeIcon={<Icon>query_builder</Icon>}
                            noticeText={
                              <Box display="flex" flexDirection="column">
                                <Typography display="block" style={{ color: palette.info.dark }} variant="body2">
                                  {t("dashboardTab.applicationsSubTab.appModal.infoBoxTitleLabel")}
                                </Typography>

                                <Typography display="block" style={{ color: palette.info.dark }} variant="body2">
                                  {t("dashboardTab.applicationsSubTab.appModal.infoBoxSubTitleLabel")}
                                </Typography>
                              </Box>
                            }
                            type="info"
                          />
                        </Grid>
                      </Grid>
                    )
                    : (
                      <>
                        <div>
                          <Button
                            color="primary"
                            disabled={!hasChanged()}
                            disableElevation
                            onClick={_updateApp}
                            size="large"
                            variant="contained"
                          >
                            {t("dashboardTab.applicationsSubTab.appModal.editAppButtonLabel")}
                          </Button>

                          <Button
                            className={classes.otherButtons}
                            onClick={() =>  modalMode !== "new" || history.location.state?.redirected
                              ? checkNextAction("alternativeGoToSubsView")
                              : checkNextAction("regularGoToSubsView")}
                            color="primary"
                            variant="outlined"
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
                          onClick={() => checkHistory(history)}
                          color="primary"
                          variant="outlined"
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
          cancelButtonProps={{
            variant: "outlined",
            color: "primary",
          }}
          closeDialogCallback={handleCloseDialog}
          confirmButtonCallback={_deleteApp}
          confirmButtonLabel={t("dashboardTab.applicationsSubTab.appModal.dialogConfirmButtonLabel")}
          confirmButtonStyle={classes.deleteAppButtonStyles}
          open={openDialog}
          optionalTitleIcon="warning"
          providedSubText={t("dashboardTab.applicationsSubTab.appModal.dialogSubText")}
          providedText={t("dashboardTab.applicationsSubTab.appModal.dialogText")}
          providedTitle={t("dashboardTab.applicationsSubTab.appModal.dialogTitle")}
        />
      }

      {
        openCloseWarning &&
        <CustomizableDialog
          cancelButtonLabel={t("dashboardTab.applicationsSubTab.appModal.dialog.warning.cancelButtonLabel")}
          cancelButtonProps={{
            variant: "contained",
            color: "primary",
          }}
          closeDialogCallback={handleCloseEditWarning}
          confirmButtonCallback={confirmButtonAction}
          confirmButtonLabel={t("dashboardTab.applicationsSubTab.appModal.dialog.warning.confirmButtonLabel")}
          confirmButtonProps={{
            variant: "outlined",
            color: "primary",
          }}
          open={openCloseWarning}
          optionalTitleIcon="warning"
          providedSubText={t("dashboardTab.applicationsSubTab.appModal.dialog.warning.subText")}
          providedText={t("dashboardTab.applicationsSubTab.appModal.dialog.warning.text")}
          providedTitle={t("dashboardTab.applicationsSubTab.appModal.dialog.warning.title")}
        />
      }
    </>
  );
};
