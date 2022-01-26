
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
  allBlueprintApps: AllBlueprintAppData[],
  currentBlueprintAppData: CurrentBlueprintAppData,
  checkBlueprintAuthStatus: Response & { isChecked: boolean },
  currentBlueprintAppFields: string[],
  isActive: boolean,
  toggleBlueprintAppStatus: Response,
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

export interface Metadata {
  key: string,
  value: string,
  title: string,
  description: string,
}

export interface AllBlueprintAppData {
  id: 0,
  userId: 0,
  orgId: 0,
  app_name: string,
  appUrl: string,
  appMethod: string,
  authType: string,
  appConfig: {
    cltId: string,
    scope: string,
    auhtUrl: string,
    tokenUrl: string,
    cltSecret: string,
    redirectUrl: string,
    connAuthType: string,
  },
  apiUrl: string,
  apiMethod: string,
  apiconfig: Record<string, unknown>,
  pollingInterval: 0,
  fieldsRaw: [
    string
  ],
  fieldMapping: Record<string, unknown>,
  token: string,
  workerId: string,
  workerStatus: string,
}

export interface CurrentBlueprintAppData {
  // TODO: Included this field by request of D. To be removed later.
  auth_type: string,
  api_method: string,
  api_url: string,
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
  getAllUserAppsAction: (orgID: string) => void,
  requestAPIAccessStatus: boolean,
  updateAppStatus: boolean,
  user: User,
}

export type CreateAppActionData = AppData

export type UpdateAppActionData = AppData

export interface AppType {
  id: number,
  type: string,
}

export interface ToggleBlueprintAppStatusData {
  app_name: string,
  command: "start" | "stop",
}
