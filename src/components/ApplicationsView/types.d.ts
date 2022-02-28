
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
  history: LocationHistory,
  isNew: boolean,
  profile: Profile["profile"],
  requesting: boolean,
  status: {
    create: ApplicationsStore["createAppStatus"],
    get: ApplicationsStore["getApp"],
    update: ApplicationsStore["updateAppStatus"],
  },
  typeId: string,
}

export type AppHeaderProps = {
  app: AppData,
  typeId: string,
  isNew: boolean,
  getFormValues: UseFormGetValues,
  orgId: number,
  types: AppType[],
  typeId: string,
}

export type ActionsFooterProps = {
  app: AppData,
  appId: string,
  getFormValues: UseFormGetValues,
  hasChanges: () => boolean,
  history: LocationHistory,
  orgId: number,
  tabType: AppTypesTab,
  altSaveButtonAction?: () => void,
  altSaveButtonLabel?: string,
  disableNextButton?: boolean,
}
