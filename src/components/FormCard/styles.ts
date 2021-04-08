import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formCard: {
    display: 'block',
    // width: '40%',
    // maxWidth: '400px',
    // minWidth: '350px',
    // minHeight: '420px',
  },
  closeIcon: {
    // position: 'absolute',
    // top: '24px',
    // right: '24px',
    // color: 'white',
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
    borderRadius: theme.palette.dimensions.borderRadius,
  },
  backBtn: {
    margin: '20px 0px',
  },
  loading: {
    position: 'relative',
    top: 4,
    color: 'white',
    opacity: 0.5,
  },
  errorPlaceholder: {
    minHeight: 50,
    marginTop: 30,
  },
  errorAlert: {
    backgroundColor: theme.palette.error.main,
    color: '#fff',
    padding: '12px 25px',
    borderRadius: theme.palette.dimensions.borderRadius,
    minHeight: 50,
  },
}))

export default useStyles
