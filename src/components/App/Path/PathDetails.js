import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { toNumber, get } from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf, faEye } from '@fortawesome/free-solid-svg-icons'

import { calculate } from 'components/App/commons/services'
import Button from 'commons/Buttons'
import { convertDollarToString } from 'utils'

const PathDetails = ({ url, isPath, summary, viewLink }) => {
  const summaryPath = summary && summary[url]

  const voteDetails = summaryPath ? calculate(summaryPath) : null
  const history = useHistory()
  return (
    <Wrapper>
      {voteDetails ? (
        <div className="details-wrapper">
          <div className={`vote-percent ${get(voteDetails, 'vote') === 'NO' ? 'no' : ''}`}>{`${get(voteDetails, 'vote') === 'NO' ? 'No Theft' : 'Yes theft'
            } ${get(voteDetails, 'votedPercent', '0')}%`}</div>
          <div className={`amt ${get(voteDetails, 'vote') === 'NO' ? 'no' : ''}`}>
            ${convertDollarToString(toNumber(get(voteDetails, 'amount', 1)))}
          </div>
          {/* {voteDetails.votes < voteDetails.unlockVotes && <div class="overlay-info">Need {voteDetails.unlockVotes} votes ({voteDetails.votes})</div>} */}
        </div>
      ) : (
        <div style={{ fontSize: 14, minWidth: 190 }}>Need votes</div>
      )}
      <div className="button-wrapper">
        <CustomButton
          onClick={e => {
            e.stopPropagation()
            history.push(`${viewLink}/proposals`)
          }}
          plain
          style={{ color: '#777373' }}
          width={90}
          height={34}
        >
          <FontAwesomeIcon icon={faEye} />
          View
        </CustomButton>
        <CustomButton
          onClick={e => {
            e.stopPropagation()
            history.push(`/${isPath ? 'pathReport' : 'leafReport'}/${url.replaceAll('/', '%2F')}`)
          }}
          style={{ backgroundColor: '#E9E9E9', color: '#777373' }}
          width={105}
          height={34}
        >
          <FontAwesomeIcon icon={faFilePdf} />
          Report
        </CustomButton>
        {isPath ? (
          <CustomButton onClick={() => history.push(`${viewLink}/proposals`)} width={90} height={34}>
            Vote
          </CustomButton>
        ) : (
          <CustomButton onClick={() => history.push(`${viewLink}/proposals`)} width={90} height={34}>
            Vote
          </CustomButton>
        )}
      </div>
    </Wrapper>
  )
}

export default PathDetails

PathDetails.propTypes = {
  isPath: PropTypes.bool,
  summary: PropTypes.object,
  url: PropTypes.string,
  viewLink: PropTypes.string,
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 20px;

    .select-year {
      font-size: 14px;
      font-weight: 600;
      color: #909090;
    }
    .button-wrapper {
      display: flex;
      flex: 1;
      flex-dirextion: column;
    }
    .details-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-width: 190px;
      
     
      .amt {
        font-size: 22px;
        color: #000;
        font-weight: 600;
        min-width: 85px;
        &.no {
          color: #888;
          text-decoration: line-through;
        }
      }
      .vote-percent {
        margin-right: 20px;
        font-size: 16px;
        font-weight: 600;
        color: #6ab768;
        min-width: 75px;
        text-transform: uppercase;
        &.no {
          color: #d76969;
        }
      }
      .overlay-info{
        z-index: 9;
        margin: 30px;
        background: #009938;
      }
    }
  `,
  CustomButton = styled(Button)`
    padding: 0px 15px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 18px;
    display: flex;
    align-items: center;
    text-align: center;
    border-radius: 6px;
    margin-left: 15px;
    transition: 0.5s ease-in-out;
    & > svg {
      margin-right: 7px;
    }
    &:hover {
      background-color: #4f2e7d;
      color: #fff !important;
    }
    &:active {
      color: #7336a3;
    }
  `
