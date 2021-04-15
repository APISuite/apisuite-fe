import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  hideNotificationCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
    boxShadow: `0px 3px 10px -3px ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    opacity: 0,
    padding: '20px 40px',
    transition: 'opacity 0.35s',
    width: '100%',
  },

  notificationCardCloseButton: {
    color: theme.palette.grey[300],
    height: '24px',
    width: '24px',
  },

  showNotificationCardContentsContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '4px',
    boxShadow: `0px 3px 10px -3px ${theme.palette.grey[200]}`,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 'auto',
    maxWidth: '900px',
    opacity: 1,
    padding: '20px 40px',
    transition: 'opacity 0.35s',
    width: '100%',
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
}))
