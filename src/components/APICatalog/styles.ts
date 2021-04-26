import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  apiCatalogEntry: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey['300']}`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
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
    color: theme.palette.grey['400'],
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '20px',
  },

  apiCatalogEntryLink: {
    textDecoration: 'none',
  },

  apiCatalogEntryName: {
    color: theme.palette.secondary.main,
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
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    marginRight: '8px',
    padding: '5px 10px',
  },

  apiCatalogEntryVersionAndAccess: {
    color: theme.palette.grey['400'],
    fontSize: '14px',
    fontWeight: 300,
    marginBottom: '8px',
  },

  colorsOfAPIDocumentation: {
    backgroundColor: theme.palette.action.active,
    color: theme.palette.background.default,
  },

  colorsOfProductionAPI: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
  },

  colorsOfSandboxExtensionAPI: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.background.default,
  },
}))
