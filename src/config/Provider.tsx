import React, { useEffect, useRef, useState } from 'react'
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles'
import { safeMergeDeep } from 'util/safeMergeDeep'
import { ConfigContext } from './context'
import { ConfigProviderProps, ConfigState, DefaultConfig } from './types'

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, settingsUrl, ...rest }) => {
  const appTheme = useRef<Theme>()
  const [state, setState] = useState<ConfigState>({
    initialized: false,
    portalName: 'API Suite Portal',
    clientName: 'API Suite',
    infra: {
      hydra: 'hydraauth.develop.apisuite.io',
      sandbox: 'sandbox.develop.apisuite.io',
      remoteAPI: 'remoteAPI',
    },
    social: {
      web: 'https://cloudoki.com/',
      twitter: 'https://twitter.com/TeamCloudoki',
      github: 'https://github.com/Cloudoki',
    },
    footer: {
      'copyright': '© Cloudoki 2020.\nAll rights reserved.\nProudly made in Europe.',
    },
    i18nOptions: [
      {
        locale: 'en-US',
        label: 'We speak English',
      },
      {
        locale: 'pt-PT',
        label: 'Nós falamos Português',
      },
    ],
    dimensions: {
      borderRadius: 4,
    },
    pages: {
      landing: {
        components: [],
      },
    },
  })

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // load config
        // `${API_URL}/settings/portal`
        const { palette, dimensions, ...rest }: DefaultConfig = await (await fetch(settingsUrl)).json()

        appTheme.current = createMuiTheme({
          palette: {
            type: 'light',
            primary: {
              main: palette.primary,
              contrastText: palette?.primaryContrastText,
            },
            secondary: {
              main: palette.secondary,
              contrastText: palette?.secondaryContrastText,
            },
            tertiary: {
              main: palette.tertiary,
            },
            focus: {
              main: palette.focus,
            },
            info: {
              main: palette.info,
            },
            success: {
              main: palette.success,
            },
            warning: {
              main: palette.warning,
            },
            grey: palette.grey,
            text: palette.text,
            label: palette.label,
            active: palette.active,
          },
          dimensions: dimensions,
          alert: palette?.alert,
          feedback: palette?.feedback,
        })

        setState((s) => safeMergeDeep(s, { ...rest, initialized: true }))
      } catch (error) {
        // TODO: handle errors here
      }
    }

    bootstrap()
  }, [settingsUrl])

  if (!state.initialized) return <span>Loading...</span>

  return (
    <ConfigContext.Provider
      {...rest}
      value={{
        ...state,
        provider: true,
      }}
    >
      <ThemeProvider theme={appTheme.current!}>
        {children}
      </ThemeProvider>
    </ConfigContext.Provider>
  )
}
