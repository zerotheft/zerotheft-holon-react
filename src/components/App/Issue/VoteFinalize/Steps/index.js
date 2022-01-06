import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";

import { get } from "lodash";
import { Redirect } from "react-router";
import OverlaySpinner from "commons/OverlaySpinner";
import config from "config";
import { VoteContext, VoteProvider } from "../VoteContext";
import {
  checkNetwork,
  checkWalletInstallation,
  getUserMetamaskAddress,
  getUserRegistration,
  getWalletBalance,
  sendBalanceToWallet,
} from "../voteConditions";

import { IssueContext } from "../../IssueContext";
import Step4 from "./Step4";
import Step5 from "./Step5";
import NoAccount from "./NoAccount";
import Step6 from "./Step6";
import Step7 from "./Step7";
import UnverifiedCitizen from "./UnverifiedCitizen";
import FundTransfer from "./FundTransfer";

const Steps = ({ match, history }) => {
  let { web3 } = useContext(VoteContext);
  const { loadWeb3 } = useContext(VoteContext);
  const { selection } = useContext(IssueContext);

  const { VOTE_BALANCE } = config;
  const [requirementCheckProgress, updateRequirementCheckProgress] =
    useState(false);
  const [currentRequirementStep, updateCurrentRequirementStep] = useState(0);
  const [localStorageData, updatelocalStorageData] = useState(true);
  const issuePath = `${match.params.pathname}/${match.params.id}`.replace(
    /%2F/g,
    "/"
  );

  // Store data in local storage for the reload
  const storeDataInLocalStorage = async () => {
    if (!get(selection, "proposal")) {
      const data = JSON.parse(localStorage.getItem(issuePath));
      if (data && data.selection) {
        updatelocalStorageData(true);
      } else {
        updatelocalStorageData(false);
      }
      return;
    }

    const storagePayload = {
      selection,
    };

    localStorage.setItem(issuePath, JSON.stringify(storagePayload));
  };

  const retrieveDataFromLocalStorage = async () => {
    const data = JSON.parse(localStorage.getItem(issuePath));
    if (data) {
      if (data.selection) {
        selection.proposal = data.selection.proposal;
        selection.counterProposal = data.selection.counterProposal;
      }
    }
  };

  retrieveDataFromLocalStorage();

  const setCitizenID = async () => {
    const userWalletAddress = await getUserMetamaskAddress(web3);
    const userDetails = await getUserRegistration(userWalletAddress);
    localStorage.setItem("citizenID", userDetails.unverifiedCitizen);
    return true;
  };

  const proceedToVote = async () => {
    await setCitizenID();
    history.push(
      `/path/${get(match, "params.pathname")}/issue/${get(
        match,
        "params.id"
      )}/finalize`
    );
  };

  const checkRequirements = async () => {
    if (!web3) {
      web3 = await loadWeb3();
    }

    updateRequirementCheckProgress(true);
    const isMetamaskInstalled = await checkWalletInstallation();
    if (!isMetamaskInstalled) {
      updateRequirementCheckProgress(false);
      await updateCurrentRequirementStep(1);
      return false;
    }

    const isCorrectNetwork = await checkNetwork(web3);
    if (!isCorrectNetwork) {
      updateRequirementCheckProgress(false);
      await updateCurrentRequirementStep(2);
      return false;
    }

    const userWalletAddress = await getUserMetamaskAddress(web3);
    if (!userWalletAddress) {
      updateRequirementCheckProgress(false);
      await updateCurrentRequirementStep(3);
      return false;
    }

    let userDetails = await getUserRegistration(userWalletAddress);
    if (!userDetails) {
      updateRequirementCheckProgress(false);
      await updateCurrentRequirementStep(4);
      return false;
    }

    userDetails = await getUserRegistration(userWalletAddress);
    if (!userDetails.verifiedCitizen) {
      updateRequirementCheckProgress(false);
      await updateCurrentRequirementStep(5);
      return false;
    }

    const walletBalance = await getWalletBalance(web3, userWalletAddress);
    if (walletBalance < VOTE_BALANCE) {
      const transferToWalletStatus = await sendBalanceToWallet(
        userDetails.verifiedCitizen,
        userWalletAddress
      );
      if (transferToWalletStatus !== true) {
        updateRequirementCheckProgress(false);
        await updateCurrentRequirementStep(6);
        return false;
      }
    }

    updateRequirementCheckProgress(false);
    await updateCurrentRequirementStep(7);
    return true;
  };

  useEffect(() => {
    checkRequirements();
  }, []);

  useEffect(() => {
    storeDataInLocalStorage();
  }, []);

  if (!localStorageData) {
    return (
      <Redirect
        to={`/path/${get(match, "params.pathname")}/issue/${get(
          match,
          "params.id"
        )}`}
      />
    );
  }

  return (
    <div>
      <Body>
        <OverlaySpinner loading={requirementCheckProgress} />
        {
          {
            1: <Step4 checkRequirements={checkRequirements} />,
            2: <Step5 checkRequirements={checkRequirements} />,
            3: <NoAccount checkRequirements={checkRequirements} />,
            4: <Step6 checkRequirements={checkRequirements} />,
            5: <UnverifiedCitizen checkRequirements={checkRequirements} />,
            6: <FundTransfer checkRequirements={checkRequirements} />,
            7: <Step7 proceedToVote={proceedToVote} />,
          }[currentRequirementStep]
        }
        {/* <Step updateCurrentStep={updateCurrentStep} {...props} /> */}
      </Body>
    </div>
  );
};

const stepWrapper = (props) => {
  return (
    <VoteProvider>
      <Steps {...props} />
    </VoteProvider>
  );
};

export default stepWrapper;

const Body = styled.div`
  box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 58px 80px;
  margin: 40px 0;
`;
