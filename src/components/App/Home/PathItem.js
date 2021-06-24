import React from 'react'
import { NavLink } from 'react-router-dom'
import { toNumber, isEmpty } from 'lodash'
import styled from 'styled-components'

import { calculate } from 'components/App/commons/services'
import { convertDollarToString } from 'utils'

const PathItem = ({ to = '/', name = '', summary, parent = false }) => {

  const realpath = to.replace('/issue', '').replaceAll('%2F', '/').replace('/path/', '')
  let summaryItem = summary[realpath] ? calculate(summary[realpath]) : {}
  return <Wrapper to={to} parent={parent}>
    <div className='name'>{name}</div>
    {!isEmpty(summaryItem) && summaryItem.vote && <div className='details'>
      <div className={`vote ${summaryItem.vote === 'YES' ? 'active' : ''}`}>
        {summaryItem.vote === "NO" ? "NO THEFT" : "YES THEFT"} {summaryItem.votedPercent}%
      </div>
      <div className={`amount ${summaryItem.vote === 'NO' ? 'line' : ''}`}>${convertDollarToString(toNumber(summaryItem.amount))}</div>
    </div>}
  </Wrapper>
}

export default PathItem

const Wrapper = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #FFFFFF;
  border-radius: 10px;
  border: 1px solid #fff;
  transition: all 0.2s ease;
  box-shadow: 0px 0px 11px 0px #fff;
  min-height: 60px;
  .name {
    font-size: 16px;
    font-weight: 600;
    color: rgba(0,0,0,0.58);
    max-width: 40%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s ease;
  }
  .details {
    width: 55%;
    justify-content: space-between;
  }
  .details, .vote {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .vote {
    display: flex;
    width: 135px;
    height: 37px;
    border-radius: 37px;
    align-items: center;
    justify-content: center;
    color: #D76969;
    font-size: 13px;
    font-weight: 600;
    &.active {
      color: #fff;
      background: #6AB768;
    }
  }
  .amount {
    font-size: 15px;
    font-weight: 500;
    color: #877F8D;
    &.line {
      text-decoration: line-through;
    }
  }
  ${props => props.parent && `
    .name {
      font-size: 18px;
      font-weight: 500;
      color: #000;
    }
    .amount {
      font-size: 18px;
      color: #521582;
    }
    .vote {
      margin-left: 10px;
    }
  `}
  &:hover {
    position: relative;
    box-shadow: 0px 0px 11px 0px #D7E0E2;
    border-color: #DBE3E6;
    .name {
      color: #521582;
    }
  }
}`
