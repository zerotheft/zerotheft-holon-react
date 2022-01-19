import React, { useState, useContext } from "react"
import { get } from "lodash"
import { Grid } from "@mui/material"
import { API_URL } from "constants/index"
import { CardSectionNoPadding } from "commons/newStyles"
import { IssueContext } from "../IssueContext"
import { AppContext } from "../../AppContext"
import Points from "../commons/Points"
import ProposalDetail from "../commons/ProposalDetail"
import ProposalReport from "../commons/proposalReport"

const CounterProposals = ({ history, match }) => {
  const { issue, selection, updateSelection } = useContext(IssueContext)
  const { umbrellaPaths, holonInfo } = useContext(AppContext)
  const [selectedItem, updateSelectedItem] = useState(get(selection, "counterProposal") || {}),
    /* eslint-disable-next-line no-unused-vars */
    [loading, updateLoading] = useState(false)

  const issuePath = `${match.params.pathname}/${match.params.id}`.replace(/%2F/g, "/")
  /* eslint-disable-next-line no-useless-escape */
  const issuePathNoNation = issuePath.replace(/[^\/]+\/?/, "")
  const isUmbrella = !!get(umbrellaPaths, issuePathNoNation)
  const reportPath = `${API_URL}/${get(holonInfo, "reportsPath")}/${
    isUmbrella ? "multiIssueReport" : "ztReport"
  }/${issuePath.replace(/\//g, "-")}`

  const proposalsData = get(issue, "counter_proposals", [])
  if (!selectedItem.id) {
    if (proposalsData && proposalsData.length > 0) {
      updateSelectedItem(proposalsData[0])
    }
  }
  const proposalLength = proposalsData && proposalsData.length > 0 ? proposalsData.length : 0

  const navigateToNext = async () => {
    const currentProposalIndex = proposalsData.indexOf(selectedItem)
    if (currentProposalIndex + 1 >= proposalsData.length) {
      return
    }

    updateSelectedItem(proposalsData[currentProposalIndex + 1])
  }

  const navigateToPrevious = async () => {
    const currentProposalIndex = proposalsData.indexOf(selectedItem)
    if (currentProposalIndex - 1 < 0) {
      return
    }

    updateSelectedItem(proposalsData[currentProposalIndex - 1])
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 0 }}>
        <div style={{ width: "375px" }}>
          <CardSectionNoPadding
            style={{
              height: "calc(100vh - 140px)",
              position: "fixed",
              width: "inherit",
            }}
          >
            <Points
              data={proposalsData}
              issue={issue}
              counter
              selectedItem={selectedItem}
              updateSelectedItem={updateSelectedItem}
              loading={loading}
            />
          </CardSectionNoPadding>
        </div>
        <Grid container spacing={2} sx={{ ml: "375px" }}>
          <Grid item xs={8}>
            <ProposalDetail
              item={selectedItem}
              navigateToNext={navigateToNext}
              navigateToPrevious={navigateToPrevious}
              nextDisableStatus={proposalsData.indexOf(selectedItem) + 1 >= proposalsData.length}
              previousDisableStatus={proposalsData.indexOf(selectedItem) - 1 < 0}
              updateSelection={updateSelection}
              selection={selection}
              history={history}
              type="counter"
              proposalLength={proposalLength}
            />
          </Grid>
          <Grid item xs={4}>
            <ProposalReport
              item={selectedItem}
              selection={selection}
              updateSelection={updateSelection}
              history={history}
              reportPath={reportPath}
              type="counter"
              proposalLength={proposalLength}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default CounterProposals
