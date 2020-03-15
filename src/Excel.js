import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';
import {
  JsonToExcel
} from 'react-json-excel';
import './App.css';
import { connect } from 'react-redux'

function Excel(props) {
  
  const [field] = useState(props.excel.field || "")
  const [final] = useState(props.excel.final || "")
  const [fileName] = useState(props.excel.fileName || "")

  const className = 'col-4 btn btn-primary',
    style = {
      padding: "5px"
    }

  return (
      <div className="App">
        <Jumbotron>
          <div className="row">
            <span className="col-4" />
            <JsonToExcel
              data={final}
              className={className}
              filename={fileName}
              fields={field}
              style={style}
            />
            <span className="col-4" />
          </div>
        </Jumbotron >
      </div>
  )
}

const mapStateToProps = state => {
  return {
   excel : state.excel
  }
}

export default connect(mapStateToProps, null)(Excel)
