import React from 'react'
import { fromUnixTime, format } from 'date-fns'
import { startCase, isObject, isArray, isEmpty, isNumber, isEqual, transform } from 'lodash'
import styled from 'styled-components'

export const truncateString = (str, num) => {
  if (num && str && str.length > num) {
    return `${str.slice(0, num)}...`
  }
  return str
}

export const numberWithCommas = (number) => {
  if (!number || number < 0) return 0
  return number.toLocaleString()
}

/**
 * Find difference between two objects
 * @param  {object} origObj - Source object to compare newObj against
 * @param  {object} newObj  - New object with potential changes
 * @return {object} differences
 */
export const objDifference = (origObj, newObj) => {
  const changes = (newObj, origObj) => {
    let arrayIndexCounter = 0
    return transform(newObj, (result, value, key) => {
      if (!isEqual(value, origObj[key])) {
        const resultKey = isArray(origObj) ? arrayIndexCounter++ : key
        result[resultKey] = isObject(value) && isObject(origObj[key]) ? changes(value, origObj[key]) : value
      }
    })
  }
  return changes(newObj, origObj)
}
export const isChrome = () => {
  const isChromium = window.chrome
  const winNav = window.navigator
  const vendorName = winNav.vendor
  const isOpera = typeof window.opr !== 'undefined'
  const isIEedge = winNav.userAgent.indexOf('Edge') > -1
  const isIOSChrome = winNav.userAgent.match('CriOS')

  if (isIOSChrome) {
    return false
  }
  if (
    isChromium !== null &&
    typeof isChromium !== 'undefined' &&
    vendorName === 'Google Inc.' &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true
  }
  return false
}

export const addMissingHttp = (url) => {
  if (!/^https?:\/\//i.test(url)) {
    return `http://${url}`
  }
  return url
}

export const getDate = (date, dateFormat = 'dd MMM, yyyy') => {
  return date && format(new Date(date), dateFormat)
}

export const convertUNIXtoDATETIME = (date, dateFormat = 'dd MMM, yyyy') => {
  if (!date) return null
  return getDate(fromUnixTime(date), dateFormat)
}

export const getEndNodes = (currentPath = '', paths = {}, entireSearch = false) => {
  if (!currentPath || isEmpty(paths)) return []
  let nodes = []
  if (!entireSearch)
    Object.keys(paths).map((key) => {
      if (isEmpty(paths[key])) nodes = [...nodes, { path: `/path/${currentPath}/issue/${key}`, title: key }]
    })
  return nodes
}

export const displayContent = (data) => {
  if (!isEmpty(data) && data.toString().includes('http')) {
    if (data.toString().split(' ').length > 1) {
      let mainContent = ''
      data
        .toString()
        .split(' ')
        .forEach((value) => {
          if (value.includes('http')) {
            mainContent += `<a href={data} target='_blank'> ${value}</a>`
          } else {
            mainContent += ` ${value}`
          }
        })
      return (
        <div
          className="dataValue"
          style={{ wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: mainContent }}
        />
      )
    }

    return (
      <div className="dataValue" style={{ wordBreak: 'break-word' }}>
        <a href={data} target="_blank" rel="noreferrer">
          {data}
        </a>
      </div>
    )
  }

  return (
    <div className="dataValue" style={{ wordBreak: 'break-word', display: 'inline-block', width: 'auto' }}>
      {data || ''}{' '}
    </div>
  )
}

export const convertJSONtoString = (data) => {
  if (!data) return null
  return (
    <DataObject>
      {Object.keys(data).map((key) => (
        <li>
          {isArray(data) ? null : <div className="dataKey">{startCase(key)}:&nbsp;</div>}
          {isObject(data[key]) ? convertJSONtoString(data[key]) : displayContent(data[key])}
        </li>
      ))}
    </DataObject>
  )
}

export const convertStringDollarToNumeric = (dollar) => {
  try {
    dollar = dollar.replace(',', '')
    let realAmount = 0
    let onlyNumericVal = 0
    const suffix = dollar.slice(-1)
    if (suffix === 'T') {
      onlyNumericVal = parseFloat(dollar.slice(1, -1))
      realAmount = onlyNumericVal * 1000000000000
    } else if (suffix === 'B') {
      onlyNumericVal = parseFloat(dollar.slice(1, -1))
      realAmount = onlyNumericVal * 1000000000
    } else if (suffix === 'M') {
      onlyNumericVal = parseFloat(dollar.slice(1, -1))
      realAmount = onlyNumericVal * 1000000
    } else if (suffix === 'K') {
      onlyNumericVal = parseFloat(dollar.slice(1, -1))
      realAmount = onlyNumericVal * 1000
    } else {
      realAmount = parseFloat(dollar.slice(1))
    }
    return realAmount
  } catch (e) {
    console.log(e)
    return 0
  }
}

export const removeDecimelIfNeeded = (number) => {
  const [num, decimel] = number.toString().split('.')
  return parseInt(decimel) === 0 ? num : number
}

export const convertDollarToString = (value, decimal = 2) => {
  let val = parseInt(value)
  let negative = false
  if (!isNumber(val) || val === 0) return val

  if (Math.sign(val) === -1) {
    val = -1 * val
    negative = true
  }
  if (val < 1e3) val = val.toFixed(decimal)
  else if (val >= 1e3 && val < 1e6) val = `${removeDecimelIfNeeded((val / 1e3).toFixed(decimal))}K`
  else if (val >= 1e6 && val < 1e9) val = `${removeDecimelIfNeeded((val / 1e6).toFixed(decimal))}M`
  else if (val >= 1e9 && val < 1e12) val = `${removeDecimelIfNeeded((val / 1e9).toFixed(decimal))}B`
  else if (val >= 1e12 && val < 1e15) val = `${removeDecimelIfNeeded((val / 1e12).toFixed(decimal))}T`
  else val = `${removeDecimelIfNeeded(parseFloat((val / 1e12).toFixed(0))).toLocaleString()}T`
  if (negative) return `-${val}`
  return val
}

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

/**
 * Check if image exists or not based on image url
 * @params URL of a image for existence check
 * @returns true/false based on image existence
 * */
export const imageExists = (image_url) => {
  const http = new XMLHttpRequest()
  http.open('HEAD', image_url, false)
  http.send()
  return http.status != 404
}

const DataObject = styled.ul`
  font-size: 16px;
  margin-bottom: 5px;
  .dataValue {
    white-space: pre-line;
  }
  .dataKey {
    font-weight: bold;
    display: inline-block;
    width: auto;
  }
  .datakey li .datakey {
    float: none;
  }
  li {
    margin-bottom: 5px;
  }
  ul {
    margin-left: 5px;
  }
`
