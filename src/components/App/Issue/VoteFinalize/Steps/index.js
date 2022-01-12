import React, { useEffect, useState, useContext } from "react"
import { toast } from "react-toastify"
import { get } from "lodash"
import { Redirect, useLocation } from "react-router"
import OverlaySpinner from "commons/OverlaySpinner"
import { ToastContext } from "commons/ToastContext"
import { VoteContext, VoteProvider } from "../VoteContext"
import { checkNetwork, checkWalletInstallation, getUserMetamaskAddress, getUserRegistration } from "../voteConditions"

import { IssueContext } from "../../IssueContext"
import Step4 from "./Step4"
import Step5 from "./Step5"
import NoAccount from "./NoAccount"
import Step6 from "./Step6"
import Step7 from "./Step7"
import UnverifiedCitizen from "./UnverifiedCitizen"

const Steps = ({ match, history }) => {
  const location = useLocation()
  let voteValue = location.voteValue ? location.voteValue.vote : null
  const { web3 } = useContext(VoteContext)
  const { setToastProperties } = useContext(ToastContext)
  const { selection, currentRequirementStep, updateCurrentRequirementStep, checkRequirements } =
    useContext(IssueContext)

  const [requirementCheckProgress, updateRequirementCheckProgress] = useState(false)
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
      toast.warning("Please install ztm wallet extension by following the steps on screen")
      window.location.reload()
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithExtensionNetwork = async () => {
    updateRequirementCheckProgress(true)
    const isCorrectNetwork = await checkNetwork(web3)
    if (isCorrectNetwork) {
      updateCurrentRequirementStep(false)
      await checkRequirements()
    } else {
      const message = "Please follow the instructions on screen to setup network."
      setToastProperties({ message, type: "error" })
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithWalletAccount = async () => {
    updateRequirementCheckProgress(true)
    const userWalletAddress = await getUserMetamaskAddress(web3)
    if (userWalletAddress) {
      updateRequirementCheckProgress(false)
      await checkRequirements()
    } else {
      const message = "Please follow the instructions on screen to create or import wallet."
      setToastProperties({ message, type: "error" })
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithRegistration = async () => {
    updateRequirementCheckProgress(true)
    const userWalletAddress = await getUserMetamaskAddress(web3)
    const userDetails = await getUserRegistration(userWalletAddress)
    if (userDetails) {
      updateRequirementCheckProgress(false)
      await checkRequirements()
    } else {
      const message = "Please follow the instructions on screen to register your Voter ID."
      setToastProperties({ message, type: "error" })
    }
    updateRequirementCheckProgress(false)
  }

  const proceedWithVerification = async () => {
    updateRequirementCheckProgress(true)
    const userWalletAddress = await getUserMetamaskAddress(web3)
    const userDetails = await getUserRegistration(userWalletAddress)
    if (userDetails.verifiedCitizen) {
      updateRequirementCheckProgress(false)
      await checkRequirements()
    } else {
      toast.warning()
      const message = "Please follow the instructions on screen to verify your Voter ID."
      setToastProperties({ message, type: "error" })
    }
    updateRequirementCheckProgress(false)
  }

  const proceedToVote = async () => {
    console.log("hello world")

    await setCitizenID()
    history.push(`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}/finalize`, {
      vote: voteValue,
    })
  }

  useEffect(() => {
    storeDataInLocalStorage()
  }, [])

  useEffect(() => {
    checkRequirements()
  }, [])

  if (!localStorageData) {
    return <Redirect to={`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}`} />
  }

  if (currentRequirementStep === 6) {
    history.push(`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}/finalize`, {
      vote: voteValue,
    })
  }

  return (
    <div>
      <OverlaySpinner loading={requirementCheckProgress} />
      {
        {
          1: <Step4 proceed={proceedWithExtensionInstall} />,
          2: <Step5 proceed={proceedWithExtensionNetwork} />,
          3: <NoAccount proceed={proceedWithWalletAccount} />,
          4: <Step6 proceed={proceedWithRegistration} />,
          5: <UnverifiedCitizen proceed={proceedWithVerification} />,
          6: <Step7 proceed={proceedToVote} />,
        }[currentRequirementStep]
      }
      {/* <Step updateCurrentStep={updateCurrentStep} {...props} /> */}
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
