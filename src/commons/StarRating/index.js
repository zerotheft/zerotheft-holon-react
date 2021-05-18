import React from 'react'
import StarRatings from 'react-star-ratings'
import { colors } from 'theme'

const StarRating = ({ value = 0, dimension = 15 }) => {
  return  <StarRatings
    rating={value}
    starRatedColor={colors.primary}
    numberOfStars={5}
    isSelectable={false}
    starDimension={dimension}
    starSpacing="0px"
  />
}

export default StarRating