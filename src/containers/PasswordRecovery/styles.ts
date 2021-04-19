import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  boldText: {
    fontWeight: 400,
  },

  closeButtonContainer: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',

    '& > p': {
      color: theme.palette.primary.main,
      fontSize: '14px',
      fontWeight: 300,
      marginRight: '15px',
      textDecoration: 'underline',
    },

    '& > svg': {
      color: theme.palette.primary.main,
      height: '25px',
      width: '25px',
    },
  },

  form: {
    maxWidth: '600px',
  },

  formSideContentContainer: {
    padding: '200px 80px',
    width: '65%',

    '@media (min-width: 1440px)': {
      padding: '200px 80px',
      width: '55%',
    },
  },

  formSideSubtitle: {
    color: theme.palette.grey[400],
    fontSize: '20px',
    fontWeight: 300,
    marginBottom: '35px',
    maxWidth: '600px',
  },

  formSideTitle: {
    color: theme.palette.primary.main,
    fontSize: '42px',
    fontWeight: 700,
    marginBottom: '5px',
    maxWidth: '600px',
  },

  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: '1024px',
    padding: '15px 80px',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },

  iconLogo: {
    color: theme.palette.secondary.main,
    height: 'auto',
    marginRight: '10px',
    width: '60px',
  },

  imageLogo: {
    height: 'auto',
    marginRight: '10px',
    padding: '5px',
    width: '60px',
  },

  imageSideContentContainer: {
    padding: '245px 0px',
    width: '35%',

    '@media (min-width: 768px)': {
      padding: '255px 0px',
    },

    '@media (min-width: 1440px)': {
      padding: '175px 0px',
      width: '45%',
    },
  },

  image: {
    maxWidth: '80%',

    '@media (min-width: 1440px)': {
      maxWidth: '500px',
    },
  },

  infoBox: {
    alignItems: 'center',
    backgroundColor: theme.palette.info.light,
    borderRadius: theme.palette.dimensions.borderRadius,
    display: 'flex',
    height: '100%',
    marginBottom: '25px',
    maxHeight: '65px',
    maxWidth: '600px',
    textAlign: 'left',
  },

  infoBoxIcon: {
    fill: '#46b5ef',
    transform: 'translate(7px, -7px)',
  },

  infoBoxText: {
    color: '#035E86',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    margin: '0px 10px 0px 15px',
  },

  inputField: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.palette.dimensions.borderRadius,
    color: theme.palette.grey[400],
  },

  inputFieldContainer: {
    marginBottom: '35px',
  },

  logoAndNameContainer: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
  },

  mainContainer: {
    backgroundColor: `${theme.palette.background.default} !important`,
  },

  pageContentContainer: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100vh',
    minWidth: '1024px',
    width: '100%',
  },

  portalName: {
    color: theme.palette.primary.main,
    fontSize: '24px',
    fontWeight: 500,
  },
}))

export default useStyles
