import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

import Button from 'commons/Buttons'
import OverlaySpinner from 'commons/OverlaySpinner'
import { VoteContext } from '../VoteContext'

const Step7 = ({ showStepsPage, voteValues }) => {
  const { vote } = useContext(VoteContext)
  const [voteProgress, updateVoteProgress] = useState(false)

  const proceedWithVote = async () => {
    updateVoteProgress(true)
    await vote(voteValues)
    showStepsPage(true)
    updateVoteProgress(false)
  }

  return (
    <>
      <OverlaySpinner loading={voteProgress} />
      <MessageWrapper style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon icon={faCheckCircle} size="10x" color="#6AB768" />
        </div>
        <Container>
          <MessageHeader>Congratulations!</MessageHeader>
          <div style={{ fontSize: 20, fontWeight: 600 }}>You have completed all the steps to vote.</div>
          <Message style={{ textAlign: 'justify' }}>Please click on vote button to cast your vote.</Message>
          <Button onClick={() => proceedWithVote()} style={{ background: '#4C4A4F', marginRight: 18, opacity: 1 }}>
            Vote
          </Button>
        </Container>
      </MessageWrapper>
    </>
  )
}

export default Step7

const MessageWrapper = styled.div`
    display: flex;
    padding: 70px 38px;
    color: #000;
  `,
  Container = styled.div`
    margin-left: 30px;
  `,
  Message = styled.div`
    margin: 20px 0;
    text-align: center;
  `,
  MessageHeader = styled.div`
    font-size: 30px;
    font-weight: 600;
  `
