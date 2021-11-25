import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Trans, Typography, useTheme, useTranslation } from "@apisuite/fe-base";

import StepsProgress from "components/StepsProgress";

import { ProfileDetailsForm } from "./ProfileDetailsForm";
import { OrganisationDetailsForm } from "./OrganisationDetailsForm";
import { SecurityDetailsForm } from "./SecurityDetailsForm";

import { signUpFormSelector } from "./selector";
import { submitSignUpCredentials } from "store/auth/actions/submitSignUpCredentials";
import { submitSignUpOrganisation } from "store/auth/actions/submitSignUpOrganisation";
import { submitSignUpDetails } from "store/auth/actions/submitSignUpDetails";
import Link from "components/Link";

export const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const { palette } = useTheme();
  const { signUpError, isSignUpWorking } = useSelector(signUpFormSelector);
  const mounted = useRef(false);
  const submittedStep = useRef(0);
  const confirmationName = useRef("");
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (mounted.current && !isSignUpWorking && !signUpError) {
      setStep((s) => Math.min(4, s + 1));
    }

    mounted.current = true;
  }, [isSignUpWorking, signUpError]);

  function nextStep (firstInput: string, secondInput?: string) {
    switch (step) {
      case 1: {
        confirmationName.current = firstInput;
        dispatch(submitSignUpCredentials({ details: { name: firstInput, email: secondInput! } }));
        submittedStep.current = 1;
        break;
      }

      case 2: {
        if (firstInput) {
          dispatch(submitSignUpOrganisation({ details: { orgName: firstInput, website: secondInput! } }));
          submittedStep.current = 2;
        } else {
          setStep(3);
        }

        break;
      }

      case 3: {
        dispatch(submitSignUpDetails({ details: { password: firstInput } }));
        submittedStep.current = 3;
        break;
      }

      default:
        break;
    }
  }

  function prevStep () {
    setStep((s) => Math.max(1, s - 1));
  }

  const steps = {
    1: t("signUpForm.steps.profileDetails"),
    2: t("signUpForm.steps.organisationDetails"),
    3: t("signUpForm.steps.securityDetails"),
  };

  const signUpFormStep = (fromStep: number) => {
    switch (fromStep) {
      case 1:
        return (
          <ProfileDetailsForm
            key='profileDetailsForm'
            next={nextStep}
            back={prevStep}
            error={submittedStep.current === 1 && signUpError ? signUpError : ""}
          />
        );

      case 2:
        return (
          <OrganisationDetailsForm
            key='organisationDetailsForm'
            next={nextStep}
            back={prevStep}
            error={submittedStep.current === 2 && signUpError ? signUpError : ""}
          />
        );

      case 3:
        return (
          <SecurityDetailsForm
            key='securityDetailsForm'
            next={nextStep}
            back={prevStep}
            error={submittedStep.current === 3 && signUpError ? signUpError : ""}
          />
        );

      default: {
        return (
          <Redirect
            key='redirectToAccountConfirmation'
            to={`/confirmation/${confirmationName.current}`}
          />
        );
      }
    }
  };

  return (
    <>
      <StepsProgress
        currentStep={step}
        steps={steps}
      />

      {signUpFormStep(step)}

      <Box py={3} clone>
        <Typography variant="caption" align="center">
          <Trans i18nKey="signUpForm.privacyPolicyDisclaimer">
            {[
              <Link
                key="signUpForm.privacyPolicyDisclaimer"
                to="https://cloudoki.atlassian.net/wiki/spaces/APIEC/pages/760938500/Privacy+Policy"
                rel='noopener noreferrer'
                target='_blank'
                style={{ color: palette.text.hint }}
              />,
            ]}
          </Trans>
        </Typography>
      </Box>
    </>
  );
};
