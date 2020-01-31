/**
 * @module Register/ducks
 */

import { AnyAction } from 'redux'
import { UserData, RegisterStore } from './types'
import update from 'immutability-helper'

export const REGISTER_USER = 'Register/REGISTER_USER'
export const REGISTER_SUCCESS = 'Register/REGISTER_SUCCESS'
export const REGISTER_ERROR = 'Register/REGISTER_ERROR'

const initialState: RegisterStore = {
  error: '',
  success: false,
}

export default function reducer (state = initialState, action: AnyAction) {
  switch (action.type) {
    case REGISTER_USER: {
      return state
    }
    case REGISTER_SUCCESS:
      return update(state, {
        success: { $set: true },
      })
    case REGISTER_ERROR:
      return update(state, {
        error: { $set: action.error },
      })
    default:
      return state
  }
}

export function registerUser (userData: UserData) {
  return { type: REGISTER_USER, userData }
}

export function registerSuccess () {
  return { type: REGISTER_SUCCESS }
}

export function registerError (error: string) {
  return { type: REGISTER_ERROR, error }
}
