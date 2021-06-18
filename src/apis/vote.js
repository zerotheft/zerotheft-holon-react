import { post, get } from 'utils/api'

export const getUserInfo = async address => {
  const { data } = await get(`api/user-info/${address}`)
  return data
}

export const vote = async body => {
  const { data } = await post('api/vote', body)

  return { data }
}

export const holonInfo = async body => {
  const { data } = await get('api/holon-info')
  return data
}

export const getPriorVote = async body => {
  const { data } = await post(`api/prior-vote`, body)
  return data
}
export const voteDataRollups = async body => {
  const { data } = await post('api/vote-rollups', body)
  return data
}