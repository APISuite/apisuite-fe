import * as React from 'react'
import { config } from 'constants/global'

let components: any = []

// Move this to read from the state:
// There needs to be an action that processes the theme into the redux state in the beginning of the application's run
const processComponents = (page: any) => {
  const pageComponents = config.pages[page].components

  for (let i=0, length = pageComponents.length; i<length; i++) {
    const component = pageComponents[i]

    components[i] = require(`components/${component.type}`).default
  }

  return (components.map((c,i) => {
    const ThisComponent = c
    return (<ThisComponent {...pageComponents[i]}/>)
  }))
}

const ContentGenerator: any = ({ page }) => {
  return (
    <div className='container'>
      {processComponents(page)}
    </div>
  )
}

export default ContentGenerator
