import React, { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { get } from 'lodash'

import * as ROUTES from 'constants/routes'
import { IssueProvider, IssueContext } from './IssueContext'
import OverlaySpinner from 'commons/OverlaySpinner'
import MainWrapper from './commons/MainWrapper'

import IssueDashboard from './IssueDashboard'
import Proposals from './Proposals'
import CounterProposals from './CounterProposals'
import Vote from './Vote'
import VoteFinalize from './VoteFinalize'
import AfterVote from './AfterVote'
import { getParameterByName } from 'utils'

const IssueWrapper = props => (
  <IssueProvider id={get(props, 'match.params.id')} {...props}>
    <Issue {...props} />
  </IssueProvider>
)

const Issue = ({ match }) => {
  const { loading } = useContext(IssueContext)
  const stepsPage = getParameterByName('page') === 'steps'

  let pathCrumbsTemp = match.params.pathname.split('%2F');
  pathCrumbsTemp.push(match.params.id)

  return <MainWrapper pathname={match.params.pathname} stepsPage={stepsPage} pathCrumbs={pathCrumbsTemp} pathCrumbTemp={pathCrumbsTemp} title={match.params.id}>
    {loading && <OverlaySpinner loading />}
    <Switch>
      <Route exact path={ROUTES.PROPOSALS} component={Proposals} />
      <Route exact path={ROUTES.COUNTER_PROPOSALS} component={CounterProposals} />
      <Route path={ROUTES.VOTE} component={Vote} />
      <Route path={ROUTES.VOTE_FINALIZE} component={VoteFinalize} />
      <Route path={ROUTES.AFTER_VOTE} component={AfterVote} />
      <Route path={ROUTES.ISSUE} component={IssueDashboard} />
    </Switch>
  </MainWrapper>
}

export default IssueWrapper;