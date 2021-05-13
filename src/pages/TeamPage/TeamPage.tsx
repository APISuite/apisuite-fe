import React, { useEffect, useState } from "react";
import { useTranslation, Button, CircularProgress, TextField, TextFieldProps } from "@apisuite/fe-base";

import { ROLES } from "constants/global";
import Select from "components/Select";
import { FetchTeamMembersResponse, Role } from "store/profile/types";
import { User } from "store/auth/types";
import { isValidEmail } from "util/forms";

import { SelectOption } from "components/Select/types";

import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { teamPageSelector } from "./selector";
import { fetchTeamMembers } from "store/profile/actions/fetchTeamMembers";
import { fetchRoleOptions } from "store/profile/actions/fetchRoleOptions";
import { changeRole } from "store/profile/actions/changeRole";
import { resetProfileErrors } from "store/profile/actions/resetProfileErrors";
import { inviteTeamMember } from "store/profile/actions/inviteTeamMember";

const AUTHORIZED_ROLES = [
  ROLES.admin.value,
  ROLES.organizationOwner.value,
];

export const TeamPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

  function chooseRole (e: React.ChangeEvent<any>, option: SelectOption) {
    if (e && option) {
      setInput({
        ...input,
        roleId: option.value,
      });
    }
  }

  const handleChangeRole = (userId: number, orgId: string) => (e: React.ChangeEvent<any>, option: SelectOption) => {
    e.preventDefault();
    // TODO: review; there's is something wrongly typed somewhere
    if (option.value) {
      dispatch(changeRole({
        org_id: orgId.toString(),
        user_id: userId.toString(),
        role_id: option.value.toString(),
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

  const canInvite = (role: string) => {
    return AUTHORIZED_ROLES.includes(role);
  };

  const isEmpty = (members: FetchTeamMembersResponse[], roleOptions: Role[]) => {
    // check if the arrays contain empty data
    const hasEmptyMember = members.every((m) => !(m.Organization?.id && m.Role?.id && m.User?.id));
    const hasEmptyRole = roleOptions.every((r) => !(r?.id && r?.name));

    return hasEmptyMember || hasEmptyRole;
  };

  const getUserMemberRole = (user: User) => {
    const member = members.find((member) => user.id === member.User?.id);
    return member?.Role || user.role;
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
        dispatch(inviteTeamMember({ email: input.email, role_id: input.roleId.toString() }));
      }}
    >
      <Button
        disabled={input.email.length === 0 || inputErrors.email || inputErrors.role}
        type='submit'
        color="secondary"
        variant="contained"
        disableElevation
      >
        {
          requestStatuses.inviteMemberRequest.isRequesting
            ? <CircularProgress className={classes.loading} size={20} />
            : t("rbac.team.send")
        }
      </Button>

      <TextField
        autoFocus
        error={inputErrors.email}
        fullWidth={false}
        // FIXME: not translated
        helperText={inputErrors.email && "Please insert a valid email."}
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
      />

      <Select
        className={classes.select}
        onChange={chooseRole}
        options={selectOptions(roleOptions)}
      />
    </form>
  );

  const showMembers = () => (
    <>
      <div className={classes.table}>
        <div className={classes.header}>
          <div>{t("rbac.team.header")}</div>
          <div className={classes.actions}>{t("rbac.team.actions")}</div>
        </div>

        {
          !isEmpty(members, roleOptions) && members.map((member, indx) => (
            member.User &&
            <div key={indx} className={classes.row}>
              <div>
                <div className={classes.name}>
                  {member.User.name}
                </div>

                <div>
                  <p className={classes.auth}>{`Current role: ${ROLES[member.Role.name]?.label}`}</p>
                </div>
              </div>

              {
                user &&
                <Select
                  className={classes.select}
                  disabled={getUserMemberRole(user).name === "developer" || user.id === member.User.id || ROLES[getUserMemberRole(user).name].level > ROLES[member.Role.name].level}
                  onChange={handleChangeRole(member.User.id, member.Organization.id)}
                  options={selectOptions(roleOptions)}
                  selected={selectOptions(roleOptions).find(option => option.label === ROLES[member.Role.name].label)}
                />
              }
            </div>
          ))
        }
      </div>

      {
        !inviteVisible && user
          ? (
            canInvite(getUserMemberRole(user).name) &&
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
    </>
  );

  const loading = requestStatuses.getMembersRequest.isRequesting || requestStatuses.getRolesRequest.isRequesting;

  return (
    <div className={`page-container ${classes.root}`}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t("rbac.team.title")}</h1>

        <>
          {
            loading &&
            <div className={classes.loadingPage}>
              <CircularProgress size={50} />
            </div>
          }

          {!loading && showMembers()}
        </>
      </section>
    </div>
  );
};
