import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { get, isEmpty } from 'lodash'
import PropTypes from 'prop-types'
import { colors } from 'theme'
import styled from 'styled-components'

import { AppContext } from '../AppContext'
import Button from 'commons/Buttons'
import { Container } from 'commons/styles'

import { convertDollarToString } from 'utils'

const TheftInfo = ({ summary = {} }) => {
  const history = useHistory()
  const { filterParams } = useContext(AppContext)
  console.log(summary)
  return <Wrapper>
    <Container>
      <TitleContent>
        <h3>The TOTAL amount stolen in the Rigged Economy:</h3>
        <Button onClick={() => history.push(`/pathReport/${get(filterParams, 'initPath')}`)}
          height={44} width={170}>View Report</Button>
      </TitleContent>
      {!isEmpty(summary) &&
        <InfoWrapper>
          {/* <InfoBox>
            <h5>Stolen this year</h5>
            <h3>${convertDollarToString(summary.total, 2)}{summary.proposals === 0 && summary.votes === 0 && <InfoText>(proposals and votes not available)</InfoText>}</h3>
            <h6>In USA</h6>
          </InfoBox> */}
          {/* <InfoBox>
          <h5>Stolen each year</h5>
          <h3>${convertDollarToString(summary.each_year)}</h3>
          <h6>Per Citizen in USA</h6>
        </InfoBox> */}
          <InfoBox>
            <h5>Stolen in {summary.between_years} years</h5>
            <h3>${convertDollarToString(summary.many_years, 2)}</h3>
            <h6>In USA</h6>
          </InfoBox>
        </InfoWrapper>
      }
    </Container>
  </Wrapper>
}

TheftInfo.propTypes = {
  history: PropTypes.object,
  summary: PropTypes.object
}

export default TheftInfo

const Wrapper = styled.section`
  position: relative;
  min-height: 100px;
`,
  TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 29px;
    font-weight: 500;
    color: 39313F;
  }
  button {
    font-size: 18px;
    font-weight: 600;
  }
  margin-bottom: 35px;
`,
  InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`,
  InfoBox = styled.div`
  width: calc((100% - 86px)/2);
  background: #C5EEE4;
  border-radius: 23px;
  padding: 25px 40px;
  box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.08);
  &:first-of-type {
    background: #EBE0F3;
    margin-right: 43px;
  }
  &:last-of-type {
    background: #EEE5C5;
    margin-left: 43px;
  }
  h3 {
    font-size: 75px;
    font-weight: 700;
    color: #000;
  }
  h5 {
    font-size: 23px;
    font-weight: 500;
    color: #000;
  }
  h6 {
    font-size: 18px;
    font-weight: 500;
    color: #000;
  }
`, InfoText = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.text.gray};
`
