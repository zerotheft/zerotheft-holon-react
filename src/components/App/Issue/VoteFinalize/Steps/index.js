import React, { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import { get } from "lodash"
import { Redirect, useLocation } from "react-router"
import OverlaySpinner from "commons/OverlaySpinner"
import config from "config"
import { VoteContext, VoteProvider } from "../VoteContext"
import {
  checkNetwork,
  checkWalletInstallation,
  getUserMetamaskAddress,
  getUserRegistration,
  getWalletBalance,
  sendBalanceToWallet,
} from "../voteConditions"

import { IssueContext } from "../../IssueContext"
import Step4 from "./Step4"
import Step5 from "./Step5"
import NoAccount from "./NoAccount"
import Step6 from "./Step6"
import Step7 from "./Step7"
import UnverifiedCitizen from "./UnverifiedCitizen"
import FundTransfer from "./FundTransfer"

const Steps = ({ match, history }) => {
  const location = useLocation()
  let voteValue = location.voteValue ? location.voteValue.vote : null
  const { web3 } = useContext(VoteContext)
  const { selection } = useContext(IssueContext)

  const { VOTE_BALANCE } = config
  const [requirementCheckProgress, updateRequirementCheckProgress] = useState(false)
  const [currentRequirementStep, updateCurrentRequirementStep] = useState(1)
  const [localStorageData, updatelocalStorageData] = useState(true)
  const issuePath = `${match.params.pathname}/${match.params.id}`.replace(/%2F/g, "/")

  // Store data in local storage for the reload
  const storeDataInLocalStorage = async () => {
    if (!get(selection, "proposal") && !location.voteValue) {
      const data = JSON.parse(localStorage.getItem(issuePath))
      if (data && data.selection && data.vote) {
        updatelocalStorageData(true)
      } else {
        updatelocalStorageData(false)
      }
      return
    }

    if (!location.voteValue || !selection) return

    const storagePayload = {
      selection,
      vote: location.voteValue.vote,
    }

    localStorage.setItem(issuePath, JSON.stringify(storagePayload))
  }

  const retrieveDataFromLocalStorage = async () => {
    const data = JSON.parse(localStorage.getItem(issuePath))
    if (data) {
      if (data.selection) {
        selection.proposal = data.selection.proposal
        selection.counterProposal = data.selection.counterProposal
      }

      if (data.vote) {
        voteValue = data.vote
      }
    }
  }

  retrieveDataFromLocalStorage()

  const setCitizenID = async () => {
    const userWalletAddress = await getUserMetamaskAddress(web3)
    const userDetails = await getUserRegistration(userWalletAddress)
    localStorage.setItem("citizenID", userDetails.unverifiedCitizen)
    return true
  }

  const proceedWithExtensionInstall = async () => {
    updateRequirementCheckProgress(true)
    const isMetamaskInstalled = await checkWalletInstallation()
    if (isMetamaskInstalled) {
      await updateCurrentRequirementStep(2)
    } else {
      window.location.reload()
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithExtensionNetwork = async () => {
    updateRequirementCheckProgress(true)
    const isCorrectNetwork = await checkNetwork(web3)
    if (isCorrectNetwork) {
      await updateCurrentRequirementStep(3)
    } else {
      toast.warning("Please follow the instructions on screen to setup network.")
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithWalletAccount = async () => {
    updateRequirementCheckProgress(true)
    const userWalletAddress = await getUserMetamaskAddress(web3)
    if (userWalletAddress) {
      updateRequirementCheckProgress(false)
      await updateCurrentRequirementStep(4)
    } else {
      toast.warning("Please follow the instructions on screen to create or import wallet.")
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithRegistration = async () => {
    updateRequirementCheckProgress(true)
    const userWalletAddress = await getUserMetamaskAddress(web3)
    const userDetails = await getUserRegistration(userWalletAddress)
    if (userDetails) {
      await updateCurrentRequirementStep(5)
    } else {
      toast.warning("Please follow the instructions on screen to register your Voter ID.")
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithVerification = async () => {
    updateRequirementCheckProgress(true)
    const userWalletAddress = await getUserMetamaskAddress(web3)
    const userDetails = await getUserRegistration(userWalletAddress)
    if (userDetails.verifiedCitizen) {
      updateRequirementCheckProgress(false)
      await proceedWithBalanceTransfer()
    } else {
      toast.warning("Please follow the instructions on screen to verify your Voter ID.")
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithBalanceTransfer = async () => {
    updateRequirementCheckProgress(true)
    const userWalletAddress = await getUserMetamaskAddress(web3)
    const userDetails = await getUserRegistration(userWalletAddress)
    const walletBalance = await getWalletBalance(web3, userWalletAddress)
    if (walletBalance < VOTE_BALANCE) {
      const transferToWalletStatus = await sendBalanceToWallet(userDetails.verifiedCitizen, userWalletAddress)
      if (transferToWalletStatus !== true) {
        await updateCurrentRequirementStep(6)
        return
      }

      toast.success("We have successfully funded your wallet for funding. Please proceed with voting")
    }
    await updateCurrentRequirementStep(7)
    updateRequirementCheckProgress(false)
  }

  const proceedToVote = async () => {
    await setCitizenID()
    history.push(`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}/finalize`, {
      vote: voteValue,
    })
  }

  useEffect(() => {
    storeDataInLocalStorage()
  }, [])

  if (!localStorageData) {
    return <Redirect to={`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}`} />
  }

  return (
    <div>
      <Body>
        <OverlaySpinner loading={requirementCheckProgress} />
        {
          {
            1: <Step4 proceed={proceedWithExtensionInstall} />,
            2: <Step5 proceed={proceedWithExtensionNetwork} />,
            3: <NoAccount proceed={proceedWithWalletAccount} />,
            4: <Step6 proceed={proceedWithRegistration} />,
            5: <UnverifiedCitizen proceed={proceedWithVerification} />,
            6: <FundTransfer proceed={proceedWithBalanceTransfer} />,
            7: <Step7 proceed={proceedToVote} />,
          }[currentRequirementStep]
        }
        {/* <Step updateCurrentStep={updateCurrentStep} {...props} /> */}
      </Body>
    </div>
  )
}

const stepWrapper = (props) => {
  return (
    <VoteProvider>
      <Steps {...props} />
    </VoteProvider>
  )
}

export default stepWrapper

const Body = styled.div`
  box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 58px 80px;
  margin: 40px 0;
`
