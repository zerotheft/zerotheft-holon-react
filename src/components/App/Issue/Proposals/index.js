import React, { useState, useContext, useEffect } from 'react'
import { API_URL } from 'constants/index'
import { get, isEmpty, filter as Filter } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { IssueContext } from '../IssueContext'
import { AppContext } from '../../AppContext'
import { Wrapper, Left, Right, WarningWrapper, EmptyProposalWrapper } from '../commons/styles'
import Button from 'commons/Buttons'
import Points from '../commons/Points'
import ProposalDetail from '../commons/ProposalDetail'
import { EmptyText } from 'commons/styles'

const Proposals = ({ history, match }) => {
  const { issue, selection, updateSelection, refetchIssue } = useContext(IssueContext)
  const { filterParams, umbrellaPaths, holonInfo } = useContext(AppContext)
  let
    [selectedItem, updateSelectedItem] = useState(get(selection, 'proposal') || {}),
    [loading, updateLoading] = useState(false)
  const bellCurveData = get(issue, 'bellCurveData') || {}

  const issuePath = (match.params.pathname + '/' + match.params.id).replace(/%2F/g, '/')
  const issuePathNoNation = issuePath.replace(/[^\/]+\/?/, '')
  const isUmbrella = !!get(umbrellaPaths, issuePathNoNation)
  const reportPath = `${API_URL}/${get(holonInfo, 'reportsPath')}/${isUmbrella ? 'multiIssueReport' : 'ztReport'}/${issuePath.replace(/\//g, '-')}`
  
  let data = get(issue, 'proposals')
  if (!selectedItem.id) {
    if (data && data.length > 0) {
      selectedItem = data[0];
    }
  }

  let proposalLength = (data && data.length > 0)? data.length: 0;
  
  return <Wrapper style={{ height: 'calc(100vh - 125px)' }}>
    <WarningWrapper>
      <p>WARNING: The amounts and reasoning comes from citizens. Not from the ZTM company or this website.</p>
    </WarningWrapper>
    {(proposalLength === 0) ?
      <EmptyProposalWrapper>
        <p>
          No proposals are available. Please 
          <a href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-proposal`} style={{cursor: 'pointer'}}> add new </a>
          proposal.
        </p>
      </EmptyProposalWrapper>: null }
    <Left style={{ width: 'auto', margin: '0 30px 0 0', display: 'flex', flexDirection: 'column', maxWidth: '440px' }}>
      {/* <div className='header'>
        <h3>
          Select which below has the best<br />
          <span style={{ fontSize: 22 }}>analysis, accuracy & estimated amount</span>
        </h3>
        <Button onClick={async () => {
          await updateLoading(true)
          await refetchIssue()
          updateLoading(false)
        }} className='refresh'><FontAwesomeIcon icon={faSyncAlt} /></Button>
      </div> */}
      <div style={{ overflowY: 'auto', height: '100%' }}>
        <div style={{ overflow: 'hidden', height: '100%' }}>
          {/* <Points data={filterParams.year ? Filter(get(issue, 'proposals', []), { year: parseInt(filterParams.year) }) : get(issue, 'proposals', [])} issue={issue} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} /> */}
          <Points data={get(issue, 'proposals', [])} issue={issue} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} />
        </div>
      </div>
    </Left>
    <Right style={{ flex: '1', overflowY: 'auto', padding: '30px 0 0' }}>
      <div style={{ overflow: 'hidden' }}>
        <ProposalDetail item={selectedItem} selection={selection} updateSelection={updateSelection} history={history} reportPath={reportPath} chartData={bellCurveData} />
      </div>
    </Right>
  </Wrapper >
}

export default Proposals
