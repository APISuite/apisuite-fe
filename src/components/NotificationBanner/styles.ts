import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  notificationBannerCloseButton: {
    color: theme.palette.common.white,
    cursor: 'pointer',
    height: '24px',
    width: '24px',
  },

  notificationBannerContentsContainer: {
    backgroundColor: theme.palette.secondary.main,
    bottom: 0,
    display: 'flex',
    padding: '25px 60px 45px 60px',
    position: 'sticky',
  },

  notificationBannerHeader: {
    color: theme.palette.common.white,
    fontSize: '24px',
    fontWeight: 400,
    margin: '0px 15px 15px 0px',
  },

  notificationBannerParagraph: {
    color: theme.palette.common.white,
    fontSize: '16px',
    fontWeight: 300,
    lineHeight: '22px',
    marginRight: '15px',
  },

  notificationBannerTextContainer: {
    width: '100%',
  },
}))

export default useStyles
