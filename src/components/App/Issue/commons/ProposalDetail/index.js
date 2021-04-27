import React, { useContext } from 'react'
import StarRatings from 'react-star-ratings';
import { useRouteMatch } from 'react-router-dom'
import { get, isEmpty, toNumber } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-regular-svg-icons'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { colors } from 'theme'
import { Body } from '../styles'
import { convertDollarToString, convertJSONtoString } from 'utils'
import { IssueContext } from '../../IssueContext'
import OverlaySpinner from 'commons/OverlaySpinner';

const ProposalDetail = ({ item, type, show_details = false }) => {
  const match = useRouteMatch()
  const { proposalDetails } = useContext(IssueContext)
  if (isEmpty(item)) return null
  const details = proposalDetails[item.id]

  return <Body>
    <div className='bodyTitle'>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ marginRight: 10 }}>
          <h4>This Proposal: ID {item.id}</h4>
          <h6>Theft Amount: ${convertDollarToString(toNumber(item.theftAmt))}</h6>
        </div>
        <FontAwesomeIcon onClick={() => window.open(`/${type=== 'counter' ? 'counter-' : ''}proposals/${item.id}`)} icon={faExternalLinkAlt} color={'#BDBDBD'}/>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <p>
          <span style={{ color: '#8D8D8D' }}>AUTHOR</span> {get(item, 'author.name', 'Anonymous')}
        </p>
        {/*<p>
          {get(item, 'ratings.rating', 0).toFixed(2)}
          <span style={{ margin: '0 5px' }}><StarRatings
            rating={get(item, 'ratings.rating', 0)}
            starDimension="16px"
            starSpacing="1px"
            starRatedColor={colors.yellow}
            numberOfStars={5}
            name='author_rating'
          /></span>
          <FontAwesomeIcon icon={faFrown} color={colors.red} />{get(item, 'complaints.count', 0)}
        </p>*/}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: 22, cursor: 'pointer' }} onClick={() => window.location.href = `zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/proposal-feedback/${get(item, 'id')}`}>
          {get(item, 'ratings.count', 0)}
          <span style={{ margin: '0 5px' }}>
            <StarRatings
              rating={get(item, 'ratings.rating', 0)}
              starDimension="24px"
              starSpacing="1px"
              starRatedColor={colors.yellow}
              numberOfStars={5}
              name='rating'
            />
          </span>
          <FontAwesomeIcon icon={faFrown} color={colors.red} /> {get(item, 'complaints.count', 0)}
          <span style={{ fontSize: 14, marginLeft: 15 }}>Rate/Complaint</span>
        </p>
      </div>
    </div>
    <div className="bodyDescription">
      {(show_details && details) ? <div className='detail-wrapper' style={{position: 'relative', minHeight: 50}}>
        {details.loading ? <OverlaySpinner overlayParent loading={true} backgroundColor="transparent" />:
        convertJSONtoString(get(details, 'detail', {}))}
      </div> : <React.Fragment>
        {get(item, 'title') && <h5>{get(item, 'title')}</h5>}
        <p>{get(item, 'description')}</p>
      </React.Fragment>}
    </div>
  </Body>
}

export default ProposalDetail
