
import { Roles } from "./types";

export const DEFAULT_INSTANCE_OWNER_SUPPORT_URL =
  "https://intercom.help/api-suite/en/articles/4710860-api-portal-owners";

export const DEFAULT_NON_INSTANCE_OWNER_SUPPORT_URL =
  "https://intercom.help/api-suite/en/articles/4586659-api-portal-users";

export const ROLES: Roles = {
  // Instance owners
  admin: {
    label: "Admin",
    value: "admin",
    level: 2,
  },

  // Non-instance owners
  organizationOwner: {
    label: "Organisation Owner",
    value: "organizationOwner",
    level: 3,
  },

  developer: {
    label: "Developer",
    value: "developer",
    level: 4,
  },

  baseUser: {
    label: "Base user",
    value: "baseUser",
    level: 5,
  },
};

export enum LOCAL_STORAGE_KEYS {
  SSO_STATE_STORAGE = "ssoStateStorage",
  SSO_INVITATION_STATE_STORAGE = "ssoInvitationStateStorage",
  SSO_PROVIDER_STATE_STORAGE = "attemptingSignInWithProvider",
}

export const DESTINATION_PATH = "APIS_DESTINATION_RETURN_TO_PATH";
export enum API_DOCS_CONTENT_TARGET {
  PRODUCT_INTRO = "product_intro",
  FEATURE = "feature",
  USE_CASE = "use_case",
  HIGHLIGHT = "highlight",
}

export enum Filter {
  text = "text",
  prod = "prod",
  sandbox = "sandbox",
  docs = "docs"
}
