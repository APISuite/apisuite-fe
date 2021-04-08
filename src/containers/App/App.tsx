import * as React from 'react'
import { useLocation } from 'react-router-dom'
import InformDialog from 'components/InformDialog'
import NotificationStack from 'containers/NotificationStack'
import routes from './routes'
import { AppProps } from './types'
import useStyles from './styles'
import CookiesBanner from 'components/CookiesBanner'

const App: React.FC<AppProps> = ({
  auth,
  getProfile,
  loginUser,
}) => {
  const classes = useStyles()
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  React.useEffect(function initOnce () {
    if (auth.authToken && !auth.user) {
      loginUser({ token: auth.authToken })
    }
  }, [auth.authToken, auth.user, loginUser])

  React.useEffect(() => {
    if (auth.user) {
      getProfile()
    }
  }, [auth.user, getProfile])

  return (
    <div className={classes.root}>
      {routes()}
      <CookiesBanner />
      <InformDialog />
      <NotificationStack />
    </div>
  )
}

export default App
