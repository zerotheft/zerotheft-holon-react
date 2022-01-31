import React, { createContext, useState, useEffect, useContext } from "react"
import { get } from "lodash"

import { getParameterByName } from "utils"
import { getPathProposalsByPath, getProposal } from "apis/proposals"
import { AppContext } from "components/App/AppContext"
import config from "config"
import { ToastContext } from "commons/ToastContext"
import useWeb3 from "utils/useWeb3"
import { Web3Context } from "../Web3Context"
import {
  checkNetwork,
  checkWalletInstallation,
  getUserMetamaskAddress,
  getUserRegistration,
  getWalletBalance,
  sendBalanceToWallet,
} from "./VoteFinalize/voteConditions"

const IssueContext = createContext()

const IssueProvider = ({ children, id, match, location }) => {
  let { web3 } = useContext(Web3Context)
  const { loadWeb3 } = useContext(Web3Context)
  const { setToastProperties } = useContext(ToastContext)
  const { addOrSwitchCorrectNetwork } = useWeb3()
  const [issue, error, loading, fetchIssue, selection, updateSelection, updateIssue] = useIssueFetcher(id, match)
  const [vote, updateVote] = useState()

  // const [getPriorVoteApi, loadingPriorVote, priorVoteInfo] = useFetch(getPriorVote)
  // const { userInfo = {}, filterParams } = useContext(AppContext)
  const [proposalDetails, updateProposalDetails] = useState({}),
    [currentRequirementStep, updateCurrentRequirementStep] = useState(0)

  // useEffect(() => {
  //   // console.log(`${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`).replaceAll('%2F', '/')
  //   getPriorVoteApi({
  //     address: userInfo.address || localStorage.getItem('address'),
  //     url: (`${get(match, 'params.pathname')}%2F${get(match, 'params.id')}`).replaceAll('%2F', '/')
  //   })
  // }, [userInfo.address])

  useEffect(() => {
    if (!issue || selection.proposal || selection.counterProposal) return

    const proposalId = getParameterByName("p")
    const counterProposalId = getParameterByName("c")

    if (proposalId || counterProposalId) {
      const proposal = issue.proposals.find((i) => i.id === proposalId)
      const counterProposal = issue.counter_proposals.find((i) => i.id === counterProposalId)
      updateSelection({ proposal, counterProposal })
    }
  }, [issue, location.search])

  const selectedProposalId = get(selection, "proposal.id")
  const selectedCounterProposalId = get(selection, "counterProposal.id")
  const { VOTE_BALANCE } = config

  const fetchProposal = async (proposalId) => {
    if (proposalDetails[proposalId] || !proposalId) return
    try {
      updateProposalDetails({
        ...proposalDetails,
        [proposalId]: { loading: true },
      })
      const proposal = await getProposal(proposalId)
      updateProposalDetails({ ...proposalDetails, [proposalId]: proposal })
    } catch {
      updateProposalDetails({ ...proposalDetails, [proposalId]: null })
    }
  }

  const checkRequirements = async () => {
    if (!web3) {
      web3 = await loadWeb3()
    }
    const isMetamaskInstalled = await checkWalletInstallation()
    if (!isMetamaskInstalled) {
      await updateCurrentRequirementStep(1)
      return false
    }

    const isCorrectNetwork = await checkNetwork(web3)
    if (!isCorrectNetwork) {
      await addOrSwitchCorrectNetwork()
    }

    const userWalletAddress = await getUserMetamaskAddress(web3)
    if (!userWalletAddress) {
      await updateCurrentRequirementStep(3)
      return false
    }

    const userDetails = await getUserRegistration(userWalletAddress)
    if (!userDetails) {
      await updateCurrentRequirementStep(4)
      return false
    }

    if (!userDetails.verifiedCitizen) {
      await updateCurrentRequirementStep(5)
      return false
    }

    await updateCurrentRequirementStep(6)
    return true
  }

  const checkAndTransferFund = async () => {
    const userWalletAddress = await getUserMetamaskAddress(web3)
    const userDetails = await getUserRegistration(userWalletAddress)
    const walletBalance = await getWalletBalance(web3, userWalletAddress)
    let message = ""
    if (walletBalance < VOTE_BALANCE) {
      const amountToBefunded = VOTE_BALANCE - walletBalance
      const details = `Funded to ${userWalletAddress} during the time of voting process where citizen balance is ${walletBalance}.`
      const transferToWalletStatus = await sendBalanceToWallet(
        userDetails,
        userWalletAddress,
        amountToBefunded,
        details
      )

      if (transferToWalletStatus.success === true) {
        message = `We have successfully transferred ${amountToBefunded} to your wallet for voting.`
        setToastProperties({ message, type: "success" })
        return true
      }

      if (transferToWalletStatus.status === 400) {
        return true
      }

      setToastProperties({
        message: transferToWalletStatus.data.error,
        type: "error",
      })
      return false
    }
    return true
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
        currentRequirementStep,
        updateCurrentRequirementStep,
        checkRequirements,
        checkAndTransferFund,
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
    [selection, updateSelection] = useState({
      proposal: null,
      counterProposal: null,
    }),
    [loading, updateLoading] = useState(true),
    /* eslint-disable-next-line no-unused-vars */
    [error, updateError] = useState()

  const fetchIssue = async () => {
    updateLoading(true)
    try {
      const path = (await getPathProposalsByPath(`${match.params.pathname}%2F${match.params.id}`)) || []
      const issueDetails = {}
      issueDetails.proposals =
        path.data
          .filter((i) => i && parseFloat(i.theftAmt) > 0)
          .map((i) => ({
            ...i,
            year: parseInt(get(i, "year")),
          })) || []

      issueDetails.counter_proposals =
        path.data
          .filter((i) => i && parseFloat(i.theftAmt) <= 0)
          .map((i) => ({
            ...i,
            year: parseInt(get(i, "year")),
          })) || []

      issueDetails.bellCurveData = path.chartData || {}
      updateIssue(issueDetails)

      updateLoading(false)
      return issueDetails
    } catch (e) {
      updateLoading(false)
    }
  }

  useEffect(() => {
    fetchIssue()
  }, [get(match, "params.pathname"), get(match, "params.id"), filterParams.year])
  return [issue, error, loading, fetchIssue, selection, updateSelection, updateIssue]
}
