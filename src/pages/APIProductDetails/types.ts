import { AppData } from "store/applications/types";
import { APIVersion } from "store/subscriptions/types";

export interface CurrentAPIDetails {
  appsSubbed: AppData[],
  documentation: Documentation | null,
  id: number,
  name: string,
  otherVersions: APIVersion[],
  version: APIVersion | null,
}

export interface Documentation {
  info: string,
  target: string,
  title: string,
}