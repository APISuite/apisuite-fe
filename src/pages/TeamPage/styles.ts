import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  actions: {
    paddingRight: 178,
  },

  auth: {
    color: theme.palette.text.secondary,
    fontSize: 14,
  },

  btn: {
    backgroundColor: theme.palette.grey[900],
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.common.white,
    cursor: 'pointer',
    display: 'inline-block',
    fontWeight: 500,
    marginRight: 16,
    padding: '8px 24px',

    '&:disabled': {
      backgroundColor: theme.palette.grey[400],
    },
  },

  contentContainer: {
    margin: '0 auto',
    maxWidth: 900,
    transform: 'translateX(-8px)',
  },

  emailTextfield: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.grey[400],
    width: 220,
  },

  errorAlert: {
    alignItems: 'center',
    backgroundColor: theme.palette.error.main,
    border: 'solid',
    borderColor: theme.palette.error.main,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    borderWidth: 1,
    color: theme.palette.common.white,
    display: 'flex',
    fontSize: 13,
    minHeight: 20,
    padding: '2px 15px',
  },

  errorPlaceholder: {
    display: 'flex',
    marginTop: 10,
  },

  header: {
    alignItems: 'center',
    color: theme.palette.grey[400],
    display: 'flex',
    flexDirection: 'row',
    height: 42,
    justifyContent: 'space-between',
    paddingLeft: 10,
    width: '100%',
  },

  inviteCard: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    border: 1,
    borderColor: theme.palette.grey[300],
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    borderStyle: 'solid',
    cursor: 'pointer',
    display: 'flex',
    height: 82,
    justifyContent: 'space-between',
    marginTop: 24,
    overflow: 'hidden',
    padding: '12px 30px 12px 10px',
    width: '100%',
  },

  loading: {
    color: theme.palette.common.white,
    opacity: 0.5,
    position: 'relative',
    top: 4,
  },

  loadingPage: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  name: {
    color: theme.palette.text.primary,
    fontSize: 16,
  },

  nameTextfield: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.grey[400],
    width: 220,
  },

  root: {
    backgroundColor: theme.palette.grey[100],
    minHeight: '100%',
  },

  row: {
    borderTop: '1px solid ' + theme.palette.grey[300],
    display: 'flex',
    justifyContent: 'space-between',
    padding: '16px 30px 16px 10px',
    width: '100%',
  },

  select: {
    width: 182,
  },

  table: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    border: 1,
    borderColor: theme.palette.grey[300],
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    borderStyle: 'solid',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },

  title: {
    fontSize: 26,
    fontWeight: 300,
    marginBottom: 54,
  },
}))
