import { makeStyles } from '@apisuite/fe-base'

export default makeStyles((theme) => ({
  stepCircle: {
    display: 'block',
    width: '20px',
    height: '20px',
    border: '3px solid ' + theme.palette.grey[200],
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
    color: theme.palette.grey[300],
    borderRadius: '50%',
  },
  stepCircleBefore: {
    border: `3px solid ${theme.palette.secondary.main}`,
    color: theme.palette.grey[500],
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
      backgroundImage: theme.palette.grey[200],
      backgroundColor: theme.palette.secondary.main,
    },
    '&::-moz-progress-bar': {
      backgroundImage: theme.palette.grey[200],
      backgroundColor: theme.palette.secondary.main,
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
      backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.grey[200]})`,
    },
    '&::-moz-progress-bar': {
      backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.grey[200]})`,
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
