import { DialogProps } from '@apisuite/fe-base'
import { AnyAction } from 'redux'

export interface InformDialogProps extends DialogProps {
  inform: any,
  open: boolean,
  requesting: boolean,
  closeInform: any,
}

export type InformTarget = 'portal' | 'sandbox' | 'marketplace' | 'sso' | 'newsletter' | 'docs' | 'contact' | 'testdata' | 'demo'

export interface InformStorePayloads {
  inform: {
    email: string,
    target: InformTarget,
  },
  informError: { message: string },
}

export interface AppStoreActionTypes {
  inform: AnyAction & { payload: InformStorePayloads['inform'] },
  informClose: AnyAction,
  informOpen: AnyAction,
  informSuccess: AnyAction,
  informError: AnyAction & { payload: InformStorePayloads['informError'] },
}

export interface AppStoreActionCreators {
  inform: (payload: InformStorePayloads['inform']) => AppStoreActionTypes['inform'],
  informOpen: () => AppStoreActionTypes['informOpen'],
  informClose: () => AppStoreActionTypes['informClose'],
  informSuccess: () => AppStoreActionTypes['informSuccess'],
  informError: (payload: InformStorePayloads['informError']) => AppStoreActionTypes['informError'],
}

export interface AppStoreState {
  requestingInform: boolean,
  requestInformErrorMessage: string,
  open: boolean,
}
