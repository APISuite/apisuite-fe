import * as React from 'react'
import classnames from 'classnames'
import useStyles from './styles'

import './styles.scss'

const Button: React.FC<{
  label?: any,
  type?: string,
  fullWidth?: boolean,
  href?: string,
  loading?: boolean,
  disabled?: boolean,
  onClick?: any,
  background?: string,
  color?: string,
}> = ({ label, type, fullWidth, href, loading, disabled, onClick, background, color, ...rest }) => {
  const classes = useStyles()

  return (
    <div onClick={!disabled && !loading ? onClick : null}>
      {href && !disabled && <a href={href} target='_blank' rel='noopener noreferrer' className={classnames([classes.button], type, { [classes.fullWidth]: fullWidth || false }, { [classes.disabled]: disabled || loading || false }, { [classes.loading]: loading || false }, { [classes.primaryColor]: color && color === 'primary' }, { [classes.secondaryColor]: color && color === 'secondary' }, { [classes.secondary]: background && background === 'secondary' }, { [classes.transparent]: background && background === 'transparent' }, { [classes.dark]: background && background === 'dark' })}>{label}</a>}
      {!href && <div className={classnames([classes.button], type, { [classes.fullWidth]: fullWidth || false }, { [classes.disabled]: disabled || loading || false }, { [classes.loading]: loading || false }, { [classes.primaryColor]: color && color === 'primary' }, { [classes.secondaryColor]: color && color === 'secondary' }, { [classes.secondary]: background && background === 'secondary' }, { [classes.transparent]: background && background === 'transparent' }, { [classes.dark]: background && background === 'dark' })} {...rest}>{label}</div>}
    </div>
  )
}

export default Button
