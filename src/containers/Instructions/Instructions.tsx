import React from 'react'
import { useConfig, useTranslation, useTheme } from '@apisuite/fe-base'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import NavMenu from 'components/NavMenu'
import useStyles from './styles'

SyntaxHighlighter.registerLanguage('bash', bash)

const Instructions: React.FC<{}> = () => {
  const { palette } = useTheme()
  const { infra } = useConfig()
  const classes = useStyles()

  const [t] = useTranslation()

  const steps = [
    {
      stepTitle: t('dashboardTab.testSubTab.instructions.stepOne.stepTitle'),
      stepText: t('dashboardTab.testSubTab.instructions.stepOne.stepText'),
      stepNote: t('dashboardTab.testSubTab.instructions.stepOne.stepNote'),
      command: `curl -X POST \\
-H "Host: ${infra.hydra}" \\
-H "Content-Type: application/x-www-form-urlencoded" \\
-u "{ClientID}:{ClientSecret}" \\
--data-urlencode "grant_type=client_credentials" \\
--data-urlencode "" \\
https://${infra.hydra}/oauth2/token`,
    },
    {
      stepTitle: t('dashboardTab.testSubTab.instructions.stepTwo.stepTitle'),
      stepText: t('dashboardTab.testSubTab.instructions.stepTwo.stepText'),
      stepNote: t('dashboardTab.testSubTab.instructions.stepOne.stepNote'),
      command: `curl -X POST \\
-H "Accept: application/json" \\
-H "Content-Type: application/json" \\
-H "Authorization: Bearer {TOKEN}" \\
-d '{"name": "Jack Daniels", "desc": "My cat", "tag": "cat"}' \\
https://${infra.remoteAPI}/v1/pets`,
    },
    {
      stepTitle: t('dashboardTab.testSubTab.instructions.stepThree.stepTitle'),
      stepText: t('dashboardTab.testSubTab.instructions.stepThree.stepText'),
      stepNote: t('dashboardTab.testSubTab.instructions.stepThree.stepNote'),
      response: t('dashboardTab.testSubTab.instructions.stepThree.response'),
      responseCode: t('dashboardTab.testSubTab.instructions.stepThree.responseCode'),
      command: `curl -X GET \\
-H "Authorization: Bearer {TOKEN}" \\
https://${infra.remoteAPI}/v1/pets`,
    },
  ]

  const codeStyle = {
    'hljs-string': {
      'color': palette.secondary.main,
    },

    'hljs-symbol': {
      'color': palette.secondary.main,
    },

    'hljs-bullet': {
      'color': palette.secondary.main,
    },

    'hljs-addition': {
      'color': palette.secondary.main,
    },

    'hljs': {
      background: palette.text.primary,
      color: '#D8D8D8',
      display: 'block',
      fontFamily: 'Roboto, sans-serif',
      fontSize: 14,
      marginTop: 0,
      overflowX: 'auto',
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 0,
    },

    'hljs-emphasis': {
      fontStyle: 'italic',
    },

    'hljs-strong': {
      fontWeight: 'bold',
    },
  }

  return (
    <div className={`page-container ${classes.root}`}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('dashboardTab.testSubTab.title')}</h1>

        <div className={classes.mainContainer}>
          <div className={classes.content}>
            <p className={classes.description}>
              {t('dashboardTab.testSubTab.description')}
            </p>

            {
              steps.map((step, index) => (
                <div key={index} className={classes.stepContainer}>
                  <h2
                    id={`step-${index + 1}`}
                    className={classes.stepTitle}
                  >
                    {t('dashboardTab.testSubTab.stepIntro')} {index + 1}: {step.stepTitle}
                  </h2>

                  <p className={classes.description}>
                    {step.stepText}
                  </p>

                  {
                    step.stepNote.length > 0 &&
                    <div className={classes.noteContainer}>
                      <div className={classes.noteContent}>
                        <div className={classes.noteTitle}>Note</div>
                        <div className={classes.note}>{step.stepNote}</div>
                      </div>
                    </div>
                  }

                  <div className={classes.iconRow}>
                    <FileCopyOutlinedIcon
                      className={classes.clipboardIcon}
                      onClick={() => { navigator.clipboard.writeText(step.command) }}
                    />
                  </div>

                  <SyntaxHighlighter
                    language='bash'
                    style={codeStyle}
                    className={classes.codeBlock}
                  >
                    {step.command}
                  </SyntaxHighlighter>

                  {
                    step.response &&
                    <>
                      <p className={classes.description}>
                        {step.response}
                      </p>

                      <div className={classes.iconRow}>
                        <FileCopyOutlinedIcon
                          className={classes.clipboardIcon}
                          onClick={() => { navigator.clipboard.writeText(step.responseCode) }}
                        />
                      </div>

                      <SyntaxHighlighter
                        language='bash'
                        style={codeStyle}
                        className={classes.codeBlock}
                      >
                        {step.responseCode}
                      </SyntaxHighlighter>
                    </>
                  }
                </div>
              ))
            }

            <h2 className={classes.stepTitle}>
              {t('dashboardTab.testSubTab.finalRemarksPartOne')}
            </h2>

            <p className={classes.description}>
              {t('dashboardTab.testSubTab.finalRemarksPartTwo')}
            </p>
          </div>

          <div className={classes.navigation}>
            <div className={classes.sideMenuContainer}>
              <NavMenu
                options={steps.map((step, index) => (
                  `${t('dashboardTab.testSubTab.stepIntro')} ${index + 1}: ${step.stepTitle}`
                ))}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Instructions
