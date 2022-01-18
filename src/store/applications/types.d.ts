
import { User } from "containers/Auth/types";

export interface Response {
  isError: boolean,
  isRequesting: boolean,
}

export interface ApplicationsStore {
  createAppStatus: Response & { id: number },
  currentApp: AppData,
  deleteAppStatus: Response,
  getApp: Response,
  requestingAPIAccessStatus: Response,
  types: AppType[],
  updateAppStatus: Response,
  userApps: AppData[],
}

export interface AppData {
  clientId: string,
  clientSecret: string,
  createdAt: string,
  description: string,
  directUrl: string,
  id: number,
  labels: string[],
  logo: string,
  name: string,
  orgId: string,
  privacyUrl: string,
  redirectUrl: string,
  summary: string,
  subscriptions: any[],
  supportUrl: string,
  tosUrl: string,
  updatedAt: string,
  visibility: string,
  websiteUrl: string,
  youtubeUrl: string,
  media: string[],
  metadata: Metadata[],
  appType: AppType & {
    createdAt: string,
    updatedAt: string,
  },
  appTypeId?: number,
}

export interface Metadata {
  key: string,
  value: string,
  title: string,
  description: string,
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
  getAllUserAppsAction: (orgID: string) => void,
  requestAPIAccessStatus: boolean,
  updateAppStatus: boolean,
  user: User,
}

export interface CreateAppActionData {
  description: string,
  labels: string[],
  logo: string,
  metadata: Metadata[],
  name: string,
  privacyUrl: string,
  redirectUrl: string,
  summary: string,
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
  metadata: Metadata[],
  name: string,
  privacyUrl: string,
  redirectUrl: string,
  summary: string,
  supportUrl: string,
  tosUrl: string,
  websiteUrl: string,
  youtubeUrl: string,
}

export interface AppType {
  id: number,
  type: string,
}
