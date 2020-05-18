import * as React from 'react'
import theme from 'theme'

let components = []

// Move this to read from the state:
// There needs to be an action that processes the theme into the reduz state in the beginning of the application's run
const processComponents = (page) => {
  for (let i=0, length = theme.content[page].length; i<length; i++) {
    const component = theme.content[page][i]
    components[i] = require(`components/${component.type}`).default
  }

  return (components.map(c => {
    const ThisComponent = c
    return (<ThisComponent/>)
  }))
}

const ContentGenerator = ({page}) => {
  return (
    <div className='container'>
      {processComponents(page)}
    </div>
  )
}

export default ContentGenerator
