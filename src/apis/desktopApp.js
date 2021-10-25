import config from 'config'
import { get, post } from 'utils/api'

const { DESKTOP_APP } = config

/**
 * Get the information of voter/citizen.
 * This is only possible when voter registration is successful in central server using zerotheft wallet extension
 * @returns JSON information of voter that includes public address, voter ID.
 */
export const getVoterInfos = async() => {
  const { data } = await get('info', null, DESKTOP_APP)

  return { data }
}

export const addHistory = async req => {
  const { data } = await post('addHistory', req, DESKTOP_APP)

  return { data }
}
