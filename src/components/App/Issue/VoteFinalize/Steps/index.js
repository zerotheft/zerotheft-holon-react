import React, { useEffect, useState, useContext } from 'react'
import { range } from 'lodash'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import stepsArrow from 'assets/icons/step-arrow.svg'
import check from 'assets/icons/check.svg'
import { colors } from 'theme'
import useCanVote from '../useCanVote'

import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'
import Step6 from './Step6'
import Step7 from './Step7'
import { VoteContext } from '../VoteContext'
// import { vote } from 'apis/vote'

const steps = range(1, 8)
const stepComponents = [Step6, Step7]

const Steps = (props) => {
  const { step } = useContext(VoteContext)
  const [currentStep, updateCurrentStep] = useState(step)
  const Step = stepComponents[currentStep - 1]

  const history = useHistory()
  useEffect(() => {
    updateCurrentStep(step)
  }, [step])

  if (!currentStep || currentStep > 7) return <div>Loading...</div>
  return (
    <div>
      <Header>
        <HeaderTitle>Complete all the steps, <br /> so you can vote</HeaderTitle>
        <StyledSteps>
          {steps.map(i => <StepWrapper>
            <Circle active={currentStep >= i}>
              {currentStep > i ? <img src={check} style={{ height: 28, width: 28 }} /> : `0${i}`}
            </Circle>
            <img src={stepsArrow} alt="" />
          </StepWrapper>)}
        </StyledSteps>
      </Header>
      <Body>
        <Step updateCurrentStep={updateCurrentStep} {...props} />
      </Body>
    </div>
  )
}

export default Steps

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`,
  HeaderTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
`,
  StyledSteps = styled.div`
  display: flex;
  img {
    height: 30px;
  }
  div:last-child {
    img {
      display: none;
    }
  }
`,
  StepWrapper = styled.div`
  display: flex;
  align-items: center;
`,
  Circle = styled.div`
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  background-color: ${props => props.active ? colors.primary : colors.backgroundColor};
  border-radius: 50%;
`,
  Body = styled.div`
  box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 58px 80px;
  margin: 40px 0;
`