import React, { useCallback, useEffect, useRef } from "react";
import ReactSlidy from "react-slidy/lib";
import { useTheme, Fade, Typography, Box, ButtonBase } from "@apisuite/fe-base";
import RadioButtonCheckedRoundedIcon from "@material-ui/icons/RadioButtonCheckedRounded";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import clsx from "clsx";

import useStyles from "./styles";
import { CarouselSlideProps, CarouselProps } from "./types";

import "react-slidy/lib/index.scss";
import Link from "components/Link";

// Carousel slides
const CarouselSlide: React.FC<CarouselSlideProps> = ({
  carouselSlideButton,
  carouselSlideButtonLabel,
  carouselSlideButtonLink = "/",
  carouselSlideButtonOnClick,
  carouselSlideContentsPlacement,
  carouselSlideImage,
  carouselSlideText,
}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.carouselSlideOuterContainer, {
        [classes.sideBySideSlideContentsPlacement]: carouselSlideContentsPlacement === "side-by-side",
        [classes.topToBottomSlideContentsPlacement]: carouselSlideContentsPlacement !== "side-by-side",
      })}
    >
      {
        carouselSlideImage &&
        <div className={classes.carouselSlideInnerContainer}>
          <img alt='Slide image' src={carouselSlideImage} />
        </div>
      }

      <div className={classes.carouselSlideInnerContainer}>
        <Box m={4}>
          <Typography
            variant="h4"
            color="inherit"
            display="block"
          >
            {carouselSlideText}
          </Typography>
        </Box>

        {carouselSlideButton && (
          <ButtonBase
            className={classes.carouselSlideButtonStyling}
            component={Link}
            to={carouselSlideButtonLink}
            onClick={carouselSlideButtonOnClick}
          >
            {carouselSlideButtonLabel}
          </ButtonBase>
        )}
      </div>
    </div>
  );
};

export const Carousel: React.FC<CarouselProps> = ({
  carouselBackgroundColor,
  carouselBackgroundImage,
  carouselFadeIn,
  carouselFadeInDuration,
  iconsOfSliderButtonsArray,
  initialSlide,
  slidesArray,
  slidesAutoPlay,
  slidingAnimationDuration,
  timeBetweenSlides,
}) => {
  const classes = useStyles();
  const { palette } = useTheme();
  const timer = useRef<ReturnType<typeof setInterval>>();
  const [slideNumber, setSlideNumber] = React.useState(initialSlide || 0);

  const handleCarouselSlideChange = (newSlideNumber: number) => {
    setSlideNumber(newSlideNumber);
  };

  const [isHoveringSlide, setIsHoveringSlide] = React.useState(false);

  const runSlides = useCallback(() => {
    if (!isHoveringSlide) {
      if (slideNumber < (slidesArray.length - 1)) {
        setSlideNumber((s) => s + 1);
      } else {
        setSlideNumber(0);
      }
    }
  }, [slideNumber, isHoveringSlide, slidesArray]);

  useEffect(() => {
    if (slidesAutoPlay) {
      timer.current = setInterval(() => {
        runSlides();
      }, timeBetweenSlides) as NodeJS.Timeout;
    }

    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [runSlides, timeBetweenSlides, slidesAutoPlay]);

  const carouselSlides = slidesArray.map((slide, index) =>
    <div
      key={`slide_${index}`}
      onMouseEnter={() => { setIsHoveringSlide(true); }}
      onMouseLeave={() => { setIsHoveringSlide(false); }}
    >
      <CarouselSlide
        carouselSlideButton={slide.slideButton}
        carouselSlideButtonLabel={slide.slideButtonLabel}
        carouselSlideButtonLink={slide.slideButtonLink}
        carouselSlideContentsPlacement={slide.slideContentsPlacement}
        carouselSlideImage={slide.slideForegroundImage}
        carouselSlideText={slide.slideText}
      />
    </div>,
  );

  const carouselSliderIconButtons = iconsOfSliderButtonsArray ? (iconsOfSliderButtonsArray.map((icon, index) =>
    <button
      className={
        index === slideNumber
          ? classes.selectedCarouselSliderIconButton
          : classes.notSelectedCarouselSliderIconButton
      }
      key={`slider_button_${index}`}
      onClick={() => handleCarouselSlideChange(index)}
    >
      {icon}
    </button>,
  )) : (slidesArray.map((_, index) =>
    <button
      className={
        index === slideNumber
          ? classes.selectedCarouselSliderIconButton
          : classes.notSelectedCarouselSliderIconButton
      }
      key={`slider_button_${index}`}
      onClick={() => handleCarouselSlideChange(index)}
    >
      {
        index === slideNumber ? <RadioButtonCheckedRoundedIcon /> : <RadioButtonUncheckedRoundedIcon />
      }
    </button>,
  ));

  return (
    <>
      <Fade
        in={carouselFadeIn || true}
        timeout={carouselFadeInDuration || 2500}
      >
        <div
          className={classes.carouselSlider}
          style={{
            background: carouselBackgroundImage
              ? `url(${carouselBackgroundImage})`
              : (carouselBackgroundColor || palette.grey[700]),
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <ReactSlidy
            initialSlide={initialSlide || 0}
            slide={slideNumber}
            slideSpeed={slidingAnimationDuration || 1000}
          >
            {carouselSlides}
          </ReactSlidy>
        </div>
      </Fade>

      <Fade
        in={carouselFadeIn || true}
        timeout={1000}
      >
        <div className={classes.carouselSliderIconButtons}>
          {carouselSliderIconButtons}
        </div>
      </Fade>
    </>
  );
};
