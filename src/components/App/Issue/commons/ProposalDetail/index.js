import React, { useContext, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import { useRouteMatch } from 'react-router-dom'
import { get, isEmpty, toNumber, pickBy } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-regular-svg-icons'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { colors } from 'theme'
import { Body } from '../styles'
import { convertDollarToString, convertJSONtoString } from 'utils'
import { IssueContext } from '../../IssueContext'
import OverlaySpinner from 'commons/OverlaySpinner';
import useFetch from 'commons/hooks/useFetch'
import { getProposal } from 'apis/proposals'

const ProposalDetail = ({ item, type, show_details = false, chartData = null }) => {
  const [getProposalApi, proposalLoading, proposalInfo] = useFetch(getProposal)
  const match = useRouteMatch()
  const { proposalDetails } = useContext(IssueContext)
  useEffect(() => {
    getProposalApi(item.id)
  }, [item])
  if (isEmpty(item)) return null
  let theftAmt = [],
    votes = []
  chartData && chartData.forEach(function (value, index) {
    theftAmt.push(parseFloat((parseFloat(value['amount']) / (10 ** 9)).toFixed(1)))
    votes.push(parseInt(value['votes']))
  });
  const options = {
    title: {
      text: 'Theft Amount vs Votes'
    },
    exporting: false,
    credits: false,
    xAxis: {
      categories: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
      title: {
        text: 'Proposals'
      }
    },
    yAxis: {
      labels: {
        format: '${value}B'
      },
      title: {
        text: 'No. of Votes'
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      type: 'column',
      name: 'No. of Votes',
      data: votes,
    }, {
      type: 'spline',
      name: 'Theft Amount',
      data: theftAmt,
      marker: {
        lineWidth: 2,
        lineColor: Highcharts.getOptions().colors[3],
        fillColor: 'white'
      },
      tooltip: {
        pointFormatter: function () {
          return 'Theft Amount: <b>$' + this.y + 'B</b>';
        }
      },
    }]
  }
  return (<Body>
    <div className="bodyHeader">
      <HighchartsReact highcharts={Highcharts} options={options} />
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
        <div className='bodyTitle'>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <p>
              <span style={{ color: '#8D8D8D', marginRight: 15 }}>AUTHOR</span> <span style={{ fontWeight: 500 }}>{get(item, 'author.name', 'Anonymous')}</span>
            </p>
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
              <span style={{ fontSize: 12, fontWeight: 500, marginLeft: 15 }}>Rate/Complaint</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="bodyDescription">
      {proposalInfo ? <div className='detail-wrapper' style={{ position: 'relative', minHeight: 50 }}>
        {proposalLoading ? <OverlaySpinner overlayParent loading={true} backgroundColor="transparent" /> :
          convertJSONtoString(get(proposalInfo, 'detail', {}))}
      </div> : <React.Fragment>
        {get(item, 'title') && <h5>{get(item, 'title')}</h5>}
        <p>{get(item, 'description')}</p>
      </React.Fragment>}
    </div>
  </Body>
  )
}

export default ProposalDetail
