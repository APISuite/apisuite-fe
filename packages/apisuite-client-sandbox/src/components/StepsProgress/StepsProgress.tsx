import * as React from 'react'
import { StepsProgressProps } from './types'
import useStyles from './styles'
import clsx from 'clsx'

const StepsProgress: React.FC<StepsProgressProps> = ({
  steps,
  currentStep,
}) => {
  const classes = useStyles()

  return (
    <ul className={classes.container}>
      {Object.values(steps).slice(0, -1).map((step, indx) => (
        <>
          {indx === 0 &&
            <li className={classes.stepProgress}>
              <span
                className={clsx(
                  classes.stepCircle,
                  currentStep > indx && classes.stepCircleBefore,
                  indx + 1 === currentStep && classes.stepCircleCurrent,
                )}
              />
              <label
                className={classes.stepTitle}
                style={{ transform: 'translateX(-32px) translateY(24px)' }}
              >
                {step}
              </label>
            </li>}

          {indx !== 0 &&
            <li className={classes.stepProgress}>
              <progress
                className={clsx(classes.progress,
                  indx === currentStep && classes.progressCurrent,
                  indx > currentStep && classes.progressAfter)}
              />
              <span className={clsx(
                classes.stepCircle,
                currentStep > indx && classes.stepCircleBefore,
                indx + 1 === currentStep && classes.stepCircleCurrent,
              )}
              />
              <label className={classes.stepTitle}>{step}</label>
            </li>}
        </>
      ))}
    </ul>
  )
}

export default StepsProgress
