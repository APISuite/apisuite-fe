import { Step } from 'components/RegisterForm/types'
import { steps } from 'components/RegisterForm/RegisterForm'

export type StepsProgressProps = {
  steps: typeof steps,
  currentStep: Step,
}
