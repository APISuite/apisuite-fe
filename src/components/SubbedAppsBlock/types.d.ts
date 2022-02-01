import { CurrentAPIDetails } from "../../pages/APIProductDetails/types";

export type SubbedAppsBlockProps = {
  currentAPIDetails: CurrentAPIDetails,
  userDetails: UserDetails,
}

export type UserDetails = {
  avatar?: string,
  bio?: string,
  email: string,
  id: number,
  "last_login": string,
  mobile?: string,
  name: string,
  oidcProvider: string | null,
}
