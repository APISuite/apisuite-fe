import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  activeDocumentationAccessFilterButtonIcon: {
    color: '#51606E',
  },

  activeFilterButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#DCDFE3',
    border: '1px solid #BAC0C6',
    borderLeft: 'none',
    cursor: 'pointer',
    display: 'flex',
    padding: '0px 6px',
  },

  activeProductionAccessFilterButtonIcon: {
    color: '#32C896',
  },

  activeSandboxAccessFilterButtonIcon: {
    color: '#19B3EE',
  },

  allAPIProductsSection: {
    margin: '20px auto 0px auto',
    maxWidth: '900px',
    width: '100%',
  },

  apiCatalogContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  apiCatalogSectionContainer: {
    display: 'block',
    margin: '40px auto -40px auto',
    maxWidth: '900px',
    width: '100%',
  },

  apiProductButtons: {
    display: 'flex',
    marginBottom: '12px',
  },

  apiProductName: {
    color: '#FFFFFF',
    fontSize: '22px',
    fontWeight: 400,
    marginRight: '12px',
  },

  apiProductNameAndVersion: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: '20px',
    marginTop: '-5px',
  },

  apiProductOfflineStatus: {
    color: '#FFFFFF',
    fontSize: '14px',
    marginRight: '12px',
  },

  apiProductOnlineStatus: {
    color: theme.palette.primary.main,
    fontSize: '14px',
    marginRight: '12px',
  },

  apiProductStatusAndAccessType: {
    display: 'flex',

    // Access type
    '& > :last-child': {
      color: '#14283C',
      fontSize: '14px',
      fontWeight: 300,
      textAlign: 'left',
    },
  },

  apiProductVersion: {
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 400,
  },

  documentationAccess: {
    backgroundColor: '#51606E',
    borderRadius: '4px',
    padding: '4px 8px',
  },

  filtersContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  inactiveFilterButtonContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    border: '1px solid #BAC0C6',
    borderLeft: 'none',
    cursor: 'pointer',
    display: 'flex',
    padding: '0px 6px',
  },

  inactiveFilterButtonIcon: {
    color: '#85909A',
  },

  lastFilterButtonContainer: {
    borderBottomRightRadius: '4px',
    borderTopRightRadius: '4px',
  },

  latestAPIProductDetails: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '560px',
    width: '100%',
  },

  latestAPIProductImage: {
    /* The 'box-shadow' property was not generating the
    intended shadow, so 'filter' was used instead. */
    filter: 'drop-shadow(0px 5px 2.5px rgba(0, 0, 0, 0.25))',
    height: '185px',
    marginRight: '40px',
    width: '320px',
  },

  latestAPIProductTitle: {
    color: '#FFFFFF',
    fontSize: '16px',
    fontWeight: 500,
  },

  latestAPIProductUpdateContainer: {
    display: 'flex',
    padding: '180px 60px 0px 60px',
  },

  latestAPIProductUpdateSection: {
    // First color is a fallback one - do not remove!
    background: '#7DD291 linear-gradient(270deg, rgba(125, 210, 145, 1) 0%, rgba(0, 125, 125, 1) 100%)',
    borderBottom: '4px solid rgba(20, 40, 60, 0.1)',
    height: '335px',
    marginBottom: '-280px',
    transform: 'translateY(-300px)',
    width: '100%',
  },

  productionAccess: {
    backgroundColor: '#32C896',
    borderRadius: '4px',
    padding: '4px 8px',
  },

  retrievingAPIProductMessageContainer: {
    textAlign: 'center',

    '& > :first-child': {
      color: '#14283C',
      fontSize: '16px',
      fontWeight: 300,
    },
  },

  sandboxAccess: {
    backgroundColor: '#19B3EE',
    borderRadius: '4px',
    padding: '4px 8px',
  },

  subscribeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px',
    color: '#32C896 !important',
    fontSize: '16px',
    fontWeight: 500,
    padding: '12px 20px',
    textDecoration: 'none',
  },

  textFilter: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #BAC0C6',
    borderBottomRightRadius: '0px',
    borderRadius: '4px',
    borderTopRightRadius: '0px',
    maxWidth: '325px',
    padding: '2.5px 12px',
    width: '100%',

    '& > :first-child': {
      fontSize: '16px',
      fontWeight: 300,
    },

    '& > :last-child': {
      color: '#BAC0C6',
    },
  },

  viewDetailsButton: {
    backgroundColor: '#14283C',
    borderRadius: '4px',
    color: '#FFFFFF !important',
    fontSize: '16px',
    fontWeight: 500,
    marginRight: '12px',
    padding: '12px 20px',
    textDecoration: 'none',
  },
}))
