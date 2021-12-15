import config from 'config';
import Web3 from 'web3';
import { getVoterInfos } from './centralizedServer';

const { CHAIN_ID } = config;

/**
 * Get the web3 from the browser
 *
 * @param {null}
 * @returns {web3}
 */
export const getWeb3 = async() => {
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      return web3;
    }

    if (window.ztm_ethereum) {
      const web3 = new Web3(window.ztm_ethereum);
      await window.ztm_ethereum.enable();
      return web3;
    }

    if (window.web3) {
      const { web3 } = window;
      return web3;
    }

    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Check if the wallet is installed
 * Window.ethereum for metamask
 * Window.ztm_ethereum for our extension
 *
 * @param null
 * @return boolean
 */
export const checkWalletInstallation = async() => {
  try {
    if (window.ethereum || window.ztm_ethereum || window.web3) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error', error);
    return false;
  }
};

/**
 * Check installed wallet name
 * Steps
 * 1. Check for window.ethereum - detects if our extension or metamask is installed
 * 2. Check for window.ethereum.isMetamask - detects metamask
 * 3. Check for window.ethereum.isZTMWallet -  detects our wallet
 *
 * @param null
 * @returns string (metamask or ztmwallet)
 */
export const checkInstalledWallet = async() => {
  try {
    let installedExtension = 'none';
    if (window.ethereum) {
      if (window.ethereum.isMetamask) {
        installedExtension = 'metamask';
      }
      if (window.ethereum.isZTMWallet) {
        installedExtension = 'ztmwallet';
      } else {
        installedExtension = 'none';
      }
    }

    if (window.ztm_ethereum) {
      installedExtension = 'ztmwallet';
    }

    return installedExtension;
  } catch (error) {
    console.log('Error ', error);
    return 'none';
  }
};

/**
 * Get user metamask address5
 *
 * @param null
 * @returns string - metamask account address
 */
export const getUserMetamaskAddress = async web3 => {
  try {
    // const web3 = await getWeb3();
    const getMetamaskAccount = async() => {
      const web3R = web3;

      if (!web3R) return null;

      const accounts = await web3R.eth.getAccounts();
      return { account: accounts[0], web3: web3R };
    };
    const { account: metamaskAccount } = (await getMetamaskAccount()) || {};

    return metamaskAccount;
  } catch (error) {
    console.log('Error ', error);
    return false;
  }
};

/**
 * Check for the correct network
 * @param {null}
 * @returns {boolean} - flag for correct network
 */
export const checkNetwork = async web3 => {
  try {
    // const web3 = await getWeb3();
    const chainID = CHAIN_ID;
    console.log('Current provider', web3.currentProvider);
    console.log('Chain Id', web3.currentProvider.chainId);
    console.log('Config chain id', `0x${chainID.toString(16)}`);
    if (web3.currentProvider.chainId === `0x${chainID.toString(16)}`) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error', error);
    return false;
  }
};

/**
 * Get user registration details
 *
 * @param string - walletAddress - wallet address of the extension
 * @returns object - user registration details
 */
export const getUserRegistration = async walletAddress => {
  try {
    const { data } = await getVoterInfos(walletAddress.toLowerCase());
    return data;
  } catch (error) {
    console.log('Error ', error);
    return false;
  }
};

/**
 * Check if the user is verified or not
 *
 * @param string - walletAddress - wallet address of the extension
 * @returns boolena - flag if user is verified or not
 */
export const checkUserVerification = async walletAddress => {
  try {
    const { data } = await getVoterInfos(walletAddress.toLowerCase());
    return data.unverifiedCitizen;
  } catch (error) {
    console.log('Error ', error);
    return false;
  }
};
