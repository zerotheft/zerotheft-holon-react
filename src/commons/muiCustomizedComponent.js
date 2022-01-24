import { colors } from "theme"

const { Rating } = require("@mui/material")
const { styled } = require("@mui/system")

export const CustomMUIRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: colors.secondaryVariant2,
  },
  "& .MuiRating-iconEmpty": {
    color: colors.grey300,
  },
})
