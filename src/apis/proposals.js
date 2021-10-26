import { get } from 'utils/api'
import { get as lodGet } from 'lodash'

export const getProposal = async id => {
  try {
    if (!id) {
      return
    }
    const { data } = await get(`api/proposal-detail/${id}`)
    return data
  } catch (e) {
    return {
      status: lodGet(e, 'response.status'),
      error : lodGet(e, 'response.status') === 404 ? 'Record Not Found.' : e.message,
    }
  }
}

export const getProposalTemplate = async path => {
  try {
    const { data } = await get(`api/get-template-detail/${encodeURIComponent(path)}`)
    return data && data.content
  } catch (e) {
    return {
      status: lodGet(e, 'response.status'),
      error : lodGet(e, 'response.status') === 404 ? 'Record Not Found.' : e.message,
    }
  }
}

export const getPathProposalsByPath = async path => {
  const { data } = await get(`api/proposals-by-path?path=${path}`)

  return data
}

export const getExportedProposals = async() => {
  try {
    const { data } = await get('api/exported-proposals')
    return data && data.content
  } catch (e) {
    return {
      status: lodGet(e, 'response.status'),
      error : lodGet(e, 'response.status') === 404 ? 'Record Not Found.' : e.message,
    }
  }
}
