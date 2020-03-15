import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Excel from './Excel'
import App from './App'
function Routing() {
  return (
    <Router>
      <ul className="list-group list-group-horizontal">
        <li className="list-group-item list-group-item-dark text-center col-6 ">
          <Link to="/form">Create Data</Link>
        </li>
        <li className="list-group-item list-group-item-dark text-center col-6 ">
          <Link to="/excel">Export Excel</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/form">
          <App />
        </Route>
        <Route path="/excel">
          <Excel />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routing
