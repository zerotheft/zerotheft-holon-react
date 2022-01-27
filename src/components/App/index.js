import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import PropTypes from "prop-types"
import styled from "styled-components"

import { ToastContainer, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { Container, createTheme, ThemeProvider } from "@mui/material"
import * as ROUTES from "constants/routes"
import { colors, height } from "theme"
import ErrorBoundary from "commons/ErrorBoundary"
import { ToastProvider } from "commons/ToastContext"
import Header from "./commons/Header"
import Footer from "./commons/Footer"
import Home from "./Home"
import Datatable from "./Datatable"
import VoteDatatable from "./Datatable/VoteDatatable"
import HierarchyYaml from "./Datatable/hierarchy"
import Citizen from "./View/Citizen"
import Vote from "./View/Vote"
import Holon from "./Holon"
import AllProposals from "./AllProposals"
import Issue from "./Issue"
import Path from "./Path/Path"
import Donate from "./Donate"
import DonateTo from "./Donate/DonateTo"
import Report from "./Report"

import { Web3Provider } from "./Web3Context"
import { AppProvider } from "./AppContext"
import NotFound from "./NotFound"
import ViewProposal from "./ViewProposal"

const Wrapper = styled.section`
  min-height: 100vh;
  padding: ${height.header}px 0 0;
  background: ${colors.background.body};
  overflow: auto;
`

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    neutral: {
      main: colors.background.white,
      contrastText: "#64748B",
    },
  },
})

const AppWrapper = (props) => (
  <Router preserverScrollPosition={false}>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <ErrorBoundary>
          <AppProvider>
            <Web3Provider>
              <App {...props} />
            </Web3Provider>
          </AppProvider>
        </ErrorBoundary>
      </ToastProvider>
    </ThemeProvider>
  </Router>
)

export default AppWrapper

const App = ({ history }) => {
  return (
    <Wrapper>
      <Header history={history} />
      <Container maxWidth="false">
        <Switch>
          <Route path={ROUTES.HOLON} component={Holon} />
          <Route path={ROUTES.ISSUE} component={Issue} />
          <Route path={ROUTES.PATH_DETAIL} component={Path} />
          <Route path={ROUTES.DONATE} component={Donate} />
          <Route path={ROUTES.DONATE_TO} component={DonateTo} />
          <Route path={ROUTES.VIEW_PROPOSAL} component={ViewProposal} />
          <Route path={ROUTES.VIEW_COUNTER_PROPOSAL} component={ViewProposal} />
          <Route path={ROUTES.PATHREPORT} component={Report} />
          <Route path={ROUTES.LEAFREPORT} component={Report} />
          <Route path={ROUTES.ALL_PROPOSALS} component={AllProposals} />
          <Route path={ROUTES.DATALIST} component={Datatable} />
          <Route path={ROUTES.VOTELIST} component={VoteDatatable} />
          <Route path={ROUTES.CITIZEN_VIEW} component={Citizen} />
          <Route path={ROUTES.VOTE_VIEW} component={Vote} />
          <Route path={ROUTES.HIERARCHY} component={HierarchyYaml} />
          <Route path={ROUTES.HOME} component={Home} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Container>

      <ToastContainer
        autoClose={5000}
        closeButton={false}
        transition={Slide}
        hideProgressBar
        draggable={false}
        position="top-right"
        toastClassName="toast-inner-container"
        className="toast-container"
      />
      <Footer history={history} />
    </Wrapper>
  )
}

App.propTypes = {
  history: PropTypes.object,
}
