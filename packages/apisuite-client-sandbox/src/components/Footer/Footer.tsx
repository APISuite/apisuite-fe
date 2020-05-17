import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import Fab from '@material-ui/core/Fab'
import { useTheme } from '@material-ui/core/styles'
import theme from 'theme'
import LocaleSelect from 'language/LocaleSelect'

import './styles.scss'

const Footer = () => {
  const theme: Theme = useTheme()

  function handleFabClick () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='logo-container'>
          <img src={theme.images.footerLogo} alt='logo' className='logo' />
          <p>{'© 2020 APISuite\nAll rights reserved.\nProudly made in Europe.'}</p>

          <div className='icons-container'>
            <a href='https://cloudoki.com' target='_blank' rel='noopener noreferrer'>
              <SvgIcon size={24} name='earth' />
            </a>
            <a href='https://twitter.com/TeamCloudoki' target='_blank' rel='noopener noreferrer'>
              <SvgIcon size={24} name='twitter' />
            </a>
            <a href='https://www.facebook.com/cloudokiTeam/' target='_blank' rel='noopener noreferrer'>
              <SvgIcon size={24} name='facebook' />
            </a>
            <a href='https://github.com/Cloudoki' target='_blank' rel='noopener noreferrer'>
              <SvgIcon size={24} name='github-face' />
            </a>
          </div>

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
