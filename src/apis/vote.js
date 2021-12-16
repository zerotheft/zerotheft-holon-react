import config from 'config'
import { post, get } from 'utils/api'

const { CENTRALIZED_SERVER } = config

export const getCitizenInfo = async citizenID => {
  const { data } = await get(`api/citizen-info/${citizenID}`)
  return data
}

export const vote = async body => {
  const { data } = await post('api/vote', body)

  return { data }
}

// eslint-disable-next-line no-unused-vars
export const holonInfo = async body => {
  const { data } = await get('api/holon-info')
  return data
}

export const getPriorVote = async body => {
  const { data } = await post('api/prior-vote', body)
  return data
}
export const voteDataRollups = async body => {
  const { data } = await post('api/vote-rollups', body)
  return data
}

/**
 * Transfer few funds to citizen metamask wallet provided
 */
export const transferFund = async body => {
  const { data } = await post('api/transfer-fund', body, CENTRALIZED_SERVER)
  return data
}
