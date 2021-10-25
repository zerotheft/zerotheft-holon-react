import React, { useContext, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import { useRouteMatch } from 'react-router-dom'
import { get, isEmpty, toNumber, pickBy } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFrown } from '@fortawesome/free-regular-svg-icons'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import { colors } from 'theme'
import Button from 'commons/Buttons'
import { imageExists, convertJSONtoString , convertDollarToString, numberWithCommas } from 'utils'
import OverlaySpinner from 'commons/OverlaySpinner';
import useFetch from 'commons/hooks/useFetch'
import { getProposal } from 'apis/proposals'
import { FlexRow } from 'commons/styles';
import { getTheftInfo } from 'apis/reports';
import { AppContext } from 'components/App/AppContext'
import TheftInfo from 'components/App/Home/TheftInfo';
import styled from 'styled-components';
import { Body, Header, NoChartText } from '../styles'

const ProposalDetail = ({ item, selection, updateSelection, history, reportPath, type, allowSelect = true, chartData = null }) => {
  const [getProposalApi, proposalLoading, proposalInfo] = useFetch(getProposal)
  const match = useRouteMatch()

  // const { proposalDetails } = useContext(IssueContext)
  const { theftYears } = item
  let maxTheftYear = null;
  if (theftYears) {
    let theftYearKeys = Object.keys(theftYears);
    theftYearKeys = theftYearKeys.map(function(item) {
      return parseInt(item)
    })

    maxTheftYear = (theftYearKeys.length > 0)? Math.max(...theftYearKeys): null;
  }

  const [getTheftApi, loadingTheft, theftInfo] = useFetch(getTheftInfo)
  const { filterParams } = useContext(AppContext)

  useEffect(() => {
    getTheftApi(`${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`, false, get(filterParams, 'year'))
  }, [get(match, 'params.pathname'), get(match, 'params.id'), get(filterParams, 'year')])

  useEffect(() => {
    item && getProposalApi(item.id)
  }, [item])

  const theftData = theftInfo && theftInfo[`${match.params.pathname}/${match.params.id}`.replaceAll('%2F', '/')]
  const yes = theftData && (theftData.for / theftData.votes * 100).toFixed()
  const no = 100 - yes


  if (proposalLoading) {
    return (<Body><OverlaySpinner overlayParent loading backgroundColor="transparent" /> <div className="overlayTextWrapper"> <p className="overlayText"> Please wait. The details are being fetched from the server. </p> </div> </Body>)
  }
  return (<Body>
    <div className="bodyDescription">
      {proposalInfo ? <div className='detail-wrapper' style={{ position: 'relative', minHeight: 50 }}>
        {convertJSONtoString(get(proposalInfo, 'detail', {}))}
      </div> : <>
        {get(item, 'title') && <h5>{get(item, 'title')}</h5>}
        <p>{get(item, 'description')}</p>
      </>}
    </div>
    <div className="detailsWithCharts">
      <Header>
        {theftData && (no || yes) && <SelectWrapper>
          <h4>Was there theft?</h4>
          <div className="wrapLeftRightsec">
            <div className="leftTheftSec">
              <TheftBlockSec className="yesTheftsec" width={yes}>
                <span>Yes {yes}%</span>
              </TheftBlockSec>
              <TheftBlockSec className="noTheftsec" width={no}>
                <span>No {no}%</span>
              </TheftBlockSec>
            </div>
          </div>
          <div className="totlVotersSec">
            Total Voters : {numberWithCommas(get(theftData, 'votes'))}
          </div>
        </SelectWrapper>
        }
        <h4>If there was theft, which makes the best case.</h4>
        <h5 className='plain'>This is used to compare against, for when you make your final decision</h5>
        {allowSelect &&
          <div className="btns">
            <Button
              width={170}
              height={44}
              onClick={() => {
                updateSelection(type === 'counter' ? { ...selection, counterProposal: item } : { ...selection, proposal: item })
                history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/${type === 'counter' ? 'vote' : 'counter-proposals'}`)
              }}
              disabled={isEmpty(item)}>Select This One</Button>
            <Button
              plain
              height={44}
              width={125}
              onClick={() => {
                updateSelection(type === 'counter' ? { ...selection, counterProposal: null } : { ...selection, proposal: null })
                history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/${type === 'counter' ? 'vote' : 'counter-proposals'}`)
              }}
              style={{ marginLeft: 10, background: 'transparent', borderWidth: 2 }}>Skip This</Button>
          </div>
        }
      </Header>

      {!isEmpty(item) && <>
        {imageExists(`${reportPath}-theftValue-view.svg`) ?
          <div className="imageWrapper">
            <img src={`${reportPath}-theftValue-view.svg`} style={{ width: '100%', height: 'auto' }} />
          </div> : <NoChartText>Report is not available yet.</NoChartText>
        }

        <div className="bodyHeader">
          <div className="detailWrapper">
            <div className="theftInfo">
              <div>
                <h4>Theft Amount: </h4>
                <h3>{item.summary}</h3>
                {(maxTheftYear) ? <h4>(in {maxTheftYear})</h4>: null }
              </div>
            </div>
            <div className="warning">
              Warning: <br /> The amount claimed to be stolen in this area is <span style={{ fontSize: '20px' }}>{item.summary}</span> lower than the average of <span style={{ fontSize: '20px' }}>$291B</span>
            </div>
          </div>
          <div>
            <span style={{ color: '#8D8D8D', marginRight: 5 }}>AUTHOR:</span> <span style={{ fontWeight: 500, marginLeft: '5px' }}>{get(item, 'author.name', 'Anonymous')}</span>
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
            <span style={{ float: 'right' }}>
              <FontAwesomeIcon icon={faFrown} color={colors.red} /> {get(item, 'complaints.count', 0)}
              <span style={{ fontSize: 12, fontWeight: 500, marginLeft: 5, verticalAlign: '3px' }}>Rate/Comment</span>
            </span>
          </div>
        </div>
        {imageExists(`${reportPath}-votesForTheftAmount.svg`) ?
          <div className="imageWrapper">
            <img src={`${reportPath}-votesForTheftAmount.svg`} style={{ width: '100%', height: 'auto' }} />
          </div> : <NoChartText>Unable to meet criteria for chart.</NoChartText>
        }

        <div className='idWrapper'>
          <h6>ID: {item.id}</h6>
        </div>
      </>}
    </div>
  </Body>
  )
}

export default ProposalDetail

const TheftBlockSec = styled.div`
    display:flex;
    flex-flow: column;
    height: auto;
    margin-bottom: 10px;
    align-item: center;
    background: ${colors.button.greyBackground};
    font-family: Poppins;
    font-size: 18px;
    position: relative;
    span{
      display: flex;
      flex-flow: column;
      height: 100%;
      white-space: nowrap;
      justify-content: center;
      color: white;
      padding-left: 10px;
      position: relative;
      z-index: 1;
    }
    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: ${props => props.width || 0}%;
      background: green;
    }
    &.noTheftsec {
      &::before {
        background: red;
      }
    }
  `,
  SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: flex-start;
  .btns {
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
    border-radius: 8px;
    margin-right: 10px;
  }
  & > span {
    font-size: 15px;
    font-weight: 500;
    color: #000;
    margin-right: 10px;
  }
`,
  TitleContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 29px;
    font-weight: 500;
    color: 39313F;
  }
  button {
    font-size: 18px;
    font-weight: 600;
  }
  margin-bottom: 35px;
`,
  InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`,
  InfoBox = styled.div`
  width: calc((100% - 86px)/2);
  background: #C5EEE4;
  border-radius: 23px;
  padding: 25px 40px;
  box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.08);
  &:first-of-type {
    background: #EBE0F3;
    margin-right: 43px;
  }
  &:last-of-type {
    background: #EEE5C5;
    margin-left: 43px;
  }
  h3 {
    font-size: 75px;
    font-weight: 700;
    color: #000;
  }
  h5 {
    font-size: 23px;
    font-weight: 500;
    color: #000;
  }
  h6 {
    font-size: 18px;
    font-weight: 500;
    color: #000;
  }
`, InfoText = styled.span`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.text.gray};
`
