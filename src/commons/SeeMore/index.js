import React, { useState } from 'react'
import styled from 'styled-components'

import { truncateString } from 'utils'
import { colors } from 'theme'

const
  Extend = styled.span`
    font-size: 14px; font-weight: bold;
    cursor: pointer;
    color: ${colors.primary};
    white-space: nowrap;
    &::after {
      content: '';
      display: inline-block;
      width: 0; 
      height: 0; 
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid ${colors.primary};
      ${props => props.down && `
        border-bottom: none;
        border-top: 5px solid ${colors.primary};
      `}
      position: relative; top: -2px; margin-left: 3px;
    }
    ${props => !props.down && `
      margin-left: 5px;
    `}
  `, DescriptionPara = styled.p`
  white-space: pre-line;
  `

const
  SeeMore = ({ text = '', textLength = 175, initial = false }) => {
    const
      [state, changeState] = useState(initial)
    if (text && text.length > textLength)
      return <DescriptionPara>{state ? <React.Fragment>{text}<Extend onClick={() => changeState(false)}>See less</Extend></React.Fragment> : <React.Fragment>{truncateString(text, textLength)}<Extend onClick={() => changeState(true)} down>See More</Extend></React.Fragment>}</DescriptionPara>
    return <DescriptionPara>{text}</DescriptionPara>
  }

export default SeeMore