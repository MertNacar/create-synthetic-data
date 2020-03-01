import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron } from 'react-bootstrap';
import {
  JsonToExcel
} from 'react-json-excel';

function Excel(props) {
  useEffect(() => {
    console.log('hey')

  }, [])
  const [field, setField] = useState(props.field)
  const [final, setFinal] = useState(props.final)
  const [fileName, setFileName] = useState(props.fileName)

  const className = 'col-4 btn btn-primary',
    style = {
      padding: "5px"
    }

  return (
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
  )
}

export default Excel
