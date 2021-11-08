import React from 'react'
import StarRatings from 'react-star-ratings'
import Progress from 'react-progressbar'
import { get } from 'lodash'
import { useRouteMatch, useHistory } from 'react-router-dom'
import styled from 'styled-components'

// import OverlaySpinner from 'commons/OverlaySpinner'
// import { useRouteMatch } from 'react-router-dom'
// import styled from 'styled-components'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFrown } from '@fortawesome/free-regular-svg-icons'

import OverlaySpinner from 'commons/OverlaySpinner'

// import Button from 'commons/Buttons'
// import { EmptyText } from 'commons/styles'
// import { convertDollarToString } from 'utils'
import { colors } from 'theme'

// import { IssueContext } from '../../IssueContext'

const Points = ({
  data = [],
  selectedItem = {},
  updateSelectedItem,

  // issue = {},
  counter = false,
  loading = false,
  viewPage = false,
}) => {
  const match = useRouteMatch()

  // const history = useHistory()

  // const { selection, updateSelection } = useContext(IssueContext)

  return (
    <Wrapper style={{ height: '100%' }}>
      {loading && <OverlaySpinner loading overlayParent />}
      <div style={{ height: '90%', overflowY: 'auto' }}>
        <div style={{ overflow: 'hidden' }}>
          {data.length
            ? data.map(i => (
              <Item active={i.id === selectedItem.id} onClick={() => updateSelectedItem(i)}>
                <div className="itemWrap">
                  <div>
                    {/* <div>#<span style={{ fontWeight: '600' }}>{idx + 1 || 'N/A'}</span> </div> */}
                    <div style={{ fontWeight: '200' }}>#{i.id} </div>
                    {/* <div>Theft Amount: </div> */}
                    <StarRatings
                      rating={get(i, 'ratings.rating', 0)}
                      starDimension="20px"
                      starSpacing="1px"
                      starRatedColor={colors.yellow}
                      numberOfStars={5}
                      name="proposal_rating"
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
                  <div
                    style={{
                      textAlign : 'right',
                      width     : 'auto',
                      maxWidth  : '150px',
                      minWidth  : '65px',
                      marginLeft: '15px',
                    }}
                  >
                    <div style={{ border: '1px solid #D5C9C9', borderRadius: '2px' }}>
                      <Progress completed={75} color="yellow" height="15px" />
                    </div>
                    {/* <div>ID: <span style={{ fontWeight: '600' }}>{idx + 1 || 'N/A'}</span> | Votes: <span>{get(i, 'votes', 0)}</span></div> */}
                    <div>
                      <span style={{ fontWeight: '600' }}>{i.summary}</span> | Votes:{' '}
                      <span>{get(i, 'votes', 0)}</span>
                    </div>
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
              </Item>
            ))
            : ''}
        </div>
      </div>
      {viewPage ? (
        ''
      ) : (
        <ButtonWrapper>
          {data.length ? <div className="none">None of these are accurate</div> : null}
          {data.length ? (
            <div className="btns">
              <a
                href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-${counter ? 'counter-' : ''
                }proposal`}
              >
                Add {counter ? 'Counter' : ''} Proposal
              </a>
            </div>
          ) : null}
          {/* <div style={{ marginTop: '10px' }}>
        {(counter && !get(selection, 'proposal')) ? null : <Button onClick={() => {
          updateSelection({ ...selection, [counter ? 'counterProposal' : 'proposal']: null })
          history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/${counter ? 'vote' : 'counter-proposals'}`)
        }} plain width={150} height={44} style={{ marginLeft: 10 }}>Skip This</Button>}
      </div> */}
        </ButtonWrapper>
      )}
    </Wrapper>
  )
}

export default Points

const Item = styled.div`
    border-bottom-width: 1px;
    border-color: rgb(221, 221, 221);
    border-bottom-style: solid;
    & > .itemWrap {
      cursor: pointer;
      background: transparent;
      padding: 8px 8px 2px 8px;
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
        background: #d3d0d0;
        margin: 10px 15px;
      }
    }
    ${props =>
    props.active &&
    `
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
    position: fixed;
    bottom: 20px;
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    .none {
      color: #cd3737;
      font-size: 16px;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 5px;
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
        width: auto;
        line-height: 44px;
        height: auto;
        background: #7f51c1;
        border-radius: 8px;
        padding: 0 20px;
      }
    }
  `
