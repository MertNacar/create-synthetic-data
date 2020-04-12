import React, { useState,useEffect } from 'react';
import { Jumbotron } from 'react-bootstrap';
import {
  JsonToExcel
} from 'react-json-excel';
import { connect } from 'react-redux'
import { pageReady } from './store/ready/actionCreator'

function Excel(props) {

  const [field] = useState(props.excel.field || {})
  const [final] = useState(props.excel.final || [])
  const [fileName] = useState(props.excel.fileName || "")

  useEffect(() => {
    return () => {
      props.pageReady(false)
    }
  }, [])
  const className = 'col-4 btn btn-primary',
    style = {
      padding: "5px"
    }

  let display = field !== null && final.length !== 0 && fileName.length !== 0
  return (
    <div className="App">
      <Jumbotron>
        <div className="row">
          <span className="col-4" />

          {
            display ?
              <JsonToExcel
                data={final}
                className={className}
                filename={fileName}
                fields={field}
                style={style}
              />
              :
              <span className="col-4">
                <p className="text-center">Lütfen ilk olarak veri oluşturunuz.</p>
              </ span>
          }

          <span className="col-4" />
        </div>
      </Jumbotron >
    </div>
  )
}

const mapStateToProps = state => {
  return {
    excel: state.excel
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pageReady: ready => {
      dispatch(pageReady(ready))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Excel)
