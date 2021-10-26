import React, { createContext, useContext, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { vote as voteByHolon, holonInfo as getHolonInfo, voteDataRollups } from 'apis/vote'
import config from 'config'
import useWeb3 from 'utils/useWeb3'
import { addHistory } from 'apis/desktopApp'
import { toast } from 'react-toastify'
import { get } from 'lodash'
import { getParameterByName } from 'utils'
import { AppContext } from '../../AppContext'
import { IssueContext } from '../IssueContext'
import useCanVote from './useCanVote'

const { getVoteContract } = config
const VoteContext = createContext()

const VoteProvider = ({ children }) => {
  const [step, checkStep, voterInfo, web3, loadWeb3, priorVoteInfo] = useCanVote()

  const { voting, finalVote, popup, showErrorPopUp, vote } = useVote(voterInfo)
  const { selection } = useContext(IssueContext)
  const buildUrl = () => {
    let query = '?page=steps&details=true'
    if (finalVote) query += `&vote=${finalVote}`
    if (selection.proposal) query += `&p=${selection.proposal.id}`
    if (selection.counterProposal) query += `&c=${selection.counterProposal.id}`

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
        priorVoteInfo,
      }}
    >
      {children}
    </VoteContext.Provider>
  )
}

export { VoteProvider, VoteContext }

const useVote = voterInfo => {
  const history = useHistory()
  const location = useLocation()
  const params = useParams()

  const { userInfo } = useContext(AppContext)
  const [voting, updateVoting] = useState(false)
  const currentVote = getParameterByName('vote')
  const [finalVote, updateFinalVote] = useState(get(location, 'state.vote') || currentVote || 'yes')
  const { carryTransaction, callSmartContractGetFunc, getBalance, convertToAscii, convertStringToHash, web3 } =
    useWeb3()
  const [popup, showErrorPopUp] = useState()
  const { selection, refetchIssue, updateVote: updateVoteStore } = useContext(IssueContext)

  // const fetchPriorVoteInfo = async (metamaskAccount) => {
  //   getPriorVoteApi({
  //     address: metamaskAccount,
  //     url: (`${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`).replaceAll('%2F', '/')
  //   })
  // }

  const vote = async values => {
    updateVoting(true)
    const holonInfo = await getHolonInfo()
    const voteType = finalVote === 'yes'
    const yesTheftProposalId = get(selection, 'proposal.id', '')
    const noTheftProposalId = get(selection, 'counterProposal.id', '')

    const proposalId = voteType ? yesTheftProposalId : noTheftProposalId
    const contract = await getVoteContract()
    try {
      const balance = await getBalance()
      if (balance === 0 && holonInfo.canBeFunded) {
        showErrorPopUp({ message: 'Insufficient Fund', holonInfo, proposalId, voteType: finalVote, ...values })
        return
      }
      if (!holonInfo.holonID || holonInfo.holonID === '') {
        showErrorPopUp({
          message : 'Holon information missing. Please select holon first',
          holonInfo,
          proposalId,
          voteType: finalVote,
          ...values,
        })
        return
      }

      // const voteID = convertStringToHash(`${userInfo.address}${Date.now().toString()}`)

      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      const votingArea = await convertToAscii('RiggedEconomy')
      const hierarchyPath = convertStringToHash(values.hierarchyPath)
      const voteTypeDetail = await convertToAscii('TrueFalse_AmountsPerYear')
      const voteValue = voteType ? 'True' : 'False'
      const verificationOnVote = await convertToAscii(
        'RIGGED=Economy is rigged. Philosphic theft (not necessarily legal theft) has occured'
      )
      const amountValue = values.altTheftAmounts || ''

      const messageParams = [
        { t: 'bytes32', v: votingArea },
        { t: 'bytes32', v: hierarchyPath },
        { t: 'bytes32', v: voteTypeDetail },
        { t: 'string', v: voteValue },
        { t: 'string', v: amountValue }, // custom amount added by citizen
        { t: 'address', v: account },
        { t: 'string', v: yesTheftProposalId },
        { t: 'string', v: noTheftProposalId },
      ]
      const sha3 = web3.utils.soliditySha3(...messageParams)
      const signedMessage = await web3.eth.personal.sign(sha3, account)

      console.log(
        'before vote',
        [
          votingArea,
          hierarchyPath,
          values.hierarchyPath,
          voteTypeDetail,
          voteValue,
          amountValue,
          verificationOnVote,
          yesTheftProposalId,
          noTheftProposalId,
          values.comment || '',
          holonInfo.holonID,
          signedMessage,
        ],
        voterInfo
      )

      const fullPath = `${params.pathname.replaceAll('%2F', '/')}/${params.id}`
      const txDetails = { userId: voterInfo.id, details: `Voted path ${fullPath}`, txType: 'vote' }

      await carryTransaction(
        contract,
        'createVote',
        [
          votingArea,
          hierarchyPath,
          voteTypeDetail,
          voteValue,
          amountValue,
          verificationOnVote,
          yesTheftProposalId,
          noTheftProposalId,
          values.comment || '',
          holonInfo.holonID,
          signedMessage,
        ],
        txDetails
      )
      console.log('after vote')

      const idxRes = await callSmartContractGetFunc(contract, 'getLastVoteIndex')
      await afterVote(balance, { account, voteType: finalVote, voteIndex: idxRes.voteIndex, proposalId, ...values })
    } catch (e) {
      if (holonInfo.canBeFunded) showErrorPopUp({ message: '', holonInfo, proposalId, voteType: finalVote, ...values })
      toast.error('Error while voting on this proposal.')
    } finally {
      updateVoting(false)
    }
  }

  // TODO: We might need this later. So just keeping it with comments
  // const voteWithHolon = async () => {
  //   try {
  //     const values = popup
  //     updateVoting(true)
  //     const proposalId = values.proposalId
  //     const sha3 = web3.utils.soliditySha3({ t: 'uint256', v: proposalId }, { t: 'string', v: values.comment || '' }, { t: 'string', v: (values.custom_amount || '').toString() })
  //     const accounts = await web3.eth.getAccounts()
  //     const account = accounts[0]
  //     const signedMessage = await web3.eth.sign(sha3, account)
  //     const balance = await getBalance()
  //     await voteByHolon({
  //       proposalId,
  //       voteType: values.voteType,
  //       comment: values.comment,
  //       altTheftAmounts: values.altTheftAmounts,
  //       signedMessage,
  //       voter: account,
  //       priorVoteId: parseInt(priorVoteInfo.success ? priorVoteInfo.id : 0)
  //     })
  //     await afterVote(balance, values)
  //   } catch (e) {
  //     const msg = get(e, 'response.data.error')

  //     toast.error((msg && !msg.includes('reverted')) ? msg : 'Error while voting on this proposal.')
  //   } finally {
  //     updateVoting(false)
  //   }
  // }

  const afterVote = async(balance, values) => {
    // do voteData Rollups
    const rollupsRes = await voteDataRollups({ voteIndex: values.voteIndex })
    if (!rollupsRes.success) toast.error('Error in  voting rollups')

    // TODO: Voting history is no more maintained in desktop app. so keeping it for now
    // const newBalance = await getBalance()

    // const fullPath = `${params.pathname.replaceAll('%2F', '/')}/${params.id}`
    // const newHistory = {
    //   details: `Voted for path: '${fullPath}'`,
    //   pathName: fullPath,
    //   previousBalance: balance,
    //   newBalance,
    //   date: new Date(),
    //   amount: 0,
    //   type: 'vote'
    // }
    // try {
    //   await addHistory(newHistory)
    // } catch (e) {
    //   console.log(e)
    // }

    updateVoteStore(values)

    // save voter address in local storage
    localStorage.setItem('address', values.account)

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
  }
}
