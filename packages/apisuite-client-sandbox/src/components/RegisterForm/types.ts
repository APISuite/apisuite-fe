import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'
import { steps } from './RegisterForm'
import { ReturnNestedType } from 'util/typeUtils'
import {
  nextStepAction,
  submitPersonalDetailsActions,
  submitOrganisationDetailsActions,
  submitSecurityStepActions,
} from './ducks'

export type RegisterFormProps =
ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps> & {
  prefilledEmail?: string,
}

export type Step = keyof typeof steps

export type PersonalDetails = {
  name: string,
  email: string,
}

export type PersonalDetailsResponse = {
  success: boolean,
  token: string,
}

export type OrganisationDetails = {
  name: string,
  website: string,
  vat: string,
}

export type SecurityStep = {
  password: string,
}

export type RegisterFormStore = {
  registrationToken?: string,
  isRequesting: boolean,
  error?: string,
  step: Step,
}

export type RegisterFormActions =
  ReturnType<typeof nextStepAction> |
  ReturnNestedType<typeof submitPersonalDetailsActions> |
  ReturnNestedType<typeof submitOrganisationDetailsActions> |
  ReturnNestedType<typeof submitSecurityStepActions>

export function isStep (step: Step | number): step is Step {
  return step as Step !== undefined
}
