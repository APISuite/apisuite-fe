import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import NotificationStack from 'containers/NotificationStack'
import routes from './routes'
import useStyles from './styles'
import CookiesBanner from 'components/CookiesBanner'
import { authActions } from 'containers/Auth/ducks'
import { authSelector } from './selector'
import { getProfileActions } from 'containers/Profile/ducks'

export const App: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { pathname } = useLocation()
  const auth = useSelector(authSelector)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(function initOnce () {
    if (auth.authToken && !auth.user) {
      dispatch(authActions.loginUser({ token: auth.authToken }))
    }
  }, [auth.authToken, auth.user, dispatch])

  useEffect(() => {
    if (auth.user) {
      dispatch(getProfileActions.request())
    }
  }, [auth.user, dispatch])

  return (
    <div className={classes.root}>
      {routes()}
      <CookiesBanner />
      <NotificationStack />
    </div>
  )
}
