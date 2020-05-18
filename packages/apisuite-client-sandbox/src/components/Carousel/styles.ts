import { config } from 'constants/global'
import { makeStyles } from '@material-ui/core'

export default makeStyles(({
  root: {
    maxWidth: 900,
    margin: '0 auto',
  },
  dots: {
    paddingTop: 36,
    margin: '0 auto',
  },
  slide: {
    display: 'flex',
    alignItems: 'center',
  },
  slideImage: {
    width: 400,
    height: 350,
  },
  slideInfo: {
    width: 400,
    marginTop: 50,
    color: 'white',
  },
  slideInfoH1: {
    display: 'inline-block',
    fontSize: 26,
    fontWeight: 100,
    backgroundColor: 'white',
    padding: '8px 16px',
    margin: 0,
    marginBottom: 8,
    color: config.palette.primary,
  },
  slideInfoParagraph: {
    marginBottom: 48,
  },
  spacer: {
    flex: 1,
  },
  btn: {
    display: 'inline-block',
    color: '#333333',
    backgroundColor: 'white',
    padding: '8px 24px',
    borderRadius: config.dimensions.borderRadius,
    cursor: 'pointer',
    fontWeight: 500,
  },
  btn2: {
    backgroundColor: config.palette.primary,
    color: 'white',
    border: '1px solid white',
  },
  btn3: {
    backgroundColor: config.palette.secondaryLight,
    color: 'white',
    border: '1px solid white',
  },
  buttonLink: {
    textDecoration: 'none',
  },
}))
