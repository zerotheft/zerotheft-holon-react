import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import * as ROUTES from 'constants/routes'
import { colors, height } from 'theme'
import Header from './commons/Header'
import Footer from './commons/Footer'
import ErrorBoundary from 'commons/ErrorBoundary'
import Home from './Home'
import Holon from './Holon'
import AllProposals from './AllProposals'
import Issue from './Issue'
import Path from './Path/Path'
import Donate from './Donate'
import DonateTo from './Donate/DonateTo'
import Report from './Report'

import { Web3Provider } from './Web3Context'
import { AppProvider } from './AppContext'
import NotFound from './NotFound'
import ViewProposal from './ViewProposal'

const Wrapper = styled.section`
  min-height: 100vh;
  padding: ${height.header}px 0 25px;
  background: ${colors.background.body};
  overflow: auto;
`

const AppWrapper = props => (
  <Router preserverScrollPosition={false}>
    <ErrorBoundary>
      <AppProvider>
        <Web3Provider>
          <App {...props} />
        </Web3Provider>
      </AppProvider>
    </ErrorBoundary>
  </Router>
)

export default AppWrapper

const App = ({ history }) => {
  return (
    <Wrapper>
      <Header history={history} />
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
        {/* <Route path={ROUTES.ALL_CITIZENS} component={AllCitizens} /> */}
        <Route path={ROUTES.ALL_PROPOSALS} component={AllProposals} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path="/" component={NotFound} />
      </Switch>
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
