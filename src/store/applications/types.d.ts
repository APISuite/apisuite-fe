
import { User } from "containers/Auth/types";

export interface Response {
  isError: boolean,
  isRequesting: boolean,
}

export interface ApplicationsStore {
  createAppStatus: Response & { id: number },
  currentApp: AppData,
  deleteAppStatus: Response,
  getApp: Response & { id: number },
  requestingAPIAccessStatus: Response,
  types: AppType[],
  updateAppStatus: Response,
  userApps: AppData[],
  // Blueprint-related data
  blueprintAppConfig: CurrentBlueprintAppData,
  createBlueprintAppStatus: Response & { id: number },
  getBlueprintAppStatus: Response & { id: number },
  isActive: boolean,
  toggleBlueprintAppStatus: Response,
  updateBlueprintAppStatus: Response,
  validateAccessDetailsStatus: Response & { isChecked: boolean },
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
  images: string[],
  metadata: Metadata[],
  appType: AppType & {
    createdAt: string,
    updatedAt: string,
  },
  appTypeId?: number,
}

export interface BlueprintAppData {
  data: {
    app_link: string,
    app_name: string,
    configuration: Record<string, unknown>,
    description: string,
    id: number,
    labels: string[],
    logo: string,
    overview: string,
  },
}

export interface Metadata {
  key: string,
  value: string,
  title: string,
  description: string,
}

export interface CurrentBlueprintAppData {
  auth_type: string,
  app_conf: {
    auth_url: string,
    clt_id: string,
    clt_secret: string,
    conn_auth_type: string,
    redirect_url: string,
    scope: string,
    token_url: string,
    token: string,
  },
  app_method: string,
  app_name: string,
  app_url: string,
  polling_interval: string,
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
  getAllUserAppsAction: (orgID: number) => void,
  requestAPIAccessStatus: boolean,
  updateAppStatus: boolean,
  user: User,
}

export type CreateAppActionData = AppData

export type CreateBlueprintAppActionData = BlueprintAppData

export type UpdateAppActionData = AppData

export interface AppType {
  id: number,
  type: string,
}

export interface ToggleBlueprintAppStatusData {
  app_name: string,
  command: "start" | "stop",
}
