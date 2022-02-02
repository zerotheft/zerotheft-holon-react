import React, { useContext } from "react"
import { get, lowerCase, isEmpty } from "lodash"
import { useHistory, useRouteMatch } from "react-router-dom"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown } from "@fortawesome/free-regular-svg-icons"
import { Button } from "@mui/material"
import { NavigateNext } from "@mui/icons-material"
import { colors } from "theme"
import { convertJSONtoString } from "utils"

import OverlaySpinner from "commons/OverlaySpinner"
import {
  BlackBody1,
  BlackBody2,
  BlackHeadlineH3,
  ButtonText1,
  GraySubtitle1,
  PrimaryButtonText1,
} from "commons/newStyles"
import { CustomMUIRating } from "commons/muiCustomizedComponent"
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
    <Wrapper>
      <Header>
        <div className="left">
          <div
            style={{
              color: vote === "yes" ? colors.background.green : colors.background.red,
            }}
          >
            {vote}
          </div>
          <div style={{ marginLeft: "20px" }}>
            <BlackBody2>
              There was {vote === "no" && "NO"} theft by
              <br />
              rigged economy
            </BlackBody2>
          </div>
        </div>

        {!hideBtn && !isEmpty(data) && (
          <Button
            onClick={async () => {
              await proceedToVoting()
            }}
            variant="contained"
            endIcon={<NavigateNext />}
            size="large"
            sx={{
              borderRadius: "4px",
              padding: "8px 16px",
            }}
          >
            <ButtonText1>I vote {vote}</ButtonText1>
          </Button>
        )}
      </Header>
      {isEmpty(data) ? (
        <div>
          <span
            style={{
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
            <PrimaryButtonText1>select proposal</PrimaryButtonText1>
          </span>
        </div>
      ) : (
        <>
          <div>
            <BlackBody1 style={{ display: "inline-block" }}>Proposal ID: {data.id}</BlackBody1>
            <span
              style={{
                marginLeft: 15,
                cursor: "pointer",
                display: "inline-block",
              }}
              onClick={() =>
                history.push(
                  `/path/${get(match, "params.pathname")}/issue/${id}/${
                    vote === "yes" ? "proposals" : "counter-proposals"
                  }`
                )
              }
            >
              <PrimaryButtonText1>change proposal</PrimaryButtonText1>
            </span>
          </div>
          <div style={{ marginTop: "22px" }}>
            <BlackHeadlineH3> Theft Amount : {data.summary}</BlackHeadlineH3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "6px",
              marginBottom: "20px",
            }}
          >
            <p>
              <span style={{ verticalAlign: "middle", marginRight: "5px" }}>
                <CustomMUIRating value={get(data, "ratings.rating", 0)} readOnly name="count_rating" />
              </span>
              <span style={{ marginRight: "10px" }}>({get(data, "ratings.count", 0)})</span>
              <span style={{ verticalAlign: "middle", marginRight: "7px" }}>
                <FontAwesomeIcon
                  icon={faFrown}
                  color={colors.text.deSaturatedRed}
                  style={{
                    height: "23px",
                  }}
                />
              </span>
              <span>{get(data, "complaints.count", 0)}</span>
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <GraySubtitle1>
              <span style={{ color: colors.text.darkGray }}>AUTHOR</span>{" "}
              <span style={{ color: colors.text.completeBlack }}>{get(data, "author.name", "Anonymous")}</span>
            </GraySubtitle1>
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
    padding: 20px;
    position: relative;
    & .description {
      font-size: 16px;
      line-height: 1.5;
      letter-spacing: 0.5px;
      font-weight: 300;
      margin-top: 22px;
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
