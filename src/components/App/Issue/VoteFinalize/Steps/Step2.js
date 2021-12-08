import React, { useContext } from 'react'
import { LinkText } from 'commons/styles'
import config from 'config'
import { Wrapper, Header, Body, SubHeader, OrderedList } from './styles'
import { ButtonsWrapper, Previous, Next } from './Buttons'
import { VoteContext } from '../VoteContext'

const { MODE } = config

const networks = {
  private: 'privatenet',
  staging: 'testnet',
  production: 'mainnet',
}

const Step2 = ({ updateCurrentStep }) => {
  const { voterInfo, buildUrl } = useContext(VoteContext)

  return (
    <Wrapper>
      <div>
        <Header>
          Step #2: Make sure the app launches {voterInfo.network !== MODE && 'and select the right environment'}
        </Header>
        <Body>
          <span style={{ maxWidth: 500 }}>
            Please open the Zero Theft Desktop App. You will likely need to give security permission. After you have
            successfully opened the Zero Theft Desktop App, please create your zerotheft account and click continue.
          </span>
          {voterInfo.network !== MODE && (
            <div style={{ marginTop: 20 }}>
              <SubHeader>Envirnoment Setup</SubHeader>
              <OrderedList>
                <li>
                  Open settings page in zerotheft.
                  <LinkText /* eslint-disable-next-line no-return-assign */
                    onClick={() =>
                    (window.location.href = `zerotheft://settings/environment?holonRedirectUrl=${encodeURIComponent(
                      buildUrl()
                    )}`)
                    }
                  >
                    Settings
                  </LinkText>
                </li>
                <li>Select {networks[MODE] || 'testnet'} and save.</li>
                <li>Get back to this page and click next.</li>
              </OrderedList>
            </div>
          )}
        </Body>
        <ButtonsWrapper>
          <Previous onClick={() => updateCurrentStep(1)} />
          <Next currentStep={2} updateCurrentStep={updateCurrentStep} />
        </ButtonsWrapper>
      </div>
    </Wrapper>
  )
}

export default Step2
