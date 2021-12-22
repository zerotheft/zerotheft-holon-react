import { useState } from 'react'

export default (apiFunc, initialLoading, callback) => {
  const [loading, updateLoading] = useState(initialLoading || false),
    [res, updateRes] = useState()

  const callApi = async (...args) => {
    try {
      if (!apiFunc) return
      updateLoading(true)
      const response = await apiFunc(...args)
      updateRes(response)
      if (callback) callback()
      return response
    } catch (e) {
      // eslint-disable-next-line
      console.log(e)
      throw e
    } finally {
      updateLoading(false)
    }
  }

  return [callApi, loading, res]
}
