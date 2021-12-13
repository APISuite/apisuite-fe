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

export interface APIDocsInfo {
  image: string,
  info: string,
  title: string,
}
export interface Documentation {
  features: APIDocsInfo[],
  highlights: APIDocsInfo[],
  productIntro: string,
  useCases: APIDocsInfo[],
}
