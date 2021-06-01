import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings';
import { get, toNumber } from 'lodash'
import { useRouteMatch, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-regular-svg-icons'

import OverlaySpinner from 'commons/OverlaySpinner'
import Button from 'commons/Buttons'
import { EmptyText } from 'commons/styles'
import { convertDollarToString } from 'utils'
import { colors } from 'theme'
import { IssueContext } from '../../IssueContext'

const Points = ({ data = [], selectedItem = {}, updateSelectedItem, issue = {}, counter = false, loading = false }) => {
  const match = useRouteMatch()
  const history = useHistory()
  const { selection, updateSelection } = useContext(IssueContext)
  return <Wrapper>
    {loading && <OverlaySpinner loading overlayParent />}
    {data.length ? data.map((i, idx) => <Item className={data.length !== idx + 1 ? 'bottom-border' : ''} active={i.id === selectedItem.id} onClick={() => updateSelectedItem(i)}>
      <div className='itemWrap'>
        <div>
          <div>Theft Amount: <span style={{ fontWeight: '600' }}>{i.summary}</span></div>
          <div>Ratings:{get(i, 'ratings.count', 0) > 0 ? <span> {get(i, 'ratings.count', 0)}&nbsp;
            <StarRatings
              rating={get(i, 'ratings.rating', 0)}
              starDimension="20px"
              starSpacing="1px"
              starRatedColor={colors.yellow}
              numberOfStars={5}
              name='proposal_rating'
            />&nbsp;
          </span> : ' N/A'}
            {get(i, 'complaints.count', 0) > 0 &&
              <span><FontAwesomeIcon icon={faFrown} color={colors.red} className='icon' /> {get(i, 'complaints.count', 0)}</span>
            }
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>ID: <span style={{ fontWeight: '600' }}>{i.id || 'N/A'}</span> | Votes: <span>{get(i, 'votes', 0)}</span></div>
          <div>
            {/*
            Author: {get(i, 'ratings.count', 0)}
            <StarRatings
              rating={get(i, 'ratings.count', 0)}
              starDimension="20px"
              starSpacing="1px"
              starRatedColor={colors.yellow}
              numberOfStars={5}
              name='proposal_count'
            />
            <FontAwesomeIcon icon={faFrown} color={colors.red} className='icon' /><span> {get(i, 'complaints.count', 0)}</span>
            */}
          </div>
        </div>
      </div>
    </Item>) : <EmptyText>No Data Available.</EmptyText>}
    <ButtonWrapper>
      {data.length ? <div className='none'>None of these are accurate</div> : null}
      <div className='btns'>
        <a href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-${counter ? 'counter-' : ''}proposal`}>
          ADD YOUR PROPOSAL
        </a>
        {(counter && !get(selection, 'proposal')) ? null : <Button onClick={() => {
          updateSelection({ ...selection, [counter ? 'counterProposal' : 'proposal']: null })
          history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/${counter ? 'vote' : 'counter-proposals'}`)
        }} plain width={150} height={44} style={{ marginLeft: 10 }}>Skip This</Button>}
      </div>
    </ButtonWrapper>
  </Wrapper>
}

export default Points

const Item = styled.div`
  & > .itemWrap {
    width: calc(100% - 75px);
    background: transparent;
    padding: 11px 30px 11px 15px;
    color: #000;
    border-radius: 8px 0 0 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      display: none;
      position: absolute;
      top: 0;
      right: -46px;
      width: 0; 
      height: 0; 
      border-top: 36px solid transparent;
      border-bottom: 36px solid transparent;
      border-left: 46px solid ${colors.primary};
      z-index: 1;
    } 
  }
  &.bottom-border {
    &::after {
      content: '';
      display: block;
      width: calc(100% - 75px);
      height: 1px;
      background: #D3D0D0;
      margin: 10px 15px;
    }
  }
  ${props => props.active && `
    & > .itemWrap {
      background: ${colors.primary};
      color: #fff;
      position: relative;
      &::after {
        display: block;
      }
    }
    .icon {
      color: #fff !important;
    }
  `}
`,
  Wrapper = styled.div`
  position: relative;
`,
  ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  .none {
    color: #CD3737;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 15px;
  }
  .btns {
    display: flex;
    flex-direction: row;
    a {
      text-decoration: none;
      text-align: center;
      color: #fff;
      font-size: 15px;
      font-weight: 500;
      width: 200px;
      line-height: 44px;
      height: 44px;
      background: #7F51C1;
      border-radius: 8px;
    }
  }
`
