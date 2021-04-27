import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import useCanVote from './useCanVote'
import { vote as voteByHolon, holonInfo as getHolonInfo } from 'apis/vote'
import config from 'config'
import useWeb3 from 'utils/useWeb3'
import { addHistory } from 'apis/desktopApp'
import { IssueContext } from '../IssueContext'
import { toast } from 'react-toastify'
import { get } from 'lodash'
import { getParameterByName } from 'utils'

const { getProposalContract } = config
const VoteContext = createContext()

const VoteProvider = ({ children }) => {
  const [step, checkStep, voterInfo, web3, loadWeb3] = useCanVote()

  const { voting, finalVote, popup, showErrorPopUp, vote, voteWithHolon } = useVote()
  const { selection } = useContext(IssueContext)

  const buildUrl = () => {
    let query = '?page=steps&details=true'
    if (finalVote) query = query + `&vote=${finalVote}`
    if (selection.proposal) query = query + `&p=${selection.proposal.id}`
    if (selection.counterProposal) query = query + `&c=${selection.counterProposal.id}`

    return window.location.origin + window.location.pathname + query
  }

  return (
    <VoteContext.Provider
      value={{
        step,
        checkStep,
        voterInfo,
        web3,
        buildUrl,
        loadWeb3,
        voting,
        finalVote,
        popup,
        showErrorPopUp,
        vote,
        voteWithHolon
      }}
    >
      {children}
    </VoteContext.Provider>
  )
}

export { VoteProvider, VoteContext }

const useVote = () => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()

  const [voting, updateVoting] = useState(false)
  const currentVote = getParameterByName('vote')
  const [finalVote, updateFinalVote] = useState(get(location, 'state.vote') || currentVote || 'yes')
  const { carryTransaction, getBalance, web3 } = useWeb3()
  const [popup, showErrorPopUp] = useState()
  const { selection, refetchIssue, updateVote: updateVoteStore, priorVoteInfo, filter } = useContext(IssueContext)

  const vote = async (values) => {
    updateVoting(true)
    const holonInfo = await getHolonInfo()
    const proposalId = parseInt(finalVote === 'yes' ? get(selection, 'proposal.id') : get(selection, 'counterProposal.id'), 10)
    const contract = await getProposalContract()
    try {
      const balance = await getBalance()
      if (balance === 0 && holonInfo.canBeFunded) {
        showErrorPopUp({ message: 'Insufficient Fund', holonInfo, proposalId, voteType: finalVote, ...values })
        return
      }
      await carryTransaction(contract, 'selfVote', [finalVote, proposalId, (values.custom_amount || '').toString(), values.comment || '', holonInfo.address, false, 0, filter.year, parseInt(priorVoteInfo.success ? priorVoteInfo.id : 0)])

      await afterVote(balance, { voteType: finalVote, proposalId, ...values })
    } catch (e) {
      console.log(e)
      if (holonInfo.canBeFunded)
        showErrorPopUp({ message: '', holonInfo, proposalId, voteType: finalVote, ...values })
      toast.error('Error while voting on this proposal.')
    } finally {
      updateVoting(false)
    }
  }

  const voteWithHolon = async () => {
    try {
      const values = popup
      updateVoting(true)
      const proposalId = values.proposalId
      const sha3 = web3.utils.soliditySha3({ t: 'uint256', v: proposalId }, { t: 'string', v: values.comment || '' }, { t: 'string', v: (values.custom_amount || '').toString() })
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]
      const signedMessage = await web3.eth.sign(sha3, account)
      const balance = await getBalance()
      await voteByHolon({
        proposalId,
        voteType: values.voteType,
        comment: values.comment,
        amount: values.custom_amount,
        signedMessage,
        voter: account,
        year: filter.year,
        priorVoteId: parseInt(priorVoteInfo.success ? priorVoteInfo.id : 0)
      })
      await afterVote(balance, values)
    } catch (e) {
      const msg = get(e, 'response.data.error')

      toast.error((msg && !msg.includes('reverted')) ? msg : 'Error while voting on this proposal.')
    } finally {
      updateVoting(false)
    }
  }


  const afterVote = async (balance, values) => {
    const newBalance = await getBalance()

    const fullPath = `${params.pathname.replaceAll('%2F', '/')}/${params.id}`
    const newHistory = {
      details: `Voted for path: '${fullPath}'`,
      pathName: fullPath,
      previousBalance: balance,
      newBalance: newBalance,
      date: new Date(),
      amount: 0,
      type: 'vote'
    }

    try {
      await addHistory(newHistory)
    } catch (e) {
      console.log(e)
    }

    updateVoteStore(values)
    // await refetchIssue()
    history.push(`/path/${get(params, 'pathname')}/issue/${get(params, 'id')}/voted`)
    toast.success('You have voted to the proposal successfully')
  }

  return {
    voting,
    finalVote,
    popup,
    showErrorPopUp,
    vote,
    voteWithHolon
  }
}


