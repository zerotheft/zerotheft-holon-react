import { get } from 'utils/api'

export const getCitizensInfo = async () => {
  const { data } = await get(`api/citizen-data`)
  return data
}

export const getVotesInfo = async () => {
  const { data } = await get(`api/votes-data`)
  return data
}

export const getProposalsInfo = async () => {
  const { data } = await get(`api/proposals-data`)
  return data
}