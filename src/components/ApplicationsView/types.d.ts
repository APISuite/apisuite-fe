
import { MutableRefObject } from "react";
import { History } from "history";
import { AppData, ApplicationsStore, AppType } from "store/applications/types";
import { Profile } from "store/profile/types";

export type LocationHistory = History & {
  location: {
    state: {
      redirected?: boolean,
      appID?: string,
    },
  },
}

export type AppHeaderProps = {
  app: AppData,
  appType: MutableRefObject<AppType>,
  isNew: boolean,
  updateAppType: (type: AppType) => void,
}

export type UseGetAppParams = {
  app: AppData,
  appId: string,
  createAppStatus: ApplicationsStore["createAppStatus"],
  history: LocationHistory,
  isNew: boolean,
  profile: Profile["profile"],
  typeId: string,
}
