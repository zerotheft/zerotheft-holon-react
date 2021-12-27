import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import Step7 from './Step7'
import { VoteContext } from '../VoteContext'

// import { vote } from 'apis/vote'

// const steps = range(4, 8);
// const stepComponents = [Step4, Step5, Step6, Step7];

const Steps = (props) => {
  const { step, voterInfo } = useContext(VoteContext)
  /* eslint-disable-next-line no-unused-vars */
  const [currentStep, updateCurrentStep] = useState(step)
  const Step = Step7
  useEffect(() => {
    updateCurrentStep(step)
  }, [step])

  const setCitizenID = async () => {
    localStorage.setItem('citizenID', voterInfo.unverifiedCitizen)
    return true
  }

  useEffect(() => {
    setCitizenID()
  }, [])

  return (
    <div>
      <Body>
        <Step updateCurrentStep={updateCurrentStep} {...props} />
      </Body>
    </div>
  )
}

export default Steps

// const Header = styled.div`
//     display: flex;
//     justify-content: space-between;
//   `,
//   HeaderTitle = styled.div`
//     font-size: 30px;
//     font-weight: 600;
//   `,
//   StyledSteps = styled.div`
//     display: flex;
//     img {
//       height: 30px;
//     }
//     div:last-child {
//       img {
//         display: none;
//       }
//     }
//   `,
//   StepWrapper = styled.div`
//     display: flex;
//     align-items: center;
//   `,
//   Circle = styled.div`
//     height: 70px;
//     width: 70px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #fff;
//     font-size: 30px;
//     font-weight: 600;
//     background-color: ${props =>
//     props.active ? colors.primary : colors.backgroundColor};
//     border-radius: 50%;
//   `,
const Body = styled.div`
  box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 58px 80px;
  margin: 40px 0;
`
