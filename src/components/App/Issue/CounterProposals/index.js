import React, { useState, useContext } from 'react'
import { get, isEmpty, filter as Filter } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { API_URL } from 'constants/index'
import { IssueContext } from '../IssueContext'
import { AppContext } from '../../AppContext'
import { Wrapper, Left, Right, Header, EmptyProposalWrapper, WarningWrapper } from '../commons/styles'
import Button from 'commons/Buttons'
import Points from '../commons/Points'
import ProposalDetail from '../commons/ProposalDetail'

const CounterProposals = ({ history, match }) => {
  const { issue, selection, updateSelection, refetchIssue } = useContext(IssueContext)
  const { filterParams, umbrellaPaths, holonInfo } = useContext(AppContext)
  let
    [selectedItem, updateSelectedItem] = useState(get(selection, 'counterProposal') || {}),
    [loading, updateLoading] = useState(false)

  const issuePath = (match.params.pathname + '/' + match.params.id).replace(/%2F/g, '/')
  const issuePathNoNation = issuePath.replace(/[^\/]+\/?/, '')
  const isUmbrella = !!get(umbrellaPaths, issuePathNoNation)
  const reportPath = `${API_URL}/${get(holonInfo, 'reportsPath')}/${isUmbrella ? 'multiIssueReport' : 'ztReport'}/${issuePath.replace(/\//g, '-')}`

  let data = get(issue, 'counter_proposals');
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
          No counter proposals are available. Please 
          <a href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-counter-proposal`} style={{cursor: 'pointer'}}> add new </a>
          counter proposal.
        </p>
      </EmptyProposalWrapper>: null }
    <Left style={{ width: 'auto', margin: '0 30px 0 0', display: 'flex', flexDirection: 'column', maxWidth: '440px' }}>
      {/* <div className='header'>
        <h3>
          Select which below has the best<br />
          <span style={{ fontSize: 22 }}>counterpoint that there is little or no rigged economic theft</span>
        </h3>
        <Button onClick={async () => {
          await updateLoading(true)
          await refetchIssue()
          updateLoading(false)
        }} className='refresh'><FontAwesomeIcon icon={faSyncAlt} /></Button>
      </div> */}
      <div style={{ overflowY: 'auto', height: '100%' }}>
        <div style={{ overflow: 'hidden', height: '100%' }}>
          <Points data={get(issue, 'counter_proposals', [])} issue={issue} counter={true} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} />
        </div>
      </div>
    </Left>
    <Right style={{ flex: '1', overflowY: 'auto' }}>
      <div style={{ overflow: 'hidden' }}>
        <ProposalDetail item={selectedItem} type="counter" selection={selection} reportPath={reportPath} history={history} updateSelection={updateSelection} />
      </div>
    </Right>
  </Wrapper>
}

export default CounterProposals
