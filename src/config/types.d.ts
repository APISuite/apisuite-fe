import { Palette, PaletteOptions, Theme, ThemeOptions } from '@material-ui/core/styles'

export interface ConfigContextProps extends ConfigState {
  provider: boolean,
}

export interface ConfigProviderProps {
  settingsUrl: string,
}

export interface ConfigState extends Omit<DefaultConfig, 'palette'> {
  initialized: boolean,
}

type Locale = 'en-US' | 'pt-PT'

type LocaleOption = {
  locale: Locale,
  label: string,
}

export interface DefaultConfig {
  portalName: string,
  clientName: string,
  infra: {
    hydra: string,
    sandbox: string,
    remoteAPI: string,
  },
  social: {
    web: string,
    twitter: string,
    github: string,
  },
  footer: {
    copyright: string,
  },
  i18nOptions: LocaleOption[],
  palette: {
    background: {
      default: string,
    },
    primary: string,
    primaryContrastText: string,
    secondary: string,
    secondaryContrastText: string,
    tertiary: string,
    tertiaryContrastText: string,
    active: string,
    error: string,
    focus: string,
    info: string,
    label: string,
    success: string,
    warning: string,
    grey: {
      25: string,
      50: string,
      100: string,
      300: string,
      400: string,
      500: string,
      600: string,
      700: string,
      800: string,
      900: string,
    },
    text: {
      primary: string,
      secondary: string,
    },
    feedback: {
      error: string,
    },
    alert: {
      success: {
        background: string,
      },
    },
  },
  dimensions: {
    borderRadius: number,
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
    tertiary: Palette['primary'],
    focus: Palette['primary'],
    grey: Palette['grey'] & { 25: string },
    label: string,
    active: string,
    info: string,
  }

  interface PaletteOptions {
    tertiary: PaletteOptions['primary'],
    focus: PaletteOptions['primary'],
    grey: Palette['grey'] & { 25: string },
    label: string,
    active: string,
    info: string,
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    dimensions: {
      borderRadius: number,
    },
    alert: {
      success: {
        background: string,
      },
    },
    feedback: {
      error: string,
    },
  }

  interface ThemeOptions {
    dimensions: {
      borderRadius: number,
    },
    alert: {
      success: {
        background: string,
      },
    },
    feedback: {
      error: string,
    },
  }
}
