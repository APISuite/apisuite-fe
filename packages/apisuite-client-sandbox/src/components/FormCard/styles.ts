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
  msgSuccess: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    backgroundColor: '#4AC38B',
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '4px',
    borderColor: '#00915A',
    color: '#00915A',
    fontSize: '13px',
    paddingLeft: 6,
    paddingRight: 6,
    lineHeight: 1.5,
  },
  msgError: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
    backgroundColor: '#F2DEDE',
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '4px',
    borderColor: '#A94442',
    color: '#A94442',
    fontSize: '13px',
    paddingLeft: 6,
    paddingRight: 6,
    lineHeight: 1.5,
  },
})

export default useStyles
