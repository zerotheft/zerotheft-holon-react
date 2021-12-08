import React from 'react'
import metamaskIcon from 'assets/icons/metamask.svg'
import styled from 'styled-components'
import config from 'config'
import { ButtonsWrapper, Next } from './Buttons'
import { Wrapper, Header, Body, InnerWrapper, BodyInfo, OrderedList, SubHeader, Info } from './styles'

const { MODE, TOKEN, CHAIN_ID, HTTP_PROVIDER } = config

const Step5 = ({ updateCurrentStep }) => {
  let name
  switch (MODE) {
  case 'private':
    name = 'ETC Privatenet'
    break
  case 'staging':
    name = 'Polygon Testnet'
    break
  case 'production':
    name = 'Polygon Mainnet'
    break
  default:
    name = 'Local Network'
    break
  }
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Step #2: Configure Zerotheft Wallet</Header>
        <Body>
          <BodyInfo>We need to configure zerotheft wallet to connect to {name}.</BodyInfo>
          <div>
            <SubHeader>Zerothet Wallet Network Setup</SubHeader>
            <Info>If you have already done the following steps, select &apos;{name}&apos; from network selector tab.</Info>
            <StyledOrderedList>
              <li>Open my accounts selector at the top right corner section of the zerotheft wallet.</li>
              <li>Click on settings and then go to networks setting.</li>
              <li>
                Click &apos;Add Network&apos; button and fill the details as:
                <br />
                <div>
                  <span>Network Name:</span> {name}
                </div>
                <div>
                  <span>New RPC URL:</span> {HTTP_PROVIDER}
                </div>
                <div>
                  <span>Chain ID:</span> {CHAIN_ID}
                </div>
                <div>
                  <span>Currency Symbol:</span> {TOKEN}
                </div>
              </li>
              <li>Click on save</li>
            </StyledOrderedList>
          </div>
          <ButtonsWrapper>
            <Next currentStep={5} updateCurrentStep={updateCurrentStep} />
          </ButtonsWrapper>
        </Body>
      </InnerWrapper>
      <img src={metamaskIcon} alt="Metamask" style={{ height: 300 }} />
    </Wrapper>
  )
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
