import * as React from 'react'
import clsx from 'clsx'
import FormField, { parseErrors, isValidURL } from 'components/FormField'
import Button from '@material-ui/core/Button'
import SvgIcon from 'components/SvgIcon'
import InputLabel from '@material-ui/core/InputLabel'
import Avatar from '@material-ui/core/Avatar'
import Select from 'components/Select'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

import { selectOptions } from './config'
import useCommonStyles from '../styles'
import useStyles from './styles'
import { AppDetailProps } from './types'
import { RouteParams, AppData } from '../types'
import { useParams } from 'react-router'
import { FormFieldEvent } from 'components/FormField/types'
import { config } from 'constants/global'

const AppDetail: React.FC<AppDetailProps> = (
  {
    history,
    updateApp,
    getAppDetails,
    currentApp,
    deleteApp,
    user,
    resUpdate,
    resDelete,
    toggleInform,
  }) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const [t] = useTranslation()
  const appId = parseInt(useParams<RouteParams>().id)
  const [changed, setChanged] = React.useState(false)
  const [changedDetails, setChangedDetails] = React.useState(false)
  const [input, setInput] = React.useState<AppData>({
    appId: currentApp.appId,
    name: currentApp.name,
    description: currentApp.description,
    redirectUrl: currentApp.redirectUrl,
    logo: currentApp.logo,
    visibility: currentApp.visibility,
    userId: currentApp.userId,
    subscriptions: currentApp.subscriptions,
    pubUrls: currentApp.pubUrls,
    enable: true,
    clientId: currentApp.clientId,
    clientSecret: currentApp.clientSecret,
  })
  const [errors, setErrors] = React.useState()
  const [isFormValid, setFormValid] = React.useState(false)
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    updateApp({
      appId: appId,
      name: input.name,
      description: input.description,
      redirectUrl: input.redirectUrl,
      logo: input.logo,
      visibility: 'private',
      userId: input.userId,
      subscriptions: input.subscriptions,
      pubUrls: input.pubUrls,
      enable: true,
      clientId: '',
      clientSecret: '',
    })
  }

  function handleDeleteApp () {
    deleteApp(appId)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function handleInputs (e: FormFieldEvent, err: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setChanged(true)
    setChangedDetails(!(JSON.stringify(currentApp) === JSON.stringify(input)))
    const eventTarget = e.target
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  function navigate (route: any) {
    history.push(route)
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  React.useEffect(() => {
    if (user) {
      setInput({ ...currentApp })
    }
  }, [currentApp])

  React.useEffect(() => {
    if (user) {
      getAppDetails(appId, user.id)
    }
  }, [])

  return (
    <>
      <div className={classes.container}>
        <section className={clsx(commonClasses.contentContainer, classes.flexContainer)}>
          <form noValidate autoComplete='off' className={classes.left}>
            <FormField
              label='Application Name'
              placeholder='Your App name'
              name='name'
              type='text'
              value={input.name}
              onChange={handleInputs}
              errorPlacing='bottom'
              rules={[
                { rule: input.name.length > 0, message: 'Please provide a valid name' },
              ]}
            />

            <br />

            <FormField
              label='Description'
              placeholder='Describe your app'
              multiline
              name='description'
              rows={5}
              value={input.description}
              onChange={handleInputs}
            />

            <br />

            <FormField
              label='Client URL'
              placeholder='https://localhost'
              name='pubUrls'
              // TODO change
              value=''
              onChange={handleInputs}
            />

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Terms of service'
                value={`https://${config.clientName}.com/tos`}
              />

              {/* <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='plus' size='24' />
              </Button> */}
            </div>

            <br /><br /><br /><br /><br />

            <div className={classes.divider} />

            <br />

            <InputLabel>Access details</InputLabel>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Client ID'
                value={input.clientId}
                inputProps={{ readOnly: true }}
              />

              {/* <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='content-copy' size='24' />
              </Button> */}
            </div>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Client Secret'
                value={input.clientSecret}
                inputProps={{ readOnly: true }}
              />

              {/* <Button variant='outlined' className={clsx(classes.iconBtn, classes.iconBtnLeft)}>
                <SvgIcon name='autorenew' size='24' />
              </Button>

              <Button variant='outlined' className={clsx(classes.iconBtn, classes.iconBtnRight)}>
                <SvgIcon name='content-copy' size='24' />
              </Button> */}
            </div>

            <br />

            <div className={classes.fieldWrapper}>
              <FormField
                label='Redirect URL'
                name='redirectUrl'
                type='text'
                value={input.redirectUrl}
                onChange={handleInputs}
                rules={[
                  { rule: isValidURL(input.redirectUrl), message: 'Please provide a valid URL' },
                  { rule: input.redirectUrl.length > 0, message: 'Please provide a valid URL' },
                ]}
              />

              {/* <Button variant='outlined' className={classes.iconBtn}>
                <SvgIcon name='plus' size='24' />
              </Button> */}
            </div>

            <br />
          </form>

          <aside className={classes.right}>
            <form onSubmit={handleSubmit}>

              <Avatar className={classes.avatar}>MA</Avatar>

              <br />

              <InputLabel shrink>Application Status</InputLabel>
              <div className={classes.status}>
                <SvgIcon name='circle' color='#2DB7B9' size={12} style={{ display: 'inline-block' }} />
              &nbsp;&nbsp;
                <span>Sandbox Access</span>
              </div>

              <br />

              <InputLabel shrink className={classes.marginBottom}>Application visibility</InputLabel>

              <Select options={selectOptions} selected={selectOptions[0]} />

              <br />

              {/* <InputLabel shrink>Author</InputLabel>
              <div className={classes.link}>Finish your team info</div>
              <br /> */}

              <InputLabel shrink>Registration date</InputLabel>
              <div>{currentApp.createdAt !== undefined &&
                new Intl.DateTimeFormat(i18n.language, dateOptions).format(Date.parse(currentApp.createdAt))}
              </div>
              <br />

              <InputLabel shrink>Last update</InputLabel>
              <div>{currentApp.updatedAt !== undefined &&
                new Intl.DateTimeFormat(i18n.language, dateOptions).format(Date.parse(currentApp.updatedAt))}
              </div>
              <br />

              <Button
                type='submit'
                disabled={!(changed && isFormValid && changedDetails)}
                className={clsx(classes.btn, classes.btn2, (!changed && classes.disabled))}
              >
                {resUpdate.isRequesting ? <CircularProgress size={20} /> : !changedDetails ? t('appDetail.buttonDisabled') : t('appDetail.buttonEnabled')}
              </Button>

              {resUpdate.isError &&
                <div className={classes.errorPlaceholder}>
                  <div className={classes.errorAlert}>Error updating app</div>
                </div>}

              <br /><br /><br />

              <div className={classes.divider} />

              <br />

              <InputLabel shrink>API subscriptions</InputLabel>
              <div className={classes.link} onClick={() => navigate('/dashboard/subscriptions')}>Manage API subscriptions</div>
              <br />

              <InputLabel shrink className={classes.marginBottom}>Application scopes</InputLabel>
              <div>
                <span className={classes.tag}>default</span>
              </div>

              <br />

              <InputLabel shrink>Additional actions</InputLabel>
              <div className={classes.link} onClick={() => toggleInform()}>Activity monitoring</div>
              <div
                className={classes.link}
                onClick={handleDeleteApp}
              >
                Delete application
              </div>

              {resDelete.isError &&
                <div className={classes.errorPlaceholder}>
                  <div className={classes.errorAlert}>Error deleting app</div>
                </div>}

            </form>
          </aside>
        </section>
      </div>
    </>
  )
}

export default AppDetail
