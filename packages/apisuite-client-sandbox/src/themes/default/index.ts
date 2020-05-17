import { createMuiTheme } from '@material-ui/core/styles'
import themeConfig from './theme.config.json'

import apiLogo from './images/api-logo.png'
import footerLogo from './images/footer-logo.svg'

export default createMuiTheme({
  // palette: themeConfig.palette,
  // shape: themeConfig.shape,
  // spacing: (factor: number) => 8 * factor,
}, {
  images: {
    apiLogo: apiLogo,
    footerLogo: footerLogo,
  },
  // gradients: themeConfig.gradients,
})
