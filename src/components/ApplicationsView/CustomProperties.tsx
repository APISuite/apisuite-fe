import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  Box, Button, Grid, Icon, IconButton, InputAdornment, Menu,
  MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, Trans, Typography, useTheme, useTranslation,
} from "@apisuite/fe-base";
import clsx from "clsx";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Link from "components/Link";
import Notice from "components/Notice";
import { RouterPrompt } from "components/RouterPrompt";
import { Metadata } from "store/applications/types";
import { AppTypesTab } from "pages/AppView/types";
import { isValidAppMetaKey } from "util/forms";
import { profileSelector } from "pages/Profile/selectors";
import { applicationsViewSelector } from "./selector";
import useStyles from "./styles";
import { LocationHistory } from "./types";
import { ActionsFooter, AppContainer, useGetApp } from "./util";

export const CustomProperties: React.FC = () => {
  const classes = useStyles();
  const { appId, typeId } = useParams<{ appId: string; typeId: string  }>();
  const { palette, spacing } = useTheme();
  const { t } = useTranslation();
  const history = useHistory() as LocationHistory;
  const { app, status, requesting, types } = useSelector(applicationsViewSelector);
  const { profile } = useSelector(profileSelector);
  const isNew = Number.isNaN(Number(appId));

  const metadataKeyDefaultPrefix = "meta_";

  useGetApp({
    app,
    appId,
    history,
    isNew,
    profile,
    requesting,
    status,
    typeId,
  });

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

  const hasChanges = () => {
    return (isValid || Object.keys(errors).length === 0) && isDirty;
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
                  {t("dashboardTab.applicationsSubTab.appModal.customProps.add")}
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
                          rel="noopener noreferrer"
                          target="_blank"
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
      </>
    );
  };

  return (
    <>
      <AppContainer
        app={app}
        appId={appId}
        isNew={isNew}
        getFormValues={getValues}
        notFound={status.get.isError}
        orgId={profile.currentOrg.id}
        requesting={requesting}
        types={types}
        typeId={typeId}
      >
        <Grid container spacing={3}>
          <Grid item md={12}>
            {getMetadataSection()}
          </Grid>
        </Grid>

        <hr className={classes.regularSectionSeparator} />

        {/* 'App action' buttons section */}
        <div className={classes.buttonsContainer}>
          <ActionsFooter
            app={app}
            appId={appId}
            getFormValues={getValues}
            hasChanges={hasChanges}
            history={history}
            orgId={profile.currentOrg.id}
            tabType={AppTypesTab.EXPERT}
          />
        </div>
      </AppContainer>

      <RouterPrompt
        bodyText={t("applications.prompt.body")}
        cancelText={t("applications.prompt.cancel")}
        okText={t("applications.prompt.ok")}
        subtitle={t("applications.prompt.subtitle")}
        title={t("applications.prompt.title")}
        type="warning"
        when={hasChanges()}
      />
    </>
  );
};
