import { useContext } from 'react'
import { Web3Context } from 'components/App/Web3Context'
import { get } from 'utils/api'
import config from 'config'
const { MODE } = config

const useWeb3 = () => {
  const { web3, loadWeb3 } = useContext(Web3Context)

  //useEffect(() => {loadWeb3()}, [])
  return {
    web3,
    getBalance: address => getBalance(web3, address),
    callSmartContractGetFunc: (...args) => callSmartContractGetFunc(web3, ...args),
    convertStringToHash: (...args) => convertStringToHash(web3, ...args),
    convertToAscii: (...args) => convertToAscii(web3, ...args),
    carryTransaction: (...args) => carryTransaction(web3, loadWeb3, ...args)
  }
}

export default useWeb3

const getBalance = async (web3, address) => {
  let defAddress = address
  if (!defAddress) {
    const accounts = await web3.eth.getAccounts()
    defAddress = accounts[0]
  }
  const bal = await web3.eth.getBalance(defAddress)
  return bal ? web3.utils.fromWei(bal, 'ether') : 0
}

const carryTransaction = async (web3, loadWeb3, contract, methodName, args = [], gasLimit = 3000000) => {
  try {
    if (!web3) {
      web3 = await loadWeb3()
    }
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
        gasPrice: web3.utils.toHex(web3.utils.toWei('72', 'gwei'))
      }, ...obj
    }

    return web3.eth.sendTransaction(txObject)
  } catch (e) {
    throw e
  }
}

const callSmartContractGetFunc = async (web3, contract, methodName, args = []) => {
  const [instance] = await instantiateContract(web3, contract)

  return await instance.methods[methodName](...args).call();
}

const instantiateContract = async (web3, contract) => {
  // if (MODE === 'development' || MODE === 'private') {
  console.log("mode is", MODE);
  const networkId = await web3.eth.net.getId()
  console.log("network id", networkId);
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

