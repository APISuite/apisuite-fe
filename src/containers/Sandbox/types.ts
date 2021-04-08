import { SvgIconProps } from 'components/SvgIcon/types'

import { AuthStore } from 'containers/Auth/types'
import { SubscriptionsStore } from 'containers/Subscriptions/types'

export interface SandboxProps extends React.HTMLAttributes<HTMLDivElement> {
  auth: AuthStore,
  getAPIs: () => void,
  subscriptions: SubscriptionsStore,
}

export interface SlideConfig {
  /** key should be unique to leverage render optimization */
  title: string,
  subtitle: string,
  content?: string,
  button: string,
  link: string,
  btn: 1 | 2 | 3,
  img: string,
  disabled?: boolean,
}

export interface ListConfig {
  /** key should be unique to leverage render optimization */
  key: string,
  title: string,
  desc: string,
  icon: SvgIconProps['name'],
}
