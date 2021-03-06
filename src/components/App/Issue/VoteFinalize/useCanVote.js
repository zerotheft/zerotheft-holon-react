import { useState, useEffect, useContext } from "react"
import { getVoterInfos } from "apis/centralizedServer"
import { Web3Context } from "components/App/Web3Context"
import { AppContext } from "components/App/AppContext"
import { getPriorVote } from "apis/vote"
import useFetch from "commons/hooks/useFetch"

import config from "config"

const { CHAIN_ID } = config

export default () => {
  const chainID = CHAIN_ID
  const { web3, loadWeb3 } = useContext(Web3Context)
  const { userInfo } = useContext(AppContext)
  /* eslint-disable-next-line no-unused-vars */
  const [getPriorVoteApi, loadingPriorVote, priorVoteInfo] = useFetch(getPriorVote)
  const [step, changeStep] = useState(0),
    [voterInfo, updateVoterInfo] = useState()

  const getMetamaskAccount = async (skipWaiting) => {
    const web3R = web3 || skipWaiting ? web3 : await loadWeb3()

    if (!web3R) return null

    const accounts = await web3R.eth.getAccounts()
    return { account: accounts[0], web3: web3R }
  }

  const getVoterInfo = async (metamaskAccount) => {
    if (metamaskAccount) {
      const { data } = await getVoterInfos(metamaskAccount.toLowerCase())
      updateVoterInfo(data)
      return data
    }
  }

  const fetchPriorVoteInfo = async (path, metamaskAccount) => {
    getPriorVoteApi({
      address: metamaskAccount,
      url: path,
    })
  }

  useEffect(() => {
    updateVoterInfo(userInfo)
  }, [userInfo])

  const checkSteps = async (path, skipWaiting) => {
    let newStep = 4
    let msg = ""
    const { account: metamaskAccount, web3 } = (await getMetamaskAccount(skipWaiting)) || {}
    try {
      // Get the voter Information from central server
      const voterInfo = await getVoterInfo(metamaskAccount)
      const metamask = !!window.web3
      if (!metamask) {
        newStep = 4
        msg = "No zerotheft wallet found"
      } else if (!metamaskAccount) {
        newStep = 4
        msg = "Please login to the zerotheft wallet."
      } else if (web3.currentProvider.chainId !== `0x${chainID.toString(16)}`) {
        newStep = 5
        msg = "Please select the correct network."
      } else if (!voterInfo.verifiedCitizen) {
        newStep = 6
        msg = "Your account is not a verified yet."
      } else {
        newStep = 7
        localStorage.setItem("citizenID", voterInfo.verifiedCitizen)
      }
    } catch (e) {
      newStep = 4
      msg = `${e.message}:: Unable to get the voter information.`
    } finally {
      changeStep(newStep)
      if (newStep > 6) {
        fetchPriorVoteInfo(path, metamaskAccount)
      }
      /* eslint-disable-next-line no-unsafe-finally */
      return { step: newStep, msg }
    }
  }

  return [step, checkSteps, voterInfo || {}, web3, loadWeb3, priorVoteInfo]
}
