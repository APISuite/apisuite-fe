
import { MutableRefObject } from "react";
import { History } from "history";
import { AppData, AppType } from "store/applications/types";

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
