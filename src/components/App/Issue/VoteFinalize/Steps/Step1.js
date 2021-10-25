import React from 'react'
import { DESKTOP_APP_DOWNLOAD_LINK } from 'constants/index'
import Button from 'commons/Buttons'
import { Wrapper, Header, Body } from './styles'
import { ButtonsWrapper, Next } from './Buttons'

const Step1 = ({ updateCurrentStep }) => {
  return <Wrapper>
    <div>
      <Header>Step #1: Download the Zero Theft Desktop App</Header>
      <Body>
        <span>Please install the zerotheft from this link:</span>
        <Button style={{ margin: '20px 0' }} onClick={() => window.open(DESKTOP_APP_DOWNLOAD_LINK, '_blank')}>Download Zerotheft</Button>
        <span>or I already have the zerotheft app installed</span>
      </Body>
      <ButtonsWrapper>
        <Next onClick={() => updateCurrentStep(2)} />
      </ButtonsWrapper>
    </div>
  </Wrapper>
}

export default Step1
