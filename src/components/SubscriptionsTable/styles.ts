import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  apiAppsContainer: {
    alignItems: 'center',
    borderLeft: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    width: '405px',
  },

  apiDetailsLinkContainer: {
    alignItems: 'center',
    borderLeft: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    justifyContent: 'center',
    width: '40px',

    '& > a': {
      color: theme.palette.action.active,
      height: '24px',
      transform: 'scaleX(-1)',
      width: '24px',
    },
  },

  apiName: {
    alignItems: 'center',
    color: theme.palette.action.active,
    display: 'flex',
    fontSize: '16px',
    fontWeight: 400,
    paddingLeft: '40px',
  },

  apiNameAndAppsContainer: {
    backgroundColor: theme.palette.background.paper,
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    height: '40px',
    justifyContent: 'space-between',
    width: '100%',
  },

  apiNameContainer: {
    alignItems: 'center',
    display: 'flex',
    width: '455px',
  },

  apiVersionDetailsContainer: {
    alignItems: 'center',
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    display: 'flex',
    height: '35px',
    justifyContent: 'space-between',
    padding: '0px 7.5px 00px 40px',
  },

  apiVersionIconsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '300px',
  },

  apiVersionLink: {
    textDecoration: 'none',
  },

  apiVersionName: {
    color: theme.palette.grey[400],
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'center',
    width: '300px',
  },

  apiVersionNumber: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'left',
    width: '300px',
  },

  appNameIcon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.primary.contrastText,
    fontSize: '14px',
    fontWeight: 300,
    justifyContent: 'center',
    marginLeft: '12px',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '35px',
  },

  chevronIcon: {
    color: theme.palette.grey[400],
  },

  deprecatedIcon: {
    backgroundColor: theme.palette.warning.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.primary.contrastText,
    marginRight: '20px',
    padding: '5px',
  },

  mostRecentAPIVersionLink: {
    color: theme.palette.action.active,
    height: '24px',
    textDecoration: 'none',
    transform: 'scaleX(-1)',
    width: '24px',
  },

  noSubsMessage: {
    color: theme.palette.grey[400],
    fontSize: '14px',
    fontWeight: 300,
    padding: '10px 0px 10px 12px',
  },

  tableBody: {
    // FIXME: do we need 25 grey scale?
    backgroundColor: theme.palette.grey[25 as never],
    border: `1px solid ${theme.palette.grey['300']}`,
    borderBottomLeftRadius: `${theme.palette.dimensions.borderRadius}px`,
    borderBottomRightRadius: `${theme.palette.dimensions.borderRadius}px`,
    borderTop: 'none',
    width: '100%',
  },

  tableContentsContainer: {
    width: '900px',
  },

  tableHeader: {
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderTopLeftRadius: `${theme.palette.dimensions.borderRadius}px`,
    borderTopRightRadius: `${theme.palette.dimensions.borderRadius}px`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 47.5px 10px 40px',
    width: '100%',

    '& > :first-child': {
      color: theme.palette.action.active,
      fontSize: '16px',
      fontWeight: 300,
    },

    '& > :last-child': {
      color: theme.palette.grey[400],
      fontSize: '16px',
      fontWeight: 300,
    },
  },
}))
