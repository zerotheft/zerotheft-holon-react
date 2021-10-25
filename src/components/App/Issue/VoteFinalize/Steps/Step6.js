import React, { useContext } from 'react'
import metamaskIcon from 'assets/icons/metamask.svg'
import Button from 'commons/Buttons'
import { LinkText } from 'commons/styles'
import { toast } from 'react-toastify'
import { AppContext } from 'components/App/AppContext'
import config from 'config'
import { VoteContext } from '../VoteContext'
import { ButtonsWrapper } from './Buttons'
import { Wrapper, Header, Body, InnerWrapper, BodyInfo, SubHeader, OrderedList } from './styles'

const Step6 = ({ updateCurrentStep }) => {
  const { ws } = useContext(AppContext)
  const { checkStep, voterInfo } = useContext(VoteContext)
  const shouldCheck = ws && ws.readyState === 1
  const { CENTRALIZED_SERVER_FRONTEND } = config
  return <Wrapper>
    <InnerWrapper>
      <Header>Step #3: Register your public voter ID</Header>
      <Body>
        <BodyInfo>We need your public voter ID so that we can keep track of your votes.
        </BodyInfo>
        <div>
          <SubHeader>Register Public Voter</SubHeader>

          <OrderedList>
            <li>Navigate to register voter. <LinkText onClick={() => window.open(CENTRALIZED_SERVER_FRONTEND)}>Register Voter</LinkText></li>
            <li>Select your country and enter your country's zip code.</li>
            <li>Enter your linkedin ID and linkedin full name. Click continue button.</li>
            <li>Login to your linkedin account so that we can verify you.</li>
            <li>Switch back to this page and click vote.</li>
          </OrderedList>
        </div>
        <ButtonsWrapper>
          <Button
            disabled={false && shouldCheck && voterInfo.ethereumAddress}
            onClick={async() => {
              const { msg, step } = await checkStep()
              if (step < 6) updateCurrentStep(step)
              else if (msg) {
                toast.error(msg)
              }
            }}>Vote</Button>
        </ButtonsWrapper>
      </Body>
    </InnerWrapper>
    <img src={metamaskIcon} style={{ height: 300 }} />
  </Wrapper>
}


export default Step6
