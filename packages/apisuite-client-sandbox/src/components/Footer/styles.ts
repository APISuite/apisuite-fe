import { makeStyles } from '@material-ui/styles'

import { config } from 'constants/global'

export default makeStyles(({
  copyrightContainer: {
    marginBottom: '22px',
    textAlign: 'end',
    width: '100%',

    '& > a': {
      fontSize: '14px',
      fontWeight: 300,
    },

    '& > p': {
      fontSize: '14px',
      fontWeight: 300,
      marginTop: '-5px',
    },
  },

  footer: {
    backgroundColor: config.palette.newGreyScales['700'],
    color: 'white',
    paddingBottom: '50px',
    paddingTop: '40px',
    width: '100%',

    'a:link,\n a:visited,\n a:hover,\n a:active': {
      color: 'inherit',
    },
  },

  footerContentsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontWeight: 100,
    justifyContent: 'space-between',
    margin: '0 auto',
    maxWidth: '900px',
    width: '100%',
  },

  footerToTopShortcutContainer: {
    // Middle of our layout's minimum width ('1024px')
    left: '512px',
    position: 'absolute',
    transform: 'translateY(-60px)',

    '@media (min-width: 1024px)': {
      left: '50%',
    },
  },

  iconsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '35px',
    marginTop: '10px',

    '& > a': {
      marginLeft: '20px',
    },
  },

  leftFooterContentsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'left',
    maxWidth: '700px',
    width: '100%',
  },

  logo: {
    color: config.palette.primary,
    height: 'auto',
    marginRight: '10px',
    width: '55px',
  },

  logoAndPortalNameContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'left',
    marginBottom: '20px',
    maxWidth: '700px',
    width: '100%',
  },

  portalName: {
    fontSize: '22px',
    fontWeight: 300,
  },

  rightFooterContentsContainer: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'flex-end',
    maxWidth: '180px',
    width: '100%',
  },

  section: {
    marginLeft: '40px',
  },

  sectionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '7.5px',
    maxWidth: '692.5px',
    width: '100%',
  },

  subSection: {
    '& > h3': {
      color: config.palette.primaryContrastText,
      fontSize: '16px',
      fontWeight: '300',
      lineHeight: '22px',
      margin: '0',
      padding: '0',
    },

    '& > p': {
      color: config.palette.newGreyScales['300'],
      fontSize: '14px',
      fontWeight: '300',
      lineHeight: '22px',
      margin: '0',
      padding: '0',

      '& > a': {
        textDecoration: 'none',
      },
    },
  },
}))
