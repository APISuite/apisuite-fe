import update from 'immutability-helper'
import { LOGOUT } from 'store/auth/actions/logout'
import { LogoutAction } from 'store/auth/actions/types'

import {
  isStep,
  PreviousData,
  SignUpFormActions,
  SignUpFormStore,
} from './types'

export enum SignUpFormActionTypes {
  NEXT_STEP = 'NEXT_STEP',

  PREVIOUS_STEP = 'PREVIOUS_STEP',
}

const initialState: SignUpFormStore = {
  back: false,
  error: undefined,
  invitation: {
    email: undefined,
  },
  invitationError: undefined,
  isRequesting: false,
  previousData: {
    org: undefined,
    personal: undefined,
  },
  registrationToken: undefined,
  step: 1,
  submittedEmail: '',
}

export default function registerFormReducer (
  state = initialState,
  action: SignUpFormActions | LogoutAction,
): SignUpFormStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState
    }

    case SignUpFormActionTypes.NEXT_STEP: {
      const nextStep = state.step + 1

      let previousData = {}

      if (JSON.stringify(action.previousData) !== JSON.stringify(previousData)) {
        previousData = {
          personal: {
            $set: action.previousData?.personal ? action.previousData.personal : state.previousData?.personal,
          },
          org: { $set: action.previousData?.org ? action.previousData.org : state.previousData?.org },
        }
      }

      // If we have an invitation, we skip step 2
      if (state.invitation && state.invitation.email && nextStep === 2) {
        const skipedStep = nextStep + 1
        return update(state, {
          // @ts-ignore
          step: { $set: skipedStep },
          back: { $set: false },
          previousData,
        })
      }

      // If 'nextStep' ever amounts to '5', it means we have reached the 'Confirm registration' view.
      if (nextStep === 5) {
        return update(state, {
          step: { $set: 1 },
          back: { $set: false },
          previousData,
        })
      }

      if (isStep(nextStep)) {
        return update(state, {
          step: { $set: nextStep },
          back: { $set: false },
          previousData,
        })
      }

      return state
    }

    case SignUpFormActionTypes.PREVIOUS_STEP: {
      const previousStep = state.step - 1

      // If we have an invitation, we skip step 2
      if (state.invitation && state.invitation.email && previousStep === 2) {
        const skipedStep = previousStep - 1
        return update(state, {
          // @ts-ignore
          step: { $set: skipedStep },
          back: { $set: true },
        })
      }

      // If 'previousStep' goes to '0', it means we have reached the 'Personal details' view.
      if (previousStep === 0) {
        return update(state, {
          step: { $set: 1 },
          back: { $set: true },
        })
      }

      if (isStep(previousStep)) {
        return update(state, {
          step: { $set: previousStep },
          back: { $set: true },
        })
      }

      return state
    }

    case SignUpFormActionTypes.SUBMIT_PERSONAL_DETAILS_SUCCESS: {
      return update(state, {
        registrationToken: { $set: action.response.token },
        isRequesting: { $set: false },
        submittedEmail: { $set: '' },
      })
    }

    case SignUpFormActionTypes.SUBMIT_PERSONAL_DETAILS_REQUEST:
      return update(state, {
        isRequesting: { $set: true },
        error: { $set: undefined },
        submittedEmail: { $set: action.payload.email },
      })
    case SignUpFormActionTypes.SUBMIT_ORGANISATION_DETAILS_REQUEST:
    case SignUpFormActionTypes.SUBMIT_SECURITY_STEP_REQUEST:
    case SignUpFormActionTypes.VALIDATE_REGISTRATION_TOKEN_REQUEST: {
      return update(state, {
        isRequesting: { $set: true },
      })
    }

    case SignUpFormActionTypes.SUBMIT_PERSONAL_DETAILS_ERROR:
      /* The submission of one's personal details can fail for a number of
      reasons (e.g., connection issues, bad requests, ...), one of them
      being an e-mail address that's already in use. When this happens,
      the back-end's response status is '409'. */
      return update(state, {
        isRequesting: { $set: false },
        error: { $set: `${action.error.status}` },
      })

    case SignUpFormActionTypes.SUBMIT_ORGANISATION_DETAILS_SUCCESS:
    case SignUpFormActionTypes.SUBMIT_ORGANISATION_DETAILS_ERROR:
    case SignUpFormActionTypes.SUBMIT_SECURITY_STEP_SUCCESS:
    case SignUpFormActionTypes.SUBMIT_SECURITY_STEP_ERROR: {
      return update(state, {
        isRequesting: { $set: false },
      })
    }

    case SignUpFormActionTypes.VALIDATE_REGISTRATION_TOKEN_SUCCESS: {
      return update(state, {
        invitation: { $set: action.response },
        isRequesting: { $set: false },
      })
    }
    case SignUpFormActionTypes.VALIDATE_REGISTRATION_TOKEN_ERROR: {
      return update(state, {
        invitationError: { $set: action.error },
        isRequesting: { $set: false },
      })
    }

    default:
      return state
  }
}

export const nextStepAction = (previousData: PreviousData) => ({
  type: SignUpFormActionTypes.NEXT_STEP,
  previousData,
} as const)

export const previousStepAction = () => ({
  type: SignUpFormActionTypes.PREVIOUS_STEP,
} as const)
