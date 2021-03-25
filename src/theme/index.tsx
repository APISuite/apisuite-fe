import React, { useEffect, useState } from 'react'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles'
import mergeDeep from 'lodash.merge'
import { config } from 'constants/global'
import { API_URL } from 'constants/endpoints'

interface CustomTheme extends Theme {
  alert: {
    success: {
      background: string,
    },
  },
  dimensions: {
    borderRadius: number,
  },
  feedback: {
    error: string,
  },
}

export const theme: ThemeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: config?.palette?.primary,
      contrastText: config?.palette?.primaryContrastText,
    },
    secondary: {
      main: config?.palette?.secondary,
      contrastText: config?.palette?.secondaryContrastText,
    },
    tertiary: {
      main: config?.palette?.tertiary,
    },
    focus: {
      main: config?.palette?.focus,
    },
    info: {
      main: config?.palette?.info,
    },
    success: {
      main: config?.palette?.success,
    },
    grey: config?.palette?.newGreyScales,
    text: config?.palette?.text,
  },
}

export const AppThemeProvider: React.FC = ({ children }) => {
  const [combinedTheme, setCombinedTheme] = useState<CustomTheme | null>(null)

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // load theme
        const fetchedTheme = await (await fetch(`${API_URL}/settings/theme`)).json()

        const fromConfig = {
          alert: config?.palette?.alert,
          dimensions: config?.dimensions,
          feedback: config?.palette?.feedback,
        }

        // combine all options - the any is because a lot of types are missing from SandboxConfig
        const merged: any = mergeDeep(createMuiTheme(theme), [fromConfig, fetchedTheme])

        setCombinedTheme(merged)
      } catch (error) {
        // TODO: handle error
        console.log(error)
      }
    }

    bootstrap()
  }, [])

  // TODO: add spinner?
  if (!combinedTheme) return <span>Loading...</span>

  return (
    <ThemeProvider theme={combinedTheme}>
      {children}
    </ThemeProvider>
  )
}
