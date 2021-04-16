import { Action } from 'redux'

import { Profile } from 'containers/Profile/types'

import {
  UPDATE_PASSWORD_REQUEST_ERROR,
  UPDATE_PASSWORD_REQUEST_SUCCESS,
  UPDATE_PASSWORD_REQUEST,
} from './ducks'

export interface SecurityProps {
  getProfile: () => void,
  profile: Profile,
  updatePasswordRequest: (oldPassword: string, newPassword: string) => void,
}

// Action types
export interface UpdatePasswordRequestAction extends Action {
  type: typeof UPDATE_PASSWORD_REQUEST,
  payload: {
    newPassword: string,
    oldPassword: string,
  },
}

export interface UpdatePasswordRequestSuccessAction extends Action {
  type: typeof UPDATE_PASSWORD_REQUEST_SUCCESS,
}

export interface UpdatePasswordRequestErrorAction extends Action {
  type: typeof UPDATE_PASSWORD_REQUEST_ERROR,
}

export type SecurityActions =
  UpdatePasswordRequestAction |
  UpdatePasswordRequestErrorAction |
  UpdatePasswordRequestSuccessAction
