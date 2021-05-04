import { APIVersion } from "store/subscriptions/types";

export type APIVersionStore = {
  requested: boolean,
  error: boolean,
  version: APIVersion,
}

export type APIDetailParams = {
  apiId?: string,
  versionId?: string,
}
