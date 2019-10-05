import * as React from 'react'

import logoUrl from 'assets/logo-blue.png'

import './styles.scss'
import SvgIcon from 'components/SvgIcon'

const Footer = () => (
  <footer className='footer'>
    <div className='container'>
      <div className='logo-container'>
        <img src={logoUrl} alt='logo' className='logo' />
        <p>© Cloudoki 2019.</p>
        <p>All rights reserved.</p>
        <p>Proudly made in Europe</p>
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
      </div>

      <div className='sections-container'>
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

export default Footer
