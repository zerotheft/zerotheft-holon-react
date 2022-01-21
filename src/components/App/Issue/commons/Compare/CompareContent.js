import React, { useContext } from "react"
import { get, lowerCase, upperCase, isEmpty } from "lodash"
import { useHistory, useRouteMatch } from "react-router-dom"
import StarRatings from "react-star-ratings"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown } from "@fortawesome/free-regular-svg-icons"
import { colors } from "theme"
import Button from "commons/Buttons"
import { convertJSONtoString } from "utils"

import OverlaySpinner from "commons/OverlaySpinner"
import { IssueContext } from "../../IssueContext"

const CompareContent = ({ vote = "yes", data = {}, id, hideBtn = false }) => {
  const history = useHistory()
  const match = useRouteMatch()
  const { proposalDetails, checkRequirements, currentRequirementStep } = useContext(IssueContext)

  const details = data ? proposalDetails[data.id] : null

  const proceedToVoting = async () => {
    await checkRequirements()
    if (currentRequirementStep === 6) {
      history.push(`/path/${get(match, "params.pathname")}/issue/${id}/finalize`, { vote })
    } else {
      history.push({
        pathname: `/path/${get(match, "params.pathname")}/issue/${id}/check`,
        voteValue: { vote },
      })
    }
  }

  if (lowerCase(vote) !== "yes" && lowerCase(vote) !== "no") return null

  return (
    <Wrapper style={{ background: vote === "yes" ? "#EBF3F5" : "white" }}>
      <Header>
        <div className="left">
          <div>{vote}</div>
          <div>
            there was {vote === "no" && "NO"} theft by
            <br />
            rigged economy
          </div>
        </div>
        {!hideBtn && !isEmpty(data) && (
          <Button
            width={175}
            height={55}
            style={{ fontSize: 20, fontWeight: "700" }}
            onClick={async () => {
              await proceedToVoting()
            }}
          >
            I vote {upperCase(vote)}
          </Button>
        )}
      </Header>
      {isEmpty(data) ? (
        <div>
          <span
            style={{
              color: colors.primary,
              fontSize: 15,
              fontWeight: "500",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={() =>
              history.push(
                `/path/${get(match, "params.pathname")}/issue/${id}/${
                  vote === "yes" ? "proposals" : "counter-proposals"
                }`
              )
            }
          >
            select proposal
          </span>
        </div>
      ) : (
        <>
          <div style={{ fontSize: 20 }}>
            This Proposal: ID {data.id}
            <span
              style={{
                marginLeft: 15,
                color: colors.primary,
                fontSize: 15,
                fontWeight: "500",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() =>
                history.push(
                  `/path/${get(match, "params.pathname")}/issue/${id}/${
                    vote === "yes" ? "proposals" : "counter-proposals"
                  }`
                )
              }
            >
              change proposal
            </span>
          </div>
          <div>
            <p>Theft Amount : {data.summary}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p>
              <span style={{ color: "#8D8D8D" }}>AUTHOR</span> {get(data, "author.name", "Anonymous")}
            </p>
            {/* <p>
          {get(data, 'ratings.count', 0)}
          <span style={{ margin: '0 5px' }}><StarRatings
            rating={get(data, 'ratings.rating', 0)}
            starDimension="16px"
            starSpacing="1px"
            starRatedColor={colors.yellow}
            numberOfStars={5}
            name='author_rating'
          /></span>
          <FontAwesomeIcon icon={faFrown} color={colors.red} />{get(data, 'complaints.count', 0)}
        </p> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: 24 }}>
              {get(data, "ratings.count", 0)}
              <span style={{ margin: "0 5px" }}>
                <StarRatings
                  rating={get(data, "ratings.rating", 0)}
                  starDimension="24px"
                  starSpacing="1px"
                  starRatedColor={colors.yellow}
                  numberOfStars={5}
                  name="count_rating"
                />
              </span>
              <FontAwesomeIcon icon={faFrown} color={colors.red} /> {get(data, "complaints.count", 0)}
            </p>
          </div>
          {data && details && (
            <>
              <div className="description" style={{ position: "relative", minHeight: 50 }}>
                {details.loading ? (
                  <OverlaySpinner overlayParent loading backgroundColor="transparent" />
                ) : (
                  convertJSONtoString(details.detail)
                )}
              </div>
            </>
          )}
        </>
      )}
    </Wrapper>
  )
}

export default CompareContent

const Wrapper = styled.div`
    flex: 1;
    min-height: 0;
    padding: 45px 65px 45px 55px;
    position: relative;
    & .description {
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.5px;
      font-family: monospace;
      font-weight: 300;
      margin-top: 15px;
      h4 {
        font-size: 18px;
        color: #000;
        text-align: left;
      }
    }
  `,
  Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    & > .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      & > div:first-of-type {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 50px;
        margin-right: 10px;
      }
      & > div:last-of-type {
        font-size: 16px;
      }
    }
    & > .button {
      cursor: pointer;
      display: block;
      background: ${colors.primary};
      color: #fff;
      font-size: 14px;
      padding: 10px;
      text-align: center;
      min-width: 100px;
      border-radius: 4px;
      span {
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
  `
