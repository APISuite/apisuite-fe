import { Dispatch } from "redux";

import { connect, MapDispatchToPropsFunction } from "react-redux";

import { Store } from "store/types";

import { SSODispatchToProps } from "./types";

import SSOForm from "./SSOForm";
import { SSOLoginAction } from "store/auth/actions/types";
import { ssoLogin } from "store/auth/actions/ssoLogin";

const mapStateToProps = ({ auth }: Store) => ({
  auth: auth,
});

const mapDispatchToProps: MapDispatchToPropsFunction<SSODispatchToProps, any> = (dispatch: Dispatch) => ({
  ssoLogin: (payload: Omit<SSOLoginAction, "type">) => dispatch(ssoLogin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SSOForm);
