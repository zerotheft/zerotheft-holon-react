// eslint-disable no-throw-literal
import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import { toast } from "react-toastify"
import { useRouteMatch } from "react-router-dom"
import { get, isEmpty } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown } from "@fortawesome/free-regular-svg-icons"

import { Box } from "@mui/system"
import { Card, CardContent, Grid, Rating } from "@mui/material"
import config from "config"
import { colors } from "theme"
import { imageExists, numberWithCommas } from "utils"
import useWeb3 from "utils/useWeb3"
import useFetch from "commons/hooks/useFetch"
import { getVoterInfos } from "apis/centralizedServer"
import { getProposal } from "apis/proposals"
import { getCitizenProposalRating } from "apis/datas"
import { getTheftInfo } from "apis/reports"
import { AppContext } from "components/App/AppContext"
import {
  GrayBody1,
  GrayHeadlineH4,
  GraySubtitle1,
  GrayCardSection,
  HeadlineH1,
  SubTitle1,
  ErrorCardSection,
  ErrorOverline1,
  ErrorBody1,
  GrayHeadlineH5,
} from "commons/newStyles"
import OverlaySpinner from "commons/OverlaySpinner"
import { Header, NoChartText } from "../styles"

const { CHAIN_ID, loadContract } = config

const ProposalReport = ({ item, reportPath }) => {
  const [getProposalApi] = useFetch(getProposal),
    match = useRouteMatch(),
    { carryTransaction, getWalletAccount, signMessage } = useWeb3(),
    [ratingLoader, updateRatingLoader] = useState(false)

  // const { ProposalReports } = useContext(IssueContext)
  let maxTheftYear = null
  if (item && item.theftYears) {
    const { theftYears } = item
    let theftYearKeys = Object.keys(theftYears)
    theftYearKeys = theftYearKeys.map((item) => {
      return parseInt(item)
    })

    maxTheftYear = theftYearKeys.length > 0 ? Math.max(...theftYearKeys) : null
  }
  // eslint-disable-next-line no-unused-vars
  const [getTheftApi, loadingTheft, theftInfo] = useFetch(getTheftInfo)
  const { filterParams } = useContext(AppContext)

  useEffect(() => {
    getTheftApi(`${get(match, "params.pathname")}%2F${get(match, "params.id")}`, false, get(filterParams, "year"))
  }, [get(match, "params.pathname"), get(match, "params.id"), get(filterParams, "year")])

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    item && getProposalApi(item.id)
  }, [item])

  const theftData = theftInfo && theftInfo[`${match.params.pathname}/${match.params.id}`.replaceAll("%2F", "/")]
  const yes = theftData && ((theftData.for / theftData.votes) * 100).toFixed()
  const no = 100 - yes

  // const tempDetail = get(proposalInfo, 'detail', {});

  //  update rating if the user clicks on the star
  // eslint-disable-next-line no-unused-vars
  const changeRating = async (newRating) => {
    try {
      updateRatingLoader(true)
      const feedbackContract = await loadContract("ZTMFeedbacks")

      const { account, web3 } = await getWalletAccount()

      // Check if chrome wallet extn is installed
      const chromeWallet = !!window.web3
      if (!chromeWallet) {
        throw new Error("No zerotheft wallet found.")
      }

      // Check if correct network is selected
      if (web3.currentProvider.chainId !== `0x${CHAIN_ID.toString(16)}`) {
        throw new Error("Please select the correct network.")
      }

      // Check if `account` is a verified voter ID
      const { data } = await getVoterInfos(account.toLowerCase())
      if (!data.verifiedCitizen) {
        throw new Error("You are not a verified citizen.")
      }

      // Check if `account` has already provided rating for this proposal
      const ratingData = await getCitizenProposalRating(account, item.id)
      const methodName = ratingData.success ? "updateProposalRating" : "addProposalRating"

      // Now, sign a message and perform transaction
      const params = [
        { t: "string", v: item.id },
        { t: "uint256", v: newRating },
        { t: "address", v: account },
      ]
      const signedMessage = await signMessage(params, account)
      const txDetails = {
        userId: data.id,
        details: `Rated proposal ${item.id}`,
        txType: "proposal-rating",
      }

      await carryTransaction(feedbackContract, methodName, [item.id, newRating, signedMessage], txDetails)
      await getProposalApi(item.id)
      toast.success(`Rating successfully ${ratingData.success ? "updated" : "provided"}.`)
    } catch (e) {
      toast.error(e.message || "Something went wrong.")
    } finally {
      updateRatingLoader(false)
    }
  }

  return (
    <Box>
      <OverlaySpinner loading={ratingLoader} />
      <div className="detailsWithCharts">
        <Header>
          {theftData && (no || yes) && (
            <Card>
              <CardContent>
                <GrayHeadlineH4>Was there theft?</GrayHeadlineH4>
                <div className="wrapLeftRightsec" style={{ marginTop: "10px" }}>
                  <div className="leftTheftSec">
                    <TheftBlockSec className="yesTheftsec" width={yes}>
                      <span>Yes {yes}%</span>
                    </TheftBlockSec>
                    <TheftBlockSec className="noTheftsec" width={no}>
                      <span>No {no}%</span>
                    </TheftBlockSec>
                  </div>
                </div>
                <GraySubtitle1>Total Voters : {numberWithCommas(get(theftData, "votes"))}</GraySubtitle1>
                {imageExists(`${reportPath}-votesForTheftAmount.svg`) ? (
                  <div className="imageWrapper">
                    <img
                      src={`${reportPath}-votesForTheftAmount.svg`}
                      style={{ width: "100%", height: "auto" }}
                      alt="Chart"
                    />
                  </div>
                ) : (
                  <NoChartText>Unable to meet criteria for chart.</NoChartText>
                )}
              </CardContent>
            </Card>
          )}
        </Header>

        <Card>
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <GrayHeadlineH5>#{item.id}</GrayHeadlineH5>
                <Rating
                  value={get(item, "ratings.rating", 0)}
                  name="proposal_rating"
                  onChange={(event, newValue) => {
                    changeRating(newValue)
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ float: "right" }}>
                  <FontAwesomeIcon icon={faFrown} color={colors.red} /> {get(item, "complaints.count", 0)}
                </Box>
              </Grid>
            </Grid>
            <GrayHeadlineH4>If there was theft, which makes the best case.</GrayHeadlineH4>
            <GrayBody1>This is used to compare against, for when you make your final decision</GrayBody1>
            {/* {allowSelect && (
              <div className="btns">
                <Button
                  width={170}
                  height={44}
                  onClick={() => {
                    updateSelection(
                      type === "counter"
                        ? { ...selection, counterProposal: item }
                        : { ...selection, proposal: item }
                    );
                    history.push(
                      `/path/${get(match, "params.pathname")}/issue/${get(
                        match,
                        "params.id"
                      )}/${type === "counter" ? "vote" : "counter-proposals"}`
                    );
                  }}
                  disabled={isEmpty(item)}
                >
                  Select This One
                </Button>
                <Button
                  plain
                  height={44}
                  width={125}
                  onClick={() => {
                    updateSelection(
                      type === "counter"
                        ? { ...selection, counterProposal: null }
                        : { ...selection, proposal: null }
                    );
                    history.push(
                      `/path/${get(match, "params.pathname")}/issue/${get(
                        match,
                        "params.id"
                      )}/${type === "counter" ? "vote" : "counter-proposals"}`
                    );
                  }}
                  style={{
                    marginLeft: 10,
                    background: "transparent",
                    borderWidth: 2,
                  }}
                >
                  Skip This
                </Button>
              </div>
            )} */}
            {!isEmpty(item) && (
              <>
                {imageExists(`${reportPath}-theftValue-view.svg`) ? (
                  <div className="imageWrapper">
                    <img
                      src={`${reportPath}-theftValue-view.svg`}
                      style={{ width: "100%", height: "auto" }}
                      alt="Report"
                    />
                  </div>
                ) : (
                  <NoChartText>Report is not available yet.</NoChartText>
                )}

                <GrayCardSection>
                  <div>
                    <GraySubtitle1>Theft Amount: </GraySubtitle1>
                    <HeadlineH1>{item.summary}</HeadlineH1>
                    <SubTitle1>{maxTheftYear ? <h4>(in {maxTheftYear})</h4> : null}</SubTitle1>
                  </div>
                </GrayCardSection>

                <ErrorCardSection>
                  <ErrorOverline1>Warning:</ErrorOverline1>
                  <ErrorBody1>
                    The amount claimed to be stolen in this area is{" "}
                    <span style={{ fontSize: "20px" }}>{item.summary}</span> lower than the average of{" "}
                    <span style={{ fontSize: "20px" }}>$291B</span>
                  </ErrorBody1>
                </ErrorCardSection>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </Box>
  )
}

export default ProposalReport

const TheftBlockSec = styled.div`
  display: flex;
  border-radius: 2px;
  flex-flow: column;
  height: 30px;
  margin-bottom: 10px;
  align-item: center;
  background: ${colors.grey200};
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.15px;
  position: relative;
  span {
    display: flex;
    flex-flow: column;
    height: 100%;
    white-space: nowrap;
    justify-content: center;
    color: white;
    padding-left: 10px;
    position: relative;
    z-index: 1;
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: ${(props) => props.width || 0}%;
    background: ${colors.background.green};
  }
  &.noTheftsec {
    &::before {
      background: ${colors.background.red};
    }
  }
`
