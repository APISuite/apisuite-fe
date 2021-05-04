import { AuthStore } from "store/auth/types";

import { History } from "history";
import { SSOLoginAction } from "store/auth/actions/types";

export interface SSOFormProps extends SSODispatchToProps {
  auth: AuthStore,
  history: History,
}

export interface SSODispatchToProps {
  ssoLogin: (payload: Omit<SSOLoginAction, "type">) => void,
}
