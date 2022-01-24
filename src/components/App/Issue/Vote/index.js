import React, { useContext } from "react"
import { get } from "lodash"
import { Redirect } from "react-router-dom"

import { Grid } from "@mui/material"
import { CardSection, PrimaryHeadlineH2 } from "commons/newStyles"
import { IssueContext } from "../IssueContext"
import Compare from "../commons/Compare"

const Vote = ({ match }) => {
  const { issue, selection } = useContext(IssueContext)
  const title = get(issue, "title", "N/A")

  if (!get(selection, "proposal") && !get(selection, "counterProposal"))
    return <Redirect to={`/path/${get(match, "params.pathname")}/issue/${get(match, "params.id")}`} />

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item lg={12} xs={12} sm={12} xl={12} md={12} style={{ paddingTop: "0px" }}>
          <CardSection>
            <Grid container sx={{ alignItems: "center", pt: 0, mt: 0 }}>
              <Grid item lg={1} xs={1} sm={1} xl={1} md={1}>
                <PrimaryHeadlineH2>VOTE</PrimaryHeadlineH2>
              </Grid>
              <Grid item lg={11} xs={11} sm={11} xl={11} md={11}>
                <div>
                  If there was or was not theft <br /> (Ethically, not Legally)
                </div>
              </Grid>
            </Grid>
          </CardSection>
        </Grid>
        <Grid item xs={12} sx={{ mt: "20px" }} style={{ paddingTop: "0px" }}>
          <Compare data={selection} title={title} id={get(match, "params.id")} />
        </Grid>
      </Grid>
    </>
  )
}

export default Vote
