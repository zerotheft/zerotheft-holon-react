import axios from 'axios'

// import { get as getLodash } from 'lodash'

// import { toast } from 'react-toastify'
import { API_URL } from 'constants/index'

const checkForError = (e, type) => {
  if (process.env.NODE_ENV === 'development' || type !== 'get') throw e

  // switch (e.response.status) {
  //   // case 401:
  //   //   if (
  //   //     getLodash(e, 'response.status') === 401 &&
  //   //     getLodash(e, 'response.data.errors[0]', '').includes('need to sign in or sign up')
  //   //   ) {
  //   //     cookie.clearAll()
  //   //     window.location.replace(ROUTES.SIGN_IN)
  //   //   } else if (
  //   //     ![ROUTES.SIGN_IN, ROUTES.SIGN_UP, ROUTES.FORGOT_PASSWORD].includes(window.location.pathname)
  //   //   )
  //   //     window.location.replace('/')
  //   //   break
  //   // case 404:
  //   //   window.location.replace('/')
  //   //   break
  //   default:
  //     toast.error('There was some internal error while performing request.')
  // }
  return { error: e, data: {}, headers: e.response.headers }
}

export const get = (path, params, apiUrl = API_URL) => {
  const url = path ? `${apiUrl}/${path}` : apiUrl

  return axios(url, {
    method: 'get',
    params,
  }).catch(e => checkForError(e, 'get'))
}

export const post = async(path, data, apiUrl = API_URL) => {
  return axios(`${apiUrl}/${path}`, {
    method: 'post',
    data,
  }).catch(e => checkForError(e, 'post'))
}

export const put = (path, data, apiUrl = API_URL) => {
  return axios(`${apiUrl}/${path}`, {
    method: 'put',
    data,
  }).catch(e => checkForError(e, 'put'))
}

export const deleteApi = (path, data) => {
  return axios(`${API_URL}/${path}`, {
    method: 'delete',
    data,
  }).catch(e => checkForError(e, 'delete'))
}
