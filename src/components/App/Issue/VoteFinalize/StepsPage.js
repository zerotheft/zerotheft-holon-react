import React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import Button from 'commons/Buttons'
import { LinkText } from 'commons/styles'
import { DESKTOP_APP_DOWNLOAD_LINK } from 'constants/index'

const StepsPage = ({ step = 1, checkSteps, vote }) => {
  return (
    <Wrapper>
      <Header>Please complete these steps to vote:</Header>
      <Step isCompleted={step > 1}>
        1.{' '}
        <a target="_blank" href={DESKTOP_APP_DOWNLOAD_LINK} rel="noopener noreferrer">
          Install
        </a>
        , <a href="zerotheft://">open</a> and log into your zerotheft desktop app.
      </Step>
      <Step isCompleted={step > 2} isFutureStep={step < 2}>
        2. <a href="zerotheft://wallet">Create or import wallet in the zerotheft desktop app.</a>
      </Step>
      <Step isCompleted={step > 3} isFutureStep={step < 3}>
        3.{' '}
        <a href="zerotheft://auth">
          Complete your profile and create voter id in your ZeroTheft Desktop App. For that, click on register voter tab
          which can be found inside the profile dropdown on the top right section.
        </a>
      </Step>
      <Step isCompleted={step > 4} isFutureStep={step < 4}>
        4. Metamask Setup:
        <ol type="a" style={{ marginLeft: 35 }}>
          <li>
            If you don't have metamask yet: Install{' '}
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkText style={{ fontSize: 14 }}>metamask extension</LinkText>
            </a>{' '}
            in your chrome browser.
          </li>
          <li>
            Click "import wallet" after installing metamask. If you already have a wallet in your metamask, click
            "import account using seed phrase".
          </li>
          <li>
            Copy the seed phrase from zerotheft desktop app that you can find in "Key/Phrase" section of "wallet" tab.
          </li>
          <li>Paste it into the metamask input and follow the necessary steps.</li>
        </ol>
      </Step>
      <Step isCompleted={step > 5} isFutureStep={step < 5}>
        5. Connect holon into your metamask account. Select the account that you want to connect to the holon. Make sure
        that the selected wallet is the wallet that matches with the zerotheft desktop wallet.
      </Step>

      <Button
        onClick={async() => {
          if (step === 4) {
            window.location.href = `${window.location.origin + window.location.pathname}?q=steps`
          }

          const { step: newStep, msg } = await checkSteps()
          if (newStep >= 6) {
            vote()
            return
          }

          if (step === newStep) {
            toast.error(msg)
          }
        }}
      >
        Next
      </Button>
    </Wrapper>
  )
}

export default StepsPage

const Wrapper = styled.div``,
  Step = styled.div`
    margin-bottom: 8px;
    font-size: 14px;
    ${props =>
    props.isCompleted &&
      `
      color: green;
      background: url(${require('assets/icons/check-circle-solid.svg')}) no-repeat 0 2px transparent;
      background-size: 15px;
      padding-left: 20px;
      a {
        color: green;
      }
    `}
    ${props =>
    props.isFutureStep &&
      `
      opacity: 0.2;
      pointer-events: none;
    `}
  `,
  Header = styled.div`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
  `
