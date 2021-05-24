import React, { useContext } from 'react'
import { get } from 'lodash'
import styled from 'styled-components'
import { AppContext } from '../AppContext'
import { Container } from 'commons/styles'
import Paths from './Paths'
import TheftInfo from './TheftInfo'
import IssueSlider from './IssueSlider'
import Button from 'commons/Buttons'
import { colors } from 'theme'
import { DESKTOP_APP_DOWNLOAD_LINK } from 'constants/index'

const Home = () => {
  const { selectedHolon, theftInfo } = useContext(AppContext)

  return <React.Fragment>
    <IssueSlider />
    <TheftInfo summary={get(theftInfo, 'info')} />
    <Paths summary={theftInfo} />
    <AboutSection>
      <Container>
        <AboutZT>
          <h3>ZeroTheft.net</h3>
          <p>
            ZeroTheft (ZT) is a tool and infrastructure intended to provide a means for citizens to publish researched documentation of government corruption.  It is built on the premise that corruption can be quantified by a specific monetary amount that is “taken” from taxpayers -- this is what is termed “theft”.
          </p>
          <ButtonWrapper>
            <Button onClick={() => window.open(DESKTOP_APP_DOWNLOAD_LINK)}>Download Now</Button>
            <Button onClick={() => window.open('https://zerotheft.net')} plain>About ZeroTheft.net</Button>
          </ButtonWrapper>
        </AboutZT>
        <AboutZT>
          {selectedHolon['port'] && <React.Fragment>
            <h3>About<br /> {selectedHolon['port']}</h3>
            <p>
              {selectedHolon['description'] ||
                "This will be a holon description. ZeroTheft (ZT) is a tool and infrastructure intended to provide a means for citizens to publish researched documentation of government corruption.  It is built on the premise that corruption can be quantified by a specific monetary amount that is “taken” from taxpayers -- this is what is termed “theft”."}
            </p>
            <ButtonWrapper style={{ display: 'none' }}>
              <Button onClick={() => { }} plain>View Profile</Button>
            </ButtonWrapper>
          </React.Fragment>}
        </AboutZT>
      </Container>
    </AboutSection>
  </React.Fragment>
}

Home.propTypes = {}

export default Home

const AboutSection = styled.div`
  padding: 40px 0;
  ${Container} {
    display: flex;
    flex-direction: row;
    & > div {
      flex: 1;
      &:first-of-type {
        margin-right: 45px;
      }
    }
  }
`,
  AboutZT = styled.div`
  h3 {
    font-size: 32px;
    font-weight: 800;
    color: ${colors.primary};
    margin-bottom: 15px;
  }
  p {
    font-size: 18px;
    font-weight: 400;
  }
`,
  ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  & > button {
    min-width: 165px;
    height: 48px;
    font-size: 14px;
    border-width: 2px;
    &:first-of-type {
      margin-right: 15px;
    }
  }
`
