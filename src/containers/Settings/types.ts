import { Action } from 'redux'
import { GET_SETTINGS, GET_SETTINGS_SUCCESS } from './ducks'

export type SettingsStore = SettingsData

export interface SettingsData {
  portalName: string,
  clientName: string,
  supportURL: string,
  documentationURL: string,
  socialURLs: SocialUrl[],
  logoURL: string,
}

export interface SocialUrl {
  name: string,
  url: string,
}

export interface GetSettingsAction extends Action {
  type: typeof GET_SETTINGS,
  payload: SettingsData,
}

export interface GetSettingsSuccessAction extends Action {
  type: typeof GET_SETTINGS_SUCCESS,
}

export type SettingsActions = GetSettingsAction | GetSettingsSuccessAction
