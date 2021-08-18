import React, { useState, useContext } from 'react'
import { get, isEmpty, filter as Filter } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { IssueContext } from '../IssueContext'
import { AppContext } from '../../AppContext'
import { Wrapper, Left, Right, Header } from '../commons/styles'
import Button from 'commons/Buttons'
import Points from '../commons/Points'
import ProposalDetail from '../commons/ProposalDetail'

const CounterProposals = ({ history, match }) => {
  const { issue, selection, updateSelection, refetchIssue } = useContext(IssueContext)
  const { filterParams } = useContext(AppContext)
  const
    [selectedItem, updateSelectedItem] = useState(get(selection, 'counterProposal') || {}),
    [loading, updateLoading] = useState(false)

  return <Wrapper style={{ height: 'calc(100vh - 125px)' }}>
    <Left style={{ width: '440px', margin: '0 30px 0 0', display: 'flex', flexDirection: 'column' }}>
      <div className='header'>
        <h3>
          Select which below has the best<br />
          <span style={{ fontSize: 22 }}>counterpoint that there is little or no rigged economic theft</span>
        </h3>
        <Button onClick={async () => {
          await updateLoading(true)
          await refetchIssue()
          updateLoading(false)
        }} className='refresh'><FontAwesomeIcon icon={faSyncAlt} /></Button>
      </div>
      <div style={{ overflowY: 'auto' }}>
        <div style={{ overflow: 'hidden' }}>
          <Points data={get(issue, 'counter_proposals', [])} issue={issue} counter={true} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} />
        </div>
      </div>
    </Left>
    <Right style={{ flex: '1', overflowY: 'auto' }}>
      <div style={{ overflow: 'hidden' }}>
        <ProposalDetail item={selectedItem} type="counter" selection={selection} history={history} updateSelection={updateSelection} chartData={Filter(get(issue, 'counter_proposals', []), { year: filterParams.year })} />
      </div>
    </Right>
  </Wrapper>
}

export default CounterProposals
