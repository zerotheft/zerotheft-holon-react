import React from "react"
import metamaskIcon from "assets/icons/metamask.svg"
import { LinkText } from "commons/styles"
import config from "config"
import { ButtonsWrapper, Next } from "./Buttons"
import { Wrapper, Header, Body, InnerWrapper, BodyInfo, SubHeader, OrderedList } from "./styles"

const Step6 = ({ proceed }) => {
  const { CENTRALIZED_SERVER_FRONTEND } = config
  const registrationLink = `${CENTRALIZED_SERVER_FRONTEND}/donation-wizard/donate`
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Step #4: Register your public voter ID</Header>
        <Body>
          <BodyInfo>We need your public voter ID so that we can keep track of your votes.</BodyInfo>
          <div>
            <SubHeader>Register Public Voter</SubHeader>

            <OrderedList>
              <li>
                Navigate to register voter.
                <LinkText onClick={() => window.open(registrationLink)}>Register Voter</LinkText>
              </li>
              <li>Select your country and enter your country&apos;s zip code.</li>
              <li>Enter your linkedin ID and linkedin full name. Click continue button.</li>
              <li>Login to your linkedin account so that we can verify you.</li>
              <li>Switch back to this page and click continue.</li>
            </OrderedList>
          </div>
          <ButtonsWrapper>
            <Next currentStep={4} proceed={proceed} />
          </ButtonsWrapper>
        </Body>
      </InnerWrapper>
      <img src={metamaskIcon} alt="Metamask" style={{ height: 300 }} />
    </Wrapper>
  )
}

export default Step6
