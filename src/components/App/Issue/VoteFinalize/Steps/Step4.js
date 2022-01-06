import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import metamaskIcon from "assets/icons/metamask.svg"
import Button from "commons/Buttons"
import { LinkText } from "commons/styles"
import { VoteContext } from "../VoteContext"
import { ButtonsWrapper, Next } from "./Buttons"
import { Wrapper, Header, Body, InnerWrapper, OrderedList } from "./styles"

const Step4 = ({ updateCurrentStep, checkRequirements }) => {
  const { checkStep, voterInfo, loadWeb3 } = useContext(VoteContext)
  const [userType, updateUserType] = useState("newUser")

  useEffect(() => {
    checkStep()
  }, [])

  const connectMetamask = () => {
    if (window.etherem) {
      loadWeb3()
    } else {
      // window.location.href = buildUrl()
      window.location.reload()
    }
  }

  const hasMnemonic = voterInfo ? voterInfo.hasMnemonic : false

  return (
    <Wrapper>
      <InnerWrapper>
        <Header>Step #1: Setup Zerotheft Wallet</Header>
        <Body>
          {!userType ? (
            <Question>
              Have you worked with zerotheft wallet before?
              <ButtonsWrapper style={{ marginTop: 10 }}>
                <Button
                  onClick={() => {
                    updateUserType("oldUser")
                  }}
                >
                  Yes
                </Button>
                <Button plain onClick={() => updateUserType("newUser")}>
                  No
                </Button>
              </ButtonsWrapper>
            </Question>
          ) : (
            <div>
              {/* <FlexBox>
                <div className="metamask-header">Zerotheft Wallet Setup</div>
                <Selector>
                  <Option selected={userType === 'newUser'} onClick={() => updateUserType('newUser')}>
                    New User
                  </Option>
                  <Option selected={userType === 'oldUser'} onClick={() => updateUserType('oldUser')}>
                    Old User
                  </Option>
                </Selector>
              </FlexBox> */}
              <OrderedList>
                {userType === "newUser" ? (
                  <>
                    <li>
                      Download and open Zerotheft Wallet
                      <LinkText
                        onClick={() =>
                          window.open(
                            "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
                            "_blank"
                          )
                        }
                      >
                        Download Metamask
                      </LinkText>
                    </li>
                    {hasMnemonic ? (
                      <></>
                    ) : (
                      <>
                        <li>
                          Create your zerotheft wallet account by clicking create wallet button and follow necessary
                          steps.
                        </li>
                        <li>
                          Connect zerotheft wallet to our holon.{" "}
                          <LinkText onClick={() => connectMetamask()}>Connect</LinkText>
                        </li>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <li>
                      Connect zerotheft wallet to our holon.{" "}
                      <LinkText onClick={() => connectMetamask()}>Connect</LinkText>
                    </li>
                    <li>If you see not connected info in your zerotheft wallet, click there and connect the wallet.</li>
                  </>
                )}
              </OrderedList>
            </div>
          )}
          <ButtonsWrapper>
            <Next currentStep={4} updateCurrentStep={updateCurrentStep} checkRequirements={checkRequirements} />
          </ButtonsWrapper>
        </Body>
      </InnerWrapper>
      <img src={metamaskIcon} alt="Zerotheft Wallet" style={{ height: 300 }} />
    </Wrapper>
  )
}

export default Step4

const Question = styled.div``
