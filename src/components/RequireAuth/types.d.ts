import { RoleRequirement } from "@apisuite/extension-ui-types";
import { AuthStore } from "containers/Auth/types";

export interface RequireAuthProps {
  auth?: AuthStore,
  component: JSX.Element,
  requireAuth: boolean,
  role?: RoleRequirement,
}
