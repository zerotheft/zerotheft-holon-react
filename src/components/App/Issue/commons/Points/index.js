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
  ButtonText1,
} from "commons/newStyles"
import { numberWithCommas } from "utils"
import useFetch from "commons/hooks/useFetch"
import { getTheftInfo } from "apis/reports"
import { colors } from "theme"

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
      <Box sx={{ px: 1, pt: 1 }}>
        <SubTitle1>Select {counter ? "counter" : ""} proposal</SubTitle1>
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
                <Divider />
                <ListItem disablePadding selected={i.id === selectedItem.id} onClick={() => updateSelectedItem(i)}>
                  <ListItemButton key={i.id}>
                    <Grid container>
                      <Grid item xs={6}>
                        <BoldListText>#{i.id}</BoldListText>
                        <Box>
                          <Rating
                            value={get(i, "ratings.rating", 0)}
                            name="proposal_rating"
                            readOnly
                            sx={{ verticalAlign: "middle" }}
                          />
                          <LightListText>({numberWithCommas(get(theftData, "votes"))})</LightListText>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <div style={{ float: "left", width: "85%" }}>
                          <div>
                            <LinearProgress
                              variant="determinate"
                              value={80}
                              sx={{
                                height: "20px",
                                borderRadius: "2px",
                                color: colors.text.gray,
                              }}
                            />
                          </div>
                          <div style={{ marginTop: "10px" }}>
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
                    <ButtonText1>Add {counter ? "Counter" : ""} Proposal</ButtonText1>
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
                sx={{ marginY: "15px", padding: "6px" }}
                href={`zerotheft://home/path/${match.params.pathname}%2F${match.params.id}/create-${
                  counter ? "counter-" : ""
                }proposal`}
              >
                <ButtonText1>Add {counter ? "Counter" : ""} Proposal</ButtonText1>
              </Button>
            </div>
          ) : null}
        </GrayCardSection>
      ) : null}
    </>
  )
}

export default Points
