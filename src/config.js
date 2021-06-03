import { get } from 'utils/api'

const tryRequire = (path) => {
  try {
    const file = require(`${path}`);
    return file
  } catch (err) {
    console.log(`Required File Error: ${err.message}`)
    return null;
  }
}
let MODE = process.env.REACT_APP_MODE || process.env.NODE_ENV;
if (!MODE) {
  MODE = 'development'
}

const envConfig = !MODE || MODE === "development" ? tryRequire('./config.json') : require(`./config.${MODE}.json`)
const contracts = (MODE === "development" || MODE === "private") ? {} : require(`./contracts.${MODE}.json`)

const getProposalContract = async () => {
  if (MODE === 'private') {
    const { data } = await get('ZTMProposals.json', null, `${envConfig.ZERO_THEFT_CONTRACT}`)
    return data
  }
  if (MODE === 'development')
    return tryRequire('./contracts/ZTMProposals.json')


  return contracts.ZTMProposals
}

export default {
  DESKTOP_APP: envConfig.DESKTOP_APP,
  CHAIN_ID: envConfig.CHAIN_ID,
  HTTP_PROVIDER: envConfig.HTTP_PROVIDER || 'http://localhost:7545',
  ZERO_THEFT_CONTRACT: envConfig.ZERO_THEFT_CONTRACT,
  getProposalContract,
  ...contracts,
  MODE: MODE || 'development',
  HONEYBADGER_API_KEY: envConfig.HONEYBADGER_API_KEY
}
