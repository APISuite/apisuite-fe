import React from 'react'
import { useConfig, useTranslation, changeLocale, MenuItem, Select } from '@apisuite/fe-base'

import useStyles from './styles'

const LocaleSelect: React.FC<{}> = () => {
  const { i18nOptions } = useConfig()
  const classes = useStyles()

  const { i18n } = useTranslation()

  const handleLocaleChange = (event: React.ChangeEvent<any>) => {
    changeLocale(event.target.value)
  }

  const selectionMenuItems = i18nOptions.map((opt) => (
    <MenuItem
      key={opt.locale}
      value={opt.locale}
    >
      {opt.label}
    </MenuItem>
  ))

  return (
    <Select
      className={classes.languageSelector}
      id='selectionMenuLabel'
      onChange={handleLocaleChange}
      value={i18n.language}
    >
      {selectionMenuItems}
    </Select>
  )
}

export default LocaleSelect
