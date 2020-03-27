import { makeStyles } from '@material-ui/styles'
import { Theme } from 'themes/types'
import { colorPicker } from 'util/colorPicker'

const useStyles = makeStyles((theme: Theme) => ({
  loginContainer: {
    width: '100%',
    height: '100%',
  },
  emailTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
  },
  nameTextfield: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
  },
  passPhrasefield: {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    color: colorPicker(theme.palette.grey, 400, '#ACACAC'),
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
