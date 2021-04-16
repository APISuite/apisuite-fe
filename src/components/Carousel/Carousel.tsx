import React from 'react'
import ReactSlidy from 'react-slidy/lib'
import { useTheme, Fade, Button } from '@apisuite/fe-base'
import RadioButtonCheckedRoundedIcon from '@material-ui/icons/RadioButtonCheckedRounded'
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded'

import useStyles from './styles'
import { CarouselSlideProps, CarouselProps } from './types'

import 'react-slidy/lib/index.scss'

// Carousel slides
const CarouselSlide: React.FC<CarouselSlideProps> = ({
  carouselSlideButton,
  carouselSlideButtonCustomStyling,
  carouselSlideButtonLabel,
  carouselSlideButtonLink,
  carouselSlideButtonOnClick,
  carouselSlideContentsPlacement,
  carouselSlideImage,
  carouselSlideText,
}) => {
  const classes = useStyles()

  return (
    <div
      className={
        `
${classes.carouselSlideOuterContainer}
${carouselSlideContentsPlacement && carouselSlideContentsPlacement === 'side-by-side'
      ? classes.sideBySideSlideContentsPlacement
      : classes.topToBottomSlideContentsPlacement
    }
`
      }
    >
      {
        carouselSlideImage &&
        <div className={classes.carouselSlideInnerContainer}>
          <img alt='Slide image' src={carouselSlideImage} />
        </div>
      }

      <div className={classes.carouselSlideInnerContainer}>
        <p className={classes.carouselSlideText}>{carouselSlideText}</p>

        {
          carouselSlideButton &&
          <Button
            className={carouselSlideButtonCustomStyling || classes.carouselSlideButtonStyling}
            href={carouselSlideButtonLink}
            onClick={carouselSlideButtonOnClick}
          >
            {carouselSlideButtonLabel}
          </Button>
        }
      </div>
    </div>
  )
}

// Carousel

const Carousel: React.FC<CarouselProps> = ({
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
  const classes = useStyles()
  const { palette } = useTheme()

  const [slideNumber, setSlideNumber] = React.useState(initialSlide || 0)
  const amountOfSlides = slidesArray.length

  const handleCarouselSlideChange = (newSlideNumber: number) => {
    setSlideNumber(newSlideNumber)
  }

  const [isHoveringSlide, setIsHoveringSlide] = React.useState(false)

  const carouselSlides = slidesArray.map((slide, index) =>
    <div
      key={`slide_${index}`}
      onMouseEnter={() => { setIsHoveringSlide(true) }}
      onMouseLeave={() => { setIsHoveringSlide(false) }}
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
  )

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
  ))

  if (slidesAutoPlay) {
    /*
    If we want our slides to 'autoplay', we do the following:

    1) We set up an effect that fires every time the 'slideNumber' variable is manipulated
    (initialization included);
    2) Every time that effect fires, we set a timer for 'X' seconds (or 'X,xxx' milliseconds) - once that
    time is up, we manipulate the 'slideNumber' variable;
    3) Before the component is inevitably re-rendered, we execute the 'clearInterval' method so as to avoid
    stacking timeouts.

    This behavior repeats itself ad nauseam, UNLESS the user happens to hover over a particular slide.
    */

    // FIXME: hooks can not be called conditionally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      let scheduledCarouselSlideChange: NodeJS.Timeout

      if (!isHoveringSlide) {
        scheduledCarouselSlideChange = setTimeout(() => {
          if (slideNumber < (amountOfSlides - 1)) {
            const newSlideNumber = slideNumber + 1

            setSlideNumber(newSlideNumber)
          } else {
            setSlideNumber(0)
          }
        }, timeBetweenSlides || 1000)
      }

      return () => clearInterval(scheduledCarouselSlideChange)
    }, [isHoveringSlide, slideNumber, amountOfSlides, timeBetweenSlides])
  }

  return (
    <>
      <Fade
        in={carouselFadeIn || true}
        timeout={carouselFadeInDuration || 2500}
      >
        <div
          className={classes.carouselSlider}
          style={
            carouselBackgroundImage
              ? {
                background: `url(${carouselBackgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }
              // TODO: update this config
              : { backgroundColor: carouselBackgroundColor || palette.grey[700] }
          }
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
  )
}

export default Carousel
