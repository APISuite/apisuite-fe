
import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: '36px 0 76px 0',
    position: 'relative',
    width: '100%',
  },

  progress: {
    height: '4px',
    width: '90px',
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',

    '&::-webkit-progress-bar': {
      backgroundImage: theme.palette.grey[200],
      backgroundColor: theme.palette.primary.main,
    },

    '&::-moz-progress-bar': {
      backgroundImage: theme.palette.grey[200],
      backgroundColor: theme.palette.primary.main,
    },
  },

  progressAfter: {
    '&::-webkit-progress-bar': {
      backgroundColor: theme.palette.grey[200],
    },

    '&::-moz-progress-bar': {
      backgroundColor: theme.palette.grey[200],
    },
  },

  progressCurrent: {
    '&::-webkit-progress-bar': {
      backgroundColor: theme.palette.grey[200],
    },

    '&::-moz-progress-bar': {
      backgroundColor: theme.palette.grey[200],
    },
  },

  stepCircle: {
    border: '3px solid ' + theme.palette.grey[200],
    borderRadius: '50%',
    display: 'block',
    height: '20px',
    width: '20px',
  },

  stepCircleBefore: {
    border: '3px solid ' + theme.palette.primary.main,
    color: theme.palette.grey[500],
  },

  stepCircleCurrent: {
    fontWeight: 'bold',
  },

  stepProgress: {
    alignItems: 'center',
    display: 'flex',
  },

  stepTitle: {
    borderRadius: '50%',
    color: theme.palette.grey[300],
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'normal',
    height: '100%',
    lineHeight: '18px',
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateY(24px) translateX(60px)',
    width: '80px',
  },

  stepTitleCurrent: {
    borderRadius: '50%',
    color: theme.palette.secondary.main,
    display: 'flex',
    fontSize: '14px',
    fontWeight: 'normal',
    height: '100%',
    lineHeight: '18px',
    position: 'absolute',
    textAlign: 'center',
    transform: 'translateY(24px) translateX(60px)',
    width: '80px',
  },
}))
