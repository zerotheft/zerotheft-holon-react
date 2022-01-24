// eslint-disable no-throw-literal
import React, { useState, useContext, useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { get, isEmpty } from "lodash"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFrown } from "@fortawesome/free-regular-svg-icons"

import { Box } from "@mui/system"
import { Card, CardContent, Grid, Rating } from "@mui/material"
import { styled } from "@mui/material/styles"
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
  TheftBlockSec,
} from "commons/newStyles"
import OverlaySpinner from "commons/OverlaySpinner"
import { ToastContext } from "commons/ToastContext"
import { Header, NoChartText } from "../styles"

const { CHAIN_ID, loadContract } = config

const ProposalReport = ({ item, reportPath }) => {
  const [getProposalApi] = useFetch(getProposal),
    match = useRouteMatch(),
    { carryTransaction, getWalletAccount, signMessage } = useWeb3(),
    [ratingLoader, updateRatingLoader] = useState(false)

  const { setToastProperties } = useContext(ToastContext)
  const { addOrSwitchCorrectNetwork } = useWeb3()

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
        const message = "No browser wallet has been found."
        setToastProperties({ message, type: "error" })
        return
      }

      // Check if correct network is selected
      if (web3.currentProvider.chainId !== `0x${CHAIN_ID.toString(16)}`) {
        await addOrSwitchCorrectNetwork()
      }

      // Check if `account` is a verified voter ID
      const { data } = await getVoterInfos(account.toLowerCase())
      if (!data.verifiedCitizen) {
        const message = "You are not a verified citizen."
        setToastProperties({ message, type: "error" })
        return
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

      const message = `Rating has been successfully ${ratingData.success ? "updated" : "provided"}.`
      setToastProperties({ message, type: "success" })
    } catch (e) {
      const message = e.message || "Something went wrong."
      setToastProperties({ message, type: "error" })
    } finally {
      updateRatingLoader(false)
    }
  }

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: colors.secondaryVariant2,
    },
    "& .MuiRating-iconEmpty": {
      color: colors.grey300,
    },
  })

  return (
    <Box>
      <OverlaySpinner loading={ratingLoader} />
      <div className="detailsWithCharts">
        <Header>
          {theftData && (no || yes) && (
            <Card sx={{ boxShadow: "none" }}>
              <CardContent>
                <GrayHeadlineH4>Was there theft?</GrayHeadlineH4>
                <div>
                  <div
                    className="wrapLeftRightsec"
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  >
                    <div className="leftTheftSec" style={{ width: "85%", float: "left" }}>
                      <TheftBlockSec className="yesTheftsec" width={yes}>
                        <span>Yes</span>
                      </TheftBlockSec>
                    </div>
                    <div
                      style={{
                        width: "10%",
                        float: "right",
                        paddingTop: "2px",
                      }}
                    >
                      <GrayHeadlineH5>{yes}%</GrayHeadlineH5>
                    </div>
                  </div>
                  <div
                    className="wrapLeftRightsec"
                    style={{
                      marginTop: "10px",
                      width: "100%",
                      maxWidth: "400px",
                    }}
                  >
                    <div className="leftTheftSec" style={{ width: "85%", float: "left" }}>
                      <TheftBlockSec className="noTheftsec" width={no}>
                        <span>No</span>
                      </TheftBlockSec>
                    </div>
                    <div
                      style={{
                        width: "10%",
                        float: "right",
                        paddingTop: "2px",
                      }}
                    >
                      <GrayHeadlineH5>{no}%</GrayHeadlineH5>
                    </div>
                  </div>
                </div>
                {/* <div
                  className="wrapLeftRightsec"
                  style={{ marginTop: "100px" }}
                >
                  <div className="leftTheftSec">
                    <TheftBlockSec className="yesTheftsec" width={yes}>
                      <span>Yes {yes}%</span>
                    </TheftBlockSec>
                    <TheftBlockSec className="noTheftsec" width={no}>
                      <span>No {no}%</span>
                    </TheftBlockSec>
                  </div>
                </div> */}
                <GraySubtitle1 style={{ display: "inline-block", marginTop: "5px" }}>
                  Total Voters : {numberWithCommas(get(theftData, "votes"))}
                </GraySubtitle1>
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

        <Card sx={{ boxShadow: "none" }}>
          <CardContent>
            <Grid container>
              <Grid item xs={8}>
                <GrayHeadlineH5>#{item.id}</GrayHeadlineH5>
                <StyledRating
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
                    <SubTitle1>{maxTheftYear ? <>(in {maxTheftYear})</> : null}</SubTitle1>
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
