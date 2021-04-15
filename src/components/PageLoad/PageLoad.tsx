import React from 'react'
import { CircularProgress } from '@apisuite/fe-base'

import './styles.scss'

const PageLoad: React.FC<{}> = () => (
  <div className='page-load'>
    <CircularProgress size={50} />
    <br />
    <div>Slow internet connection, just a moment.</div>
  </div>
)

export default PageLoad
