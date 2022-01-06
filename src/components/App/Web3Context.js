import React, { createContext, useState } from "react"
import PropTypes from "prop-types"
import Web3 from "web3"

const Web3Context = createContext()

const Web3Provider = ({ children }) => {
  const [loading, error, web3, loadWeb3] = useWeb3()

  // if (loading) return <div>Authenticating zerotheft wallet...</div>
  //
  // if (error) return <Error>
  //   <h1>Error!</h1>
  //   <ErrorMessage>Please install zerotheft wallet extension first.</ErrorMessage>
  // </Error>
  return <Web3Context.Provider value={{ loading, error, web3, loadWeb3 }}>{children}</Web3Context.Provider>
}

Web3Provider.propTypes = {
  children: PropTypes.node,
}

export { Web3Provider, Web3Context }

const useWeb3 = () => {
  const [loading, updateLoading] = useState(false),
    [error, updateError] = useState(false),
    [web3, updateWeb3] = useState()

  const fetchWeb3 = async () => {
    try {
      updateLoading(true)
      const web3R = await getWeb3()
      updateWeb3(web3R)
      return web3R
    } catch (e) {
      updateError(e)
    } finally {
      updateLoading(false)
    }
  }

  return [loading, error, web3, fetchWeb3]
}

const getWeb3 = () =>
  /* eslint-disable-next-line no-async-promise-executor */
  new Promise(async (resolve, reject) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      try {
        await window.ethereum.enable()
        resolve(web3)
      } catch (error) {
        reject(error)
      }
    } else if (window.web3) {
      const { web3 } = window
      resolve(web3)
    } else {
      /* eslint-disable-next-line prefer-promise-reject-errors */
      reject("No Metamask")
    }
  })

// const Error = styled.div`
//     display: flex;
//     min-height: 100vh;
//     align-items: center;
//     justify-content: center;
//     flex-direction: column;
//   `,
//   ErrorMessage = styled.div`
//     padding: 20px 0;
//     width: 520px;
//     text-align: center;
//   `
