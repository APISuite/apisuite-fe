
import * as React from 'react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Carousel from 'components/Carousel'
import Wheel from 'components/ApiSuiteWheel'
import SvgIcon from 'components/SvgIcon'
import Panel from 'components/Panel'

import useStyles from './styles'
import { slidesConfig, featuresLeftConfig, featuresRightConfig, otherLeftConfig, otherRightConfig } from './config'
import partnersUrl from 'assets/partners.png'

const Sandbox: React.FC<{}> = () => {
  const classes = useStyles()
  const [t] = useTranslation()

  return (
    <main className={classes.root}>
      <section className={classes.section}>
        <Carousel autoplay interval={8000}>
          {slidesConfig.map((slide) => (
            <div key={slide.key} className={classes.slide}>
              <img className={classes.slideImage} src={slide.imgUrl} alt='' />

              <div className={classes.spacer} />

              <section className={classes.slideInfo}>
                <h1 className={classes.slideInfoH1}>{slide.title}</h1>

                <p className={classes.slideInfoParagraph} dangerouslySetInnerHTML={{ __html: slide.p1 }} />

                {slide.p2 && (
                  <p
                    className={classes.slideInfoParagraph}
                    dangerouslySetInnerHTML={{ __html: slide.p2 }}
                  />
                )}

                <div
                  role='button'
                  arial-label='register'
                  className={clsx(classes.btn, {
                    [classes.btn2]: slide.btn === 2,
                    [classes.btn3]: slide.btn === 3,
                  })}
                >
                  {slide.btnStr}
                </div>
              </section>
            </div>
          ))}
        </Carousel>
      </section>

      <br /><br /><br /><br />

      <Panel>
        <div className={classes.cardContent}>
          <h1 className={classes.featuresTitle}>Sandbox Features</h1>

          <p className={classes.featuresDesc}>
            Focus on your product. No matter where you are, from ideation to POC design,
             assign all your resources to the creative process!
          </p>
        </div>

        <div className={classes.listContainer}>
          <List className={classes.list}>
            {featuresLeftConfig.map((item) => (
              <ListItem key={item.key}>
                <ListItemAvatar>
                  <Avatar className={classes.featureAvatar}>
                    <SvgIcon name={item.icon} color='white' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={t(item.title)} secondary={t(item.desc)} />
              </ListItem>
            ))}
          </List>

          <List className={classes.list}>
            {featuresRightConfig.map((item) => (
              <ListItem key={item.key}>
                <ListItemAvatar>
                  <Avatar className={classes.featureAvatar}>
                    <SvgIcon name={item.icon} color='white' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={item.desc} />
              </ListItem>
            ))}
          </List>
        </div>

        <div className={classes.cardContent}>
          <h1 className={clsx(classes.featuresTitle, classes.otherTitle)}>Other Treats</h1>

          <p className={classes.featuresDesc}>And there are even more cool features under the hood…</p>
        </div>

        <div className={classes.listContainer}>
          <List className={classes.list}>
            {otherLeftConfig.map((item) => (
              <ListItem key={item.key}>
                <ListItemAvatar>
                  <Avatar className={classes.otherAvatar}>
                    <SvgIcon name={item.icon} color='white' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={item.desc} />
              </ListItem>
            ))}
          </List>

          <List className={classes.list}>
            {otherRightConfig.map((item) => (
              <ListItem key={item.key}>
                <ListItemAvatar>
                  <Avatar className={classes.otherAvatar}>
                    <SvgIcon name={item.icon} color='white' />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.title} secondary={item.desc} />
              </ListItem>
            ))}
          </List>
        </div>

        <br />
      </Panel>

      <br /><br /><br />

      <section className={classes.stepsContainer}>
        <Panel>
          <div className={classes.steps}>
            <div className={clsx(classes.step, classes.stepDivider)}>
              <h1 style={{ color: '#1BDF33' }}>1</h1>
              <h3 style={{ color: '#37E34D' }}>Add your app</h3>
              <p>You’ll need an app to send and recieve API calls.</p>
              <p>Adding your app details will help us enabling this flow.</p>

              <div className={classes.spacer} />

              <Button
                className={classes.stepBtn}
                variant='outlined'
                disabled
              >
                Add app
              </Button>
            </div>

            <div className={clsx(classes.step, classes.stepDivider)}>
              <h1 style={{ color: '#37E34D' }}>2</h1>
              <h3 style={{ color: '#14BC7D' }}>Select an API</h3>
              <p>
                In the “Subscriptions” section,
                 we provide an overview of our available Sandbox API’s your apps can subscribe to.
              </p>

              <div className={classes.spacer} />

              <Button
                className={classes.stepBtn}
                variant='outlined'
                disabled
              >
                Subscribe to API
              </Button>
            </div>

            <div className={classes.step}>
              <h1 style={{ color: '#43BEC1' }}>3</h1>
              <h3 style={{ color: '#43BEC1' }}>Get Started</h3>
              <p>
                Once your app and API subscriptions are all ready to go,
                 head to our “Getting Started” documentation for lift-off.
              </p>

              <div className={classes.spacer} />

              <Button
                className={classes.stepBtn}
                variant='outlined'
                disabled
              >
                Documentation
              </Button>
            </div>
          </div>
        </Panel>

        <aside className={classes.stepSide}>
          <h1>Dive into the Sandbox</h1>
          <p>
            Our example API Products let you use emulated customer
             data to test and enhance your digital products against.
          </p>

          <p>
            Not sure how to get there? The <a href='#'>onboarding documentation</a> will help you along.
          </p>

          <div
            role='button'
            arial-label='register'
            className={classes.btn}
            style={{ backgroundColor: '#333333', color: 'white', marginTop: 16 }}
          >
            Register
          </div>
        </aside>
      </section>

      <br /><br /><br />

      <Panel>
        <div className={classes.partnersContainer}>
          <h1 className={classes.partnersTitle}>Cloudoki customers & partners</h1>
          <img src={partnersUrl} alt='partners' className={classes.partnersImg} />
          <p className={classes.partnersLink}>View more on <a href='https://cloudoki.com'>cloudoki.com</a></p>
        </div>
      </Panel>

      <br /><br /><br />

      <section className={classes.subscribeContainer}>
        <div className={classes.wheelContainer}>
          <Wheel selected='br' />
        </div>

        <div className={classes.emailContainer}>
          <h1>Fly with us</h1>
          <p>Subscribe to our newsletter to keep up with updates, events and more.</p>

          <form noValidate autoComplete='off'>
            <div className={classes.email}>
              <TextField
                placeholder='E-mail address'
                variant='outlined'
                margin='dense'
                type='email'
                fullWidth
                InputProps={{
                  classes: { input: classes.emailTextfield },
                }}
              />

              <div
                role='button'
                arial-label='register'
                className={classes.btn}
                style={{ backgroundColor: '#2DB7BA', color: '#333333', marginLeft: 12, maxHeight: 40 }}
              >
                Subscribe
              </div>
            </div>

            <br />

            <FormGroup row>
              <FormControlLabel
                classes={{ label: classes.checkBoxLabel }}

                label={
                  <>
                    I agree that Cloudoki sends me newsletters about API related news. I can withdraw my consent at any
                     time by sending an e-mail to <Link href='#'>unsubscribe@cloudoki.com</Link>.
                      For further information please see out <Link href='#'>Data Privacy Notice.</Link>
                  </>
                }
                control={
                  <Checkbox
                    checked={false}
                    color='primary'
                    classes={{ root: classes.checkbox }}
                  />
                }
              />
            </FormGroup>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Sandbox
