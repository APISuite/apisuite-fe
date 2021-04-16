import { steps } from 'components/SignUpForm/SignUpForm'

import { Step } from 'components/SignUpForm/types'

export type StepsProgressProps = {
  currentStep: Step,
  steps: typeof steps,
}
