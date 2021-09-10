import { useState, useEffect, useContext } from 'react'
import { getVoterInfos } from 'apis/centralizedServer'
import { Web3Context } from 'components/App/Web3Context'
import { AppContext } from 'components/App/AppContext'
import config from 'config'
const { CHAIN_ID, MODE, CENTRALIZED_SERVER } = config

export default () => {
  const chainID = CHAIN_ID
  const { web3, loadWeb3 } = useContext(Web3Context)
  const { userInfo } = useContext(AppContext)
  const [step, changeStep] = useState(0),
    [voterInfo, updateVoterInfo] = useState()

  const getVoterInfo = async (skipWaiting) => {
    const { account: metamaskAccount } = await getMetamaskAccount(skipWaiting) || {}
    const { data } = await getVoterInfos(metamaskAccount.toLowerCase())
    return data
  }

  useEffect(() => {
    updateVoterInfo(userInfo)
  }, [userInfo])

  const getMetamaskAccount = async skipWaiting => {
    const web3R = (web3 || skipWaiting) ? web3 : await loadWeb3()
    if (!web3R) return null
    const accounts = await web3R.eth.getAccounts()
    return { account: accounts[0], web3: web3R }
  }

  const checkSteps = async (skipWaiting) => {
    let newStep = 1
    let msg = ''
    try {
      const voterInfo = await getVoterInfo()
      const metamask = !!window.web3
      if (!voterInfo || voterInfo.network !== MODE) {
        newStep = 2
        msg = 'Select correct environment in the desktop app'
      } else if (!voterInfo.address) {
        newStep = 3
        msg = 'Please create wallet in zerotheft desktop app.'
      } else if (!metamask) {
        newStep = 4
        msg = 'No metamask found'
      } else {

        const { account: metamaskAccount, web3 } = await getMetamaskAccount(skipWaiting) || {}

        if (!metamaskAccount) {
          newStep = 4
          msg = 'Please login to the metamask.'
        } else if (metamaskAccount.toLowerCase() !== voterInfo.ethereumAddress.toLowerCase()) {
          newStep = 4
          msg = 'Metamask wallet doesn\'t match with the zerotheft wallet.'
        } else if (web3.currentProvider.chainId !== `0x${chainID.toString(16)}`) {
          newStep = 5
          msg = 'Select the correct network.'
        } else if (voterInfo.unverifiedCitizen) {
          newStep = 6
          msg = 'Voter id has not been created yet.'
        } else {
          newStep = 7
        }
      }

    } catch (e) {

      console.log(e)
      newStep = 1
      msg = 'Please install, open and register into your zerotheft desktop app.'
    } finally {
      changeStep(newStep)
      return { step: newStep, msg }
    }
  }

  return [step, checkSteps, voterInfo || {}, web3, loadWeb3]
}
