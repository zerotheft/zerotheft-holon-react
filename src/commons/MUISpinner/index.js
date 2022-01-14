import { CircularProgress } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const MuiSpinner = ({ loading }) => {
  if (!loading) return null
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  )
}

export default MuiSpinner
