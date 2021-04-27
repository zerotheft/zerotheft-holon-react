import { get } from 'utils/api'

let MODE = process.env.REACT_APP_MODE || process.env.NODE_ENV;
console.log(MODE, 'modes')
const envConfig = !MODE || MODE === "development" ? (function () { try { require('./config.json') } catch (e) { console.log(e.message); } }) : require(`./config.${MODE}.json`)
if (!MODE) {
  MODE = envConfig.MODE || 'development'
}
const contracts = (MODE === "development" || MODE === "private") ? {} : require(`./contracts.${MODE}.json`)

const tryRequire = async (path) => {
  try {
    const proposalContract = await require(`${path}`);
    return proposalContract
  } catch (err) {
    console.log(`getProposalContract: ${err.message}`)
    return null;
  }
}

const getProposalContract = async () => {
  if (MODE === 'private') {
    const { data } = await get('ProposalHandler.json', null, `${envConfig.ZERO_THEFT_CONTRACT}`)
    return data
  }
  if (MODE === 'development')
    return tryRequire('./contracts/ProposalHandler.json')


  return contracts.ProposalHandler
}

export default {
  DESKTOP_APP: envConfig.DESKTOP_APP,
  HTTP_PROVIDER: envConfig.HTTP_PROVIDER || 'http://localhost:7545',
  ZERO_THEFT_CONTRACT: envConfig.ZERO_THEFT_CONTRACT,
  getProposalContract,
  ...contracts,
  MODE: MODE || 'development',
  HONEYBADGER_API_KEY: envConfig.HONEYBADGER_API_KEY
}
