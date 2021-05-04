// import { NotificationCardsStore } from 'store/notificationCards/types'
// import { ProfileStore } from 'store/profile/types'

import { NavigationLeftActionTypes } from "./constants";

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  // backButtonLabel?: string,
  contractible?: boolean,
  // logout: () => void,
  // // Temporary until notification cards become clearer
  // notificationCards: NotificationCardsStore,
  // profile: ProfileStore,
  // showBackButton?: boolean,
  // // Temporary until notification cards become clearer
  // toggleInstanceOwnerNotificationCards: () => void,
  // toggleNonInstanceOwnerNotificationCards: () => void,
}

export interface TabMenus {
  [key: string]: TabProps[],
}

export interface TabProps {
  hideFromInstanceOwner?: boolean,
  isLogin?: boolean,
  isProfileTab?: boolean,
  yetToLogIn?: boolean,
  label: string,
  route: string,
  disabled?: boolean,
  active?: boolean,
  subTabs?: SubTabProps[],
}

export interface SubTabProps {
  isLogout?: boolean,
  label: any,
  route: string,
  disabled?: boolean,
  active?: boolean,
}

export interface LeftActions {
  type: NavigationLeftActionTypes,
  path: string,
  label: string,
}
