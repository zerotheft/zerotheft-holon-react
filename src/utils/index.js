import React from 'react'
import { fromUnixTime, format } from 'date-fns'
import { isEmpty, isNumber } from 'lodash'
import { startCase, isObject, isArray } from 'lodash'
import styled from 'styled-components'

export const truncateString = (str, num) => {
  if (num && str && str.length > num) {
    return `${str.slice(0, num)}...`
  }
  return str;
}

export const numberWithCommas = number => {
  if (!number || number < 0) return 0
  return number.toLocaleString()
}

export const isChrome = () => {
  let isChromium = window.chrome;
  let winNav = window.navigator;
  let vendorName = winNav.vendor;
  let isOpera = typeof window.opr !== "undefined";
  let isIEedge = winNav.userAgent.indexOf("Edge") > -1;
  let isIOSChrome = winNav.userAgent.match("CriOS");

  if (isIOSChrome) {
    return false
  } else if (
    isChromium !== null &&
    typeof isChromium !== "undefined" &&
    vendorName === "Google Inc." &&
    isOpera === false &&
    isIEedge === false
  ) {
    return true
  } else {
    return false
  }
}

export const addMissingHttp = url => {
  if (!/^https?:\/\//i.test(url)) {
    return 'http://' + url
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

export const convertJSONtoString = (data) => {
  if (!data) return null
  return <DataObject>
    {Object.keys(data).map((key) => <li>
      {isArray(data) ? null : <div className='dataKey'>{startCase(key)}:</div>}
      {isObject(data[key]) ? convertJSONtoString(data[key]) : <div className='dataValue' style={{ wordBreak: 'break-word' }}>
        {data[key]}
      </div>}
    </li>)}
  </DataObject>
}

export const convertStringDollarToNumeric = (dollar) => {
  try {
    dollar = dollar.replace(",", "")
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

export const convertDollarToString = (value, decimal = 1) => {
  let val = value
  let negative = false
  if (!isNumber(val) || val === 0) return val

  if (Math.sign(val) === -1) {
    val = -1 * val
    negative = true
  }
  if (val < 1e3) val = val.toFixed(decimal)
  else if (val >= 1e3 && val < 1e6) val = (val / 1e3).toFixed(decimal) + "K"
  else if (val >= 1e6 && val < 1e9) val = (val / 1e6).toFixed(decimal) + "M"
  else if (val >= 1e9 && val < 1e12) val = (val / 1e9).toFixed(decimal) + "B"
  else if (val >= 1e12 && val < 1e15) val = (val / 1e12).toFixed(decimal) + "T"
  else val = parseFloat((val / 1e12).toFixed(0)).toLocaleString() + "T"

  if (negative) return "-" + val
  return val
}

export function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


const DataObject = styled.ul`
  font-size: 16px; margin-bottom: 5px;
  .dataValue {
    white-space: pre-line;
  }
  .dataKey {
    font-weight: bold;
  }
  li {
    margin-bottom: 5px;
  }
  ul {
    margin-left: 5px;
  }
`