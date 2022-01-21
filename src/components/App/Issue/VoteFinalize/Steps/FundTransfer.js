import React from "react"
import metamaskIcon from "assets/icons/metamask.svg"
import { ButtonsWrapper, Next } from "./Buttons"
import { Wrapper, Header, Body, InnerWrapper, BodyInfo } from "./styles"

const FundTransfer = ({ proceed }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Step #6: Fund transfer to your wallet</Header>
        <Body>
          <BodyInfo>We are unable to transfer fund to your wallet please try again.</BodyInfo>

          <ButtonsWrapper>
            <Next currentStep={6} proceed={proceed} />
          </ButtonsWrapper>
        </Body>
      </InnerWrapper>
      <img src={metamaskIcon} alt="Metamask" style={{ height: 300 }} />
    </Wrapper>
  )
}

export default FundTransfer
