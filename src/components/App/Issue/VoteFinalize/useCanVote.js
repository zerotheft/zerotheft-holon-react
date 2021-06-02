import { useState, useEffect, useContext } from 'react'
import { getVoterInfos } from 'apis/desktopApp'
import { Web3Context } from 'components/App/Web3Context'
import { AppContext } from 'components/App/AppContext'
import config from 'config'
const { chainId, MODE } = config

export default () => {
  const chainID = chainId || 1440
  const { web3, loadWeb3 } = useContext(Web3Context)
  const { userInfo } = useContext(AppContext)
  const [step, changeStep] = useState(0),
    [voterInfo, updateVoterInfo] = useState()

  const getVoterInfo = async () => {
    const { data } = await getVoterInfos()
    updateVoterInfo(data)
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
      console.log(voterInfo.network, MODE)
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
        } else if (metamaskAccount.toLowerCase() !== voterInfo.address.toLowerCase()) {
          newStep = 4
          msg = 'Metamask wallet doesn\'t match with the zerotheft wallet.'
        } else if (web3.currentProvider.chainId !== `0x${chainID.toString(16)}`) {
          newStep = 5
          msg = 'Select the correct network.'
        } else if (!voterInfo.voterId) {
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
