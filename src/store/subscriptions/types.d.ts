export interface Api {
  apiVersions: APIVersion[],
  baseUri?: string,
  baseUriSandbox?: string,
  createdAt?: string,
  apiDocs?: ApiDocs,
  id: number,
  name: string,
  publishedAt?: string,
  type?: string,
  updatedAt?: string,
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
  apiDocs?: ApiDocs,
  id: number,
  name: string,
  publishedAt?: string,
  updatedAt: string,
}

export interface ApiDocs {
  features: DocsContent[],
  highlights: DocsContent[],
  productIntro: string,
  useCases: DocsContent[],
}

export interface DocsContent {
  image: string,
  info: string,
  title: string,
}

/** Selector types */
export type APIVersion = {
  apiId: number,
  createdAt: string,
  deprecated: boolean,
  id: number,
  live: boolean,
  spec: any | null,
  specFile: string | null,
  title: string,
  updatedAt: string,
  version: string,
}

export type AppInfo = {
  appId: number,
  appName: string,
}
