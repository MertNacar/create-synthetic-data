import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Excel from './Excel'
import App from './App'
import {connect } from 'react-redux'

function Routing(props) {
  return (
   
      <Router>
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item list-group-item-secondary text-center col-6">
            <Link className="text-decoration-none text-danger" to="/">Veri Oluştur</Link>
          </li>
          <li className="list-group-item list-group-item-secondary text-center col-6" style={{ pointerEvents: props.page ? "auto" : "none", opacity: props.page ? 1 : 0.5 }}>
            <Link className="text-decoration-none text-danger" to="/excel">Excel Çıktı</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/excel">
            <Excel />
          </Route>
        </Switch>
      </Router>

  )
}

const mapStateToProps = state => {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps, null)(Routing)
