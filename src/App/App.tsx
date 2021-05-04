import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { NotificationStack } from "components/NotificationStack";
import { getProfile } from "store/profile/actions/getProfile";
import routes from "./routes";
import useStyles from "./styles";
import CookiesBanner from "components/CookiesBanner";
import { authSelector } from "./selector";
import { loginUser } from "store/auth/actions/login";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { pathname } = useLocation();
  const auth = useSelector(authSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(function initOnce () {
    if (auth.authToken && !auth.user) {
      dispatch(loginUser({ token: auth.authToken }));
    }
  }, [auth.authToken, auth.user, dispatch]);

  useEffect(() => {
    if (auth.user) {
      dispatch(getProfile({}));
    }
  }, [auth.user, dispatch]);

  return (
    <div className={classes.root}>
      {routes()}
      <CookiesBanner />
      <NotificationStack />
    </div>
  );
};
