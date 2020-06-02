import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

const useStyles = makeStyles(({
  registerContainer: {
    width: '100%',
    height: '100%',
  },
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: config.dimensions.borderRadius,
    color: config.palette.greyScales[400],
  },

}))

export default useStyles
