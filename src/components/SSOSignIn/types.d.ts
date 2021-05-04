import { SSOTokenExchangeAction } from "store/auth/actions/types";

export interface SSOSignInProps {
  ssoTokenExchange: (payload: Omit<SSOTokenExchangeAction, "type">) => void,
}
