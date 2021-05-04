import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "util/useQuery";

import { confirmRegistration } from "store/auth/actions/confirmRegistration";
import { confirmInviteMember } from "store/profile/actions/confirmInviteMember";

export const RedirectPage: React.FC = () => {
  const query = useQuery();
  const token = query.get("token");
  const redirect = useParams<{ redirect: "invite" | "registration" | "password" }>().redirect;
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && redirect === "registration") {
      dispatch(confirmRegistration({ token }));
    }

    if (token && redirect === "invite") {
      dispatch(confirmInviteMember({ token }));
    }
  }, [dispatch, token, redirect]);

  switch (redirect) {
    case "registration":
      return <Redirect to='/auth/signin' />;

    case "invite":
      return <Redirect to='/profile/team' />;

    case "password":
      return (
        <Redirect to={{
          pathname: "/forgot",
          state: {
            stage: "recover",
            token: token,
          },
        }}
        />
      );

    default:
      return <Redirect to='/' />;
  }
};
