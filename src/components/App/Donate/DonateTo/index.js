import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Holon from './Holon'
import Zerotheft from './Zerotheft'

const DonateTo = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={match.path} to={`${match.path}/zerotheft`} />
      <Route path={`${match.path}/zerotheft`} component={Zerotheft} />
      <Route path={`${match.path}/holon`} component={Holon} />
    </Switch>
  )
}

export default DonateTo
