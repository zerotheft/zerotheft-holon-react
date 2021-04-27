import { get } from 'utils/api'

let MODE = process.env.REACT_APP_MODE || process.env.NODE_ENV;
console.log(MODE, 'modes')
const envConfig = !MODE || MODE === "development" ? require('./config.json') : require(`./config.${MODE}.json`)
if (!MODE) {
  MODE = envConfig.MODE || 'development'
}
const contracts = MODE === "development" ? {} : require(`./contracts.${MODE}.json`)


const getProposalContract = async () => {
  if(MODE === 'private') {
    const { data } = await get('ProposalHandler.json', null, `${envConfig.ZERO_THEFT_CONTRACT}`)
    return data
  }
  if(MODE === 'development')
    return import('contracts/ProposalHandler.json')
    
  return contracts.ProposalHandler
}

export default {
  DESKTOP_APP: envConfig.DESKTOP_APP,
  HTTP_PROVIDER: envConfig.HTTP_PROVIDER || 'http://localhost:7545',
  ZERO_THEFT_CONTRACT: envConfig.ZERO_THEFT_CONTRACT,
  ETHERSCAN_API_KEY: envConfig.ETHERSCAN_API_KEY,
  getProposalContract,
  ...contracts,
  MODE: MODE || 'development',
  HONEYBADGER_API_KEY: envConfig.HONEYBADGER_API_KEY
}
