import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Grid, IconButton, Menu, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextFieldProps, Typography, useTheme, useTranslation } from "@apisuite/fe-base";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { PageContainer } from "components/PageContainer";
import CustomizableDialog from "components/CustomizableDialog/CustomizableDialog";
import { changeRole } from "store/profile/actions/changeRole";
import { fetchRoleOptions } from "store/profile/actions/fetchRoleOptions";
import { fetchTeamMembers } from "store/profile/actions/fetchTeamMembers";
import { inviteTeamMember } from "store/profile/actions/inviteTeamMember";
import { removeTeamMember } from "store/profile/actions/removeTeamMember";
import { resetProfileErrors } from "store/profile/actions/resetProfileErrors";
import { User } from "store/auth/types";
import { FetchTeamMembersResponse, Role } from "store/profile/types";
import { teamPageSelector } from "./selector";
import useStyles from "./styles";
import { isValidEmail } from "util/forms";

import { ROLES } from "constants/global";

const AUTHORIZED_ROLES = [
  ROLES.admin.value,
  ROLES.organizationOwner.value,
];

export const TeamPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { spacing } = useTheme();
  const { currentOrganisation, members, requestStatuses, roleOptions, user } = useSelector(teamPageSelector);

  useEffect(() => {
    if (currentOrganisation.id > 0) {
      dispatch(fetchTeamMembers({}));
      dispatch(fetchRoleOptions({}));
    }
  }, [dispatch, currentOrganisation]);

  // Role selection

  const getUserMemberRole = (u: User) => {
    const member = members.find((member) => u.id === member.User?.id);
    return member?.Role || u.role;
  };

  const changeRoleDisabled = (m: FetchTeamMembersResponse) => {
    if (!user) return true;

    const role = getUserMemberRole(user);

    return (
      role.level < ROLES.developer.level,
      user.id === m.User.id ||
      role.level > m.Role.level
    );
  };

  const selectOptions = (roles: Role[]) => {
    return roles.map(role => ({
      label: ROLES[role.name]?.label,
      value: role.id,
      level: role.level,
      group: "Role",
    })).filter((role) => role.label !== ROLES.baseUser.label);
  };

  function chooseRole({ target }: React.ChangeEvent<any>) {
    setInput({
      ...input,
      roleId: target.value,
    });
  }

  const handleChangeRole = (userId: number, orgId: number) => ({ target }: React.ChangeEvent<any>) => {
    // TODO: review; there's is something wrongly typed somewhere
    if (target.value) {
      dispatch(changeRole({
        org_id: orgId,
        user_id: userId,
        role_id: target.value,
      }));
    }
  };

  // Team member invitation

  const [inviteVisible, showInvite] = useState(false);

  const canInvite = (role: User["role"]["name"]) => {
    return AUTHORIZED_ROLES.includes(role);
  };

  const toggle = () => {
    showInvite(true);
  };

  const [input, setInput] = useState({
    email: "",
    roleId: "",
  });

  const handleInputs: TextFieldProps["onChange"] = ({ target }) => {
    setInput({
      ...input,
      [target.name]: target.value,
    });
  };

  const inputErrors = {
    email: input.email.length > 0 && !isValidEmail(input.email),
    role: !input.roleId,
  };

  const inviteCard = () => (
    <form
      className={classes.inviteCard}
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(inviteTeamMember({
          email: input.email,
          orgID: currentOrganisation.id,
          role_id: Number(input.roleId),
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
        margin="dense"
        name='email'
        onChange={handleInputs}
        placeholder='john.doe@email.com'
        type='email'
        value={input.email}
        variant='outlined'
      />

      <Box width={248}>
        <Select
          fullWidth
          margin="dense"
          onChange={chooseRole}
          value={input.roleId}
          variant="outlined"
        >
          {selectOptions(roleOptions).map((opt) => (
            <MenuItem
              key={opt.value}
              value={opt.value}
              disabled={opt.level < (user?.role.level ?? -1)}
            >
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Button
        color="primary"
        disabled={input.email.length === 0 || inputErrors.email || inputErrors.role}
        disableElevation
        size="large"
        type='submit'
        variant="contained"
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

  useEffect(() => {
    if (requestStatuses.inviteMemberRequest.invited || requestStatuses.inviteMemberRequest.error) {
      showInvite(false);
      dispatch(resetProfileErrors({}));
      setInput((s) => ({ ...s, email: "" }));
    }
  }, [requestStatuses.inviteMemberRequest, dispatch]);

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

  const canRemoveFromTeam = (
    currentUser: User | undefined,
    teamMembers: FetchTeamMembersResponse[],
    providedMember: FetchTeamMembersResponse,
  ) => {
    if (!currentUser) return false;

    const role = getUserMemberRole(currentUser);

    // only organization owner and up can remove users if sibling or under levels
    if (role.level > 3 || role.level > providedMember.Role.level) {
      return false;
    }

    // admins can't remove itself
    if (role.level < 3 && currentUser.id === providedMember.User.id) {
      return false;
    }

    // if the member to remove is organization owner and up, at least one more sibling or parent level should exist
    // in team members array
    if (providedMember.Role.level < 4) {
      // our user is also present in the team members array
      return teamMembers.filter((member) => member.Role.level < 4).length > 1;
    }

    // we can remove every other case
    return true;
  };

  const [removeUserDialogOpen, setRemoveUserDialogOpen] = useState(false);
  const [idOfMemberToRemove, setIdOfMemberToRemove] = useState("");

  const removeFromTeam = (
    orgID: number,
    idOfCurrentUser: number,
    idOfUserToRemove: number,
  ) => {
    setRemoveUserDialogOpen(false);

    dispatch(removeTeamMember({ orgID, idOfCurrentUser, idOfUserToRemove }));

    setIdOfMemberToRemove("");
  };

  useEffect(() => {
    if (requestStatuses.removeMemberRequest.removed) {
      dispatch(fetchTeamMembers({}));
      dispatch(fetchRoleOptions({}));
    }
  }, [dispatch, requestStatuses]);

  return (
    <>
      <PageContainer>
        <Grid container>
          <Grid item md>
            <Typography variant="h2">
              {t("rbac.team.title")}
            </Typography>

            <Box mb={5} mt={1.5}>
              <Typography color="textSecondary" variant="body1">
                {t("rbac.team.subtitle")}
              </Typography>
            </Box>

            {loading && (
              <Box alignItems="center" display="flex" justifyContent="center">
                <CircularProgress size={50} />
              </Box>
            )}

            {!loading && (
              // TODO: move to fe-base Table component
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ paddingLeft: spacing(5) }}>
                        {t("rbac.team.header")}
                      </TableCell>

                      <TableCell align="center">
                        {t("rbac.team.actions")}
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {members.map((member) => (
                      <TableRow className={classes.tableRow} key={member.User.id}>
                        <TableCell scope="row" style={{ paddingLeft: spacing(5) }}>
                          {member.User.name} {member.User.id === user?.id ? "(me)" : ""}

                          <br />

                          <Typography color="textSecondary" variant="body2">
                            {ROLES[member.Role.name]?.label}
                          </Typography>
                        </TableCell>

                        <TableCell width={205}>
                          <Select
                            disabled={changeRoleDisabled(member)}
                            fullWidth
                            margin="dense"
                            onChange={handleChangeRole(member.User.id, member.Organization.id)}
                            value={member.Role.id}
                            variant="outlined"
                          >
                            {selectOptions(roleOptions).map((opt) => {
                              return (
                                <MenuItem
                                  key={opt.value}
                                  value={opt.value}
                                  disabled={opt.level < (user?.role.level ?? -1)}
                                >
                                  {opt.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </TableCell>

                        <TableCell align="center" width={70}>
                          <IconButton
                            disabled={!canRemoveFromTeam(user, members, member)}
                            onClick={(clickEvent) => {
                              handleMenuClick(clickEvent);
                              setIdOfMemberToRemove(member.User.id);
                            }}
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
                color="primary"
                disableElevation
                onClick={toggle}
                style={{ marginTop: 24 }}
                variant="contained"
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
        closeDialogCallback={() => {
          setRemoveUserDialogOpen(false);
          setIdOfMemberToRemove("");
        }}
        confirmButtonCallback={() => removeFromTeam(currentOrganisation.id, user.id, Number(idOfMemberToRemove))}
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
