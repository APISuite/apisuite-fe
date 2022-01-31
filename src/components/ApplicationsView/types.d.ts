
import { UseFormGetValues } from "react-hook-form";
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

export type UseGetAppParams = {
  app: AppData,
  appId: string,
  createAppStatus: ApplicationsStore["createAppStatus"],
  history: LocationHistory,
  isNew: boolean,
  profile: Profile["profile"],
  typeId: string,
}

export type AppHeaderProps = {
  app: AppData,
  typeId: string,
  isNew: boolean,
  getFormValues: UseFormGetValues,
  orgId: string,
  types: AppType[],
  typeId: string,
}

export type ActionsFooterProps = {
  app: AppData,
  appId: string,
  getFormValues: UseFormGetValues,
  hasChanges: () => boolean,
  history: LocationHistory,
  orgId: string,
  tabType: AppTypesTab,
}
