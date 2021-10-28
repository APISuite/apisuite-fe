import React, { useState } from "react";
import Carousel from "react-spring-3d-carousel";
import { Box, Icon } from "@apisuite/fe-base";

import { APIHighlightCard } from "components/APIHighlightCard";
import { APIHighlightsCarouselProps } from "./types";
import useStyles from "./styles";

export const APIHighlightsCarousel: React.FC<APIHighlightsCarouselProps> = ({
  highlightsContent,
}) => {
  const classes = useStyles();

  const [currentSlide, setCurrentSlide] = useState(0);

  const highlightCards = highlightsContent.map((content, index) => {
    return (
      <APIHighlightCard
        description={content.description}
        key={`card${index}`}
        title={content.title}
      />
    );
  });

  const carouselHighlights = highlightCards.map((card) => {
    return {
      key: card.key,
      content: card,
    };
  });

  if (!carouselHighlights.length) return null;

  return (
    <Box className={classes.highlightsBackgroundBanner}>
      <Box mb={8}>
        <Carousel
          showNavigation
          slides={carouselHighlights}
          goToSlide={currentSlide}
        />
      </Box>

      <Box>
        {
          carouselHighlights.map((_highlight, index) => {
            return (
              <button
                className={classes.carouselButton}
                key={`carouselButton${index}`}
                onClick={() => setCurrentSlide(index)}
              >
                {
                  currentSlide === index
                    ? <Icon>circle</Icon>
                    : <Icon>radio_button_unchecked</Icon>
                }
              </button>
            );
          })
        }
      </Box>
    </Box>
  );
};
