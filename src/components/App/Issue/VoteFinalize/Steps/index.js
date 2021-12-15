import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { colors } from 'theme';
import Modal from 'commons/Modal';
import Button from 'commons/Buttons';

import {
  checkNetwork,
  checkWalletInstallation,
  getUserMetamaskAddress,
  getUserRegistration,
} from 'apis/voteService';
import config from 'config';

import Step7 from './Step7';
import { VoteContext } from '../VoteContext';

// import { vote } from 'apis/vote'

// const steps = range(4, 8);
// const stepComponents = [Step4, Step5, Step6, Step7];

const Steps = props => {
  const { step, voterInfo, web3 } = useContext(VoteContext);
  const [currentStep, updateCurrentStep] = useState(step);
  const [popupError, updatePopupError] = useState({
    title       : '',
    message     : '',
    redirectLink: '',
  });
  const { CENTRALIZED_SERVER_FRONTEND } = config;
  const Step = Step7;
  useEffect(() => {
    updateCurrentStep(step);
  }, [step]);

  const generateModal = async(title, message, redirectLink) => {
    updatePopupError({
      title,
      message,
      redirectLink,
    });
  };

  const checkRequirements = async() => {
    const isMetamaskInstalled = await checkWalletInstallation();
    console.log('Is metamask installed', isMetamaskInstalled);

    if (!isMetamaskInstalled) {
      generateModal(
        'Extension',
        'Please install extension.',
        `${CENTRALIZED_SERVER_FRONTEND}/register-voter`
      );
      return false;
    }

    const isCorrectNetwork = await checkNetwork(web3);
    if (!isCorrectNetwork) {
      generateModal(
        'Extension',
        'Please add correct network.',
        `${CENTRALIZED_SERVER_FRONTEND}/register-voter`
      );
      return false;
    }

    const userWalletAddress = await getUserMetamaskAddress(web3);
    if (!userWalletAddress) {
      console.log('Create or import wallet');
      generateModal(
        'Extension',
        'Please add or import wallet.',
        `${CENTRALIZED_SERVER_FRONTEND}/register-voter`
      );
    }

    const userDetails = await getUserRegistration(userWalletAddress);
    if (!userDetails) {
      generateModal(
        'Voter Id',
        'Please register voter id before voting',
        `${CENTRALIZED_SERVER_FRONTEND}/register-voter`
      );
      return false;
    }

    if (!voterInfo.unverifiedCitizen) {
      generateModal(
        'Verify Id',
        'Please verify voter id before voting',
        `${CENTRALIZED_SERVER_FRONTEND}/register-voter`
      );
      return false;
    }

    localStorage.setItem('citizenID', voterInfo.unverifiedCitizen);
    return true;
  };

  useEffect(() => {
    checkRequirements();
  }, []);

  return (
    <div>
      <Body>
        {popupError && popupError.message && popupError.message !== '' ? (
          <Modal onClose={() => checkRequirements()}>
            <div
              style={{
                display       : 'flex',
                flexDirection : 'column',
                alignItems    : 'center',
                justifyContent: 'center',
              }}
            >
              <h3>{popupError.title}</h3>
              {popupError.message}
              <a
                href={popupError.redirectLink}
                target="_blank"
                style={{ textDecoration: 'none' }}
                rel="noreferrer"
              >
                <Button style={{ marginTop: 20 }}>Continue</Button>
              </a>
            </div>
          </Modal>
        ) : (
          ''
        )}
        <Step updateCurrentStep={updateCurrentStep} {...props} />
      </Body>
    </div>
  );
};

export default Steps;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
  `,
  HeaderTitle = styled.div`
    font-size: 30px;
    font-weight: 600;
  `,
  StyledSteps = styled.div`
    display: flex;
    img {
      height: 30px;
    }
    div:last-child {
      img {
        display: none;
      }
    }
  `,
  StepWrapper = styled.div`
    display: flex;
    align-items: center;
  `,
  Circle = styled.div`
    height: 70px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    background-color: ${props =>
    props.active ? colors.primary : colors.backgroundColor};
    border-radius: 50%;
  `,
  Body = styled.div`
    box-shadow: 0px -1px 15px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    padding: 58px 80px;
    margin: 40px 0;
  `;
