/**
 * HOC that authorizes users based on their role
 * and the component required role
 * @module Auth
 */

import React, { Component } from 'react'
import { object, bool, func, string } from 'prop-types'
import { USER_ROLES } from 'constants/global'

export class RequireAuth extends Component {
  state = {
    isAuthorized: false,
  }

  UNSAFE_componentWillMount () {
    const { user, isAuthorizing, isLoggingIn } = this.props
    this.checkAuth(USER_ROLES.indexOf(user.role), isAuthorizing, isLoggingIn)
  }

  UNSAFE_componentWillReceiveProps (nextprops) {
    const { user, isAuthorizing, isLoggingIn } = nextprops
    this.checkAuth(USER_ROLES.indexOf(user.role), isAuthorizing, isLoggingIn)
  }

  /**
   * Matches the user authorization level with the component required level
   * and show the component authorized or redirects to login otherwise.
   * It also waits if the `isAuthorizing` flag is true.
   *
   * @param {number} userLevel - The current user level to be match with the Component required level
   * @param {boolean} isAuthorizing - Flag used to perform no action until athorization is resolved
   */
  checkAuth (userLevel, isAuthorizing, isLoggingIn) {
    const { roleRequired, ui } = this.props
    const requiredLevel = USER_ROLES.indexOf(roleRequired)

    if (userLevel >= requiredLevel) {
      return this.setState({ isAuthorized: true })
    } else if (!isAuthorizing) {
      if (!ui.showLoginModal && !isLoggingIn) {
        this.props.openLoginModal(true)
      }
    }
  }

  render () {
    const { Component, roleRequired, isAuthorizing, ...rest } = this.props
    return (this.state.isAuthorized && <Component {...rest} />)
  }
}

RequireAuth.propTypes = {
  /**
   * Browser history stack
   */
  history: object.isRequired,
  /**
   * The navigation state
   */
  location: object.isRequired,
  /**
   * The UI state for auth
   */
  ui: object.isRequired,
  /**
   * The user object
   */
  user: object.isRequired,
  /**
   * Flag that tells an authorization is been asked
   */
  isAuthorizing: bool.isRequired,
  /**
   * Flag that tells if we're in the login process
   */
  isLoggingIn: bool.isRequired,
  /**
   * The Component to be wrapped
   */
  Component: func.isRequired,
  /**
   * The role required to show the wrapped Component
   */
  roleRequired: string.isRequired,
  /**
   * Open Login modal action
   */
  openLoginModal: func.isRequired,
}

export default RequireAuth