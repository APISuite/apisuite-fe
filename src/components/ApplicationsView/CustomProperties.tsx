import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Button, CircularProgress, Container, Grid, Icon, IconButton, InputAdornment,
  Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Trans, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { TypeChip } from "components/AppTypesModal";
import Link from "components/Link";
import Notice from "components/Notice";
import { RouterPrompt } from "components/RouterPrompt";
import { getUserApp } from "store/applications/actions/getUserApp";
import { updateApp } from "store/applications/actions/updatedApp";
import { AppData, AppType, Metadata } from "store/applications/types";
import { getProfile } from "store/profile/actions/getProfile";
import { isValidAppMetaKey } from "util/forms";
import { applicationsViewSelector } from "./selector";
import { profileSelector } from "pages/Profile/selectors";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { getAppTypes } from "store/applications/actions/getAppTypes";
import { getNextType, getPreviousType } from "components/AppTypesModal/util";
import { AppTypesTab } from "pages/AppView/types";

export const CustomProperties: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { palette, spacing } = useTheme();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory() as LocationHistory;
  const { app, createdId, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const appType = useRef<AppType>(types[0]);
  const isNew = Number.isNaN(Number(appId));

  const metadataKeyDefaultPrefix = "meta_";

  useEffect(() => {
    if (isNew && createdId !== -1) {
      history.push(`/dashboard/apps/${createdId}/type/${typeId}/${AppTypesTab.GENERAL}`);
    }
    if (isNew) {
      history.push(`/dashboard/apps/new/type/${typeId}/${AppTypesTab.GENERAL}`);
    }
    if (!isNew && app.appType.id !== Number(typeId) && app.id !== -1 && app.appType.id !== 0) {
      history.push(`/dashboard/apps/${appId}/type/${app.appType.id}/${AppTypesTab.EXPERT}`);
    }
  }, [app.id, app.appType.id, appId, createdId, history, isNew, typeId]);

  useEffect(() => {
    if (!types.length) {
      dispatch(getAppTypes({}));
    } else {
      appType.current = types.find((tp) => tp.id.toString() === typeId) as AppType;
    }
  }, [dispatch, typeId, types]);

  const dialogFunctions: { [index: string]: (hist: LocationHistory) => void } = {
    toggleModal: (hist: LocationHistory) => hist.push("/dashboard/apps"),
    regularGoToSubsView: (hist: LocationHistory) => hist.push("/dashboard/subscriptions"),
    alternativeGoToSubsView: (hist: LocationHistory) => hist.push("/dashboard/subscriptions", {
      redirected: true,
      appID: hist.location.state?.appID || appId,
    }),
  };

  const checkNextAction = (fn: string, hist: LocationHistory) => {
    dialogFunctions[fn](hist);
  };

  const checkHistory = (hist: LocationHistory) => {
    history.location.state?.redirected
      ? checkNextAction("alternativeGoToSubsView", hist)
      : checkNextAction("toggleModal", hist);
  };

  useEffect(() => {
    if (!profile.current_org.id) {
      dispatch(getProfile({}));
    }
  });

  useEffect(() => {
    if (!isNew && profile.current_org.id && (app.id === 0 || app.id !== Number(appId))) {
      dispatch(getUserApp({ orgID: profile.current_org.id, appId: Number(appId) }));
    }
  }, [app.id, appId, dispatch, isNew, profile]);

  const appSchema = yup.object().shape({
    metadata: yup.array().of(
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
  });

  const {
    control,
    formState: { errors, isDirty, isValid },
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      metadata: app.metadata || [] as Metadata[],
    },
    mode: "onChange",
    resolver: yupResolver(appSchema),
    reValidateMode: "onChange",
  });

  const { append, fields, remove, update } = useFieldArray({
    control,
    name: "metadata",
  });
  const watchAppMetadata = watch("metadata");
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

  useEffect(() => {
    if (!isNew) {
      setValue("metadata", app.metadata, { shouldDirty: false });
    }
  }, [app, isNew, setValue]);

  // Updating an app

  const _updateApp = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const updatedAppDetails = {
      ...app,
      ...getValues(),
    };

    dispatch(updateApp({ orgID: profile.current_org.id, appData: updatedAppDetails }));
  };

  const updateAppType = (type: AppType) => {
    const updatedAppDetails = {
      ...app,
      ...getValues(),
      appTypeId: type.id,
    };

    dispatch(updateApp({ orgID: profile.current_org.id, appData: updatedAppDetails }));
  };

  const hasChanged = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
  };

  const handleNext = (application: AppData) => {
    const next = getNextType(application.appType, AppTypesTab.EXPERT);
    history.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${next}`);
  };

  const handlePrevious = (application: AppData) => {
    const prev = getPreviousType(application.appType, AppTypesTab.EXPERT);
    history.push(`/dashboard/apps/${application.id}/type/${application.appType.id}/${prev}`);
  };

  const [anchorEl, setAnchorEl] = React.useState<{ [x: number]: EventTarget & HTMLButtonElement}|null>(null);
  const [addMeta, setAddMeta] = React.useState(getValues("metadata").length > 0);
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
      ...getValues("metadata")[index],
    };
    setEditedMeta(metadata);
  };

  const handleSaveChanges = (index: number) => {
    setCurrMeta(-1);
    setEditedMeta(null);
    const metadata = getValues("metadata");
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
    const metadata = getValues("metadata");
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
    return errors && errors.metadata
      && errors.metadata.length > 0
      && Object.keys(errors.metadata[index] || {}).filter(mdta => mdta === prop).length > 0;
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
                    name={`metadata.${index}.key` as const}
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
                    name={`metadata.${index}.value` as const}
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
                    name={`metadata.${index}.title` as const}
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
                    name={`metadata.${index}.description` as const}
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
                    disabled={errors && errors.metadata && Object.keys(errors.metadata[index] || {}).length > 0}
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
          {!!getValues("metadata").length && getMetadataTable()}
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
      {
        requesting && <div className={classes.centerContent}>
          <CircularProgress size={50} className={classes.loading} />
        </div>
      }
      {
        !requesting && <Box clone>
          <Container maxWidth="lg">
            <div className={classes.editApplicationHeaderContainer}>
              <Box py={3}>
                <Typography display="block" gutterBottom variant="h2">
                  {app.name}
                </Typography>
                <TypeChip color="primary" editable={!isNew} onTypeSelected={updateAppType} type={appType.current} />
              </Box>

              <div className={classes.editApplicationHeaderStatusContainer}>
                <Box display="flex">
                  {/* A mere dot */}
                  <Box
                    className={
                      clsx(
                        classes.subscribedClientApplicationCardStatusIcon,
                        !app.subscriptions.length &&
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
                        app.subscriptions.length === 0
                          ? t("dashboardTab.applicationsSubTab.appModal.draftAppStatus")
                          : t("dashboardTab.applicationsSubTab.appModal.subbedAppStatus")
                      }
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>

            <Grid container spacing={3}>
              <Grid item md={12}>
                {getMetadataSection()}
              </Grid>
            </Grid>

            {/* 'App action' buttons section */}
            <div className={classes.buttonsContainer}>
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
                {
                  !!getNextType(app.appType, AppTypesTab.EXPERT) && <Button
                    color="primary"
                    disableElevation
                    onClick={() => handleNext(app)}
                    size="large"
                    style={{ margin: spacing(0, 0, 0, 3) }}
                    variant="contained"
                  >
                    {t("applications.buttons.next")}
                  </Button>
                }
                {
                  !!getPreviousType(app.appType, AppTypesTab.EXPERT) && <Button
                    color="secondary"
                    disableElevation
                    onClick={() => handlePrevious(app)}
                    size="large"
                    style={{ margin: spacing(0, 0, 0, 3) }}
                    variant="outlined"
                  >
                    {t("applications.buttons.back")}
                  </Button>
                }
              </div>

              <Button
                className={classes.otherButtons}
                onClick={() => checkHistory(history)}
                color="primary"
                variant="outlined"
              >
                {t("applications.buttons.backToApps")}
              </Button>
            </div>
          </Container>
        </Box>
      }

      <RouterPrompt
        bodyText={t("applications.prompt.body")}
        cancelText={t("applications.prompt.cancel")}
        okText={t("applications.prompt.ok")}
        subtitle={t("applications.prompt.subtitle")}
        title={t("applications.prompt.title")}
        type="warning"
        when={hasChanged()}
      />
    </>
  );
};
