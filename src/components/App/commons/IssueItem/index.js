import React from 'react'
import { get } from 'lodash'
import styled from 'styled-components'

import { numberWithCommas } from 'utils'

const IssueItem = ({ data = {}, style = {}, onClick, hideAmount = false }) => {
  return <Wrapper style={style} onClick={() => onClick ? onClick() : null} cursor={onClick}>
    <div>
      <div>id: {get(data, 'id', 'N/A')}</div>
      {(!hideAmount && get(data, 'amount')) && <div>${numberWithCommas(get(data, 'amount'))}</div>}
    </div>
    <div>
      <div>Proposal</div>
      <div>({data.votes || 0} Votes)</div>
    </div>
  </Wrapper>
}

export default IssueItem

const Wrapper = styled.div`
  background: #c9f1fd;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  transition: background-color 0.2s ease;
  & > div {
    padding: 10px 15px;
  }
  ${props => props.cursor && `
    cursor: pointer;
    &:hover {
      background: #fef8a0;
    }
  `}
`
