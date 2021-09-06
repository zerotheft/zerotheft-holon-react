import React, { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { getYear } from 'date-fns'

import { getParameterByName } from 'utils'
import { getPaths, getUmbrellaPaths } from '../../apis/path'
import useFetch from 'commons/hooks/useFetch'
import { holonInfo as getHolonInfo } from 'apis/vote'
import { getVoterInfos } from 'apis/desktopApp'
import { getTheftInfo } from 'apis/reports'

const AppContext = createContext()

const AppProvider = ({ children }) => {
  if (getParameterByName('year')) localStorage.setItem("filterYear", getParameterByName('year'))
  if (!localStorage.getItem("filterYear")) localStorage.setItem("filterYear", getYear(new Date()) - 1)

  const [getPathsApi, loading, paths] = useFetch(getPaths)
  const [getUmbrellaPathsApi, fetchingUmbrella, umbrellaPaths] = useFetch(getUmbrellaPaths)
  const [getHolonApi, loadingHolon, holonInfo] = useFetch(getHolonInfo)
  const [filterParams, updateFilter] = useState({ year: localStorage.getItem("filterYear"), initPath: 'USA' }),
    [selectedHolon, updateHolon] = useState(localStorage.getItem('selectedHolon') ? JSON.parse(localStorage.getItem('selectedHolon')) : {}),
    [userInfo, updateUserInfo] = useState()
  const [selectedAddress, updateSelectedAddress] = useState(localStorage.getItem('address'))
  const [getTheftApi, loadingTheft, theftInfo] = useFetch(getTheftInfo)
  useEffect(() => {
    getPathsApi({ nation: filterParams.initPath })
    getUmbrellaPathsApi()
  }, [filterParams.initPath])

  const fetchFromApp = async () => {
    const res = await getVoterInfos('data.address') || ''
    const holon = get(res, 'data.selectedHolon')
    const address = get(res, 'data.address') || ''
    const voterId = get(res, 'data.voterId') || ''

    if (holon) {
      localStorage.setItem('selectedHolon', JSON.stringify(holon))
      updateHolon(holon)
    }

    updateUserInfo({ address, voterId })

    if (selectedAddress !== address) {
      updateSelectedAddress(address)
      localStorage.setItem('address', address)
      localStorage.setItem('citizenID', voterId)
    }
  }

  const [ws] = useWebSocket(fetchFromApp)

  useEffect(() => {
    fetchFromApp()
    getHolonApi()
  }, [])
  useEffect(() => {
    getTheftApi(filterParams['initPath'], true, get(filterParams, 'year'))
  }, [filterParams.year])
  return (
    <AppContext.Provider value={{ ws, userInfo, filterParams, updateFilter, loading, loadingTheft, selectedHolon, updateHolon, holonInfo, loadingPaths: loading, paths: get(paths, 'data'), umbrellaPaths, theftInfo }}>{children}</AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node,
}

export { AppProvider, AppContext }

let timeout = 2000
const useWebSocket = (callback) => {
  const [ws, changeWs] = useState()

  const check = () => {
    if (!ws || ws.readyState == WebSocket.CLOSED) connect(); //check if websocket instance is closed, if so call `connect` function.
  };

  const connect = () => {
    var wss = new WebSocket("ws://localhost:6549/ws");
    var connectInterval;
    // websocket onopen event listener
    wss.onopen = () => {
      console.log("connected websocket main component");
      changeWs(wss);

      clearTimeout(connectInterval); // clear Interval on on open of websocket connection
    };

    wss.onmessage = (message) => {
      if (callback) callback()
    }

    // websocket onclose event listener
    wss.onclose = e => {
      timeout = Math.min(10000, timeout + 2000)
      console.log(
        `Socket is closed. Reconnect will be attempted in ${(timeout) / 1000}
            second.`,
        e.reason
      );

      connectInterval = setTimeout(check, timeout); //call check function after timeout
    };

    // websocket onerror event listener
    wss.onerror = err => {
      console.error(
        "Socket encountered error: ",
        err.message,
        "Closing socket"
      );

      wss.close();
    };
  };

  const close = () => {
    ws.close()
  }

  useEffect(() => {
    connect()
    return () => {
      ws && ws.close()
    }
  }, [])

  return [ws, close, connect]
}