import React from "react"
import metamaskIcon from "assets/icons/metamask.svg"
import { LinkText } from "commons/styles"
import config from "config"
import { ButtonsWrapper, Next } from "./Buttons"
import { Wrapper, Header, Body, InnerWrapper, BodyInfo, SubHeader, Info, OrderedList } from "./styles"

const UnverifiedCitizen = ({ proceed }) => {
  const { CENTRALIZED_SERVER_FRONTEND } = config
  const retryUrl = `${CENTRALIZED_SERVER_FRONTEND}/donation-wizard/identity-verification?retry=true`
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Step #5: Verify Voter Id</Header>
        <Body>
          <BodyInfo>You need to verify your voter id in order to vote</BodyInfo>
          <div>
            <SubHeader>Voter ID verification</SubHeader>
            <Info>
              If you have already verified your voter id, Please click on continue. else, please follow below steps.
            </Info>
            <OrderedList>
              <li>
                Please click
                <LinkText onClick={() => window.open(retryUrl)}> here </LinkText>
                to verify.
              </li>
              <li>Proceed to verify your Voter Id</li>
              <li>Once Voter id has been verified, Click on continue. </li>
            </OrderedList>
          </div>
          <ButtonsWrapper>
            <Next currentStep={5} proceed={proceed} />
          </ButtonsWrapper>
        </Body>
      </InnerWrapper>
      <img src={metamaskIcon} alt="Metamask" style={{ height: 300 }} />
    </Wrapper>
  )
}

export default UnverifiedCitizen
