import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  loginWithContainer: {
    width: '100%',
    minHeight: '200px',
  },
  loginWithButtonWrapper: {
    marginBottom: '10px',
    color: theme.palette.grey[400],
  },
}))

export default useStyles
