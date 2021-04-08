import React, { useEffect, useRef, useState } from 'react'
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles'
import { safeMergeDeep } from 'util/safeMergeDeep'
import { ConfigContext } from './context'
import { defaultState, apiDefaults } from './constants'
import { ConfigProviderProps, ConfigState } from './types'

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, api, ...rest }) => {
  const appTheme = useRef<Theme>()
  const [state, setState] = useState<ConfigState>(defaultState)

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const responses = await Promise.all([
          // settings config
          await fetch(`${api.base}/${api.settings || apiDefaults.settings}`),
          // owner info
          await fetch(`${api.base}/${api.owner || apiDefaults.owner}`),
        ])

        // unwrap responses
        const [{ theme, ...rest }, ownerInfo] = await Promise.all(
          responses.map((r) => r.json()),
        )

        // create theme from API configurations
        appTheme.current = createMuiTheme({ palette: theme })

        // initialize state with API configurations
        setState((s) => safeMergeDeep(s, { ...rest, ownerInfo, initialized: true }))
      } catch (error) {
        // TODO: handle errors here
      }
    }

    bootstrap()
  }, [api])

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
