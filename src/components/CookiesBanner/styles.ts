import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  cookiesConsentBannerContainer: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    padding: '25px 45px',
  },

  cookiesConsentButton: {
    backgroundColor: `${theme.palette.background.default} !important`,
    borderRadius: `${theme.palette.dimensions.borderRadius}px !important`,
    color: `${theme.palette.primary.main} !important`,
    padding: '12px 20px !important',
    fontSize: '16px !important',
    fontWeight: 600,
  },

  cookiesConsentHeader: {
    color: theme.palette.primary.contrastText,
    fontSize: '24px',
    fontWeight: 400,
    margin: '0px 80px 12px 0px',
  },

  cookiesConsentParagraph: {
    color: theme.palette.primary.contrastText,
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '22px',
    marginRight: '80px',

    '&:first-of-type': {
      marginBottom: '20px',
    },
  },
}))

export default useStyles
