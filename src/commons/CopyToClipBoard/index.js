import React from "react"
import styled from "styled-components"

import { colors } from "theme"
import { truncateString } from "utils"

// eslint-disable-next-line react/prop-types
const CopyToClipBoard = ({ text, length = 13 }) => {
  return <Wrapper>{truncateString(text, length)}</Wrapper>
}

export default CopyToClipBoard

const Wrapper = styled.div`
  cursor: pointer;
  color: ${colors.primary};
`
