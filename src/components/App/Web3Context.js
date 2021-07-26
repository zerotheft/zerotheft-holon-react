import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Web3 from "web3"
import { subYears, format } from 'date-fns'

const Web3Context = createContext()

const Web3Provider = ({ children }) => {
  const [loading, error, web3, loadWeb3] = useWeb3()

  // if (loading) return <div>Authenticating metamask...</div>
  //
  // if (error) return <Error>
  //   <h1>Error!</h1>
  //   <ErrorMessage>Please install metamask extension first.</ErrorMessage>
  // </Error>
  return (
    <Web3Context.Provider value={{ loading, error, web3, loadWeb3 }}>{children}</Web3Context.Provider>
  )
}

Web3Provider.propTypes = {
  children: PropTypes.node,
}

export { Web3Provider, Web3Context }

const useWeb3 = () => {
  const
    [loading, updateLoading] = useState(false),
    [error, updateError] = useState(false),
    [web3, updateWeb3] = useState()

  const fetchWeb3 = async () => {
    try {
      updateLoading(true)
      const web3R = await getWeb3()
      console.log(web3R)
      updateWeb3(web3R)
      return web3R
    } catch (e) {
      console.log(e, 'error')
      updateError(e)
    } finally {
      updateLoading(false)
    }
  }

  return [loading, error, web3, fetchWeb3]
}

const getWeb3 = () => new Promise(async (resolve, reject) => {
  if (window.ethereum) {
    const web3 = new Web3(window.ethereum);
    // let pvtKey = "3b3f4c1b9cc3fcf4b096be31ef9ad0f6cad2a855b9a4a4e3270d086726115478"
    // let signedMessage = await web3.eth.personal.sign("0x5fe7f977e71dba2ea1a68e21057beebb9be2ac30c6410aa38d4f3fbe41dcffd2", "0xCD4f2b154dd0553bfC51cCE4356a23956d97490d")
    // console.log("vitra", signedMessage)
    // const recoer = await web3.eth.accounts.recover("0x5fe7f977e71dba2ea1a68e21057beebb9be2ac30c6410aa38d4f3fbe41dcffd2", signedMessage);
    // console.log("recover", recoer)

    try {
      await window.ethereum.enable();
      resolve(web3);
    } catch (error) {
      reject(error);
    }
  }
  else if (window.web3) {
    const web3 = window.web3;
    resolve(web3);
  }
  else {
    console.log('no metamask')
    reject('No Metamask')
  }
});

const Error = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  `,
  ErrorMessage = styled.div`
    padding: 20px 0;
    width: 520px;
    text-align: center;
  `
