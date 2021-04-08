import { createContext, useContext } from 'react'
import { defaultState } from './constants'
import { ConfigContextProps } from './types'

export const ConfigContext = createContext<ConfigContextProps>({
  ...defaultState,
  provider: false,
})

export const useConfig = () => {
  const context = useContext(ConfigContext)

  if (!context.provider) throw new Error('The useConfig hook must be used within a ConfigProvider')

  return context
}
