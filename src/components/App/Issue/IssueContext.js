import React, { createContext, useState, useEffect, useContext } from 'react'
import { get, sortedUniq, sortBy, reverse, toNumber } from 'lodash'

import { getParameterByName } from 'utils'
import { getPathProposalsByPath, getProposal } from 'apis/proposals'
import { AppContext, filterParams } from 'components/App/AppContext'
import { getPriorVote } from 'apis/vote'
import useFetch from 'commons/hooks/useFetch'

const IssueContext = createContext()

const IssueProvider = ({ children, id, match, params, location }) => {
  const [issue, error, loading, fetchIssue, selection, updateSelection, updateIssue] = useIssueFetcher(id, match)
  const [vote, updateVote] = useState()

  // const [getPriorVoteApi, loadingPriorVote, priorVoteInfo] = useFetch(getPriorVote)
  const { userInfo = {}, filterParams } = useContext(AppContext)
  const [proposalDetails, updateProposalDetails] = useState({})

  // useEffect(() => {
  //   // console.log(`${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`).replaceAll('%2F', '/')
  //   getPriorVoteApi({
  //     address: userInfo.address || localStorage.getItem('address'),
  //     url: (`${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`).replaceAll('%2F', '/')
  //   })
  // }, [userInfo.address])

  useEffect(() => {
    if (!issue || selection.proposal || selection.counterProposal) return

    const proposalId = getParameterByName('p')
    const counterProposalId = getParameterByName('c')

    if (proposalId || counterProposalId) {
      const proposal = issue.proposals.find(i => i.id === proposalId)
      const counterProposal = issue.counter_proposals.find(i => i.id === counterProposalId)
      updateSelection({ proposal, counterProposal })
    }
  }, [issue, location.search])

  const selectedProposalId = get(selection, 'proposal.id')
  const selectedCounterProposalId = get(selection, 'counterProposal.id')

  const fetchProposal = async proposalId => {
    if (proposalDetails[proposalId] || !proposalId) return
    try {
      updateProposalDetails({ ...proposalDetails, [proposalId]: { loading: true } })
      const proposal = await getProposal(proposalId)
      updateProposalDetails({ ...proposalDetails, [proposalId]: proposal })
    } catch {
      updateProposalDetails({ ...proposalDetails, [proposalId]: null })
    }
  }

  useEffect(() => {
    fetchProposal(selectedProposalId)
  }, [selectedProposalId])

  useEffect(() => {
    fetchProposal(selectedCounterProposalId)
  }, [selectedCounterProposalId])

  return (
    <IssueContext.Provider
      value={{
        issue,
        error,
        loading,

        // priorVoteInfo,
        refetchIssue: () => fetchIssue(),
        selection,
        vote,
        updateVote,
        updateSelection,
        updateIssue,
        proposalDetails,
      }}
    >
      {children}
    </IssueContext.Provider>
  )
}

export { IssueProvider, IssueContext }

const useIssueFetcher = (id, match) => {
  const { filterParams } = useContext(AppContext)
  const [issue, updateIssue] = useState(),
    [selection, updateSelection] = useState({ proposal: null, counterProposal: null }),
    [loading, updateLoading] = useState(true),
    [error, updateError] = useState()

  const fetchIssue = async() => {
    updateLoading(true)
    try {
      const path = (await getPathProposalsByPath(`${match.params.pathname}%2F${match.params.id}`)) || []
      const issueDetails = {}
      issueDetails.proposals =
        path.data
          .filter(i => i && parseFloat(i.theftAmt) > 0)
          .map(i => ({
            ...i,
            year: parseInt(get(i, 'year')),
          })) || []

      issueDetails.counter_proposals =
        path.data
          .filter(i => i && parseFloat(i.theftAmt) <= 0)
          .map(i => ({
            ...i,
            year: parseInt(get(i, 'year')),
          })) || []

      issueDetails.bellCurveData = path.chartData || {}
      updateIssue(issueDetails)

      updateLoading(false)
      return issueDetails
    } catch (e) {
      console.log(e)
      updateLoading(false)
    }
  }

  useEffect(() => {
    fetchIssue()
  }, [get(match, 'params.pathname'), get(match, 'params.id'), filterParams.year])
  return [issue, error, loading, fetchIssue, selection, updateSelection, updateIssue]
}
