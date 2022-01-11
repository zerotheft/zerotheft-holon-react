import React from "react"
import { startCase } from "lodash"
import { Breadcrumbs, Grid, Typography, Link, Container } from "@mui/material"
import { Box } from "@mui/system"
import { NavigateNext } from "@mui/icons-material"

// const checkRoute = (routes, currentRoute) => {
//   if (!currentRoute || isEmpty(routes)) return true
//   else if (!includes(routes, last(currentRoute.split('/')))) return true
//   return false
// }

const MainWrapper = ({ stepsPage, pathname, children, pathCrumbTemp }) => {
  // const history = useHistory()
  const pathCrumbs = pathCrumbTemp && pathCrumbTemp.length > 0 ? pathCrumbTemp : pathname.split("%2F")

  return (
    <Container maxWidth="false">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {!stepsPage && (
            <Box>
              <Breadcrumbs>
                {pathCrumbs.map((crumb, index, { length }) => {
                  const currentPath = pathCrumbs.slice(0, index + 1).join("%2F")
                  return index + 1 === length ? (
                    <Typography color="text.primary">{startCase(crumb)}</Typography>
                  ) : (
                    <Link
                      underline="hover"
                      key="2"
                      color="inherit"
                      href={`/path/${currentPath}`}
                      separator={<NavigateNext fontSize="small" />}
                    >
                      {startCase(crumb)}
                    </Link>
                  )
                })}
              </Breadcrumbs>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default MainWrapper
