import React, { useContext } from 'react'
// import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import Button from 'commons/Buttons'
import { VoteContext } from '../VoteContext'

export const ButtonsWrapper = styled.div`
  display: flex;
  margin-top: 30px;
  ${Button} {
    :first-of-type {
      margin-right: 10px;
    }
  }
`

export const Previous = props => {
  return (
    <Button plain {...props}>
      <FontAwesomeIcon icon={faLongArrowAltLeft} style={{ marginRight: 10 }} />
      Previous
    </Button>
  )
}

export const Next = ({ currentStep, updateCurrentStep, ...props }) => {
  const { checkStep } = useContext(VoteContext)

  return (
    <Button
      onClick={async () => {
        const { msg, step } = await checkStep()
        if (step === 7) {
          return
        }
        if (step !== currentStep) updateCurrentStep(step)
        else if (msg) {
          toast.error(msg)
        }
      }}
      {...props}
    >
      Continue
      <FontAwesomeIcon icon={faLongArrowAltRight} style={{ marginLeft: 10 }} />
    </Button>
  )
}
