import React, { useState, useContext, useEffect } from 'react'
import { get, isEmpty, filter as Filter } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { IssueContext } from '../IssueContext'
import { AppContext } from '../../AppContext'
import { Wrapper, Left, Right } from '../commons/styles'
import Button from 'commons/Buttons'
import Points from '../commons/Points'
import ProposalDetail from '../commons/ProposalDetail'

const Proposals = ({ history, match }) => {
  const { issue, selection, updateSelection, refetchIssue } = useContext(IssueContext)
  const { filterParams } = useContext(AppContext)
  const
    [selectedItem, updateSelectedItem] = useState(get(selection, 'proposal') || {}),
    [loading, updateLoading] = useState(false)
  const bellCurveData = get(issue, 'bellCurveData') || {}
  return <Wrapper style={{ height: 'calc(100vh - 125px)' }}>
    <Left style={{ width: '440px', margin: '0 30px 0 0', display: 'flex', flexDirection: 'column' }}>
      <div className='header'>
        <h3>
          Select which below has the best<br />
          <span style={{ fontSize: 22 }}>analysis, accuracy & estimated amount</span>
        </h3>
        <Button onClick={async () => {
          await updateLoading(true)
          await refetchIssue()
          updateLoading(false)
        }} className='refresh'><FontAwesomeIcon icon={faSyncAlt} /></Button>
      </div>
      <div style={{ overflowY: 'auto' }}>
        <div style={{ overflow: 'hidden' }}>
          {/* <Points data={filterParams.year ? Filter(get(issue, 'proposals', []), { year: parseInt(filterParams.year) }) : get(issue, 'proposals', [])} issue={issue} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} /> */}
          <Points data={get(issue, 'proposals', [])} issue={issue} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} />
        </div>
      </div>
    </Left>
    <Right style={{ flex: '1', overflowY: 'auto' }}>
      <div style={{ overflow: 'hidden' }}>
        <ProposalDetail item={selectedItem} selection={selection} updateSelection={updateSelection} history={history} chartData={bellCurveData} />
      </div>
    </Right>
  </Wrapper >
}

export default Proposals
