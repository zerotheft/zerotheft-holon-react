import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings';
import Progress from 'react-progressbar';
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
    {data.length ? data.map((i, idx) => <Item active={i.id === selectedItem.id} onClick={() => updateSelectedItem(i)} style={{marginBottom: '8px', border: '1px solid rgb(221, 221, 221)', borderRadius: '5px'}} >
      <div className='itemWrap' style={{ borderRadius: '5px' , cursor: 'pointer'}}>
        <div>
          {/* <div>#<span style={{ fontWeight: '600' }}>{idx + 1 || 'N/A'}</span> </div> */}
          <div style={{fontWeight: '200'}}>#{i.id} </div>
          {/* <div>Theft Amount: </div> */}
          <StarRatings
                  rating={get(i, 'ratings.rating', 0)}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor={colors.yellow}
                  numberOfStars={5}
                  name='proposal_rating'
            />
          {/* <div>Ratings:{
            get(i, 'ratings.count', 0) > 0 ?
              <span> {get(i, 'ratings.count', 0)}&nbsp;
                <StarRatings
                  rating={get(i, 'ratings.rating', 0)}
                  starDimension="20px"
                  starSpacing="1px"
                  starRatedColor={colors.yellow}
                  numberOfStars={5}
                  name='proposal_rating'
            />&nbsp;
          </span>
            : ' N/A'}
            {get(i, 'complaints.count', 0) > 0 &&
              <span><FontAwesomeIcon icon={faFrown} color={colors.red} className='icon' /> {get(i, 'complaints.count', 0)}</span>
            }
          </div> */}
        </div>
        <div style={{ textAlign: 'right', width: 'auto', maxWidth: '150px', minWidth: '65px', marginLeft: '15px' }}>
          <div style={{border: '1px solid #D5C9C9', borderRadius: '2px'}}><Progress completed={75} color={'yellow'} height={'15px'} /></div>
          {/* <div>ID: <span style={{ fontWeight: '600' }}>{idx + 1 || 'N/A'}</span> | Votes: <span>{get(i, 'votes', 0)}</span></div> */}
          <div><span style={{ fontWeight: '600' }}>{i.summary}</span> | Votes: <span>{get(i, 'votes', 0)}</span></div>
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
      </div>
      {/* <div style={{ marginTop: '10px' }}>
        {(counter && !get(selection, 'proposal')) ? null : <Button onClick={() => {
          updateSelection({ ...selection, [counter ? 'counterProposal' : 'proposal']: null })
          history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/${counter ? 'vote' : 'counter-proposals'}`)
        }} plain width={150} height={44} style={{ marginLeft: 10 }}>Skip This</Button>}
      </div> */}
    </ButtonWrapper>
  </Wrapper>
}

export default Points

const Item = styled.div`
  & > .itemWrap {
    background: transparent;
    padding: 11px;
    color: #000;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
  }
  &.bottom-border {
    &::after {
      content: '';
      display: block;
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
