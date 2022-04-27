
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
  blueprintConfig: CurrentBlueprintConfig,
  getBlueprintAppConfigStatus: Response & { retrieved: boolean ; filled: boolean },
  getBlueprintDetailsStatus: Response & { name: string },
  validateAccessDetailsStatus: Response & { validated: boolean },
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

export interface BlueprintData {
  data: {
    appLink: string,
    appName: string,
    configuration: Record<string, unknown>,
    description: string,
    id: number,
    labels: string[],
    logo: string,
    overview: string,
    media: string[],
  },
}

export interface Metadata {
  key: string,
  value: string,
  title: string,
  description: string,
}

export interface VariablesType {
  key: string,
  friendlyName: string,
  description: string,
}

export interface FieldMappingType {
  fieldIn: string,
  fieldOut: string,
  editable: boolean,
}

export interface CurrentBlueprintConfig {
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
  api_url: string,
  obo: boolean,
  polling_interval: string,
  app_id?: number,
  app_method: string,
  app_name: string,
  app_url: string,
  auth_type: string,
  fieldsRaw: string[],
  variableValues: any[],
  fieldsMapping: any[],
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

export type CreateBlueprintAppActionData = BlueprintData

export type UpdateAppActionData = AppData

export interface AppType {
  id: number,
  type: string,
  enabled: boolean,
}

export interface AppStatusData {
  app_name: string,
  command: "start" | "stop",
}
