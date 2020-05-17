import * as React from 'react'
import requireImage from 'util/requireImage'
import SvgIcon from 'components/SvgIcon'
import Panel from 'components/Panel'
import sandboxBg from 'theme/images/sandbox_bg.png'

import useStyles from './styles'
import { LandingPageProps } from './types'

const borderStyle = '1px solid #EAEAEA'

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  const classes = useStyles()
  const fname = user ? user.fName : ''

  return (
    <main className={classes.root} style={{ backgroundImage: `url(${sandboxBg})` }}>
      <section className={classes.section}>
        <div className={classes.steps}>
          <div className={classes.step}>
            <h1>1</h1>
            <SvgIcon
              name='chevron-right-circle'
              size={32}
              color='white'
              style={{ position: 'absolute', top: 0, left: 0, transform: 'translate3d(170px, 105px, 0)' }}
            />
            <h3 style={{ fontWeight: 'bold' }}>Add your app</h3>
            <p>You’ll need a client app identity to send and receive API calls.</p>
          </div>

          <div style={{ marginLeft: 80, marginRight: 80 }} className={classes.step}>
            <h1 style={{ opacity: 0.5 }}>2</h1>
            <h3>Assign APIs</h3>
            <p>Subscribe to tinker worry-free with our Sandbox API’s.</p>
          </div>

          <div className={classes.step}>
            <h1 style={{ opacity: 0.5 }}>3</h1>
            <h3>Start testing</h3>
            <p>Try out how your app interacts with the test users.</p>
          </div>
        </div>
      </section>

      <br /><br /><br />

      <section className={classes.cardContainer}>
        <Panel>
          <div className={classes.cardRow}>
            <div className={classes.cardItem} style={{ borderRight: borderStyle, borderBottom: borderStyle }}>
              <img src={requireImage('landing-card-1.png')} />
              <p>Client Applications</p>
            </div>
            <div className={classes.cardItem} style={{ borderBottom: borderStyle }}>
              <img src={requireImage('landing-card-2.png')} />
              <p>Subscriptions</p>
            </div>
          </div>

          <div className={classes.cardRow}>
            <div className={classes.cardItem} style={{ borderRight: borderStyle }}>
              <img src={requireImage('landing-card-3.png')} />
              <p style={{ marginTop: 0 }}>Test Data</p>
            </div>
            <div className={classes.cardItem}>
              <img src={requireImage('landing-card-4.png')} />
              <p>Documentation</p>
            </div>
          </div>
        </Panel>

        <aside className={classes.cardSide}>
          <h1>Hi, {fname}</h1>
          <p>
          You’re at the right place if you want to set up a new app,
           get insights through analytics or follow up API subscriptions.
          </p>

          <p>Don’t find what you’re looking for? Let us know, we’re happy to accomodate!</p>

          {/* <div
            role='button'
            arial-label='register'
            className={classes.btn}
            style={{ backgroundColor: '#333333', color: 'white', marginTop: 16 }}
          >
            Propose Feature
          </div> */}
        </aside>
      </section>

      <br /><br /><br />
      <br /><br /><br />
    </main>
  )
}

export default LandingPage
