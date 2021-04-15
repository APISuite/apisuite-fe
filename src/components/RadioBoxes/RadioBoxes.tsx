import React from 'react'
import clsx from 'clsx'
import { withStyles, Radio, RadioGroup, FormControlLabel, RadioProps } from '@apisuite/fe-base'

import useStyles from './styles'
import { RadioBoxesProps } from './types'

const WhiteRadio = withStyles({ root: { color: 'white' } })((props: RadioProps) => <Radio {...props} />)

const RadioBoxes: React.FC<RadioBoxesProps> = ({ options, selected, onChange }) => {
  const classes = useStyles()

  const handleOptionClick = (value: any) => (event: any) => {
    onChange && onChange(event, value)
  }

  return (
    <RadioGroup className={classes.radioGroup} value={selected} onChange={onChange}>
      {options.map(({ value, label, desc, disabled, checked }, indx) => (
        <div
          key={indx}
          className={clsx(classes.controlWrapper, { [classes.unselected]: value !== selected })}
          onClick={handleOptionClick(value)}
        >
          <FormControlLabel
            className={classes.controlLabel}
            label={label}
            value={value}
            control={<WhiteRadio color='primary' />}
            disabled={disabled}
            checked={checked}
          />

          <p className={classes.desc}>{desc}</p>
        </div>
      ))}
    </RadioGroup>
  )
}

export default RadioBoxes
