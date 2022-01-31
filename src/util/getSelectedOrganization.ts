import { LOCAL_STORAGE_KEYS, ROLES } from "constants/global";
import { Profile } from "store/profile/types";

/** gets the persisted organization from the provided array of organizations */
export function getSelectedOrganization(organizations: Profile["organizations"]): Profile["currentOrg"] {
  const orgId = localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_ORG);
  let org = organizations[0];

  if (orgId) {
    const orgFound = organizations.find((organization) => organization.id === Number(orgId));
    if (orgFound) {
      org = orgFound;
    }
  }

  if (!org) {
    // review this - should we really keep an empty organization?
    org = {
      id: -1,
      name: "",
      role: {
        id: -1,
        name: ROLES.baseUser.value,
        level: ROLES.baseUser.level,
      },
    };
  }

  localStorage.setItem(LOCAL_STORAGE_KEYS.STORED_ORG, org.id.toString());

  return org;
}
