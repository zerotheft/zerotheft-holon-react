import { Grid } from "@mui/material"
import React from "react"
import { colors } from "theme"

import CompareContent from "./CompareContent"

const Compare = ({ title, data, hideBtn, id }) => {
  return (
    <>
      <Grid container spacing={0} sx={{ backgroundColor: colors.background.white }}>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12} sx={{ borderRight: `2px solid ${colors.grey400}` }}>
          <CompareContent vote="yes" title={title} data={data.proposal} hideBtn={hideBtn} id={id} />
        </Grid>
        <Grid item xl={6} lg={6} md={12} sm={12} xs={12}>
          <CompareContent vote="no" title={title} data={data.counterProposal} hideBtn={hideBtn} id={id} />
        </Grid>
      </Grid>
    </>
  )
}

export default Compare
