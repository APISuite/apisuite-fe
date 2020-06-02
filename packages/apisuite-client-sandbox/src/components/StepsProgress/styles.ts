import { makeStyles } from '@material-ui/styles'
import { config } from 'constants/global'

export default makeStyles(({
  stepCircle: {
    display: 'block',
    width: '20px',
    height: '20px',
    border: '3px solid ' + config.palette.greyScales[100],
    borderRadius: '50%',
  },
  stepTitle: {
    position: 'absolute',
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    transform: 'translateY(24px) translateX(60px)',
    fontSize: '14px',
    lineHeight: '18px',
    width: '80px',
    fontWeight: 'normal',
    color: config.palette.greyScales[300],
    borderRadius: '50%',
  },
  stepCircleBefore: {
    border: '3px solid ' + config.palette.primary,
    color: config.palette.greyScales[500],
  },
  stepCircleCurrent: {
    fontWeight: 'bold',
  },
  progress: {
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
    height: '4px',
    width: '90px',
    '&::-webkit-progress-bar': {
      backgroundImage: config.palette.greyScales[100],
      backgroundColor: config.palette.primary,
    },
    '&::-moz-progress-bar': {
      backgroundImage: config.palette.greyScales[100],
      backgroundColor: config.palette.primary,
    },
  },
  progressAfter: {
    '&::-webkit-progress-bar': {
      backgroundColor: config.palette.greyScales[100],
    },
    '&::-moz-progress-bar': {
      backgroundColor: config.palette.greyScales[100],
    },
  },
  progressCurrent: {
    '&::-webkit-progress-bar': {
      backgroundImage: 'linear-gradient(to right, ' + config.palette.primary + ', ' + config.palette.greyScales[100] + ')',
    },
    '&::-moz-progress-bar': {
      backgroundImage: 'linear-gradient(to right, ' + config.palette.primary + ', ' + config.palette.greyScales[100] + ')',
    },
  },
  stepProgress: {
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '36px 0 76px 0',
    width: '100%',
  },
}))
