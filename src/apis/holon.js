import { get } from 'lodash'
import { get as getAPI } from 'utils/api'

export const getHolons = async() => {
  try {
    const { data } = await getAPI('api/holons')
    return data 
  } catch (e) {
    return { error: get(e, 'response.status') === 404 ? 'Data unavailable.' : e.message || 'Error while fetching data.' }
  }
}
