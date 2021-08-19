import React, { useContext, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import { useRouteMatch } from 'react-router-dom'
import { get, isEmpty, toNumber, pickBy } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-regular-svg-icons'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { colors } from 'theme'
import { Body, Header } from '../styles'
import Button from 'commons/Buttons'
import { convertDollarToString, convertJSONtoString } from 'utils'
import { IssueContext } from '../../IssueContext'
import OverlaySpinner from 'commons/OverlaySpinner';
import useFetch from 'commons/hooks/useFetch'
import { getProposal } from 'apis/proposals'
import { FlexRow } from 'commons/styles';

const ProposalDetail = ({ item, selection, updateSelection, history, reportPath, type, show_details = false, chartData = null }) => {
  const [getProposalApi, proposalLoading, proposalInfo] = useFetch(getProposal)
  const match = useRouteMatch()
  // const { proposalDetails } = useContext(IssueContext)
  useEffect(() => {
    item && getProposalApi(item.id)
  }, [item])


  if (proposalLoading) {
    return (<Body><OverlaySpinner overlayParent loading={true} backgroundColor="transparent" /></Body>)
  }

  return (<Body>
    <div className="bodyDescription">
      {proposalInfo ? <div className='detail-wrapper' style={{ position: 'relative', minHeight: 50 }}>
        {convertJSONtoString(get(proposalInfo, 'detail', {}))}
      </div> : <React.Fragment>
        {get(item, 'title') && <h5>{get(item, 'title')}</h5>}
        <p>{get(item, 'description')}</p>
      </React.Fragment>}
    </div>
    <div className="detailsWithCharts">
      <Header>
        <h5>Best Theft Case:</h5>
        <h4>If there was theft, which makes the best case.</h4>
        <h5 className='plain'>This is used to compare against, for when you make your final decision</h5>
        <div className="btns">
          <Button width={170} height={44} onClick={() => {
            updateSelection(type === "counter" ? { ...selection, counterProposal: item } : { ...selection, proposal: item })
            history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/${type === "counter" ? "vote" : "counter-proposals"}`)
          }} disabled={isEmpty(item)}>Select This One</Button>
          <Button plain height={44} width={125} onClick={() => {
            updateSelection(type === "counter" ? { ...selection, counterProposal: null } : { ...selection, proposal: null })
            history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/${type === "counter" ? "vote" : "counter-proposals"}`)
          }} style={{ marginLeft: 10, background: 'transparent', borderWidth: 2 }}>Skip This</Button>
        </div>
      </Header>

      {!isEmpty(item) && <>
        <div className="imageWrapper">
          <img src={`${reportPath}-theftValue-view.svg`} style={{ width: '100%', height: 'auto' }} />
        </div>

        <div className="bodyHeader">
          <div className="detailWrapper">
            <div className="theftInfo">
              <div>
                <h4>Theft Amount: </h4>
                <h6>ID: {item.id}</h6>
              </div>
              <h3>{item.summary}</h3>
            </div>
            <div className="warning">
              WARNING: The amount claimed to be stolen in this area is <span>{item.summary}</span> lower than the average of <span>$291B</span>
            </div>
          </div>
          <div>
            <span style={{ color: '#8D8D8D', marginRight: 5 }}>AUTHOR:</span> <span style={{ fontWeight: 500 }}>{get(item, 'author.name', 'Anonymous')}</span>
          </div>
          <div style={{ fontSize: 22, cursor: 'pointer', marginBottom: 15 }} onClick={() => window.location.href = `zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/proposal-feedback/${get(item, 'id')}`}>
            {get(item, 'ratings.count', 0)}
            <span style={{ margin: '0 15px 0 5px' }}>
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
            <span style={{ fontSize: 12, fontWeight: 500, marginLeft: 5, verticalAlign: '3px' }}>Rate/Complaint</span>
          </div>
        </div>

        <div className="imageWrapper">
          <img src={`${reportPath}-votesForTheftAmount.svg`} style={{ width: '100%', height: 'auto' }} />
        </div>
      </>}
    </div>
  </Body>
  )
}

export default ProposalDetail
