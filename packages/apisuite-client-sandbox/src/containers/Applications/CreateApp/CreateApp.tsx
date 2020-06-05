import * as React from 'react'
import FormField, { parseErrors, isValidURL } from 'components/FormField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import SvgIcon from 'components/SvgIcon'
import InputLabel from '@material-ui/core/InputLabel'
import RadioBoxes from 'components/RadioBoxes/RadioBoxes'
import Select from 'components/Select'
import { SelectOption } from 'components/Select/types'
import CircularProgress from '@material-ui/core/CircularProgress'
import { FormFieldEvent } from 'components/FormField/types'
import { Api } from 'containers/Subscriptions/types'

import { radioOptions } from './config'
import useCommonStyles from '../styles'
import useStyles from './styles'
import { CreateAppProps } from './types'
import { AppData } from '../types'
import clsx from 'clsx'

type Input = Pick<AppData, 'name' | 'description' | 'redirectUrl' | 'logo' | 'userId' | 'visibility' | 'subscriptions' | 'pubUrls'>

const CreateApp: React.FC<CreateAppProps> = ({
  history,
  createApp,
  user,
  resCreate,
  apis,
  getApis,
}) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  // const [visible, toggle] = React.useReducer(v => !v, false)
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()
  const [input, setInput] = React.useState<Input>({
    name: '',
    description: '',
    redirectUrl: '',
    logo: 'http://logo.png',
    userId: 0,
    // visibility: visible ? 'public' : 'private',
    visibility: 'private',
    subscriptions: [],
    // TODO review puburls
    pubUrls: null,
  })

  const selectOptions = (apis: Api[]) => {
    return apis.map(api => ({
      label: api.apiTitle,
      value: api.id,
      group: api.name,
    }))
  }

  React.useEffect(() => {
    getApis()
  }, [getApis])

  function handleCancelClick () {
    history.goBack()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  function handleInputs (e: FormFieldEvent, err: any) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    const eventTarget = e.target
    setErrors((old: string[]) => parseErrors(eventTarget, err, old || []))
  }

  function chooseApi (e: React.ChangeEvent<{}>, option: SelectOption) {
    if (e) {
      setInput({
        ...input,
        subscriptions: [option.value],
      })
    }
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    let userId = 0

    if (user) {
      userId = user.id
    }

    createApp({
      appId: 0,
      name: input.name,
      description: input.description,
      redirectUrl: input.redirectUrl,
      logo: input.logo,
      visibility: 'private',
      userId: userId,
      subscriptions: input.subscriptions,
      pubUrls: null,
      enable: true,
      clientId: '',
      clientSecret: '',
    })
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  return (
    <div className={classes.container}>
      <section className={clsx(commonClasses.contentContainer, classes.flexContainer)}>
        <form
          noValidate autoComplete='off'
          className={classes.left}
          onSubmit={handleSubmit}
        >
          <FormField
            label='Application name'
            placeholder='Name your app'
            name='name'
            type='text'
            value={input.name}
            onChange={handleInputs}
            errorPlacing='bottom'
            rules={[
              { rule: input.name.length > 0, message: 'Please provide a valid name' },
            ]}
          />

          <br /><br />

          <FormField
            label='Description (optional)'
            placeholder='Describe your app'
            name='description'
            type='text'
            value={input.description}
            onChange={handleInputs}
            multiline
            rows={5}
          />

          <br />

          <div className={classes.fieldWrapper}>
            <FormField
              label='Redirect URL'
              placeholder='https://localhost'
              name='redirectUrl'
              type='text'
              value={input.redirectUrl}
              onChange={handleInputs}
              errorPlacing='bottom'
              rules={[
                { rule: isValidURL(input.redirectUrl), message: 'Please provide a valid URL' },
                { rule: input.redirectUrl.length > 0, message: 'Please provide a valid URL' },
              ]}
            />

            <Button variant='outlined' className={classes.iconBtn}>
              <SvgIcon name='plus' size='24' />
            </Button>
          </div>

          <p className={classes.info}>
            You can add multiple redirect URL’s, at least one is required.&nbsp;
            <Link href='#'>
              Learn more about the OAuth process.&nbsp;
              <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
            </Link>
          </p>

          <br />

          <div className={classes.fieldWrapper}>
            <FormField
              label={'Public URL\'s (optional)'}
              placeholder='Client URL'
              name='pubUrls'
              type='text'
              // TODO change back to input.pubUrls
              value=''
              // onChange={handleInputs}
            />

            <Button variant='outlined' className={classes.iconBtn}>
              <SvgIcon name='plus' size='24' />
            </Button>
          </div>

          <br />

          <InputLabel shrink>Application visibility</InputLabel>
          <RadioBoxes
            options={radioOptions}
            selected='private'
          />

          <br />

          <div className={classes.divider} />

          <br />

          <InputLabel className={classes.marginBottom} shrink>Sandbox Subscriptions</InputLabel>
          <Select
            options={selectOptions(apis)}
            onChange={chooseApi}
          />

          <br /><br />

          <div className={classes.marginBottom}>
            <Button
              type='submit'
              className={clsx(classes.btn, classes.btn3)}
              disabled={!isFormValid}
            >
              {resCreate.isRequesting ? <CircularProgress size={20} /> : 'Add Application'}
            </Button>
            <div
              role='button'
              className={clsx(classes.btn, classes.btn2)}
              onClick={handleCancelClick}
            >
              Cancel
            </div>
          </div>

          {resCreate.isError &&
            <div className={classes.errorPlaceholder}>
              <div className={classes.errorAlert}>Error creating app</div>
            </div>}

          <p className={classes.info}>
            Not sure if you’re doing it right?
            <Link href='#'>
                We have documentation.&nbsp;
              <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
            </Link>
          </p>

          <br />
        </form>

        <aside className={classes.right}>
          {/* <InputLabel shrink>Image upload</InputLabel> */}

          <div>
            <div className={classes.upload}>
              <SvgIcon name='cloud-upload' size={24} />
            </div>
            <p className={classes.uploadDesc}>Application Logo</p>

            <div className={classes.space} />

            <div className={classes.divider} />

            <p className={classes.info2}>
              Don’t worry, you can finalise your app registration first and add API’s later:
            </p>

            <div className={classes.infoImage} />

            <br />
          </div>
        </aside>
      </section>
    </div>
  )
}

export default CreateApp
