
import { User } from "containers/Auth/types";

export interface Response {
  isError: boolean,
  isRequesting: boolean,
}

export interface ApplicationsStore {
  createAppStatus: Response,
  currentApp: AppData,
  deleteAppStatus: Response,
  requestingAPIAccessStatus: Response,
  updateAppStatus: Response,
  userApps: AppData[],
}

export interface AppData {
  clientId: string,
  clientSecret: string,
  createdAt: string,
  description: string,
  id: number,
  labels: string[],
  logo: string,
  name: string,
  orgId: number,
  privacyUrl: string,
  redirectUrl: string,
  shortDescription: string,
  subscriptions: any[],
  supportUrl: string,
  tosUrl: string,
  updatedAt: string,
  visibility: string,
  websiteUrl: string,
  youtubeUrl: string,
}

export interface ModalDetails {
  userAppID: number,
  userID: number,
}

export interface ApplicationsProps {
  allUserApps: AppData[],
  currentOrganisation: {
    id: number | string,
    member_since: string,
    name: string,
    role: {
      id: number,
      name: string,
    },
  },
  createAppStatus: boolean,
  deleteAppStatus: boolean,
  getAllUserAppsAction: (userID: number) => void,
  requestAPIAccessStatus: boolean,
  updateAppStatus: boolean,
  user: User,
}

export interface CreateAppActionData {
  description: string,
  labels: string[],
  logo: string,
  name: string,
  privacyUrl: string,
  redirectUrl: string,
  shortDescription: string,
  supportUrl: string,
  tosUrl: string,
  websiteUrl: string,
  youtubeUrl: string,
}

export interface UpdateAppActionData {
  description: string,
  id: number,
  labels: string[],
  logo: string,
  name: string,
  privacyUrl: string,
  redirectUrl: string,
  shortDescription: string,
  supportUrl: string,
  tosUrl: string,
  websiteUrl: string,
  youtubeUrl: string,
}
