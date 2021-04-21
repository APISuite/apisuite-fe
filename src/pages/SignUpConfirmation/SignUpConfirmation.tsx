import React from 'react'
import { useConfig, useTranslation } from '@apisuite/fe-base'
import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded'
import InfoRoundedIcon from '@material-ui/icons/InfoRounded'

import useStyles from './styles'
import { SignUpConfirmationProps } from './types'

const SignUpConfirmation: React.FC<SignUpConfirmationProps> = ({
  history,
  nextStep,
  register,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const { ownerInfo, portalName } = useConfig()

  /* Once this component renders (which means that we've reached the end of our registration process),
  we dispatch a 'NEXT_STEP' type of action so as to reset the 'steps' property of our app's store back to 1. */
  React.useEffect(() => {
    nextStep({})
  }, [nextStep])

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
        <div className={classes.signUpCompleteSideContentContainer}>
          <h1 className={classes.signUpCompleteSideTitle}>
            {t('signUpConfirmation.titleText')}
            {register.previousData.personal.name}!
          </h1>

          <p className={classes.signUpCompleteSideSubtitle}>
            <>{t('signUpConfirmation.subtitleTextPartOne')}</>
            <span className={classes.signUpCompleteSideSubtitleBoldPart}>
              {t('signUpConfirmation.subtitleTextPartTwo')}
            </span>
            <>{t('signUpConfirmation.subtitleTextPartThree')}</>
          </p>

          <div className={classes.infoBox}>
            <InfoRoundedIcon className={classes.infoBoxIcon} />

            <div>
              <p className={classes.infoBoxText}>
                {t('signUpConfirmation.infoBoxText')}
              </p>
            </div>
          </div>
        </div>

        <div className={classes.imageSideContentContainer} />
      </section>
    </main>
  )
}

export default SignUpConfirmation
