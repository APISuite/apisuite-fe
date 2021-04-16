import { History } from 'history'

import { PreviousData } from 'components/SignUpForm/types'

export interface SignUpConfirmationProps {
  getSettings: () => void,
  history: History,
  nextStep: (previousData: PreviousData) => void,
  register: any,
}
