import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

const useStyles = makeStyles(({
  registerContainer: {
    width: '100%',
    height: '100%',
  },
  emailTextfield: {
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },
  nameTextfield: {
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },
  passPhrasefield: {
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
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
}))

export default useStyles
