import React from 'react'
import { TextField } from '@apisuite/fe-base'
import classnames from 'classnames'

import { FormFieldProps } from './types'

import useStyles from './styles'

const FormField: React.FC<FormFieldProps> = (props) => {
  const classes = useStyles()

  const {
    errorPlacing,
    fullWidth = true,
    InputLabelProps,
    label,
    margin = 'dense',
    onBlur,
    onFocus,
    value,
    variant = 'outlined' as any,
    ...rest
  } = props

  const [errors, setErrors] = React.useState()

  const [changed, setChanged] = React.useState(false)

  const [blured, setBlured] = React.useState(false)

  function handleOnFocus (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    // @ts-ignore
    onFocus && onFocus(event)
  }

  function handleOnBlur (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setBlured(true)

    // @ts-ignore
    onBlur && onBlur(event)
  }

  React.useEffect(() => {
    const err = props.rules && props.rules.filter(r => (props.showErrors ? !r.rule : changed && !r.rule))

    if (props.onChange) {
      props.onChange({
        target: {
          name: props.name,
          value: value,
        },
      }, err)
    }

    // @ts-ignore
    setErrors(err)
    setChanged(true)
  }, [value, changed])

  React.useEffect(() => {
    const err = props.rules && props.rules.filter(r => (props.showErrors ? !r.rule : changed && !r.rule))

    // @ts-ignore
    setErrors(err)
  }, [props.rules])

  return (
    <div
      className='formfield-wrapper'
      style={{ width: fullWidth ? '100%' : undefined }}
    >
      <TextField
        className={classes.textField}
        // @ts-ignore
        error={blured && errors && errors.length > 0}
        fullWidth={fullWidth}
        label={label}
        margin={margin}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        value={value}
        variant={variant}
        {...rest}
      />

      {
        // @ts-ignore
        blured && errors && errors.length > 0 &&
        <div className={classnames('formfield-errors', errorPlacing)}>
          {/* @ts-ignore */}
          {errors && errors.length > 0 && errors.map((e: any) => e.message)}
        </div>
      }
    </div>
  )
}

export default FormField
