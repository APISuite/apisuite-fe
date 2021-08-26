import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Grid, IconButton, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextFieldProps, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { ROLES } from "constants/global";
import { FetchTeamMembersResponse, Role } from "store/profile/types";
import { User } from "store/auth/types";
import { isValidEmail } from "util/forms";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { teamPageSelector } from "./selector";
import { fetchTeamMembers } from "store/profile/actions/fetchTeamMembers";
import { fetchRoleOptions } from "store/profile/actions/fetchRoleOptions";
import { changeRole } from "store/profile/actions/changeRole";
import { resetProfileErrors } from "store/profile/actions/resetProfileErrors";
import { inviteTeamMember } from "store/profile/actions/inviteTeamMember";
import { PageContainer } from "components/PageContainer";
import CustomizableDialog from "components/CustomizableDialog/CustomizableDialog";

const AUTHORIZED_ROLES = [
  ROLES.admin.value,
  ROLES.organizationOwner.value,
];

export const TeamPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const { currentOrganisation, members, roleOptions, user, requestStatuses } = useSelector(teamPageSelector);

  const [inviteVisible, showInvite] = useState(false);

  const [input, setInput] = useState({
    email: "",
    roleId: "",
  });

  const selectOptions = (roles: Role[]) => {
    return roles.map(role => ({
      label: ROLES[role.name]?.label,
      value: role.id,
      group: "Role",
    }));
  };

  const handleInputs: TextFieldProps["onChange"] = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    // TODO: why check if currentOrganisation has keys?
    if (Object.keys(currentOrganisation).length && currentOrganisation.id !== "") {
      dispatch(fetchTeamMembers({}));
      dispatch(fetchRoleOptions({}));
    }
  }, [dispatch, currentOrganisation]);

  function chooseRole({ target }: React.ChangeEvent<any>) {
    setInput({
      ...input,
      roleId: target.value,
    });
  }

  const handleChangeRole = (userId: number, orgId: string) => ({ target }: React.ChangeEvent<any>) => {
    // TODO: review; there's is something wrongly typed somewhere
    if (target.value) {
      dispatch(changeRole({
        org_id: orgId.toString(),
        user_id: userId.toString(),
        role_id: target.value,
      }));
    }
  };

  const toggle = () => {
    showInvite(true);
  };

  const inputErrors = {
    email: input.email.length > 0 && !isValidEmail(input.email),
    role: !input.roleId,
  };

  const canInvite = (role: User["role"]["name"]) => {
    return AUTHORIZED_ROLES.includes(role);
  };

  const getUserMemberRole = (user: User) => {
    const member = members.find((member) => user.id === member.User?.id);
    return member?.Role || user.role;
  };

  const changeRoleDisabled = (member: FetchTeamMembersResponse) => {
    if (!user) return true;

    return getUserMemberRole(user).name === "developer" || user.id === member.User.id || ROLES[getUserMemberRole(user).name].level > ROLES[member.Role.name].level;
  };

  useEffect(() => {
    if (requestStatuses.inviteMemberRequest.invited || requestStatuses.inviteMemberRequest.error) {
      showInvite(false);
      dispatch(resetProfileErrors({}));
      setInput((s) => ({ ...s, email: "" }));
    }
  }, [requestStatuses.inviteMemberRequest, dispatch]);

  const inviteCard = () => (
    <form
      className={classes.inviteCard}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(inviteTeamMember({
          orgID: currentOrganisation.id,
          email: input.email,
          role_id: input.roleId.toString(),
        }));
      }}
    >

      <TextField
        autoFocus
        error={inputErrors.email}
        fullWidth={false}
        helperText={inputErrors.email && t("warnings.insertValidEmail")}
        id='email-field'
        InputProps={{
          classes: { input: classes.emailTextfield },
        }}
        label='E-mail'
        name='email'
        onChange={handleInputs}
        placeholder='john.doe@email.com'
        type='email'
        value={input.email}
        variant='outlined'
        margin="dense"
      />

      <Box width={248}>
        <Select
          value={input.roleId}
          variant="outlined"
          margin="dense"
          onChange={chooseRole}
          fullWidth
        >
          {selectOptions(roleOptions).map((opt) => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
        </Select>
      </Box>

      <Button
        disabled={input.email.length === 0 || inputErrors.email || inputErrors.role}
        type='submit'
        color="primary"
        variant="contained"
        size="large"
        disableElevation
      >
        {
          requestStatuses.inviteMemberRequest.isRequesting
            ? <CircularProgress className={classes.loading} size={20} />
            : t("rbac.team.send")
        }
      </Button>
    </form>
  );

  const loading = requestStatuses.getMembersRequest.isRequesting || requestStatuses.getRolesRequest.isRequesting;

  // Options menu

  const optionsArray = [t("rbac.team.options.removeUser")];

  const [anchorElement, setAnchorElement] = React.useState(null);
  const open = Boolean(anchorElement);

  const handleMenuClick = (event: any) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuSelection = (index: number) => {
    if (index === 0) {
      setRemoveUserDialogOpen(true);

      handleMenuClose();
    }
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  // Option 1 - Remove user from Team

  const [removeUserDialogOpen, setRemoveUserDialogOpen] = useState(false);

  return (
    <>
      <PageContainer>
        <Grid container>
          <Grid item md>
            <Typography variant="h2">
              {t("rbac.team.title")}
            </Typography>

            <Box mt={1.5} mb={5}>
              <Typography variant="body1" color="textSecondary">
                {t("rbac.team.subtitle")}
              </Typography>
            </Box>

            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={50} />
              </Box>
            )}

            {!loading && (
              // TODO: move to fe-base Table component
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ paddingLeft: spacing(5) }}>{t("rbac.team.header")}</TableCell>
                      <TableCell align="center">{t("rbac.team.actions")}</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.User.id} className={classes.tableRow}>
                        <TableCell scope="row" style={{ paddingLeft: spacing(5) }}>
                          {member.User.name}
                          <br />
                          <Typography variant="body2" color="textSecondary">
                            {ROLES[member.Role.name]?.label}
                          </Typography>
                        </TableCell>

                        <TableCell width={205}>
                          <Select
                            variant="outlined"
                            value={member.Role.name}
                            margin="dense"
                            fullWidth
                            disabled={changeRoleDisabled(member)}
                            onChange={handleChangeRole(member.User.id, member.Organization.id)}
                          >
                            {Object.entries(ROLES)
                              // eslint-disable-next-line @typescript-eslint/no-unused-vars
                              .map(([_, role]) => (
                                <MenuItem key={role.value} value={role.value}>{role.label}</MenuItem>
                              ))}
                          </Select>
                        </TableCell>

                        <TableCell align="center" width={70}>
                          <IconButton
                            disabled={user && getUserMemberRole(user).name !== AUTHORIZED_ROLES[1]}
                            onClick={handleMenuClick}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          <Menu
                            anchorEl={anchorElement}
                            keepMounted
                            onClose={() => handleMenuClose()}
                            open={open}
                          >
                            {optionsArray.map((option, index) => (
                              <MenuItem
                                key={`option${index}`}
                                onClick={() => handleMenuSelection(index)}
                              >
                                {option}
                              </MenuItem>
                            ))}
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {!inviteVisible && user ? canInvite(getUserMemberRole(user).name) && (
              <Button
                onClick={toggle}
                style={{ marginTop: 24 }}
                color="primary"
                variant="contained"
                disableElevation
              >
                {t("rbac.team.invite")}
              </Button>
            )
              : inviteCard()
            }
          </Grid>
          <Grid />
        </Grid>
      </PageContainer>

      {/* Dialogs */}

      {/* 'Remove user from team' dialog */}
      <CustomizableDialog
        cancelButtonProps={{
          color: "primary",
          variant: "outlined",
        }}
        closeDialogCallback={() => setRemoveUserDialogOpen(false)}
        confirmButtonCallback={() => null}
        confirmButtonLabel={t("rbac.team.dialogs.removeUser.confirmButtonLabel")}
        confirmButtonStyle={classes.deleteAppButtonStyles}
        open={removeUserDialogOpen}
        optionalTitleIcon="warning"
        providedSubText={t("rbac.team.dialogs.removeUser.subText")}
        providedText={t("rbac.team.dialogs.removeUser.text")}
        providedTitle={t("rbac.team.dialogs.removeUser.title")}
      />
    </>
  );
};
