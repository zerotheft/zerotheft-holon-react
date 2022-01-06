import React from "react"
import metamaskIcon from "assets/icons/metamask.svg"
import config from "config"
import { ButtonsWrapper, Next } from "./Buttons"
import { Wrapper, Header, Body, InnerWrapper, BodyInfo } from "./styles"

const { MODE } = config

const NoAccount = ({ updateCurrentStep, checkRequirements }) => {
  let name
  switch (MODE) {
    case "private":
      name = "ETC Privatenet"
      break
    case "staging":
      name = "Polygon Testnet"
      break
    case "production":
      name = "Polygon Mainnet"
      break
    default:
      name = "Local Network"
      break
  }
  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Step #3: Create or Import Wallet</Header>
        <Body>
          <BodyInfo>You need to create/import account in zerotheft wallet to connect to {name}.</BodyInfo>
          {/* <div>
            <SubHeader>Zerothet Wallet Network Setup</SubHeader>
            <Info>
              If you have already done the following steps, select &apos;{name}
              &apos; from network selector tab.
            </Info>
            <StyledOrderedList>
              <li>
                Open my accounts selector at the top right corner section of the
                zerotheft wallet.
              </li>
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
          </div> */}
          <ButtonsWrapper>
            <Next currentStep={5} updateCurrentStep={updateCurrentStep} checkRequirements={checkRequirements} />
          </ButtonsWrapper>
        </Body>
      </InnerWrapper>
      <img src={metamaskIcon} alt="Metamask" style={{ height: 300 }} />
    </Wrapper>
  )
}

export default NoAccount
