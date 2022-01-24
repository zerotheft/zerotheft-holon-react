// eslint-disable no-throw-literal
import React, { useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { get } from "lodash"

import { Box } from "@mui/system"
import { Button, Card, CardContent, Grid } from "@mui/material"
import { ArrowBackIos, ArrowForwardIos, Info } from "@mui/icons-material"
import { colors } from "theme"
import { convertJSONtoString } from "utils"
import OverlaySpinner from "commons/OverlaySpinner"
import useFetch from "commons/hooks/useFetch"
import { getProposal } from "apis/proposals"
import { GrayHeadlineH5, GraySubtitle1 } from "commons/newStyles"
import { Body } from "../styles"

const ProposalDetail = ({
  item,
  navigateToNext,
  navigateToPrevious,
  nextDisableStatus,
  previousDisableStatus,
  updateSelection,
  type,
  selection,
  history,
  proposalLength,
}) => {
  const [getProposalApi, proposalLoading, proposalInfo] = useFetch(getProposal),
    match = useRouteMatch()

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    item && getProposalApi(item.id)
  }, [item])

  if (proposalLoading && proposalLength > 0) {
    return (
      <Body>
        <OverlaySpinner overlayParent loading backgroundColor="transparent" />
        <div className="overlayTextWrapper">
          <p className="overlayText"> Please wait. The details are being fetched from the server. </p>
        </div>
      </Body>
    )
  }

  return (
    <Box>
      <Card sx={{ boxShadow: "none" }}>
        <CardContent>
          {proposalLength === 0 ? (
            <>
              <GrayHeadlineH5>
                <Info sx={{ float: "left" }} />
                No proposals for the path exists yet.
              </GrayHeadlineH5>
            </>
          ) : (
            <>
              <Grid container>
                <Grid item xs={4}>
                  <Box>
                    <GraySubtitle1>Proposal Detail</GraySubtitle1>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <div style={{ float: "right", height: "36px" }}>
                    <Button
                      variant="outlined"
                      onClick={navigateToPrevious}
                      disabled={previousDisableStatus}
                      sx={{ height: "inherit", minWidth: "40px" }}
                    >
                      <ArrowBackIos fontSize="small" sx={{ mr: "-8px" }} />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ marginX: "10px", height: "inherit" }}
                      onClick={() => {
                        updateSelection(
                          type === "counter"
                            ? { ...selection, counterProposal: item }
                            : { ...selection, proposal: item }
                        )
                        history.push(
                          `/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}/${
                            type === "counter" ? "vote" : "counter-proposals"
                          }`
                        )
                      }}
                    >
                      VOTE FOR THIS ONE
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={navigateToNext}
                      disabled={nextDisableStatus}
                      sx={{
                        height: "inherit",
                        maxWidth: "40px",
                        minWidth: "40px",
                      }}
                    >
                      <ArrowForwardIos fontSize="small" />
                    </Button>
                  </div>
                </Grid>
              </Grid>

              <div style={{ color: colors.grey800 }}>
                {proposalInfo ? (
                  <div
                    className="detail-wrapper"
                    style={{
                      position: "relative",
                      minHeight: 50,
                      color: colors.grey800,
                    }}
                  >
                    {convertJSONtoString(get(proposalInfo, "detail", {}))}
                  </div>
                ) : (
                  <>
                    {get(item, "title") && <h5>{get(item, "title")}</h5>}
                    <p>{get(item, "description")}</p>
                  </>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProposalDetail
