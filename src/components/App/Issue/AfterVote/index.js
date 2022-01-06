import React, { useContext, useEffect } from "react"
import { get } from "lodash"
import { Redirect } from "react-router-dom"
import StarRatings from "react-star-ratings"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown, faCheckCircle } from "@fortawesome/free-regular-svg-icons"
import { numberWithCommas } from "utils"

import { getCitizenInfo } from "apis/vote"
import useFetch from "commons/hooks/useFetch"
import IssueSlider from "components/App/Home/IssueSlider"
import { colors } from "theme"
import { IssueContext } from "../IssueContext"

const AfterVote = ({ match }) => {
  const { vote, issue, updateIssue } = useContext(IssueContext)
  /* eslint-disable-next-line no-unused-vars */
  const [getCitizenInfoApi, loadingUser, userInfo] = useFetch(getCitizenInfo)

  useEffect(() => {
    getCitizenInfoApi(localStorage.getItem("citizenID"))
  }, [])

  if (!vote) {
    return <Redirect to={`/path/${match.params.pathname}/issue/${match.params.id}`} />
  }

  // vote = { 'vote': "" }
  // issue = { 'proposals': [], 'counter_proposals': [] }
  const proposal = [...issue.proposals, ...issue.counter_proposals].find((i) => i.id === vote.proposalId)
  const amount = vote.vote === "Yes" ? proposal.theftAmt : 0

  // const openRating = () => {
  //   window.location.href = `zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/proposal-feedback/${get(
  //     proposal,
  //     'id'
  //   )}`
  // }
  return (
    <>
      <Wrapper>
        <div>
          <VotedInfo>
            <h3>Do you Consider This Theft Via A Rigged Econnomy?</h3>
            <div className="content bold">
              <p>Your Vote : {vote.vote.toUpperCase()}</p>
              <p>
                Your Comment :
                {vote.comment ? (
                  <>
                    <br />
                    {vote.comment}
                  </>
                ) : (
                  "NONE"
                )}
              </p>
              <p>
                Amount Stolen : ${numberWithCommas(amount)}
                {vote.vote === "Yes" && !vote.custom_amount && "(from Problem Proposal)"}
              </p>
              <p style={{ display: "none" }}>Chosen Proposal : ID 23412</p>
              <p style={{ fontSize: 23, fontWeight: "400" }}>
                {get(proposal, "ratings.count", 0)}
                <span style={{ margin: "0 5px" }}>
                  <StarRatings
                    rating={get(proposal, "ratings.rating", 0)}
                    starDimension="23px"
                    starSpacing="1px"
                    starRatedColor={colors.yellow}
                    numberOfStars={5}
                    name="author_rating"
                  />
                </span>
                <FontAwesomeIcon icon={faFrown} color={colors.red} style={{ marginRight: 5 }} />
                {get(proposal, "complaints.count", 0)}
              </p>
              {/* <Button
                onClick={() => {
                  window.location.href = `zerotheft://home/path/${get(match, 'params.pathname')}%2F${get(
                    match,
                    'params.id'
                  )}/proposal-feedback/${get(proposal, 'id')}`
                }}
                width={285}
                height={50}
                style={{ fontSize: 16 }}
              >
                Please Rate This Proposal
              </Button> */}
            </div>
          </VotedInfo>
        </div>
        <div>
          <ThankyouWrapper>
            <h3>
              <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 10 }} />
              Thank You For Voting
            </h3>
            <h5>Your ZeroTheft Public Voter Registration:</h5>
            {userInfo && userInfo.success && (
              <div className="content">
                <p style={{ fontSize: 18, fontWeight: "500" }}>
                  <span>Your Voter Address:</span>
                  <span>{localStorage.getItem("address")}</span>
                </p>
                <p style={{ fontSize: 18, fontWeight: "500" }}>
                  <span>Your Citizen ID:</span>
                  <span>{localStorage.getItem("citizenID")}</span>
                </p>
                <p>
                  <span>Your Name:</span>
                  <span>{userInfo.name}</span>
                </p>
                <p>
                  <span>Your Linked-In Account:</span>
                  <a href={userInfo.linkedin} target="_blank" rel="noopener noreferrer">
                    {userInfo.linkedin}
                  </a>
                </p>
              </div>
            )}
          </ThankyouWrapper>
        </div>
      </Wrapper>
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <IssueSlider afterVote endNode={match.params.id} updateIssue={updateIssue} onlySlider />
      </div>
    </>
  )
}

export default AfterVote

const Wrapper = styled.div`
    padding-top: 80px;
    padding-bottom: 50px;
    display: flex;
    & > div {
      flex: 1;
    }
    .content {
      margin-top: 15px;
      p {
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        font-weight: 400;
        & > a {
          color: #000;
        }
        & > span,
        & > a {
          max-width: 50%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      &.bold {
        p {
          font-size: 19px;
          font-weight: 600;
          color: #5f5c5c;
          justify-content: flex-start;
        }
      }
    }
  `,
  VotedInfo = styled.div`
    max-width: 600px;
    h3 {
      font-size: 29px;
      font-weight: 600;
      color: ${colors.primary};
    }
  `,
  ThankyouWrapper = styled.div`
    width: 100%;
    max-width: 580px;
    margin-left: 75px;
    background: #f9f9f9;
    box-shadow: 0px 2px 43px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 30px;
    h3 {
      font-size: 32px;
      color: #80d073;
      font-weight: 800;
      text-align: center;
      margin-bottom: 5px;
    }
    h5 {
      font-size: 18px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      text-align: center;
    }
  `
