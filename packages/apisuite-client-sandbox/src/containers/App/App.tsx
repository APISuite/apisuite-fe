import * as React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import requireImage from 'util/requireImage'

import { config } from 'constants/global'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'

import theme from './theme'
import routes from './routes'
import { AppProps } from './types'
import { initTabs, loginTabs, gobackConfig } from './config'

const App: React.FC<AppProps> = ({ auth, history, loginUser, logout }) => {
  const [currentTab, setCurrentTab] = React.useState(0)
  const [currentSubTab, setCurrentSubTab] = React.useState(0)
  const [tabs, setTabs] = React.useState(initTabs)
  const [navScrolled, setNavScrolled] = React.useState(false)
  const [gobackLabel, setGobackLabel] = React.useState('')
  const [subTabs, setSubTabs] = React.useState(tabs[currentTab].subTabs)
  const [navigations, setNavigations] = React.useState(true)

  React.useEffect(() => {
    const pathname = history.location.pathname

    if (auth.authToken && !auth.user) {
      loginUser({ token: auth.authToken })
    }

    if (pathname.startsWith('/dashboard/apps') || pathname.startsWith('/dashboard/subscriptions')) {
      setNavScrolled(true)
    } else {
      setNavScrolled(false)
    }

    const gb = gobackConfig.find((item) => pathname.includes(item.path))

    if (pathname.startsWith('/auth')) {
      setNavigations(false)
    } else {
      setNavigations(true)
    }

    if (gb) {
      setGobackLabel(gb.label)
    } else {
      setGobackLabel('')
    }
  }, [history.location.pathname])

  function handleOnTabChange (index: number) {
    setCurrentTab(index)
    setSubTabs(tabs[index].subTabs)
    setCurrentSubTab(0)

    history.push(tabs[index].route)
  }

  function handleOnSubTabChange (index: number) {
    const subTabs = tabs[currentTab].subTabs

    if (Array.isArray(subTabs)) {
      setCurrentSubTab(index)
      history.push(subTabs[index].route)
    }
  }

  function handleGobackClick () {
    history.goBack()
  }

  React.useEffect(() => {
    if (auth.user) {
      setTabs(loginTabs)
      setCurrentTab(3)
      setSubTabs(loginTabs[3].subTabs)
    }
  }, [auth.user])

  return (
    <ThemeProvider theme={theme}>
      {navigations &&
        <Navigation
          key='app-navigation'
          tabs={tabs}
          subTabs={Array.isArray(subTabs) ? subTabs : undefined}
          tabIndex={currentTab}
          subTabIndex={currentSubTab}
          onTabChange={handleOnTabChange}
          onSubTabChange={handleOnSubTabChange}
          name={config.navbar.name}
          logoSrc={requireImage(config.navbar.logoUrl)}
          user={auth.user}
          forceScrolled={navScrolled}
          showBackButton={gobackLabel.length > 0}
          backButtonLabel={gobackLabel}
          onGoBackCLick={handleGobackClick}
          logout={logout}
        />}

      {routes()}

      {navigations && <Footer />}
    </ThemeProvider>
  )
}

export default App
