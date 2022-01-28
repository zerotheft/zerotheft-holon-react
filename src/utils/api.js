import axios from "axios"
import { API_URL } from "constants/index"

export const get = (path, params, apiUrl = API_URL) => {
  const url = path ? `${apiUrl}/${path}` : apiUrl

  return axios(url, {
    method: "get",
    params,
  }).catch((e) => {
    throw e.response.data.error
  })
}

export const post = async (path, data, apiUrl = API_URL) => {
  return axios(`${apiUrl}/${path}`, {
    method: "post",
    data,
  }).catch((e) => {
    throw e.response
  })
}

export const put = (path, data, apiUrl = API_URL) => {
  return axios(`${apiUrl}/${path}`, {
    method: "put",
    data,
  }).catch((e) => {
    throw e.response.data.error
  })
}

export const deleteApi = (path, data) => {
  return axios(`${API_URL}/${path}`, {
    method: "delete",
    data,
  }).catch((e) => {
    throw e.response.data.error
  })
}
