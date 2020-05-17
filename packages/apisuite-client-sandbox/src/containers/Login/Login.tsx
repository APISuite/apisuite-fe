import * as React from 'react'
import LoginPortal from 'components/LoginPortal'
import RegisterPortal from 'components/RegisterPortal'
import classnames from 'classnames'
import requireImage from 'util/requireImage'
import { View } from './types'
import useStyles from './styles'

const Login: React.FC<{match: any; register: any}> = ({ match, register }) => {
  const view = match.params.view
  const encodedEmail = match.params.email
  const [authView, setAuthView] = React.useState<View>(view === 'register' ? 'register' : 'login')
  const [justRegistered, setJustRegistered] = React.useState(false)
  const [isRedirected, setRedirected] = React.useState(false)
  const classes = useStyles()

  function handleViewChange (view: string) {
    switch (view) {
      case 'login':
        setAuthView(view)
        break
      case 'register':
        setAuthView(view)
        break
      default:
        setAuthView('login')
    }
    setJustRegistered(false)
  }

  React.useEffect(() => {
    if (register.isRegistered) {
      handleViewChange('login')
      setJustRegistered(true)

      setTimeout(() => {
        setJustRegistered(false)
      }, 2000)
    }

    if (match.params.email && !isRedirected) {
      handleViewChange('register')
      setRedirected(true)
    }
  }, [register.isRegistered])

  const defaultEmail = () => {
    try {
      return atob(encodedEmail)
    } catch {
      return ''
    }
  }

  return (
    <div className={classes.authPage}>
      <div className={classes.authLeftWrapper} />
      <div className={classes.contentWrapper}>
        <div className={classes.authContentLeft}>
          <div className={classes.authContentStripe} />
          <div className={classes.authFormsWrapper}>
            <h1>Welcome</h1>
            <div className='subtitle'>Please feel free to login or register, it's completely free!</div>
            <div className={classes.authBlock}>
              <div className={classes.authSelector}>
                <div className={classnames({ [classes.authSelectorSelected]: authView === 'login' })} onClick={() => handleViewChange('login')}>Login</div>
                <div className={classnames({ [classes.authSelectorSelected]: authView === 'register' })} onClick={() => handleViewChange('register')}>Register</div>
              </div>
              <div className='auth-form'>
                {authView === 'login' &&
                  <LoginPortal />}
                {authView === 'register' &&
                  <RegisterPortal defaultEmail={defaultEmail()} />}
                {justRegistered &&
                  <div className={classes.userCreatedFeedback}>
                    Your account is created, {register.user}!
                  </div>}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.authContentRight}>
          {authView === 'login' &&
            <img src={requireImage('woman_login.svg')} />}
          {authView === 'register' &&
            <img src={requireImage('woman_register.svg')} />}
        </div>
      </div>
      <div className={classes.authRightWrapper} />
    </div>
  )
}

export default Login
