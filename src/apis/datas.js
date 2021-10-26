import { get } from 'utils/api'

export const getCitizensInfo = async() => {
  const { data } = await get('api/citizen-data')
  return data
}

export const getVotesInfo = async path => {
  const { data } = await get('api/votes-data/', path)
  return data
}

export const getProposalsInfo = async() => {
  const { data } = await get('api/proposals-data')
  return data
}
