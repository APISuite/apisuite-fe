import React from 'react'
import qs from 'qs'
import { useHistory, useParams } from 'react-router'
import { useConfig, useTranslation } from '@apisuite/fe-base'
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'

import { decodeBase64 } from 'util/decodeBase64'

import InvitationForm from 'components/InvitationForm'
import { SignInForm } from 'components/SignInForm'
import { SignUpForm } from 'components/SignUpForm'

import useStyles from './styles'
import { View } from './types'
import { useSelector } from 'react-redux'
import { signInOrUpSelector } from './selector'

export const SignInOrUp: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const [t] = useTranslation()
  const { auth, invitation } = useSelector(signInOrUpSelector)
  const { ownerInfo, portalName, sso } = useConfig()

  const { view: viewParameter, email: emailParameter } = useParams<{ view: string; email: string }>()

  const [usingSSO, setSSO] = React.useState(false)
  const checkView = (): View => {
    if (viewParameter === 'signup') return 'signup'
    if (viewParameter === 'invitation') return 'invitation'
    return 'signin'
  }

  const [view, setView] = React.useState<View>(checkView())

  const changeView = (viewToDisplay: View) => {
    history.push(viewToDisplay)

    setView(viewToDisplay)
  }

  React.useEffect(() => {
    const invitationToken = qs.parse(window.location.search.slice(1)).token || undefined
    if (view === 'invitation' && sso?.length && invitationToken) {
      setSSO(true)
    }
    if (usingSSO) {
      setSSO(false)
    }
  }, [sso])

  const renderRegisterInvitationOption = () => {
    if (auth.authToken) {
      return <option className={view === 'invitation' ? classes.selectedOption : classes.notSelectedOption} onClick={() => changeView('invitation')}>{t('login.invitationBtn')}</option>
    }
    return <option className={view === 'invitation' ? classes.selectedOption : classes.notSelectedOption} onClick={() => changeView('invitation')}>{t('login.invitationSignInBtn')}</option>
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
            {t(view === 'invitation' ? 'signInOrUpView.welcomeSubtitleInvitation' : 'signInOrUpView.welcomeSubtitle', { org: invitation?.invitation?.organization || 'Unknown' })}
          </p>

          <div>
            <div className={classes.selector}>
              {view === 'invitation' ? renderRegisterInvitationOption() : null}
              {
                view !== 'invitation' &&
                <>
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
                </>
              }
            </div>

            <div className={classes.form}>
              {view === 'signin' && <SignInForm />}
              {/* @ts-ignore */}
              {view === 'signup' && <SignUpForm prefilledEmail={decodeBase64(emailParameter)} />}
              {view === 'invitation' && <InvitationForm isLogged={!!auth.authToken} sso={sso} />}
            </div>
            {/* <div className={classes.formFooter}>
              {(view === 'invitation' && !auth.authToken) && <div>Sign Up</div>}
            </div> */}
          </div>
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  )
}
