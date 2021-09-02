import React from 'react'
import { Wrapper, Header, Body, InnerWrapper, BodyInfo, OrderedList, SubHeader, Info } from './styles'
import { ButtonsWrapper, Next } from './Buttons'
import metamaskIcon from 'assets/icons/metamask.svg'
import styled from 'styled-components'
import config from 'config'

const { MODE, CHAIN_ID, HTTP_PROVIDER } = config

const Step5 = ({ updateCurrentStep }) => {
  const name = MODE === 'private' ? 'ETC Private' : 'ETC'

  return <Wrapper>
    <InnerWrapper>
      <Header>Step #5: Configure metamask to ethereum classic</Header>
      <Body>
        <BodyInfo>We need to configure metamask to connect to ETC network.
        </BodyInfo>
        <div>
          <SubHeader>Metamask Network Setup</SubHeader>
          <Info>If you have already done the following steps, select '{name}' from network selector tab.</Info>
          <StyledOrderedList>
            <li>Open my accounts selector at the top right corner section of the metamask.</li>
            <li>Click on settings and then go to networks setting.</li>
            <li>Click 'Add Network' button and fill the details as:<br />
              <div><span>Network Name:</span> {name}</div>
              <div><span>New RPC URL:</span> {HTTP_PROVIDER}</div>
              <div><span>Chain ID:</span> {CHAIN_ID} </div>
              <div><span>Currency Symbol:</span> ETC</div>
            </li>
            <li>Click on save</li>
          </StyledOrderedList>
        </div>
        <ButtonsWrapper>
          <Next currentStep={5} updateCurrentStep={updateCurrentStep} />
        </ButtonsWrapper>
      </Body>
    </InnerWrapper>
    <img src={metamaskIcon} style={{ height: 300 }} />
  </Wrapper>
}


export default Step5

const StyledOrderedList = styled(OrderedList)`
  li {
    div {
      margin-top: 5px;
      span {
        font-weight: 600;
      }
    }
  }
`