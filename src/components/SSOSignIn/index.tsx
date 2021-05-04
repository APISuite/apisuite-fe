import { bindActionCreators, Dispatch } from "redux";

import { connect } from "react-redux";

import SSOSignIn from "./SSOSignIn";
import { ssoTokenExchange } from "store/auth/actions/ssoTokenExchange";
import { SSOTokenExchangeAction } from "store/auth/actions/types";

export const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(
    {
      ssoTokenExchange: (payload: SSOTokenExchangeAction) => ssoTokenExchange(payload),
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(SSOSignIn);
