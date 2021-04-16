import { History } from 'history'

import { SettingsStore } from 'containers/Settings/types'

import { PreviousData } from 'components/SignUpForm/types'

export interface SignUpConfirmationProps {
  getSettings: () => void,
  history: History,
  nextStep: (previousData: PreviousData) => void,
  register: any,
  settings: SettingsStore,
}
