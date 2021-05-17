import React, { useState, useContext } from 'react'
import { get, isEmpty, filter as Filter } from 'lodash'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { IssueContext } from '../IssueContext'
import { Wrapper, Left, Right, Header } from '../commons/styles'
import Button from 'commons/Buttons'
import Points from '../commons/Points'
import ProposalDetail from '../commons/ProposalDetail'

const CounterProposals = ({ history, match }) => {
  const { issue, selection, updateSelection, refetchIssue, filter } = useContext(IssueContext)
  const
    [selectedItem, updateSelectedItem] = useState(get(selection, 'counterProposal') || {}),
    [loading, updateLoading] = useState(false)

  return <Wrapper style={{ height: 'calc(100vh - 125px)' }}>
    <Left style={{ width: '32%', margin: 0, display: 'flex', flexDirection: 'column' }}>
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
          <Points data={filter.year ? Filter(get(issue, 'counter_proposals', []), { year: filter.year }) : get(issue, 'counter_proposals', [])} issue={issue} counter={true} selectedItem={selectedItem} updateSelectedItem={updateSelectedItem} loading={loading} />
        </div>
      </div>
    </Left>
    <Right style={{ width: '68%', overflowY: 'auto' }} className='apply-bg'>
      <div style={{ overflow: 'hidden' }}>
        <Header>
          <h5>Best Counter Point:</h5>
          <h4>IF there was theft, which makes the best case.</h4>
          <h5>This is used to compare against, for when you make your final decision</h5>
          <div className="btns">
            <Button width={170} height={44} onClick={() => {
              updateSelection({ ...selection, counterProposal: selectedItem })
              history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/vote`)
            }} disabled={isEmpty(selectedItem)}>Select This One</Button>
            {!!get(selection, 'proposal') && <>
              <Button height={44} width={125} onClick={() => {
                updateSelection({ ...selection, counterProposal: null })
                history.push(`/path/${get(match, 'params.pathname')}/issue/${get(match, 'params.id')}/vote`)
              }} style={{ marginLeft: 10, background: 'transparent', borderWidth: 2 }} plain>Skip This</Button>
            </>}
          </div>
        </Header>
        <ProposalDetail item={selectedItem} type="counter" chartData={Filter(get(issue, 'counter_proposals', []), { year: filter.year })}/>
      </div>
    </Right>
  </Wrapper>
}

export default CounterProposals
