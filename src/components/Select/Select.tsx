import React from 'react'
import { TextField } from '@apisuite/fe-base'
import Autocomplete from '@material-ui/lab/Autocomplete'

import { SelectProps, SelectOption } from './types'
import useStyles from './styles'

const Select: React.FC<SelectProps> = ({
  customCloseIcon,
  customOpenIcon,
  fieldLabel,
  options,
  selected,
  ...rest
}) => {
  const classes = useStyles()

  return (
    <Autocomplete
      {...rest}
      closeIcon={customCloseIcon}
      defaultValue={selected ? options.find((option) => option.value === selected.value) : undefined}
      disableClearable
      getOptionLabel={(option: SelectOption) => option.label}
      groupBy={(option: SelectOption) => option.group}
      options={options.sort((optionA, optionB) => -optionB.group.localeCompare(optionA.group))}
      popupIcon={customOpenIcon}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.textField}
          fullWidth
          label={fieldLabel}
          placeholder='Make your selection'
          variant='outlined'
        />
      )}
      value={selected}
    />
  )
}

export default Select
