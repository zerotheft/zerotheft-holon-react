import config from 'config'
import { get, post } from 'utils/api'

const { CENTRALIZED_SERVER } = config

export const getVoterInfos = async () => {
  const { data } = await get(`registered-voter/`, null, CENTRALIZED_SERVER)
  return data
}