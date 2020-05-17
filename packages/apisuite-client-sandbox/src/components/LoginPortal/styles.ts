import { makeStyles } from '@material-ui/styles'
import theme from 'theme'
import { colorPicker } from 'util/colorPicker'

const useStyles = makeStyles(({
  loginContainer: {
    width: '100%',
    height: '100%',
  },
  emailTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.dim.radius,
    color: theme.palette.greyScales[400],
  },
  nameTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.dim.radius,
    color: theme.palette.greyScales[400],
  },
  passPhrasefield: {
    backgroundColor: 'white',
    borderRadius: theme.dim.radius,
    color: theme.palette.greyScales[400],
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
}))

export default useStyles
