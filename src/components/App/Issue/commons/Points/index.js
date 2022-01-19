import React from "react"
import { get, orderBy } from "lodash"
import { useRouteMatch } from "react-router-dom"
import { Button, Divider, Grid, LinearProgress, List, ListItem, ListItemButton, Rating } from "@mui/material"
import { Box } from "@mui/system"
import { NavigateNext } from "@mui/icons-material"
import OverlaySpinner from "commons/OverlaySpinner"

import {
  BoldListText,
  LightListText,
  SubTitle1,
  GrayCaption1,
  GrayCardSection,
  GrayHeadlineH4,
} from "commons/newStyles"
import { numberWithCommas } from "utils"
import useFetch from "commons/hooks/useFetch"
import { getTheftInfo } from "apis/reports"

// import { IssueContext } from '../../IssueContext'

const Points = ({
  data = [],
  selectedItem = {},
  updateSelectedItem,

  // issue = {},
  counter = false,
  loading = false,
  viewPage = false,
}) => {
  const match = useRouteMatch()

  const [theftInfo] = useFetch(getTheftInfo)
  const theftData = theftInfo && theftInfo[`${match.params.pathname}/${match.params.id}`.replaceAll("%2F", "/")]

  // const history = useHistory()

  // const { selection, updateSelection } = useContext(IssueContext)
  data =
    data.length > 0 &&
    orderBy(
      data,
      (item) => {
        return item.ratings.rating
      },
      ["desc"]
    )
  return (
    <>
      {loading && <OverlaySpinner loading overlayParent />}
      <Box sx={{ px: 1, py: 1 }}>
        <SubTitle1>Select proposal</SubTitle1>
      </Box>
      <Box sx={{ width: "100%" }}>
        <List
          style={{
            maxHeight: "calc(100vh - 300px)",
            overflowY: "auto",
          }}
        >
          {data.length ? (
            data.map((i) => (
              <>
                <ListItem disablePadding selected={i.id === selectedItem.id} onClick={() => updateSelectedItem(i)}>
                  <ListItemButton key={i.id}>
                    <Grid container>
                      <Grid item xs={7}>
                        <BoldListText>#{i.id}</BoldListText>
                        <Box>
                          <Rating value={get(i, "ratings.rating", 0)} name="proposal_rating" readOnly />
                          <LightListText>({numberWithCommas(get(theftData, "votes"))})</LightListText>
                        </Box>
                      </Grid>
                      <Grid item xs={5}>
                        <div style={{ float: "left" }}>
                          <div>
                            <LinearProgress
                              variant="determinate"
                              value={80}
                              color="secondary"
                              sx={{ height: "14px" }}
                            />
                          </div>
                          <div style={{ marginTop: "15px" }}>
                            <GrayCaption1>
                              <span>{i.summary}</span> | Votes: <span>{get(i, "votes", 0)}</span>
                            </GrayCaption1>
                          </div>
                        </div>
                        <div style={{ float: "right" }}>
                          <NavigateNext />
                        </div>
                      </Grid>
                    </Grid>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))
          ) : (
            <>
              <GrayCardSection style={{ textAlign: "center" }}>
                <GrayHeadlineH4>There are no {counter ? "counter" : ""} proposals for the path yet.</GrayHeadlineH4>
                <div className="btns">
                  <Button
                    variant="contained"
                    href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-${
                      counter ? "counter-" : ""
                    }proposal`}
                  >
                    Add {counter ? "Counter" : ""} Proposal
                  </Button>
                </div>
              </GrayCardSection>
            </>
          )}
        </List>
      </Box>

      {viewPage ? (
        ""
      ) : data.length ? (
        <GrayCardSection
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            right: "10px",
            textAlign: "center",
          }}
        >
          {data.length ? <GrayHeadlineH4>None of these are accurate</GrayHeadlineH4> : null}
          {data.length ? (
            <div className="btns">
              <Button
                variant="contained"
                href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-${
                  counter ? "counter-" : ""
                }proposal`}
              >
                Add {counter ? "Counter" : ""} Proposal
              </Button>
            </div>
          ) : null}
        </GrayCardSection>
      ) : null}
    </>
  )
}

export default Points
