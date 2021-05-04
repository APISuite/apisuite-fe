export type CarouselSlideProps = {
  carouselSlideButton?: boolean,
  carouselSlideButtonCustomStyling?: string,
  carouselSlideButtonLabel?: string,
  carouselSlideButtonLink?: string,
  carouselSlideButtonOnClick?: () => void,
  carouselSlideContentsPlacement?: string,
  carouselSlideImage?: string,
  carouselSlideText?: string,
}

export type SlideContentsObject = {
  slideButton?: boolean,
  slideButtonLabel?: string,
  slideButtonLink?: string,
  slideContentsPlacement?: "side-by-side" | "top-to-bottom",
  slideForegroundImage?: string,
  slideText?: string,
}

export type CarouselProps = {
  carouselBackgroundColor?: string,
  carouselBackgroundImage?: string,
  carouselFadeIn?: boolean,
  carouselFadeInDuration?: number, // A value in miliseconds (e.g., 5000 miliseconds = 5 seconds)
  iconsOfSliderButtonsArray?: JSX.Element[], // Material UI icon components
  initialSlide?: number,
  slidesArray: SlideContentsObject[],
  slidesAutoPlay?: boolean,
  slidingAnimationDuration?: number, // A value in miliseconds (e.g., 5000 miliseconds = 5 seconds)
  timeBetweenSlides?: number, // A value in miliseconds (e.g., 5000 miliseconds = 5 seconds)
}
