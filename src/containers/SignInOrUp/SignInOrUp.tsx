import React from 'react'
import { useParams } from 'react-router'
import { useConfig, useTranslation } from '@apisuite/fe-base'
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import { decodeBase64 } from 'util/decodeBase64'
import SignInForm from 'components/SignInForm'
import SignUpForm from 'components/SignUpForm'

import useStyles from './styles'
import { SignInOrUpProps, View } from './types'

const SignInOrUp: React.FC<SignInOrUpProps> = ({
  history,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const { ownerInfo, portalName } = useConfig()

  const { view: viewParameter, email: emailParameter } = useParams<{ view: string; email: string }>()

  const [view, setView] = React.useState<View>(viewParameter === 'signup' ? 'signup' : 'signin')

  const changeView = (viewToDisplay: View) => {
    history.push(viewToDisplay)

    setView(viewToDisplay)
  }

  return (
    <main className={classes.mainContainer}>
      <header className={classes.headerContainer}>
        <div
          className={classes.logoAndNameContainer}
          onClick={() => history.push('/')}
        >
          {
            ownerInfo.logo
              ? (
                <img
                  className={classes.imageLogo}
                  src={ownerInfo.logo}
                />
              )
              : (
                <AmpStoriesRoundedIcon
                  className={classes.iconLogo}
                />
              )
          }

          <h3 className={classes.portalName}>
            {portalName}
          </h3>
        </div>

        <div
          className={classes.closeButtonContainer}
          onClick={() => history.push('/')}
        >
          <p>
            {t('signInOrUpView.closeButtonLabel')}
          </p>
          <CloseRoundedIcon />
        </div>
      </header>

      <section className={classes.pageContentContainer}>
        <div className={classes.formSideContentContainer}>
          <h1 className={classes.formSideTitle}>
            {t('signInOrUpView.welcomeTitle')}
          </h1>
          <p className={classes.formSideSubtitle}>
            {t('signInOrUpView.welcomeSubtitle')}
          </p>

          <div>
            <div className={classes.selector}>
              <option
                className={
                  view === 'signin'
                    ? classes.selectedOption
                    : classes.notSelectedOption
                }
                onClick={() => changeView('signin')}
              >
                {t('signInOrUpView.options.signIn')}
              </option>

              <option
                className={
                  view === 'signup'
                    ? classes.selectedOption
                    : classes.notSelectedOption
                }
                onClick={() => changeView('signup')}
              >
                {t('signInOrUpView.options.signUp')}
              </option>
            </div>

            <div className={classes.form}>
              {
                view === 'signin'
                  ? <SignInForm history={history} />
                  // @ts-ignore
                  : <SignUpForm preFilledEmail={decodeBase64(emailParameter)} />
              }
            </div>
          </div>
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  )
}

export default SignInOrUp
