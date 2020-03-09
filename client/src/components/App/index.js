import React from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'

import { Home, MovieDetail } from '../../components'

const App = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:id" component={MovieDetail} />
    </Switch>
  )
}

export default withRouter(App)
