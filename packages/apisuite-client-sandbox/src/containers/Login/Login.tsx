import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from './types'
import LoginForm from 'components/LoginForm'
import RegisterForm from 'components/RegisterForm'
import { decodeBase64 } from 'util/decodeBase64'
import { useParams } from 'react-router'
import { History } from 'history'
import useStyles from './styles'
import clsx from 'clsx'

const Login: React.FC<{ history: History }> = ({ history }) => {
  const { view: viewParam, email: emailParam } = useParams()
  const [view, setView] = React.useState<View>(viewParam === 'register' ? 'register' : 'login')
  const [t] = useTranslation()
  const classes = useStyles()

  return (
    <main className={classes.main}>
      <section className={classes.formSide}>
        <section className={classes.formContainer}>
          <h1 className={classes.welcomeTitle}>{t('login.welcomeTitle')}</h1>
          <p className={classes.welcomeMessage}>{t('login.welcomeMsg')}</p>

          <div className={classes.loginRegisterSelector}>
            <option className={view === 'login' ? classes.optionSelected : classes.option} onClick={() => setView('login')}>{t('login.loginBtn')}</option>
            <option className={view === 'register' ? classes.optionSelected : classes.option} onClick={() => setView('register')}>{t('login.registerBtn')}</option>
          </div>

          {view === 'login'
            ? <LoginForm history={history} />
            : <RegisterForm prefilledEmail={decodeBase64(emailParam)} />}
        </section>
      </section>

      <aside className={clsx(classes.imageSide,
        view === 'login' && classes.imageSideLogin,
        view === 'register' && classes.imageSideRegister)}
      />
    </main>
  )
}

export default Login
