import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import Fab from '@material-ui/core/Fab'
import LocaleSelect from 'language/LocaleSelect'
import { config } from 'constants/global'
import logo from 'theme/images/logo.png'

import './styles.scss'

const renderSocialLinks = () => {
  const social = config.social
  if (!social) {
    return null
  }

  return (
    <div className='icons-container'>
      {social.web &&
        <a href={social.web} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='earth' />
        </a>}
      {social.twitter &&
        <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='twitter' />
        </a>}
      {social.facebook &&
        <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='facebook' />
        </a>}
      {social.github &&
        <a href={social.github} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='github-face' />
        </a>}
    </div>
  )
}

const Footer = () => {
  function handleFabClick () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='logo-container'>
          <img src={logo} alt='logo' className='logo' />
          <p>{config.footer.copyright}</p>

          {renderSocialLinks()}
          <LocaleSelect />
        </div>

        <div className='sections-container'>
          <div className='fab-container'>
            <Fab size='small' onClick={handleFabClick}>
              <SvgIcon name='chevron-up' size={24} />
            </Fab>
          </div>

          <div className='section'>
            <div className='sub-section'>
              <h3>API Products</h3>
              <p>Upcoming</p>
              <p>Feedback</p>
              <p>Subscriptions</p>
            </div>

            <div className='sub-section'>
              <h3>Profile</h3>
              <p>Security</p>
              <p>Logout</p>
            </div>
          </div>

          <div className='section'>
            <div className='sub-section'>
              <h3>Documentation</h3>
              <p>Getting Started</p>
              <p>API References</p>
              <p>Search</p>
            </div>

            <div className='sub-section'>
              <h3>Team</h3>
              <p>Manage Team</p>
              <p>Organisation</p>
            </div>
          </div>

          <div className='section'>
            <div className='sub-section'>
              <h3>Dashboard</h3>
              <p>Manage Apps</p>
              <p>Test Data</p>
              <p>API Console</p>
            </div>

            <div className='sub-section'>
              <h3>Legal Notice</h3>
              <p>Data Privacy Notice</p>
              <p>Cookies policy</p>
            </div>
          </div>

          <div className='section'>
            <div className='sub-section'>
              <h3>Support</h3>
              <p>Knowledge Base</p>
              <p>External resources</p>
              <br />
            </div>

            <div className='sub-section'>
              <h3>API Status</h3>
              <p>Activity Log</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
