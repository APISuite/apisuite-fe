import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  activeTab: {
    '& > span': {
      fontWeight: 600,
    },
  },

  alternativeAssistantAmountOfNotifications: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: theme.palette.dimensions.borderRadius,
    height: '24px',
    pointerEvents: 'none',
    textAlign: 'center',
    transform: 'translate(-7px, -11px)',
    width: '24px',

    '& > p': {
      color: theme.palette.common.white,
      fontSize: '14px',
      fontWeight: 400,
      height: '24px',
      lineHeight: '24px',
      width: '24px',
    },
  },

  alternativeAssistantButton: {
    backgroundColor: 'transparent',
    borderRadius: '50%',
    color: theme.palette.action.active,
    cursor: 'pointer',
    height: '32px',
    paddingTop: '1.5px',
    textAlign: 'center',
    width: '32px',
  },

  alternativeLogo: {
    color: theme.palette.secondary.main,
    height: 'auto',
    marginRight: '10px',
    width: '60px',
  },

  assistantContainer: {
    display: 'flex',
  },

  goBackButton: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',

    '& > span': {
      fontSize: '16px',
      fontWeight: 500,
    },

    '& > svg': {
      marginRight: '8px',
    },
  },

  headerContentsContainer: {
    alignItems: 'center',
    display: 'flex',
  },

  imageLogo: {
    height: 'auto',
    marginRight: '10px',
    padding: '5px',
    width: '60px',
  },

  linkToProfile: {
    alignSelf: 'center',
    textDecoration: 'none',
  },

  logOutIcon: {
    cursor: 'pointer',
    marginLeft: '12px',
  },

  logOutTab: {
    padding: '4.5px !important',
  },

  logoAndNameContainer: {
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },

  opaqueMenuActiveTabOverLine: {
    backgroundColor: theme.palette.secondary.main,
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  opaqueMenuTab: {
    color: theme.palette.common.white,
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '40px 16px',
    textTransform: 'none',
  },

  opaqueMenuUserNameAndAvatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
    right: 0,
  },

  opaqueSubMenuActiveTabUnderLine: {
    backgroundColor: theme.palette.primary.main,
    height: '3px',
    transition: 'none !important',
  },

  portalName: {
    fontSize: '24px',
    fontWeight: 400,
  },

  regularAssistantAmountOfNotifications: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    height: '24px',
    pointerEvents: 'none',
    textAlign: 'center',
    transform: 'translate(-7px, -11px)',
    width: '24px',

    '& > p': {
      color: theme.palette.background.default,
      fontSize: '14px',
      fontWeight: 400,
      height: '24px',
      lineHeight: '24px',
      width: '24px',
    },
  },

  regularAssistantButton: {
    backgroundColor: theme.palette.background.default,
    borderRadius: '50%',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    height: '32px',
    paddingTop: '1.5px',
    textAlign: 'center',
    width: '32px',
  },

  regularLogo: {
    color: theme.palette.common.white,
    height: 'auto',
    marginRight: '10px',
    width: '60px',
  },

  subTab: {
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  subTabs: {
    display: 'flex',
  },

  subTabsAndExtraButton: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },

  transparentMenuActiveTabOverLine: {
    backgroundColor: theme.palette.background.default,
    height: '3px',
    top: 0,
    transition: 'none !important',
  },

  transparentMenuTab: {
    color: theme.palette.common.white,
    fontSize: '18px',
    fontWeight: 300,
    minWidth: 'unset',
    opacity: 1,
    padding: '16px',
    textTransform: 'none',
  },

  userAvatar: {
    background: theme.palette.gradient.light,
    border: `2px solid ${theme.palette.common.white}`,
    fontSize: '20px',
    fontWeight: 300,
    height: '33px',
    width: '33px',

    '&:hover': {
      border: `2px solid ${theme.palette.secondary.main}`,
    },
  },

  transparentMenuUserNameAndAvatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 0,
  },

  transparentSubMenuActiveTabUnderLine: {
    backgroundColor: theme.palette.action.focus,
    height: '3px',
    transition: 'none !important',
  },

  userName: {
    fontSize: '18px',
    fontWeight: 300,
    marginRight: '20px',
  },

  yetToLogIn: {
    display: 'none',
  },
}))
