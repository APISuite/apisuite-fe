import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  formGroup: {
    paddingLeft: 8,
  },
  confirmWrapper: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

export default useStyles
