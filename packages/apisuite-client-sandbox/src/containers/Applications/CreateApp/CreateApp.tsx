import * as React from 'react'
import FormField from 'components/FormField/FormField'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import SvgIcon from 'components/SvgIcon'
import InputLabel from '@material-ui/core/InputLabel'
import RadioBoxes from 'components/RadioBoxes/RadioBoxes'
import Select from 'components/Select'

import { radioOptions, selectOptions } from './config'
import useCommonStyles from '../styles'
import useStyles from './styles'
import { CreateAppProps } from './types'
import clsx from 'clsx'

const CreateApp: React.FC<CreateAppProps> = ({ history, createApp }) => {
  const commonClasses = useCommonStyles()
  const classes = useStyles()
  const [visibility, setVisibility] = React.useState('private')
  const [input, setInput] = React.useState({
    name: '',
    description: '',
    redirectUrl: '',
    logo: '',
    userId: '',
    sandboxId: '',
    pubUrls: '',
  })

  function handleVisibilityChange (_: any, value: string) {
    setVisibility(value)
  }

  function handleCancelClick () {
    history.goBack()
  }

  function handleInputs (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    createApp({
      name: input.name,
      description: input.description,
      redirectUrl: input.redirectUrl,
      logo: input.logo,
      userId: input.userId,
      sandboxId: input.sandboxId,
      pubUrls: input.pubUrls,
    })
  }

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
          />

          <br /><br />

          <FormField
            label='Description'
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
              value={input.pubUrls}
              onChange={handleInputs}
            />

            <Button variant='outlined' className={classes.iconBtn}>
              <SvgIcon name='plus' size='24' />
            </Button>
          </div>

          <br />

          <InputLabel shrink>Application visibility</InputLabel>
          <RadioBoxes options={radioOptions} selected={visibility} onChange={handleVisibilityChange} />

          <br />

          <div className={classes.divider} />

          <br />

          <InputLabel className={classes.marginBottom} shrink>Sandbox Subscriptions</InputLabel>
          <Select options={selectOptions} />

          <br /><br />

          <div className={classes.marginBottom}>
            <Button
              type='submit'
              className={classes.btn}
            >
              Add Application
            </Button>
            <div
              role='button'
              className={clsx(classes.btn, classes.btn2)}
              onClick={handleCancelClick}
            >
              Cancel
            </div>
          </div>

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
          <InputLabel shrink>Image upload</InputLabel>

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
