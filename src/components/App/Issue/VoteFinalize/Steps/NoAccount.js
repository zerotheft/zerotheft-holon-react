import React from "react"
import metamaskIcon from "assets/icons/metamask.svg"
import { ButtonsWrapper, Next } from "./Buttons"
import { Wrapper, Header, Body, InnerWrapper, BodyInfo, SubHeader, Info, OrderedList } from "./styles"

const NoAccount = ({ updateCurrentStep, proceed }) => {
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Step #3: Create or Import Wallet</Header>
        <Body>
          <BodyInfo>You need to create/import account in order to vote</BodyInfo>
          <div>
            <SubHeader>Zerothet Wallet Account Setup</SubHeader>
            <Info>
              If you have already created or imported an account in wallet, Please click on continue. else, please
              follow below steps.
            </Info>
            <OrderedList>
              <li>Click on your wallet.</li>
              <li>Click on import or create wallet.</li>
              <li>Proceed to create or import wallet</li>
              <li>Click on continue. </li>
            </OrderedList>
          </div>
          <ButtonsWrapper>
            <Next currentStep={3} updateCurrentStep={updateCurrentStep} proceed={proceed} />
          </ButtonsWrapper>
        </Body>
      </InnerWrapper>
      <img src={metamaskIcon} alt="Metamask" style={{ height: 300 }} />
    </Wrapper>
  )
}

export default NoAccount
