import React from "react"
import { startCase } from "lodash"
import { Breadcrumbs, Grid, Link } from "@mui/material"
import { Box } from "@mui/system"
import { NavigateNext, Warning } from "@mui/icons-material"
import { DarkCaption1, GrayCaption1 } from "commons/newStyles"
import { colors } from "theme"
import { WarningWrapper } from "./styles"

// const checkRoute = (routes, currentRoute) => {
//   if (!currentRoute || isEmpty(routes)) return true
//   else if (!includes(routes, last(currentRoute.split('/')))) return true
//   return false
// }

const MainWrapper = ({ stepsPage, pathname, children, pathCrumbTemp }) => {
  // const history = useHistory()
  const pathCrumbs = pathCrumbTemp && pathCrumbTemp.length > 0 ? pathCrumbTemp : pathname.split("%2F")

  return (
    <Grid container>
      <Grid item xs={12}>
        {!stepsPage && (
          <Box>
            <Grid container>
              <Grid item xs={5}>
                <Breadcrumbs sx={{ position: "fixed" }}>
                  {pathCrumbs.map((crumb, index, { length }) => {
                    const currentPath = pathCrumbs.slice(0, index + 1).join("%2F")
                    return index + 1 === length ? (
                      <DarkCaption1>{startCase(crumb)}</DarkCaption1>
                    ) : (
                      <Link
                        underline="hover"
                        key={crumb}
                        color="inherit"
                        href={`/path/${currentPath}`}
                        separator={<NavigateNext fontSize="small" />}
                      >
                        <GrayCaption1>{startCase(crumb)}</GrayCaption1>
                      </Link>
                    )
                  })}
                </Breadcrumbs>
              </Grid>
              <Grid item xs={7}>
                <WarningWrapper>
                  <p>
                    <Warning sx={{ float: "left", color: colors.secondaryVariant1 }} />
                    The amounts and reasoning comes from citizens. Not from the ZTM company or this website.{" "}
                  </p>
                </WarningWrapper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
      <Grid item xs={12} sx={{ marginTop: "30px" }}>
        {children}
      </Grid>
    </Grid>
  )
}

export default MainWrapper
