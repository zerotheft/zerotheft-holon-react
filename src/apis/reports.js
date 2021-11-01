import { get as getAPI } from 'utils/api'
import { get } from 'lodash'

export const getReport = async(param, path = false, year) => {
  try {
    if (path) {
      const { data } = await getAPI(`api/issues/${param}${year ? `/${year}` : ''}/viewReport`)
      return data
    }

    const { data } = await getAPI(`api/issue/${param}${year ? `/${year}` : ''}/viewReport`)
    return data
  } catch (e) {
    return {
      status: get(e, 'response.status'),
      error : get(e, 'response.status') === 404 ? 'Record Not Found.' : e.message,
    }
  }
}

export const getTheftInfo = async(param, path = false, year) => {
  try {
    const { data } = await getAPI(`api/issues/${param}/theftInfo`)
    return data
  } catch (e) {
    return {
      status: get(e, 'response.status'),
      error : get(e, 'response.status') === 404 ? 'Record Not Found.' : e.message,
    }
  }
}

export const getNationReport = async(nation = 'USA', year) => {
  try {
    const { data } = await getAPI(`api/nationPath/${nation}/${year}/viewReport`)
    return data
  } catch (e) {
    return {
      status: get(e, 'response.status'),
      error : get(e, 'response.status') === 404 ? 'Record Not Found.' : e.message,
    }
  }
}
