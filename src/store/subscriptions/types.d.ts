export interface Api {
  apiVersions: APIVersion[],
  baseUri?: string,
  baseUriSandbox?: string,
  docs?: ApiDocs,
  id: number,
  name: string,
  publishedAt?: string,
}

export interface SubscriptionsStore {
  apis: Api[],
}

export type SubscriptionsActions =
  GetAPIsAction |
  GetAPIsErrorAction |
  GetAPIsSuccessAction

export interface ApiResponse {
  apiVersions: APIVersion[],
  baseUri?: string,
  baseUriSandbox?: string,
  createdAt: string,
  docs?: ApiDocs,
  id: number,
  name: string,
  publishedAt?: string,
  updatedAt: string,
}

export interface ApiDocs {
  createdAt: string,
  image?: string,
  info?: string,
  target: string,
  title?: string,
  updatedAt: string,
}

/** Selector types */
export type APIVersion = {
  apiId: number,
  createdAt: string,
  deprecated: boolean,
  id: number,
  live: boolean,
  spec: any | null,
  title: string,
  updatedAt: string,
  version: string,
}

export type AppInfo = {
  appId: number,
  appName: string,
}
