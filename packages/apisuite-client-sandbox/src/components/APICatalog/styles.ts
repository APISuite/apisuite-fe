import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles({
  apiCatalogEntry: {
    backgroundColor: config.palette.background.default,
    border: `1px solid ${config.palette.newGreyScales['300']}`,
    borderRadius: `${config.dimensions.borderRadius}px`,
    display: 'flex',
    height: '200px',
    marginBottom: '20px',
    width: '440px',
  },

  apiCatalogEntryAvatar: {
    padding: '24px 18px 24px 24px',
    width: '110px',

    '& > div': {
      height: '60px',
      margin: 'auto',
      width: '60px',
    },
  },

  apiCatalogEntryDescription: {
    color: config.palette.newGreyScales['400'],
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '20px',
  },

  apiCatalogEntryLink: {
    textDecoration: 'none',
  },

  apiCatalogEntryName: {
    color: config.palette.tertiary,
    fontSize: '22px',
    fontWeight: 400,
    marginBottom: '8px',
  },

  apiCatalogEntryText: {
    padding: '32px 0px 0px 0px',
    width: '310px',

    '& > div': {
      height: '60px',
      width: '60px',
    },
  },

  apiCatalogEntryVersion: {
    borderRadius: `${config.dimensions.borderRadius}px`,
    marginRight: '8px',
    padding: '5px 10px',
  },

  apiCatalogEntryVersionAndAccess: {
    color: config.palette.newGreyScales['400'],
    fontSize: '14px',
    fontWeight: 300,
    marginBottom: '8px',
  },

  colorsOfAPIDocumentation: {
    backgroundColor: config.palette.active,
    color: '#FFFFFF',
  },

  colorsOfProductionAPI: {
    backgroundColor: config.palette.primary,
    color: '#FFFFFF',
  },

  colorsOfSandboxExtensionAPI: {
    backgroundColor: config.palette.info,
    color: '#FFFFFF',
  },
})
