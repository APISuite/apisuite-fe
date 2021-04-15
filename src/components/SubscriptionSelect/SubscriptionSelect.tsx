import React from 'react'
import { useTranslation, Chip } from '@apisuite/fe-base'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ClearIcon from '@material-ui/icons/Clear'

import useStyles from './styles'
import { SubscriptionSelectProps } from './types'

const SubscriptionSelect: React.FC<SubscriptionSelectProps> = ({
  apps,
  apiName,
  handleDelete,
  handleClick,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()

  // const chooseIcon = (isLoading: boolean) => {
  //   if (isLoading) {
  //     return { deleteIcon: <CircularProgress size={18} className={classes.loading} /> }
  //   } else {
  //     return {}
  //   }
  // }

  const chips = () => (
    <div className={classes.chips}>
      {apps.map((app, indx) => (
        <Chip
          key={indx}
          label={app.appName}
          className={classes.chip}
          onDelete={handleDelete(app.appId, apiName)}
          deleteIcon={
            <ClearIcon
              classes={{
                root: classes.clearIcon,
              }}
            />
          }
          // {...chooseIcon(app.isLoading)}
        />
      ))}
    </div>
  )

  return (
    <div className={classes.subSelect}>
      {apps.length === 0
        ? <div className={classes.dropdown} onClick={handleClick(apiName)}>{t('subscriptionSelect.addApplication')}</div>
        : chips()}
      <ExpandMoreIcon
        className={classes.icon}
        onClick={handleClick(apiName)}
      />
    </div>
  )
}

export default SubscriptionSelect
