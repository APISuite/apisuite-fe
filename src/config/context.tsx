import { createContext, useContext } from 'react'
import { ConfigContextProps } from './types'

export const ConfigContext = createContext<ConfigContextProps>({
  provider: false,
  initialized: true,
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

export const useConfig = () => {
  const context = useContext(ConfigContext)

  if (!context.provider) throw new Error('The useConfig hook must be used within a ConfigProvider')

  return context
}
