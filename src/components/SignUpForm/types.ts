import { mapDispatchToProps, mapStateToProps } from './index'

import {
  nextStepAction,
  previousStepAction,
  submitOrganisationDetailsActions,
  submitProfileDetailsActions,
  submitSecurityDetailsActions,
  validateRegisterTokenActions,
} from './ducks'

import { ReturnNestedType } from 'util/typeUtils'

import { steps } from './SignUpForm'

export type SignUpFormProps =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  {
    prefilledEmail?: string,
  }

export type Step = keyof typeof steps

export type PreviousData = {
  org?: OrganisationDetails,
  personal?: ProfileDetails,
}

// Profile details

export type ProfileDetailsProps = {
  handleSubmit: (profileDetails: ProfileDetails) => void,
  preFilledEmail: string,
  register: any,
  token: string | undefined,
}

export type ProfileDetails = {
  email: string,
  name: string,
  token?: string,
}

export type ProfileDetailsResponse = {
  success: boolean,
  token: string,
}

export type ProfileDetailsResponseErrorObject = {
  status: number,
}

// Organisation details

export type OrganisationDetailsProps = {
  handleSubmit: (organisationDetails: OrganisationDetails) => void,
  previousStep: () => void,
  register: any,
}

export type OrganisationDetails = {
  name: string,
  registrationToken?: string,
  vat?: string,
  website: string,
}

// Security details

export type SecurityDetailsProps = {
  handleSubmit: (securityStep: SecurityDetails) => void,
  previousStep: () => void,
  register: any,
  token: string | undefined,
}

export type SecurityDetails = {
  password: string,
  registrationToken?: string,
  token?: string,
}

export type InvitationResponse = {
  email?: string,
  errors?: [string],
}

export type SignUpFormStore = {
  back?: boolean,
  error?: string,
  invitation?: InvitationResponse,
  invitationError?: string,
  isRequesting: boolean,
  previousData?: PreviousData,
  registrationToken?: string,
  step: Step,
  submittedEmail: string,
}

export type SignUpFormActions =
  ReturnNestedType<typeof submitOrganisationDetailsActions> |
  ReturnNestedType<typeof submitProfileDetailsActions> |
  ReturnNestedType<typeof submitSecurityDetailsActions> |
  ReturnNestedType<typeof validateRegisterTokenActions> |
  ReturnType<typeof nextStepAction> |
  ReturnType<typeof previousStepAction>

export function isStep (step: Step | number): step is Step {
  return step as Step !== undefined
}
