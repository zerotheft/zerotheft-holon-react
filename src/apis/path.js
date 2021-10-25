import { get as getAPI } from 'utils/api'
import { get } from 'lodash'
import { toast } from 'react-toastify'

export const getPaths = async (params) => {
  const { data } = await getAPI('api/paths', params)

  return { data }
}

export const getUmbrellaPaths = async () => {
  const { data } = await getAPI('api/umbrella-paths')

  return data
}

export const getNations = async () => {
  const { data } = await getAPI('api/nations')

  return { data }
}

export const getPathProposals = async (pathname) => {
  try {
    const { data } = await getAPI(`api/path/${pathname}`)
    return data
  } catch (e) {
    toast.success(get(e, 'response.status') === 404 ? 'Record Not Found.' : e.message)
    return {
      status: get(e, 'response.status'),
      error: get(e, 'response.status') === 404 ? 'Record Not Found.' : e.message,
    }
  }
}
