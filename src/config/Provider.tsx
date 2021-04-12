import React, { useEffect, useRef, useState } from 'react'
import { createMuiTheme, ThemeProvider, Theme } from '@material-ui/core/styles'
import { Button, CircularProgress, Typography } from '@material-ui/core'
import { safeMergeDeep } from 'util/safeMergeDeep'
import AirDriftSrc from 'assets/adrift.svg'
import { ConfigContext } from './context'
import { defaultState, apiDefaults } from './constants'
import useStyles from './styles'
import { ConfigProviderProps, ConfigState } from './types'
import { useTranslation } from 'react-i18next'

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children, api, ...rest }) => {
  const classes = useStyles()
  const { t } = useTranslation()
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
        setState((s) => ({ ...s, failedToFetch: true }))
      }
    }

    bootstrap()
  }, [api])

  function handleReloadClick () {
    location.reload()
  }

  if (state.failedToFetch) {
    return (
      <div className={classes.container}>
        <img
          className={classes.errorImg}
          src={AirDriftSrc}
          alt='failed to fetch'
        />

        <Typography variant='h5'>
          {t('config.errorMessage')}
        </Typography>

        <br />

        <Button onClick={handleReloadClick}>Reload Page</Button>
      </div>
    )
  }

  if (!state.initialized) {
    return (
      <div className={classes.container}>
        <CircularProgress color='inherit' />
      </div>
    )
  }

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
