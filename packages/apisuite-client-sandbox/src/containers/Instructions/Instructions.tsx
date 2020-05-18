import * as React from 'react'
import useStyles, { codeStyle } from './styles'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import NavMenu from 'components/NavMenu'
import { config } from 'constants/global'

SyntaxHighlighter.registerLanguage('bash', bash)

const Instructions: React.FC<{}> = () => {
  const classes = useStyles()
  const steps = [
    {
      stepTitle: 'Get the App\'s token',
      instruction: 'We begin by retrieving a unique token ID. We will use this token in the following requests so the API can verify your identity. Make a POST request with the parameters as shown below. Replace the variables with the Client ID and Client Secret of one of your Apps.',
      note: 'Manage and see each of your Apps\' details by navigating to the \'Client Applications\' tab. You can find the Client ID and Client Secret under the "Access Details" section on the App\'s page.',
      command: `curl -X POST \\
    -H "Host: ${config.infra.hydra}" \\
    -H "Content-Type: application/x-www-form-urlencoded" \\
    -u "{ClientID}:{ClientSecret}" \\
    --data-urlencode "grant_type=client_credentials" \\
    --data-urlencode "scope=sandbox" \\
    https://${config.infra.hydra}/oauth2/token`,
    },
    {
      stepTitle: 'Upload data to your Sandbox',
      instruction: 'Let\'s upload some data to the Sandbox by making another POST request with a JSON containing our Cat\'s Jack data.',
      note: '',
      command: `curl -X POST \\
    -H "Accept: application/json" \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer {TOKEN}" \\
    -H "Host: ${config.infra.sandbox}" \\
    -d '{"name":"Jack Daniels","desc":"My cat","tag":"cat"}' \\
    https://${config.infra.sandbox}/v1/pets`,
    },
    {
      stepTitle: 'Fetching data from the Sandbox',
      instruction: 'Now we can test the API using a simplet GET request to retrieve some data.',
      response: 'The response should look like this: ',
      responseCode: '[{\n  "desc":"My cat",\n  "name":"Jack Daniels",\n  "tag":"cat",\n  "id":11582904187752\n}]',
      note: '',
      command: `curl -X GET \\
    -H "Authorization: Bearer {TOKEN}" \\
    -H "Host: ${config.infra.sandbox}" \\
    https://${config.infra.sandbox}/v1/pets`,
    },
  ]

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>How to use and test your Sandbox</h1>
        <div className={classes.mainContainer}>
          <div className={classes.content}>
            <p className={classes.description}>
              These are some quick instructions on how you can upload data to your Sandbox and test the API.
            </p>
            {steps.map((step, indx) => (
              <div key={indx} className={classes.stepContainer}>
                <h2
                  id={`step-${indx + 1}`}
                  className={classes.stepTitle}
                >
                   Step {indx + 1}: {step.stepTitle}
                </h2>
                <p className={classes.description}>
                  {step.instruction}
                </p>

                {step.note.length > 0 &&
                  <div className={classes.noteContainer}>
                    <div className={classes.noteContent}>
                      <div className={classes.noteTitle}>Note</div>
                      <div className={classes.note}>{step.note}</div>
                    </div>
                  </div>}

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
                {step.response &&
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
                  </>}
              </div>
            ))}

            <h2 className={classes.stepTitle}>Congratulations!</h2>

            <p className={classes.description}>
                Now you know how to do it. That's how easy it is to get your Sandbox up and running!
            </p>
          </div>

          <div className={classes.navigation}>
            <div className={classes.sideMenuContainer}>
              <NavMenu
                options={steps.map((step, indx) => (
                  `Step ${indx + 1}: ${step.stepTitle}`
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
