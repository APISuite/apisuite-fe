import * as React from 'react'
import { SSOFormProps } from './types'
import useStyles from './styles'
import { useTranslation } from 'react-i18next'
import Button from 'components/Button'

const SSOForm: React.FC<SSOFormProps> = ({
  auth,
  getProviders,
  loginWith,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()

  React.useEffect(() => {
    if (auth.providers === null) {
      getProviders()
    }
  }, [])

  function handleSubmit (provider: string) {
    loginWith({ provider })
  }

  return (
    <div className={classes.loginWithContainer}>
      {
        auth.providers?.map((prov, idx) => (
          <div className={classes.loginWithButtonWrapper}>
            <Button
              key={`${prov}-${idx}`}
              // FIXME: the translations support interpolation
              label={`${t('loginForm.loginWith')} ${prov}`}
              onClick={() => handleSubmit(prov)}
              fullWidth
              background='secondary'
              type='button'
            />
          </div>
        ))
      }
    </div>
  )
}

export default SSOForm
