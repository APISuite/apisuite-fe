import * as React from 'react'
import autoPlay from 'react-swipeable-views-utils/lib/autoPlay'
import virtualize from 'react-swipeable-views-utils/lib/virtualize'
import bindKeyboard from 'react-swipeable-views-utils/lib/bindKeyboard'
import SwipeableViews from 'react-swipeable-views'
import Dots from 'material-ui-dots'
import { CarouselProps, RendererProps } from './types'
import useStyles from './styles'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

const VirtualizeSwipeViews = bindKeyboard(virtualize(SwipeableViews))
const VirtualizeAutoPlaySwipeViews = autoPlay(VirtualizeSwipeViews)

// modulo that supports negative numbers (so that e.g. -5 % 4 = 3)
const modulo = (a: number, n: number) => ((a % n) + n) % n

const carouselSlideRenderer = (children: React.ReactNodeArray) =>
  ({ index, key }: RendererProps) => React.cloneElement(children[modulo(index, children.length)] as any, { key })

const renderContent = (slidesConfig: any, classes: any, t: any) => (
  slidesConfig.map((slide: any, i: number) => (
    <div key={i} className={classes.slide}>
      <img className={classes.slideImage} src={slide.img} alt='' />

      <div className={classes.spacer} />

      <section className={classes.slideInfo}>
        <h1 className={classes.slideInfoH1}>{t(slide.title)}</h1>

        {/** TODO: strings are not being escaped from translations, this needs to be reviwed */}
        <p className={classes.slideInfoParagraph} dangerouslySetInnerHTML={{ __html: t(slide.subtitle) }} />

        {slide.content && (
          <p
            className={classes.slideInfoParagraph}
            dangerouslySetInnerHTML={{ __html: t(slide.content) }}
          />
        )}

        <div
          role='button'
          arial-label='register'
          className={clsx(classes.btn, {
            [classes.btn2]: slide.btn === 2,
            [classes.btn3]: slide.btn === 3,
          })}
        >
          {!slide.disabled &&
            <a href={slide.link} className={classes.buttonLink}>
              {t(slide.button)}
            </a>}
          {slide.disabled &&
            <div>{t(slide.button)}</div>}
        </div>
      </section>
    </div>
  ))
)

const Carousel: React.FC<CarouselProps> = ({ slideConfig }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const autoplay = true
  const content = renderContent(slideConfig, classes, t)
  const slideRenderer = carouselSlideRenderer(content)
  const [slideIndex, setSlideIndex] = React.useState(0)

  function handleChange (slideIndex: number) {
    setSlideIndex(slideIndex)
  }

  const Views = autoplay ? (
    <VirtualizeAutoPlaySwipeViews
      interval={8000}
      slideRenderer={slideRenderer}
      index={slideIndex}
      onChangeIndex={handleChange}
    />
  ) : (
    <VirtualizeSwipeViews
      slideRenderer={slideRenderer}
      index={slideIndex}
      onChangeIndex={handleChange}
    />
  )

  return (
    <div className={classes.root}>
      {Views}

      <Dots
        count={content.length}
        index={modulo(slideIndex, content.length)}
        className={classes.dots}
        onDotClick={handleChange}
      />
    </div>
  )
}

export default Carousel
