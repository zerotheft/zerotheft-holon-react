import React from 'react'
import styled from 'styled-components'

import CompareContent from './CompareContent'

const Compare = ({ title, data, hideBtn, id }) => {
  return <Wrapper>
    <CompareContentWrapper>
      <CompareContent vote='yes' title={title} data={data.proposal} hideBtn={hideBtn} id={id} />
      <CompareContent vote='no' title={title} data={data.counterProposal} hideBtn={hideBtn} id={id} />
    </CompareContentWrapper>
  </Wrapper>
}

export default Compare

const Wrapper = styled.div`
  margin: 20px 0;
  background: #FFFFFF;
  box-shadow: 0px 4px 44px rgba(0, 0, 0, 0.17);
  border-radius: 40px;
  overflow: hidden;
`,
  CompareContentWrapper = styled.div`
  & > div:last-of-type {
    margin-top: 20px;
  }
  @media(min-width: 991px) {
    display: flex;
    flex-direction: row;
    & > div:last-of-type {
      margin: 0 0 0 20px;
    }
  }
`
