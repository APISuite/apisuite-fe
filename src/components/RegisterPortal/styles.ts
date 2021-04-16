
import { makeStyles } from '@apisuite/fe-base'

const useStyles = makeStyles((theme) => ({
  btnsContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
  },

  emailTextfield: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.grey[400],
  },

  fieldContainer: {
    marginBottom: 20,
    marginTop: 20,
  },

  fieldTitle: {
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 300,
    margin: 0,
  },

  registerContainer: {
    height: '100%',
    width: '100%',
  },

  nameTextfield: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.grey[400],
  },

  passPhrasefield: {
    backgroundColor: theme.palette.background.default,
    borderRadius: `${theme.palette.dimensions.borderRadius}px`,
    color: theme.palette.grey[400],
  },

  passPhraseContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },

  shuffleIcon: {
    color: theme.palette.common.white,
  },

  visibilityIcon: {
    color: theme.palette.common.white,
  },
}))

export default useStyles
