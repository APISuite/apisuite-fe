import React from 'react'
import { useConfig, DefaultConfig } from '@apisuite/fe-base'

const components: any = []

// Move this to read from the state:
// There needs to be an action that processes the theme into the redux state in the beginning of the application's run
const processComponents = (pageComponents: any) => {
  for (let i = 0, length = pageComponents.length; i < length; i++) {
    const component = pageComponents[i]

    components[i] = require(`components/${component.type}`).default
  }

  return (components.map((c: any, i: number) => {
    const ThisComponent = c
    return (<ThisComponent {...pageComponents[i]} key={i} />)
  }))
}

const ContentGenerator: any = ({ page }: { page: keyof DefaultConfig['pages'] }) => {
  const { pages } = useConfig()

  return (
    <div className='container'>
      {processComponents(pages[page].components)}
    </div>
  )
}

export default ContentGenerator
