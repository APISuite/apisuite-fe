import * as React from 'react'

import { useTranslation } from 'react-i18next'

import { LOCALE_KEY, changeLocale } from './i18n'

import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'

import { localPut } from 'util/storage'

import useStyles from './styles'
import { useConfig } from 'config'

const LocaleSelect: React.FC<{}> = () => {
  const { i18nOptions } = useConfig()
  const classes = useStyles()

  const { i18n } = useTranslation()

  const handleLocaleChange = (event: React.ChangeEvent<any>) => {
    changeLocale(event.target.value)
    localPut(LOCALE_KEY, event.target.value)
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
