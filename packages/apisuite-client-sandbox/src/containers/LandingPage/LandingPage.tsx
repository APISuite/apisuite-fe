import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import Panel from 'components/Panel'
import sandboxBg from 'theme/images/sandbox_bg.png'
import documentation from 'assets/documentation-feature.svg'
import subscriptions from 'assets/subscriptions-feature.svg'
import application from 'assets/application-feature.svg'
import testdata from 'assets/test-data-feature.svg'
import Avatar from '@material-ui/core/Avatar'
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
        <aside className={classes.cardSide}>
          <h1>Hey there, {fname}</h1>
          <p>
          You’re at the right place if you want to set up a new app,
           get insights through analytics or follow up API subscriptions.
          </p>

          {/* <p>Don’t find what you’re looking for? Let us know, we’re happy to accomodate!</p> */}

          {/* <div
            role='button'
            arial-label='register'
            className={classes.btn}
            style={{ backgroundColor: '#333333', color: 'white', marginTop: 16 }}
          >
            Propose Feature
          </div> */}
        </aside>
        <Panel>
          <div className={classes.cardRow}>
            <div className={classes.cardItem} style={{ borderRight: borderStyle, borderBottom: borderStyle }}>
              <Avatar className={classes.featureAvatar}>
                <img src={application}/>
              </Avatar>
              <p>Client Applications</p>
            </div>
            <div className={classes.cardItem} style={{ borderBottom: borderStyle }}>
              <Avatar className={classes.featureAvatar}>
                <img src={subscriptions}/>
              </Avatar>
              <p>Subscriptions</p>
            </div>
          </div>

          <div className={classes.cardRow}>
            <div className={classes.cardItem} style={{ borderRight: borderStyle }}>
              <Avatar className={classes.featureAvatar}>
                <img src={testdata}/>
              </Avatar>
              <p>Test Data</p>
            </div>
            <div className={classes.cardItem}>
              <Avatar className={classes.featureAvatar}>
                <img src={documentation}/>
              </Avatar>
              <p>Documentation</p>
            </div>
          </div>
        </Panel>
      </section>

      <br /><br /><br />
      <br /><br /><br />
    </main>
  )
}

export default LandingPage
