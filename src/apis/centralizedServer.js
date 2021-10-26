import config from 'config'
import { get, post } from 'utils/api'

const { CENTRALIZED_SERVER } = config

export const getVoterInfos = async body => {
  const { data } = await get(`api/registered-user/${body}`, null, CENTRALIZED_SERVER)
  return { data }
}

// Save a transaction in the UserTransactionHistory Table
export const saveTransaction = async body => {
  const { data } = await post('api/save-transaction', body, CENTRALIZED_SERVER)
  return data
}
