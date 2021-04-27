import config from 'config'
import { get, post } from 'utils/api'

const { DESKTOP_APP } = config

export const getVoterInfos = async () => {
  const { data } = await get('info', null, DESKTOP_APP)

  return { data }
}

export const addHistory = async (req) => {
  const { data } = await post('addHistory', req, DESKTOP_APP)

  return { data }
}
