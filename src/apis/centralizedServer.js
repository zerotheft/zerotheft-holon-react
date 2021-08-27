import config from 'config'
import { get, post } from 'utils/api'

const { CENTRALIZED_SERVER } = config

export const getVoterInfos = async () => {
  const { data } = await get(`api/holons/`, null, CENTRALIZED_SERVER)
  return data
}