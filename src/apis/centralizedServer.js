import config from 'config'
import { get, post } from 'utils/api'

const { CENTRALIZED_SERVER } = config

export const getVoterInfos = async (body) => {
  const { data } = await get(`api/registered-user/${body}`, null, CENTRALIZED_SERVER)
  return { data }
}
