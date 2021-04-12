import * as React from 'react'
import { RedirectPageProps } from './types'
import { useQuery } from 'util/useQuery'
import { Redirect } from 'react-router-dom'
import { useParams } from 'react-router'

const RedirectPage: React.FC<RedirectPageProps> = ({
  confirmRegistration,
  confirmInvite,
}) => {
  const query = useQuery()
  const token = query.get('token')
  const redirect = useParams<{redirect: 'invite' | 'registration' | 'password'}>().redirect

  React.useEffect(() => {
    if (token && redirect === 'registration') confirmRegistration(token)
    if (token && redirect === 'invite') confirmInvite(token)
  }, [confirmRegistration, confirmInvite])

  switch (redirect) {
    case 'registration':
      return <Redirect to='/auth/login' />

    case 'invite':
      return <Redirect to='/dashboard/team' />

    case 'password':
      return (
        <Redirect to={{
          pathname: '/forgot',
          state: {
            stage: 'recover',
            token: token,
          },
        }}
        />
      )

    default:
      return <Redirect to='/' />
  }
}

export default RedirectPage
