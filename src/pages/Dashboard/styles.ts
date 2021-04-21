import { makeStyles } from '@apisuite/fe-base'

import dashboardSpaceBackground from 'assets/dashboardSpaceBackground.svg'

export default makeStyles((theme) => ({
  // General JSS

  dashboardContentsContainer: {
    backgroundColor: theme.palette.background.default,
    position: 'relative',
  },

  // JSS for the header image

  expandedHeaderImageSection: {
    background: 'url(' + dashboardSpaceBackground + ')',
    backgroundColor: theme.palette.background.default,
    backgroundPosition: 'center -320px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '300px',
    position: 'absolute',
    top: 0,
    transition: 'height 0.5s',
    width: '100%',
  },

  regularHeaderImageSection: {
    background: 'url(' + dashboardSpaceBackground + ')',
    backgroundColor: theme.palette.background.default,
    backgroundPosition: 'center -320px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '208.5px',
    position: 'absolute',
    top: 0,
    transition: 'height 0.5s',
    width: '100%',
  },

  // JSS for the 'Notification cards' section

  customNotificationCardButton: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    boxShadow: 'none',
    color: theme.palette.common.white,
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },

    '&:link, &:visited': {
      color: theme.palette.common.white,
    },
  },

  notificationCardSection: {
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -90.75px)',
    width: '100%',
  },

  // JSS for the 'Actions Catalog' section

  actionsCatalogSectionWithNotificationCards: {
    marginBottom: '40px',
    marginTop: '80px',
    transition: 'margin 0.5s',
  },

  actionsCatalogSectionWithoutNotificationCards: {
    marginBottom: '40px',
    marginTop: '-80px',
    transition: 'margin 0.5s',
  },

  // JSS for the 'Greeting card' section

  customGreetingCardButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    boxShadow: 'none',
    color: theme.palette.common.white,
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },

    '&:link, &:visited': {
      color: theme.palette.common.white,
    },
  },

  customGreetingCardText: {
    fontSize: '20px',
    fontWeight: 200,

    '&:first-of-type': {
      marginBottom: '20px',
    },
  },

  customGreetingCardTextContainer: {
    width: '625px',
    paddingRight: '15px',
  },

  greetingCardSection: {
    marginBottom: '45px',
  },

  // JSS for the 'API Catalog' section

  apiCatalogContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  apiCatalogSectionContainer: {
    display: 'block',
    margin: '40px auto 20px auto',
    maxWidth: '900px',
    width: '100%',
  },

  sectionIntroHeading: {
    color: theme.palette.primary.main,
    fontSize: '32px',
    fontWeight: 300,
    margin: '40px 0px',
  },

  sectionSeparator: {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: theme.palette.dimensions.borderRadius,
    maxWidth: '900px',
    width: '100%',
  },

  // JSS for the notice

  noticeContainer: {
    margin: '0px auto -30px auto',
    maxWidth: '900px',
  },

  // JSS for the notification banner

  customNotificationBannerParagraph: {
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '22px',
    marginRight: '15px',
  },
}))
