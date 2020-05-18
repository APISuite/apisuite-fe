import { LocaleOption } from 'language/types'

export interface SandboxConfig {
  includes: { [prop: string]: boolean },
  client: string,
  social: object,
  footer: {
    copyright: string,
  },
  i18n: LocaleOption[],
  palette: any,
  dimensions: any,
  pages: any,
}
