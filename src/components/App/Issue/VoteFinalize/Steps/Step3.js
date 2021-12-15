import React, { useContext } from 'react'
import Button from 'commons/Buttons'
import { Wrapper, Header, Body } from './styles'
import { ButtonsWrapper, Next } from './Buttons'
import { VoteContext } from '../VoteContext'

const Step3 = ({ updateCurrentStep }) => {
  const { buildUrl } = useContext(VoteContext)
  return (
    <Wrapper>
      <div>
        <Header>Step #3: Create or import wallet in the zerotheft app</Header>
        <Body>
          Create zerotheft wallet into the zerotheft desktop app. If you already have one, you can import the wallet.
          After creating your wallet, please come back to the site and click continue.
        </Body>
        <ButtonsWrapper>
          <Button
            plain /* eslint-disable-next-line no-return-assign */
            onClick={() =>
              (window.location.href = `zerotheft://wallet?holonRedirectUrl=${encodeURIComponent(buildUrl())}`)
            }
          >
            Open Zerotheft Wallet
          </Button>
          <Next currentStep={3} updateCurrentStep={updateCurrentStep} />
        </ButtonsWrapper>
      </div>
    </Wrapper>
  )
}

export default Step3
