import { useContext } from "react"
import { Web3Context } from "components/App/Web3Context"
import { saveTransaction } from "apis/centralizedServer"
import config from "config"

const { GAS_PRICE } = config

const useWeb3 = () => {
  const { web3, loadWeb3 } = useContext(Web3Context)

  // useEffect(() => { loadWeb3() }, [])
  return {
    web3,
    signMessage: (params, address) => signMessage(web3, loadWeb3, params, address),
    getWalletAccount: (skipWaiting) => getWalletAccount(web3, loadWeb3, skipWaiting),
    getBalance: (address) => getBalance(web3, address),
    callSmartContractGetFunc: (...args) => callSmartContractGetFunc(web3, ...args),
    convertStringToHash: (...args) => convertStringToHash(web3, ...args),
    convertToAscii: (...args) => convertToAscii(web3, ...args),
    carryTransaction: (...args) => carryTransaction(web3, loadWeb3, ...args),
  }
}

export default useWeb3

/**
 * Sign a message using the private key of the address
 * @param {object} web3 - instance of a web3
 * @param {function} loadWeb3 - function to load the web3
 * @param {object} params - payload that needs to be signed
 * @param {object} address - address of the user signing a message
 * @returns signed message
 */
const signMessage = async (web3, loadWeb3, params, address) => {
  if (!web3) {
    web3 = await loadWeb3()
  }
  const sha3 = web3.utils.soliditySha3(...params)
  const signedMessage = await web3.eth.personal.sign(sha3, address)
  return signedMessage
}

/**
 * Get the account information of the user from chrome extension
 * @param {Object} web3 - instance of a web3 to get the network id
 * @param {Function} loadWeb3 - function to load the web3
 * @param {boolean} skipWaiting
 * @returns JSON object of the account information and  instance of web3
 */
const getWalletAccount = async (web3, loadWeb3, skipWaiting) => {
  const web3R = web3 || skipWaiting ? web3 : await loadWeb3()

  if (!web3R) return null

  const accounts = await web3R.eth.getAccounts()
  return { account: accounts[0], web3: web3R }
}

const getBalance = async (web3, address) => {
  let defAddress = address
  if (!defAddress) {
    const accounts = await web3.eth.getAccounts()
    defAddress = accounts[0]
  }
  const bal = await web3.eth.getBalance(defAddress)
  return bal ? web3.utils.fromWei(bal, "ether") : 0
}

const carryTransaction = async (web3, loadWeb3, contract, methodName, args = [], txDetails, gasLimit = 3000000) => {
  /* eslint-disable no-useless-catch */
  try {
    if (!web3) {
      web3 = await loadWeb3()
    }
    const balanceBefore = await getBalance(web3)

    const [instance, address] = await instantiateContract(web3, contract)
    const functionAbi = instance.methods[methodName](...args).encodeABI()
    const accounts = await web3.eth.getAccounts()
    const defAddress = accounts[0]

    const obj = {
      from: defAddress,
      to: address,
      data: functionAbi,
      gasLimit: web3.utils.toHex(gasLimit),
    }
    const txCount = await web3.eth.getTransactionCount(address)

    const txObject = {
      ...{
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(300000),
        gasPrice: web3.utils.toHex(web3.utils.toWei(GAS_PRICE.toString() || "30", "gwei")),
      },
      ...obj,
    }

    const tx = await web3.eth.sendTransaction(txObject)
    const balanceAfter = await getBalance(web3)
    if (txDetails) {
      // Track the record of transaction made to the blockchain by this citizen while selecting a holon
      await saveTransaction({
        ...txDetails,
        balanceBefore,
        balanceAfter,
        gasPrice: config.GAS_PRICE,
        txHash: tx.transactionHash,
      })
    }
    return tx
  } catch (e) {
    throw e
  }
}

const callSmartContractGetFunc = async (web3, contract, methodName, args = []) => {
  const [instance] = await instantiateContract(web3, contract)

  const txResponse = await instance.methods[methodName](...args).call()
  return txResponse
}

/**
 * Read the contract abi and return the instance of a contract.
 * @param {Object} web3 - instance of a web3 to get the network id
 * @param {Object} contract - it could be any smartcontract as ZTMCitizens,ZTMHolons, ZTMProposals and so on.
 */
const instantiateContract = async (web3, contract) => {
  // if (MODE === 'development' || MODE === 'private') {
  const networkId = await web3.eth.net.getId()
  const deployedNetwork = contract.networks[networkId]
  return [new web3.eth.Contract(contract.abi, deployedNetwork && deployedNetwork.address), deployedNetwork.address]

  // } else {
  //   const { address, implementation } = contract
  //   const res = await get(`api?module=contract&action=getabi&address=${implementation}`, null, `https://blockscout.com/etc/${config.network}`)
  //   // const res = await get(`api?module=contract&action=getabi&address=${implementation}&apikey=${ETHERSCAN_API_KEY}`, null, `https://api${network ? `-${network}` : ''}.etherscan.io`)
  //   return [new web3.eth.Contract(JSON.parse(res.data.result), address), address]
  // }
}

const convertStringToHash = (web3, item) => {
  return web3.utils.keccak256(item)
}

const convertToAscii = (web3, item) => {
  return web3.utils.asciiToHex(item)
}
