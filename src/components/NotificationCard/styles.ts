import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  hideNotificationCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    boxShadow: `0px 3px 10px -3px ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '0px',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    opacity: 0,
    padding: '20px 40px',
    transition: 'opacity 0.35s, height 0.35s',
    width: '100%',

    '& > div': {
      display: 'none',
    },

    '& > a': {
      display: 'none',
    },

    '& > svg': {
      display: 'none',
    },

  },

  notificationCardButton: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    boxShadow: 'none',
    color: `${theme.palette.common.white} !important`,
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: 600,
    padding: '12px 20px',
    position: 'relative',
    textAlign: 'center',
    textDecoration: 'none',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: theme.palette.primary,
    },
  },

  notificationCardCloseButton: {
    color: theme.palette.grey[300],
    cursor: 'pointer',
    height: '24px',
    width: '24px',
  },

  notificationCardText: {
    color: theme.palette.grey[400],
    fontSize: '20px',
    fontWeight: 300,
    maxWidth: '542.5px',
    width: '100%',
  },

  notificationCardTitle: {
    color: theme.palette.primary.main,
    fontSize: '27px',
    fontWeight: 400,
    marginBottom: '12px',
    maxWidth: '542.5px',
    width: '100%',
  },

  showNotificationCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    boxShadow: `0px 3px 10px -3px ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '150px',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    opacity: 1,
    padding: '20px 40px',
    transition: 'opacity 0.35s, height 0.35s',
    width: '100%',

    '& > div': {
      display: 'initial',
    },

    '& > a': {
      display: 'initial',
    },

    '& > svg': {
      display: 'initial',
    },
  },
}))
