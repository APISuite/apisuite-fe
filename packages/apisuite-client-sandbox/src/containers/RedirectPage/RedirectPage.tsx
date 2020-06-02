import * as React from 'react'
import { RedirectPageProps } from './types'
import { useQuery } from 'util/useQuery'
import { Redirect } from 'react-router-dom'

const RedirectPage: React.FC<RedirectPageProps> = ({ confirmRegistration }) => {
  const query = useQuery()
  const token = query.get('token')

  React.useEffect(() => {
    if (token) confirmRegistration(token)
  }, [confirmRegistration])

  return <Redirect to='/auth/login' />
}

export default RedirectPage
