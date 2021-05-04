import React from "react";

import { StepsProgressProps } from "./types";

import useStyles from "./styles";

import clsx from "clsx";

const StepsProgress: React.FC<StepsProgressProps> = ({
  currentStep,
  steps,
}) => {
  const classes = useStyles();

  return (
    <ul className={classes.container}>
      {
        Object.values(steps).map((step, index) => {
          if (index === 0) {
            return (
              <li key={step.toString()} className={classes.stepProgress}>
                <span
                  className={clsx(
                    classes.stepCircle,
                    currentStep > index && classes.stepCircleBefore,
                    index + 1 === currentStep && classes.stepCircleCurrent,
                  )}
                />

                <label
                  className={
                    clsx(
                      classes.stepTitle,
                      currentStep > index && classes.stepTitle,
                      index + 1 === currentStep && classes.stepTitleCurrent,
                    )
                  }
                  style={{ transform: "translateX(-32px) translateY(24px)" }}
                >
                  {step}
                </label>
              </li>
            );
          }

          return (
            <li key={step} className={classes.stepProgress}>
              <progress
                className={clsx(classes.progress,
                  index === currentStep && classes.progressCurrent,
                  index > currentStep && classes.progressAfter)}
              />

              <span
                className={clsx(
                  classes.stepCircle,
                  currentStep > index && classes.stepCircleBefore,
                  index + 1 === currentStep && classes.stepCircleCurrent,
                )}
              />

              <label
                className={
                  clsx(
                    classes.stepTitle,
                    currentStep > index && classes.stepTitle,
                    index + 1 === currentStep && classes.stepTitleCurrent,
                  )
                }
              >
                {step}
              </label>
            </li>
          );
        })
      }
    </ul>
  );
};

export default StepsProgress;
