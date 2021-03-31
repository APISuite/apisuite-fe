import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  loginContainer: {
    width: '100%',
    height: '100%',
  },
  emailTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.dimensions.borderRadius,
    color: theme.palette.grey[400],
  },
  nameTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.dimensions.borderRadius,
    color: theme.palette.grey[400],
  },
  passPhrasefield: {
    backgroundColor: 'white',
    borderRadius: theme.dimensions.borderRadius,
    color: theme.palette.grey[400],
  },
  passPhraseContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  fieldTitle: {
    margin: 0,
    color: 'white',
    fontSize: 14,
    fontWeight: 300,
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  shuffleIcon: {
    color: 'white',
  },
  visibilityIcon: {
    color: 'white',
  },
  option: {
    color: 'white',
    fontSize: '13px',
    textDecoration: 'none',
    '& > a': {
      textDecoration: 'none',
    },
    '&:hover': {
      color: 'white',
      textDecoration: 'underline',
    },
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
  },
  forgotPassword: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 20,
    fontSize: 13,
    lineHeight: '14px',
    color: '#ACACAC',
    textDecoration: 'underline',
    cursor: 'pointer',
    '& hover': {
      fontWeight: 'bold',
      color: '#ACACAC',
    },
  },
}))

export default useStyles
