import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  formCard: {
    display: 'block',
    width: '40%',
    maxWidth: '400px',
    minWidth: '350px',
    minHeight: '420px',
  },
  closeIcon: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    color: 'white',
  },
  formTitle: {
    fontSize: '26',
    fontWeight: 300,
    color: 'white',
  },
  submitBtn: {
    textTransform: 'none',
    width: '160px',
    background: 'transparent',
    fontSize: 14,
    color: 'white',
    padding: 8,
    border: '1px solid white',
    borderRadius: 4,
  },
})

export default useStyles
