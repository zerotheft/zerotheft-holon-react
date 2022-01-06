import { get } from "utils/api"

const tryRequire = (path) => {
  try {
    const file = require(`${path}`)
    return file
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.log(`Required File Error: ${err.message}`)
    return null
  }
}
let MODE = process.env.REACT_APP_MODE || process.env.NODE_ENV
if (!MODE) {
  MODE = "development"
}
const envConfig = !MODE || MODE === "development" ? tryRequire("./config.json") : require(`./config.${MODE}.json`)
const contracts =
  MODE === "development" || MODE === "private" || MODE === "production" ? {} : require(`./contracts.${MODE}.json`)

/**
 * Load respective contracts based on contract name
 * @param {string} contractName - Name of the contract
 * @returns JSON object of the contract
 */
const loadContract = async (contractName) => {
  if (MODE === "development") return tryRequire(`./contracts/${contractName}.json`)

  const { data } = await get(`${contractName}.json`, null, `${envConfig.ZERO_THEFT_CONTRACT}/${envConfig.NETWORK_NAME}`)
  return data
}

export default {
  DESKTOP_APP: envConfig.DESKTOP_APP,
  CHAIN_ID: envConfig.CHAIN_ID,
  HTTP_PROVIDER: envConfig.HTTP_PROVIDER || "http://localhost:7545",
  ZERO_THEFT_CONTRACT: envConfig.ZERO_THEFT_CONTRACT,
  loadContract,
  ...contracts,
  MODE: MODE || "development",
  HONEYBADGER_API_KEY: envConfig.HONEYBADGER_API_KEY,
  CENTRALIZED_SERVER: envConfig.CENTRALIZED_SERVER,
  CENTRALIZED_SERVER_FRONTEND: envConfig.CENTRALIZED_SERVER_FRONTEND,
  TOKEN: ["private", "development"].includes(MODE) ? "ETC" : "MATIC",
  ...envConfig,
}
