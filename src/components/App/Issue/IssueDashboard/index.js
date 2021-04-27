import React, { useEffect, useContext } from 'react'
import { get, take, sortedUniqBy, sortBy, range, filter as filterArray } from 'lodash'
import Select from 'react-select'
import yaml from 'js-yaml'
import styled from 'styled-components'

import { colors } from 'theme'
import { IssueContext } from '../IssueContext'
import { getReport } from 'apis/reports'
import { getProposalTemplate } from 'apis/proposals'
import useFetch from 'commons/hooks/useFetch'
import OverlaySpinner from 'commons/OverlaySpinner'
import Button from 'commons/Buttons'
import SeeMore from 'commons/SeeMore'
import { EmptyText, } from 'commons/styles'
import { Header, Left, Right } from '../commons/styles'
import { AppContext } from 'components/App/AppContext'
import Path from '../../Path/Path'
import SummaryReport from './SummaryReport';

const dateRange = range(1999, (new Date()).getFullYear()).reverse().map(i => ({ label: i, value: i }))
const Dashboard = ({ history, location, match }) => {
  const decodedPath = decodeURIComponent(get(match, 'params.pathname'));
  const { filter, updateFilter, issue, loading: issueLoading } = useContext(IssueContext)
  const [getReportApi, loading, report] = useFetch(getReport)
  const [getTemplateApi, templateLoading, template] = useFetch(getProposalTemplate)
  const { filterParams } = useContext(AppContext)
  const { pathname } = location

  const displayYaml = (template) => {
    let data
    try {
      data = yaml.safeLoad(template)
    }
    catch (e) {
      console.log(e.message)
    }
    return <div className='item'>
      <h5>{get(data, 'title') || ' This problem has no title at this time'}</h5>
      <p><SeeMore text={get(data, 'describe_problem_area') || 'This problem has no descriptions at this time. You can add your description by adding a new proposal.'} textLength='200' /></p>
    </div>
  }

  useEffect(() => {
    if (get(match, 'params.pathname') && get(match, 'params.id') && get(filter, 'year')) {
      getReportApi(`${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`, false, get(filter, 'year') || get(filterParams, 'year'))
    }
  }, [get(match, 'params.pathname'), get(match, 'params.id'), get(filter, 'year')])

  useEffect(() => {
    const templatePath = `${decodedPath.replace('USA', 'proposals')}/${get(match, 'params.id')}`
    getTemplateApi(templatePath)
  }, [get(match, 'params.id'), get(match, 'params.pathname')])

  const allProposals = [...get(issue, 'proposals') || [], ...get(issue, 'counter_proposals') || []]
  const filteredProposals = sortedUniqBy(filter.year ? filterArray(allProposals, { year: filter.year }) : allProposals, 'description')
  return <div>
    <InnerWrapper>
      {!issueLoading && <OverlaySpinner loading={templateLoading} />}
      <Left>
        <Title>
          <h4>Description of the Problem</h4>
        </Title>
        <ProposalContents>
          <div className='header'>From {get(filter, 'year')} Proposals</div>
          <div className='content'>
            {filteredProposals.length ? take(filteredProposals, 5).map(item => {
              const title = get(item, 'title')
              const area = get(item, 'description')
              if (!title && !area) return null
              return <div className='item' key={item.id}>
                <h5>{title}</h5>
                <p><SeeMore text={area} textLength='200' /></p>
              </div>
            }) : !templateLoading && displayYaml(template)}
            {filteredProposals.length ? <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}><Button onClick={() => history.push(`/leafReport/${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`)} width={130} height={44}>View Report</Button></div> : null}
          </div>
          {filteredProposals.length ? take(sortBy(filteredProposals, ['votes']).reverse(), 1).map(item => {
            if (item.votes === 0) return null;
            const area = get(item, 'description')
            if (!area) return null
            return <>
              <div className='header'>Voter’s decided this best describes the problem</div>
              <div className='content'>
                <div className='item' key={item.id}>
                  <p><SeeMore text={area} textLength='200' /></p>
                </div>
              </div>
            </>
          }) : ''}
        </ProposalContents>

      </Left>
      <Right>
        <Header>
          <h3 style={{ fontSize: 29, fontWeight: '500', textAlign: 'center' }}>Your vote is needed:</h3>
          <div className="btns" style={{ margin: '15px 0', justifyContent: 'center' }}>
            {filteredProposals.length ? <Button onClick={() => history.push(`${pathname}/proposals`)} width={110} height={44}>Vote</Button> :
              <CustomButton href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-proposal`}>
                Add your proposal
          </CustomButton>}
          </div>
          <SelectWrapper>
            <span>Year:</span>
            <Select
              defaultValue={get(filter, 'year') ? { label: get(filter, 'year'), value: get(filter, 'year') } : null}
              options={dateRange}
              placeholder='Year'
              isSearchable={false}
              noOptionsMessage={() => 'data unavailable.'}
              styles={{
                container: styles => ({
                  ...styles,
                  width: 120
                }),
                control: styles => ({
                  ...styles,
                  borderColor: `${colors.primary} !important`,
                  borderRadius: 3,
                  minHeight: 0,
                  background: 'transparent',
                  boxShadow: 'none !important',
                }),
                option: styles => ({
                  ...styles,
                  fontSize: 16,
                }),
                menu: styles => ({
                  ...styles,
                  margin: '5px 0 0',
                  width: 120,
                  borderRadius: 0,
                }),
                placeholder: styles => ({
                  ...styles,
                  fontSize: 16
                }),
                noOptionsMessage: styles => ({
                  ...styles,
                  fontSize: 16
                }),
                singleValue: styles => ({
                  ...styles,
                  color: colors.primary,
                  fontSize: 15,
                  fontWeight: '500'
                }),
                indicatorSeparator: () => ({
                  display: 'none'
                }),
                dropdownIndicator: styles => ({
                  ...styles,
                  paddingLeft: 0,
                  color: colors.primary
                }),
                clearIndicator: styles => ({
                  ...styles,
                  color: colors.primary
                })
              }}
              onChange={selected => {
                updateFilter({ year: selected ? selected.value : null })
              }}
            />
          </SelectWrapper>
        </Header>
        {(filteredProposals.length && get(filter, 'year')) ? <IWrapper style={{ flex: get(report, 'report') ? 1 : 'initial' }}>
          <OverlaySpinner loading={loading} overlayParent />
          {get(report, 'report') && <SummaryReport url={report.report} />}
          {(!loading && !get(report, 'report') && (get(issue, 'proposals', []).length || get(issue, 'counter_proposals', []).length)) ? <EmptyText></EmptyText> : null}
        </IWrapper> : null}
      </Right>
    </InnerWrapper>
    <Path history={history} match={match} isIssuePath={true} />
  </div>
}

export default Dashboard

const InnerWrapper = styled.div`
  min-height: 80vh;
  @media(min-width: 991px) {
    display: flex;
    & > div {
      flex: 1;
    }
  }
`,
  Title = styled.div`
  margin-bottom: 20px;
  h4 {
    font-size: 33px;
    color: ${colors.primary};
    font-weight: 600;
  }
  h5 {
    font-size: 16px;
  }
`,
  ProposalContents = styled.div`
  .header {
    background: #E9E9E9;
    color: #000;
    font-size: 20px;
    font-weight: 600;
    padding: 20px;
    border-radius: 8px 8px 0 0;
    border: 1px solid #E9E9E9;
  }
  .content {
    border: 1px solid #E9E9E9;
    border-radius: 0 0 8px 8px;
    padding: 20px;
    margin-bottom:  20px;
    .item {
      margin-bottom: 20px;
      h5 {
        font-size: 18px;
        font-weight: 500;
        color: #504949;
      }
      p {
        margin-top: 5px;
        font-size: 16px;
        font-weight: 400;
        color: rgba(0,0,0,0.69);
      }
    }
  }
`,
  SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  & > span {
    font-size: 15px;
    font-weight: 500;
    color: #000;
    margin-right: 10px;
  }
`,
  CustomButton = styled.a`
  text-decoration: none;
  background: ${colors.primary};
  display: inline-block;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  color: #fff;
  width: auto;
  padding: 10px 20px;
  font-size: 16px;
`,
  IWrapper = styled.div`
  overflow: hidden;
  border: 1px solid #f2f2f2;
  min-height: 100px;
  position: relative;
  margin-top: 20px;
  flex: 1;
  & > iframe {
    width: 100%;
    position: relative;
    box-shadow: none;
    border: none;
  }
`