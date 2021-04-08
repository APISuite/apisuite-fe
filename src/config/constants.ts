import { ConfigState } from './types'

export enum apiDefaults {
  settings = 'settings',
  owner = 'owner'
}

export const defaultState: ConfigState = {
  initialized: false,
  portalName: '',
  clientName: '',
  supportURL: '',
  documentationURL: '',
  providerSignupURL: '',
  sso: [],
  socialURLs: [],
  i18nOptions: [],
  infra: {
    hydra: '',
    sandbox: '',
    remoteAPI: '',
  },
  ownerInfo: {
    name: '',
    description: '',
    vat: '',
    website: '',
    logo: '',
    // eslint-disable-next-line @typescript-eslint/camelcase
    org_code: '',
    // eslint-disable-next-line @typescript-eslint/camelcase
    app_count: 0,
    tosUrl: '',
    privacyUrl: '',
    youtubeUrl: '',
    websiteUrl: '',
    supportUrl: '',
  },
  pages: {
    landing: {
      components: [],
    },
  },
}
