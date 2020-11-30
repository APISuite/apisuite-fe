import { ProfileStore } from 'containers/Profile/types'
import { SettingsStore } from 'containers/Settings/types'

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  backButtonLabel?: string,
  contractible?: boolean,
  logout: any,
  profile: ProfileStore,
  settings: SettingsStore,
  showBackButton?: boolean,
  toggleInform: any,
}

export interface TabMenus {
  [key: string]: TabProps[],
}

export interface TabProps {
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
  label: any,
  route: string,
  disabled?: boolean,
  active?: boolean,
}
