import React from 'react'
import { Switch, Route } from 'react-router-dom'
import HealthCard from './healthcard'

function App() {
  return (
    <Switch>
      <Route path='/healthcard'>
        <HealthCard />
      </Route>
      <Route path='/'>
        <HealthCard />
      </Route>
    </Switch>
  )
}

export default App
