import React from "react"

// import PropTypes from 'prop-types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLongArrowAltLeft, faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons"
import styled from "styled-components"
import Button from "commons/Buttons"

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  ${Button} {
    :first-of-type {
      margin-right: 10px;
    }
  }
`

export const Previous = (props) => {
  return (
    <Button plain {...props}>
      <FontAwesomeIcon icon={faLongArrowAltLeft} style={{ marginRight: 10 }} />
      Previous
    </Button>
  )
}

export const Next = ({ currentStep, updateCurrentStep, proceed, ...props }) => {
  return (
    <Button
      onClick={async () => {
        await proceed()
      }}
      {...props}
    >
      Continue
      <FontAwesomeIcon icon={faLongArrowAltRight} style={{ marginLeft: 10 }} />
    </Button>
  )
}
