import * as React from 'react'
import { RequireAuthProps } from './types'
import { Redirect } from 'react-router'

export const RequireAuth: React.FC<RequireAuthProps> = ({ component: Component, user, ...rest }) => (
  user ? <Component {...rest} /> : <Redirect to='/login' />
)
