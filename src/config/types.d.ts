import { Palette, PaletteOptions } from '@material-ui/core/styles'
import { PaletteColor } from '@material-ui/core/styles/createPalette'

export interface ConfigContextProps extends ConfigState {
  provider: boolean,
}

export interface ConfigProviderProps {
  /** API endpoints */
  api: {
    base: string,
    settings?: string,
    owner?: string,
  },
}

export interface ConfigState extends Omit<DefaultConfig, 'theme'> {
  initialized: boolean,
  ownerInfo: Owner,
}

type Locale = 'en-US' | 'pt-PT'

type LocaleOption = {
  locale: Locale,
  label: string,
}

export interface SocialUrl {
  name: string,
  url: string,
}

export interface Owner {
  name: string,
  description: string,
  vat: string,
  website: string,
  logo: string,
  org_code: string,
  app_count: 0,
  tosUrl: string,
  privacyUrl: string,
  youtubeUrl: string,
  websiteUrl: string,
  supportUrl: string,
}

export interface DefaultConfig {
  portalName: string,
  clientName: string,
  supportURL: string,
  documentationURL: string,
  providerSignupURL: string,
  sso: string[],
  socialURLs: SocialUrl[],
  i18nOptions: LocaleOption[],
  theme: Palette,
  infra: {
    hydra: string,
    sandbox: string,
    remoteAPI: string,
  },
  pages: {
    landing: {
      // TODO: find out what this is
      components: [],
    },
  },
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    label: string,
    gradient: PaletteColor,
    dimensions: {
      borderRadius: number,
    },
  }

  interface PaletteOptions {
    label: string,
    gradient: PaletteColor,
    dimensions: {
      borderRadius: number,
    },
  }
}
